import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saucedemo/login';
import { InventoryPage } from '@pages/saucedemo/inventory';
import { InventoryItemPage } from '@pages/saucedemo/inventory-item';
import { CartPage } from '@pages/saucedemo/cart';

test.describe('Sauce Demo Inventory Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.submit();
  });

  test('can add an item to the cart then check out', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const inventoryItemPage = new InventoryItemPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('Sauce Labs Bike Light');
    expect(await inventoryItemPage.getInventoryItemName()).toContainText('Sauce Labs Bike Light');
    await inventoryItemPage.clickAddToCartButton();
    await inventoryItemPage.clickCart();
    await cartPage.checkout();
  });
});
