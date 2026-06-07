import { FieldMapType } from "../models/commonTypes";
import { BillingAddress, RegisterDetailsType } from "../models/registerTypes";

export const registerSelectors = {
  firstName: "first-name",
  lastName: "last-name",
  birthDate: "dob",
  country: "country",
  postalCode: "postal_code",
  houseNum: "house_number",
  phone: "phone",
  street: "street",
  city: "city",
  state: "state",
  registerBtn: "register-submit",
};
export const registerTextFieldSelectors = {
  firstName: registerSelectors.firstName,
  lastName: registerSelectors.lastName,
  birthDate: registerSelectors.birthDate,
  phone: registerSelectors.phone,
} satisfies FieldMapType<RegisterDetailsType>;

export const billingAddressTextFieldSelectors = {
  postalCode: registerSelectors.postalCode,
  houseNum: registerSelectors.houseNum,
  street: registerSelectors.street,
  city: registerSelectors.city,
  state: registerSelectors.state,
} satisfies FieldMapType<BillingAddress>;
