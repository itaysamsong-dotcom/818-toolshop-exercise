import { urlPaths } from "../config/routes";
import { expect, basePage as test } from "../fixtures/basePage";
import { loginUsers } from "../testData/loginTestData";
import { loginUser } from "../utils/loginUtils";
import { endpoint } from "../utils/commonUtils";
import { errorMsgSelectors } from "../mapping/massages";

test.describe("login user tests", () => {
  test.use({ pagePath: urlPaths.login });

  test("login with a valid registered user will enter the user space", async ({
    page,
  }) => {
    await loginUser(page, loginUsers.approved);

    await expect(page).toHaveURL(endpoint(urlPaths.account));
  });

  test("login with a invalid user will return an error ", async ({ page }) => {
    await loginUser(page, loginUsers.unapproved);

    await expect(page).toHaveURL(endpoint(urlPaths.login));
    await expect(
      page.getByTestId(errorMsgSelectors.errorMailMsg),
    ).toBeVisible();
    await expect(
      page.getByTestId(errorMsgSelectors.passwordErrMsg),
    ).toBeVisible();
  });

  test("login with a admin user will return ", async ({ page }) => {
    await loginUser(page, loginUsers.admin);

    await expect(page).toHaveURL(endpoint(urlPaths.adminDashboard));
  });
});
