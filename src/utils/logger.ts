import type { ApiError } from "@kennethkeim/api-utils-core";

// TODO: implement better logger in api utils
export class Logger {
  error(error: ApiError) {
    const attributes = {
      message: error.message,
      errorName: error.name,
      errorStack: error.stack,
    };
    console.error(attributes);
  }
}
export const logger = new Logger();
