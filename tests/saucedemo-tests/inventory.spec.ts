import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saucedemo/login';
import { InventoryPage } from '@pages/saucedemo/inventory';

test.describe('Sauce Demo Inventory Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.submit();
  });

  test('can add an item to the cart then remove it from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    expect(await inventoryPage.getInventoryList()).toBeVisible();
    await inventoryPage.clickAddToCartButton('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe('1');
    await inventoryPage.clickRemoveButton('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).not.toBe('1');
  });
});
