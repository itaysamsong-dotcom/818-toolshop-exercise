# 818 Automation

End-to-end test automation project built with Playwright and TypeScript.

## Prerequisites

- Node.js
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

Install the Chromium browser used by the tests:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright's interactive UI:

```bash
npm run test:ui
```

## Test Reports

Playwright generates an HTML report after a test run. Open the latest report with:

```bash
npx playwright show-report
```

## Main Code Components

### Tests

The files in `src/tests` define the test scenarios and assertions. The current
suite covers user registration, user and administrator login, and the complete
shopping cart and checkout flow.

Tests use shared fixtures and helper functions so that each specification stays
focused on the behavior being tested.

### Fixtures

The files in `src/fixtures` prepare the browser before a test begins:

- `basePage.ts` opens the route selected by a test.
- `ProductPage.ts` finds a product through the API and opens its product page.

Fixtures can be configured with `test.use()`, allowing tests to select a route
or product without repeating setup code.

### Utilities

The files in `src/utils` contain reusable browser actions and supporting logic,
including:

- Filling registration, login, and billing forms.
- Looking up product IDs through the products API.
- Adding products to the cart and completing checkout.
- Waiting for and validating the invoice API response.
- Filling groups of fields from typed test data.

### Selectors and Labels

The files in `src/mapping` keep `data-test` selectors, CSS selectors, and UI
labels separate from test logic. When the application markup changes, selectors
can be updated in one place instead of in every test.

### Test Data

The files in `src/testData` provide reusable users, products, and billing
details. Registration data uses a timestamp and UUID to generate unique
credentials for each test run.

### Models

The files in `src/models` define TypeScript types for login details,
registration details, products, billing addresses, selector maps, and invoice
API responses. These types help catch incorrect or missing test data during
development.

### Routes and Configuration

`src/config/routes.ts` stores the application and API base URLs together with
the routes used by the tests. `playwright.config.ts` configures Chromium, test
timeouts, retries, screenshots, traces, and the HTML reporter.

### Test Flow

A typical test follows this flow:

1. A fixture opens the required page and prepares any dynamic data.
2. A utility performs reusable actions such as login or checkout.
3. Test data supplies typed input values.
4. Mappings provide the selectors used to interact with the application.
5. Playwright assertions verify the page state, URL, or API response.

## Project Structure

```text
src/
├── config/       # Application routes and configuration
├── fixtures/     # Shared Playwright fixtures
├── mapping/      # Test selectors
├── models/       # TypeScript types
├── testData/     # Test input data
├── tests/        # Playwright test specifications
└── utils/        # Reusable test actions and helpers
```
