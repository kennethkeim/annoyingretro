import { Mailer } from "@kennethkeim/api-utils-core";
import { APP_NAME } from "~/config/config";

export const mailer = new Mailer(APP_NAME);
