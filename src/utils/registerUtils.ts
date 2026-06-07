import type { Page } from "@playwright/test";
import { BillingAddress, RegisterDetailsType } from "../models/registerTypes";
import {
  billingAddressTextFieldSelectors,
  registerTextFieldSelectors,
  registerSelectors,
} from "../mapping/registerMapping";
import { fillTextFields } from "./commonUtils";
import { fillMailAndPassword } from "./loginUtils";

export async function fillRegisterDetails(
  page: Page,
  registerDetails: RegisterDetailsType,
) {
  await fillMailAndPassword(page, registerDetails);
  await fillTextFields(page, registerDetails, registerTextFieldSelectors);
  await fillBillingAddress(page, registerDetails);
  await page.getByTestId(registerSelectors.registerBtn).dblclick();
}

export async function fillBillingAddress(
  page: Page,
  billingAddress: BillingAddress,
) {
  await fillTextFields(page, billingAddress, billingAddressTextFieldSelectors);
  await page
    .getByTestId(registerSelectors.country)
    .selectOption(billingAddress.country);
}
