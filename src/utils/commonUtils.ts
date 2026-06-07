import { Page } from "@playwright/test";
import { FieldMapType } from "../models/commonTypes";

export async function fillTextFields<T extends Record<string, string>>(
  page: Page,
  data: T,
  selectors: FieldMapType<T>,
) {
  for (const key of Object.keys(selectors) as Array<keyof T>) {
    const selector = selectors[key];
    const value = data[key];
    if (!selector) {
      continue;
    }
    await page.getByTestId(selector).fill(value.trim());
  }
}

export const endpoint = (endpoint) => RegExp(`${endpoint}$`);
