import { FieldMapType } from "../models/commonTypes";
import type { LoginDetailsType } from "../models/loginTypes";

export const loginSelectors = {
  emailInput: "email",
  passwordInput: "password",
  loginSubmitBtn: "login-submit",
};

export const loginFieldSelectors = {
  email: loginSelectors.emailInput,
  password: loginSelectors.passwordInput,
} satisfies FieldMapType<LoginDetailsType>;
