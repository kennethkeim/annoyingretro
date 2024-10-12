export interface Option {
  name: string;
  color: string;
}

export type ResponseItem = Option & { value: number };

export interface Response {
  items: ResponseItem[];
  date: string;
}

export interface Day {
  responses: Response[];
  day: string;
}
