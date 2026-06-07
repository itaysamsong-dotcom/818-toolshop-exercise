import { defineConfig, devices } from "@playwright/test";
import { baseUrls } from "./src/config/routes";

export default defineConfig({
  testDir: "./src/tests",
  reporter: "html",
  timeout: 30_000,
  retries: 2,
  maxFailures: undefined,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: baseUrls.app,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
