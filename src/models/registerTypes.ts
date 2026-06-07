import { LoginDetailsType } from "./loginTypes";

export type BillingAddress = {
  country: string;
  postalCode: string;
  houseNum: string;
  street: string;
  city: string;
  state: string;
};

export type RegisterDetailsType = LoginDetailsType &
  BillingAddress & {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
  };
