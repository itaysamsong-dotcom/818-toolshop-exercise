import type { LoginDetailsType } from "../models/loginTypes";

export const loginUsers: Record<string, LoginDetailsType> = {
  admin: {
    email: "admin@practicesoftwaretesting.com",
    password: "welcome01",
  },
  approved: {
    email: "customer2@practicesoftwaretesting.com",
    password: "welcome01",
  },
  unapproved: {
    email: "wrongMail",
    password: "00",
  },
};
