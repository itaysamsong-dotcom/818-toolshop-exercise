import { basePage as test, expect } from "../fixtures/basePage";
import { urlPaths } from "../config/routes";
import { fillMailAndPassword } from "../utils/loginUtils";
import { fillRegisterDetails } from "../utils/registerUtils";
import { registerUsers } from "../testData/registerTestData";
import { endpoint } from "../utils/commonUtils";
import { loginSelectors } from "../mapping/loginMapping";

test.describe("register user tests", () => {
  test.use({ pagePath: urlPaths.register });

  test("register a user with correct user details will create a new user", async ({
    page,
  }) => {
    await fillRegisterDetails(page, registerUsers.correctUserField);

    await expect(page).toHaveURL(endpoint(urlPaths.login));
    await fillMailAndPassword(page, registerUsers.correctUserField);
    await page.getByTestId(loginSelectors.loginSubmitBtn).click();
    await expect(page).toHaveURL(endpoint(urlPaths.account));
  });
});
