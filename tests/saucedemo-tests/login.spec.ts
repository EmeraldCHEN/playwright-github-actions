import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saucedemo/login';
import { InventoryPage } from '@pages/saucedemo/inventory';

test.describe('Sauce Demo Login Tests', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goTo();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.submit();
    expect(await inventoryPage.getPageTitle()).toBe('Swag Labs');
  });

  test.only('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.enterUsername('invalid_user');
    await loginPage.enterPassword('invalid_password');
    await loginPage.submit();
    expect(await loginPage.getErrorMessage()).toContain('Username and password do not match any user in this service');
  });
});
