import type { Option, RetroResponse } from "./types";
import { OPTIONS_KEY, RESPONSES_KEY } from "./constants";

export const getOptions = () =>
  JSON.parse(localStorage.getItem(OPTIONS_KEY) ?? "[]") as Option[];

export const getResponses = () =>
  JSON.parse(localStorage.getItem(RESPONSES_KEY) ?? "[]") as RetroResponse[];
