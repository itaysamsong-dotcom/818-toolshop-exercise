import { productType } from "../models/productTypes";

export const products: Record<string, productType> = {
  CombinationPliers: {
    name: `Combination Pliers`,
    unitPrice: 14.15,
    carbonRating: "d",
  },
  pliers: {
    name: `Pliers`,
    unitPrice: 12.01,
    carbonRating: "d",
  },
  boltCutters: {
    name: `Bolt Cutters`,
    unitPrice: 48.41,
    carbonRating: "d",
  },
};
