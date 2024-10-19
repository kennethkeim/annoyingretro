"use client";

import type { Option, RetroResponse, ResponseItem } from "./types";
import { useState } from "react";
import { Chart } from "./_components/response-list";
import { IS_BROWSER, OPTIONS_KEY, RESPONSES_KEY, STEP } from "./constants";

const options = IS_BROWSER
  ? (JSON.parse(localStorage.getItem(OPTIONS_KEY) ?? "[]") as Option[])
  : [];

const responses = IS_BROWSER
  ? (JSON.parse(localStorage.getItem(RESPONSES_KEY) ?? "[]") as RetroResponse[])
  : [];

type OptionProps = { opt: Option; onAdd: () => void; onRemove: () => void };

function OptionListItem({ opt, onAdd, onRemove }: OptionProps) {
  return (
    <li className="mb-3 flex justify-between rounded-md bg-white p-3 shadow-md">
      <div className="flex items-center">
        <div
          style={{ backgroundColor: opt.color }}
          className="mr-2 h-3 w-3 rounded-sm"
        ></div>

        <p>{opt.name}</p>
      </div>

      <div className="flex">
        <button
          className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-neutral-200"
          onClick={onRemove}
        >
          -
        </button>
        <button
          onClick={onAdd}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-neutral-200"
        >
          +
        </button>
      </div>
    </li>
  );
}

function Form() {
  const [items, setItems] = useState<ResponseItem[]>([]);

  const handleAdd = (opt: Option) => {
    const total = items.reduce((p, c) => p + c.value, 0);
    if (total >= 60) return;

    const item = items.find((i) => i.name === opt.name);
    if (item) {
      item.value += STEP;
    } else {
      items.push({ ...opt, value: STEP });
    }
    setItems([...items]);
  };

  const handleRemove = (opt: Option) => {
    const item = items.find((i) => i.name === opt.name);
    if (item && item.value > STEP) {
      item.value -= STEP;
      setItems([...items]);
    } else if (item && item.value <= STEP) {
      const without = items.filter((i) => i.name !== opt.name);
      setItems(without);
    }
  };

  const handleSave = () => {
    const total = items.reduce((p, c) => p + c.value, 0);
    if (total < 60) return;

    const newResponse: RetroResponse = {
      date: new Date().toISOString(),
      items,
    };
    localStorage.setItem(
      RESPONSES_KEY,
      JSON.stringify([...responses, newResponse]),
    );
    // setItems([]);
    location.reload();
  };

  return (
    <div className="basis-80">
      <p className="mb-2 text-lg font-medium">
        What did you do for the last hour?
      </p>

      <div className="mb-4 flex overflow-hidden rounded-md border">
        {items.map((i) => (
          <div
            key={i.name}
            className="py-4 text-xs"
            style={{
              width: `${(i.value / 60) * 100}%`,
              backgroundColor: i.color,
            }}
          ></div>
        ))}

        {!items.length ? <div className="py-4"></div> : null}
      </div>

      <ul>
        {options.map((opt) => (
          <OptionListItem
            key={opt.name}
            opt={opt}
            onAdd={() => handleAdd(opt)}
            onRemove={() => handleRemove(opt)}
          />
        ))}
      </ul>

      <div className="my-4">
        <button
          onClick={handleSave}
          className="rounded-md bg-black px-7 py-1 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function SettingsForm() {
  const [optionName, setOptionName] = useState("");
  const [color, setColor] = useState("");

  const handleSave = () => {
    const newTask: Option = { name: optionName, color };
    localStorage.setItem(OPTIONS_KEY, JSON.stringify([...options, newTask]));
    // setOptionName("");
    // setColor("");
    location.reload();
  };

  return (
    <div>
      <p className="mb-2 text-lg font-medium">Enter new option</p>

      <div className="mb-4">
        <input
          value={optionName}
          className="mr-2 rounded-md border px-2 py-1"
          placeholder="System design"
          onChange={(e) => setOptionName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          value={color}
          className="mr-2 rounded-md border px-2 py-1"
          placeholder="green"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded-md bg-neutral-200 px-7 py-1"
      >
        Save
      </button>
    </div>
  );
}

const ExportJson = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="rounded-md bg-neutral-200 px-7 py-1"
      >
        {expanded ? "-" : "+"}
      </button>

      {expanded ? (
        <div>
          <p>Options</p>
          <p className="mb-2 text-xs text-pink-500">
            {JSON.stringify(options)}
          </p>

          <p>Responses</p>
          <p className="text-xs text-pink-500">{JSON.stringify(responses)}</p>
        </div>
      ) : null}
    </div>
  );
};

export default function ProductivityPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="flex flex-wrap justify-center gap-5">
        <section className="mb-8 flex basis-[500px] justify-center">
          <Chart />
        </section>

        <div className="mb-8 basis-96">
          <section className="flex justify-center">
            <Form />
          </section>

          <section className="flex justify-center">
            <SettingsForm />
          </section>
        </div>
      </div>

      <section>
        <ExportJson />
      </section>
    </main>
  );
}
