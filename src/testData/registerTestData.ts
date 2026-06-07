import { randomUUID } from "crypto";
import { BillingAddress, RegisterDetailsType } from "../models/registerTypes";

export const billingAddress: BillingAddress = {
  country: "Israel",
  postalCode: "12345",
  street: "Domenick Road",
  state: "State",
  city: "Reingerchester",
  houseNum: "10",
};

export const registerUsers: Record<string, RegisterDetailsType> = {
  correctUserField: {
    email: `customer-${Date.now()}@example.com`,
    password: `I${randomUUID()}`,
    firstName: "Itay",
    lastName: "Hakim",
    birthDate: "2005-09-04",
    ...billingAddress,
    phone: "0521234567",
  },
};
