export interface Option {
  name: string;
  color: string;
}

export type ResponseItem = Option & { value: number };

export interface RetroResponse {
  items: ResponseItem[];
  date: string;
}

export interface Day {
  responses: RetroResponse[];
  day: string;
}
