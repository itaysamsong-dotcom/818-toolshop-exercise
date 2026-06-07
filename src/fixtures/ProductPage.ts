import { basePage } from "./basePage";
import { urlPaths } from "../config/routes";
import type { productType } from "../models/productTypes";
import { products } from "../testData/productTestData";
import { getProductIdByName } from "../utils/productUtils";

type ProductPageFixtures = {
  product: productType;
  productId: string;
};

export const productPage = basePage.extend<ProductPageFixtures>({
  product: [products.CombinationPliers, { option: true }],

  productId: async ({ product }, use) => {
    const productId = await getProductIdByName(product.name);

    await use(productId);
  },

  page: async ({ page, productId }, use) => {
    await page.goto(`${urlPaths.product}/${productId}`);

    await use(page);
  },
});

export { expect } from "./basePage";
