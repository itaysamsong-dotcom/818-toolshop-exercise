import type { Page } from "@playwright/test";
import { LoginDetailsType } from "../models/loginTypes";
import { loginFieldSelectors, loginSelectors } from "../mapping/loginMapping";
import { fillTextFields } from "./commonUtils";

export async function fillMailAndPassword(
  page: Page,
  loginDetails: LoginDetailsType,
) {
  await fillTextFields(page, loginDetails, loginFieldSelectors);
}
export async function loginUser(page: Page, loginDetails: LoginDetailsType) {
  await fillMailAndPassword(page, loginDetails);
  await page.getByTestId(loginSelectors.loginSubmitBtn).dblclick();
}

export async function extractUserAuthToken(page: Page): Promise<string> {
  const authToken = await page.evaluate(() =>
    window.localStorage.getItem("auth-token"),
  );
  if (!authToken) {
    throw new Error(
      "The auth-token was not found in local storage. Make sure the user is logged in.",
    );
  }
  return authToken;
}
