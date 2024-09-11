import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saucedemo/login';
import { InventoryPage } from '@pages/saucedemo/inventory';
import { InventoryItemPage } from '@pages/saucedemo/inventory-item';
import { CartPage } from '@pages/saucedemo/cart';
import { CheckoutStepOnePage } from '@pages/saucedemo/checkout-step-one';
import { CheckoutStepTwoPage } from '@pages/saucedemo/checkout-step-two';
import { CheckoutCompletePage } from '@pages/saucedemo/checkout-step-complete';

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
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await inventoryPage.addToCart('Sauce Labs Bike Light');
    expect(await inventoryItemPage.getInventoryItemName()).toContainText('Sauce Labs Bike Light');
    await inventoryItemPage.clickAddToCartButton();
    await inventoryItemPage.clickCart();
    await cartPage.checkout();
    await checkoutStepOnePage.checkoutStepOne('Abc', 'Efg', '6066');
    expect(await checkoutStepTwoPage.getInventoryItemName()).toContainText('Sauce Labs Bike Light');
    await checkoutStepTwoPage.finish();
    expect(await checkoutCompletePage.getSecondaryHeader()).toContainText('Complete');
    expect(await checkoutCompletePage.getSuccessHeader()).toContainText('Thank you for your order');
    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/.*inventory/);
  });
});
