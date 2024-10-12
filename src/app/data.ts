import type { Option, Response } from "./types";

export const mockOptions: Option[] = [
  { name: "Write code", color: "green" },
  { name: "Assist Dev 1", color: "red" },
  { name: "Assist Dev 2", color: "yellow" },
  { name: "Attend meetings", color: "pink" },
  { name: "Design solutions", color: "blue" },
];

export const mockResponses: Response[] = [
  {
    items: [
      { name: "Write code", color: "green", value: 10 },
      { name: "Assist Dev 1", value: 50, color: "red" },
    ],
    date: "2024-10-11T01:00:00.000Z",
  },
  {
    items: [
      { name: "Write code", color: "green", value: 20 },
      { name: "Assist Dev 1", value: 20, color: "red" },
      { name: "Design solutions", value: 20, color: "blue" },
    ],
    date: "2024-10-11T02:00:00.000Z",
  },
  {
    items: [
      { name: "Attend meetings", value: 50, color: "pink" },
      { name: "Design solutions", value: 10, color: "blue" },
    ],
    date: "2024-10-11T03:00:00.000Z",
  },
  {
    items: [
      { name: "Write code", color: "green", value: 10 },
      { name: "Assist Dev 1", value: 10, color: "red" },
      { name: "Assist Dev 2", value: 10, color: "yellow" },
      { name: "Attend meetings", value: 10, color: "pink" },
      { name: "Design solutions", value: 20, color: "blue" },
    ],
    date: "2024-10-11T04:00:00.000Z",
  },

  {
    items: [
      { name: "Write code", color: "green", value: 10 },
      { name: "Assist Dev 1", value: 50, color: "red" },
    ],
    date: "2024-10-12T01:00:00.000Z",
  },
  {
    items: [
      { name: "Write code", color: "green", value: 20 },
      { name: "Assist Dev 1", value: 20, color: "red" },
      { name: "Design solutions", value: 20, color: "blue" },
    ],
    date: "2024-10-12T02:00:00.000Z",
  },
  {
    items: [
      { name: "Attend meetings", value: 50, color: "pink" },
      { name: "Design solutions", value: 10, color: "blue" },
    ],
    date: "2024-10-12T03:00:00.000Z",
  },
];
