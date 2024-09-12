# playwright-github-action
- Integrate Playwright tests with GitHub Actions workflows to easily run API and end-to-end tests across multiple browsers and platforms.
- Several useful commands to run locally:
  1) Runs the end-to-end tests: `npx playwright test`
  2) Starts the interactive UI mode: `npx playwright test --ui`
  3) Runs the tests only on Desktop Chrome: `npx playwright test --project=chromium`
  4) Runs the tests in a specific file: `npx playwright test example`
  5) Runs the tests in debug mode: `npx playwright test --debug`
  6) Auto generate tests with Codegen: `npx playwright codegen`
 
- On the [workflow details page](https://github.com/EmeraldCHEN/playwright-github-action/actions/workflows/playwright.yml?query=branch%3Amain+event%3Aworkflow_dispatch+actor%3AEmeraldCHEN), click the “Run workflow” button in the dialog box to start the workflow manually

📗 Here's <a href="https://github.com/EmeraldCHEN/playwright-github-action/blob/main/tests/saucedemo-tests" target="_blank">saucedemo-tests</a>, which tests login, checkout, etc.

```
npx playwright test tests/saucedemo-tests
```
<img src="https://seleniumbase.github.io/cdn/gif/fast_swag_2.gif" alt="Saucedemo Tests" title="Saucedemo Tests" width="520" />   