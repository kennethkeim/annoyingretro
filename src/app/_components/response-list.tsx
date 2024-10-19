"use client";

import type { RetroResponse, ResponseItem, Day } from "../types";
import { useEffect, useState } from "react";
import { getResponses } from "../storage";

const getHourMinStr = (minutes: number): string => {
  const hr = Math.floor(minutes / 60);
  let min = (minutes % 60).toString();
  if (min.length === 1) min = `0${min}`;
  return `${hr}:${min}`;
};

const getDays = (responses: RetroResponse[]): Day[] => {
  const days: Day[] = [];

  responses.forEach((response) => {
    const date = new Date(response.date);
    const day = `${date.getMonth() + 1}/${date.getDate()}`;
    if (!day) return;
    const existingDay = days.find((d) => d.day === day);

    if (existingDay) {
      existingDay.responses.push(response);
    } else {
      days.push({
        day,
        responses: [response],
        firstResponseTs: date.getTime(),
      });
    }
  });

  return days;
};

function ResponseCard({ res, hrStr }: { res: RetroResponse; hrStr: string }) {
  return (
    <div
      key={res.date}
      className="flex flex-wrap items-center gap-1 font-mono text-xs"
    >
      <p>{hrStr}</p>

      {res.items.map((item, index) => {
        const time = `${item.value}m`;
        return (
          <p key={item.name} style={{ color: item.color }}>
            {item.name} {time}
            {index === res.items.length - 1 ? "" : <span>,</span>}
          </p>
        );
      })}
    </div>
  );
}

function DaySummary({ day }: { day: Day }) {
  const clonedDay = structuredClone(day);
  const allItems = clonedDay.responses.flatMap((r) => r.items);

  const totals = allItems.reduce<ResponseItem[]>((acc, curr) => {
    const existing = acc.find((i) => i.name === curr.name);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  const sortedTotals = totals.sort((a, b) => b.value - a.value);

  const totalTime = sortedTotals.reduce((p, c) => p + c.value, 0);

  return (
    <div className="font-mono">
      {sortedTotals.map((item) => {
        const time = getHourMinStr(item.value);

        return (
          <p key={item.name} className="text-xs" style={{ color: item.color }}>
            {time} {item.name}
          </p>
        );
      })}

      <p className="mt-2 text-xs font-bold">{getHourMinStr(totalTime)} Total</p>
    </div>
  );
}

function DayItemCard({
  day,
  dateStr,
  isMostRecentDay,
}: {
  day: Day;
  dateStr: string;
  isMostRecentDay: boolean;
}) {
  const [expanded, setExpanded] = useState(isMostRecentDay);

  return (
    <div className="m-auto mb-3 rounded-md bg-white p-5 shadow-md">
      <div className="flex justify-between">
        <p className="font-medium">{dateStr}</p>
        <button
          className="mr-2 flex w-[30px] items-center justify-center rounded-md bg-neutral-200"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "-" : "+"}
        </button>
      </div>

      {expanded ? (
        <div className="mt-3">
          <h3 className="mb-1 font-bold">Summary</h3>
          <DaySummary day={day} />

          <h3 className="mb-1 mt-3 font-bold">Hourly</h3>
          {day.responses.map((r) => {
            const rDate = new Date(r.date);
            const hr =
              rDate.getMinutes() > 30 ? rDate.getHours() + 1 : rDate.getHours();

            return <ResponseCard key={r.date} res={r} hrStr={`${hr}:00`} />;
          })}
        </div>
      ) : null}
    </div>
  );
}

export function Chart() {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const daysUnsorted = getDays(getResponses());
    const daysSorted = [...daysUnsorted].sort((a, b) => {
      return b.firstResponseTs - a.firstResponseTs;
    });
    setDays(daysSorted);
  }, []);

  return (
    <div className="w-full">
      {days.map((day, i) => (
        <DayItemCard
          key={day.day}
          day={day}
          dateStr={day.day}
          isMostRecentDay={i === 0}
        />
      ))}
    </div>
  );
}
