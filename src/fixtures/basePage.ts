import { test as base } from "@playwright/test";
import { urlPaths } from "../config/routes";

type BasePageFixtures = {
  pagePath: string;
};

export const basePage = base.extend<BasePageFixtures>({
  pagePath: [urlPaths.login, { option: true }],

  page: async ({ page, pagePath }, use) => {
    await page.goto(pagePath);
    await use(page);
  },
});

export { expect } from "@playwright/test";
