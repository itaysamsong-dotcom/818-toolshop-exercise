import { request } from "@playwright/test";
import { baseUrls, urlPaths } from "../config/routes";

export async function getProductIdByName(productName: string): Promise<string> {
  const apiContext = await request.newContext({ baseURL: baseUrls.api });

  try {
    const response = await apiContext.get(`${urlPaths.productsApi}`);
    const json = await response.json();
    const product = json.data.find(
      (p: { name: string; id: string }) =>
        p.name.toLowerCase() === productName.toLowerCase(),
    );

    if (!product) {
      throw new Error(`Product "${productName}" not found`);
    }
    return product.id;
  } finally {
    await apiContext.dispose();
  }
}
