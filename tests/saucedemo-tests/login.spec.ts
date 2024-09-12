import { test, expect } from '@playwright/test';
import { Base } from '@pages/base';
import { LoginPage, InventoryPage } from '@pages/saucedemo';
import { Credential, Message } from '@constants/index';

test.describe('Sauce Demo Login Tests', () => {
  let base: Base;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Initialize common page objects in the beforeEach hook and make them available to each test
  test.beforeEach(async ({ page }) => {
    base = new Base(page);  
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await base.goTo('/'); // Navigate to the base URL before each test
  });

  test('should log in with valid credentials', async ({ page }) => {
    await loginPage.enterUsername(Credential.standardUsername);
    await loginPage.enterPassword(Credential.validPassword);
    await loginPage.submit();
    expect(await inventoryPage.getPageTitle()).toBe('Swag Labs');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await loginPage.enterUsername(Credential.invalidUsername);
    await loginPage.enterPassword(Credential.invalidPassword);
    await loginPage.submit();
    expect(await loginPage.getErrorMessage()).toContain(Message.loginErrorMessage);
  });
});
