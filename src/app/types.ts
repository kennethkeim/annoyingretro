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
  /** e.g. "10/19" */
  day: string;
  /** unix TS of first response in day */
  firstResponseTs: number;
}
