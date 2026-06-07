# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Shopping working tools tests >> product details page displays the selected tool
- Location: src/tests/checkout.spec.ts:14:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('proceed-1')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - text: View the
    - link "Documentation" [ref=e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e8]: Practice Black Box Testing & Bug Hunting
      - button "Testing Guide" [ref=e9] [cursor=pointer]
      - button "🐛 Bug Hunting" [ref=e10] [cursor=pointer]
    - navigation [ref=e11]:
      - generic [ref=e12]:
        - link "Practice Software Testing - Toolshop" [ref=e13] [cursor=pointer]:
          - /url: /
          - img [ref=e14]
        - generic [ref=e32]:
          - menubar "Main menu" [ref=e33]:
            - menuitem "Home" [ref=e34]:
              - link "Home" [ref=e35] [cursor=pointer]:
                - /url: /
            - menuitem "Categories" [ref=e36]:
              - button "Categories" [ref=e37] [cursor=pointer]
            - menuitem "Contact" [ref=e38]:
              - link "Contact" [ref=e39] [cursor=pointer]:
                - /url: /contact
            - menuitem "Sign in" [ref=e40]:
              - link "Sign in" [ref=e41] [cursor=pointer]:
                - /url: /auth/login
          - button "Select language" [ref=e43] [cursor=pointer]:
            - img [ref=e45]
            - text: EN
  - list [ref=e51]:
    - listitem:
      - generic:
        - generic: Cart
        - generic: "1"
    - listitem:
      - generic:
        - generic: Sign in
        - generic: "2"
    - listitem:
      - generic:
        - generic: Billing Address
        - generic: "3"
    - listitem:
      - generic:
        - generic: Payment
        - generic: "4"
  - paragraph [ref=e54]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e55] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. |
    - link "Privacy Policy" [ref=e56] [cursor=pointer]:
      - /url: /privacy
    - text: "| Banner photo by"
    - link "Barn Images" [ref=e57] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e58] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e60] [cursor=pointer]:
    - img [ref=e61]
```

# Test source

```ts
  1  | import { expect, type Page } from "@playwright/test";
  2  | import { baseUrls, urlPaths } from "../config/routes";
  3  | import { checkoutLabels, checkoutSelectors } from "../mapping/checkout";
  4  | import { productsSelectors } from "../mapping/productMapping";
  5  | import type { InvoiceResponse } from "../models/checkoutTypes";
  6  | import type { LoginDetailsType } from "../models/loginTypes";
  7  | import type { productType } from "../models/productTypes";
  8  | import type { BillingAddress } from "../models/registerTypes";
  9  | import { endpoint } from "./commonUtils";
  10 | import { loginUser } from "./loginUtils";
  11 | import { fillBillingAddress } from "./registerUtils";
  12 | 
  13 | export async function addItemToShoppingCart(
  14 |   page: Page,
  15 |   productId: string,
  16 |   product: productType,
  17 | ) {
  18 |   await expect(page).toHaveURL(endpoint(`${urlPaths.product}/${productId}`));
  19 |   await page.getByTestId(productsSelectors.addToCart).click();
  20 |   await expect(page.getByTestId(productsSelectors.productName)).toHaveText(
  21 |     product.name,
  22 |   );
  23 |   await expect(page.getByTestId(productsSelectors.unitPrice)).toHaveText(
  24 |     product.unitPrice.toString(),
  25 |   );
  26 |   await expect(page.getByTestId(productsSelectors.quantity)).toHaveValue("1");
  27 | 
  28 |   await page.getByTestId(productsSelectors.increaseQuantity).click();
  29 |   await expect(page.getByTestId(productsSelectors.quantity)).toHaveValue("2");
  30 | }
  31 | 
  32 | export async function proceedToCheckout(
  33 |   page: Page,
  34 |   loginDetails: LoginDetailsType,
  35 |   billingAddress: BillingAddress,
  36 | ) {
  37 |   await page.goto(urlPaths.checkout);
  38 |   await expect(page).toHaveURL(endpoint(urlPaths.checkout));
> 39 |   await page.getByTestId(checkoutSelectors.proceedToLogin).click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  40 |   await loginUser(page, loginDetails);
  41 |   await page.getByTestId(checkoutSelectors.proceedToBillingAddress).click();
  42 |   await fillBillingAddress(page, billingAddress);
  43 |   await page.getByTestId(checkoutSelectors.proceedToPayment).click();
  44 | 
  45 |   const paymentMethod = page.getByTestId(checkoutSelectors.paymentMethod);
  46 |   await paymentMethod.selectOption({ label: checkoutLabels.cashPaymentMethod });
  47 |   await page.getByTestId(checkoutSelectors.proceedToFinishCheckout).click();
  48 |   await expect(
  49 |     page.getByTestId(checkoutSelectors.paymentSuccessMessage),
  50 |   ).toBeVisible();
  51 | }
  52 | 
  53 | export async function waitForInvoiceResponse(
  54 |   page: Page,
  55 | ): Promise<InvoiceResponse> {
  56 |   const response = await page.waitForResponse((response) => {
  57 |     const url = new URL(response.url());
  58 |     return (
  59 |       response.request().method() === "POST" &&
  60 |       url.origin === baseUrls.api &&
  61 |       url.pathname === urlPaths.invoices
  62 |     );
  63 |   });
  64 |   if (!response.ok()) {
  65 |     throw new Error(`Invoice request failed with status ${response.status()}.`);
  66 |   }
  67 |   return response.json() as Promise<InvoiceResponse>;
  68 | }
  69 | 
  70 | export async function checkProductCreation(page: Page) {
  71 |   const invoiceResponsePromise = waitForInvoiceResponse(page);
  72 |   await page.getByTestId(checkoutSelectors.proceedToFinishCheckout).click();
  73 |   const invoice = await invoiceResponsePromise;
  74 | 
  75 |   await expect(page.locator(checkoutSelectors.invoiceNumber)).toHaveText(
  76 |     invoice.invoice_number,
  77 |   );
  78 | }
  79 | 
```