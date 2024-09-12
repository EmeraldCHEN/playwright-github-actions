import { test, expect } from '@playwright/test';
import { Base } from '@pages/base';
import { LoginPage, InventoryPage, InventoryItemPage, CartPage, CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } from '@pages/saucedemo';
import { Credential, Product, Message } from '@constants/index';

test.describe('Sauce Demo Inventory Tests', () => {
  let base: Base;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let inventoryItemPage: InventoryItemPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    base = new Base(page);
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    inventoryItemPage = new InventoryItemPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await base.goTo('/');
    await loginPage.enterUsername(Credential.standardUsername);
    await loginPage.enterPassword(Credential.validPassword);
    await loginPage.submit();
  });

  test('can add an item to the cart then check out', async ({ page }) => {
    await inventoryPage.addToCart(Product.sauceLabsBikeLight);
    expect(await inventoryItemPage.getInventoryItemName()).toContainText(Product.sauceLabsBikeLight);
    await inventoryItemPage.clickAddToCartButton();
    await inventoryItemPage.clickCart();
    await cartPage.checkout();
    await checkoutStepOnePage.checkoutStepOne('Abc', 'Efg', '6066');
    expect(await checkoutStepTwoPage.getInventoryItemName()).toContainText(Product.sauceLabsBikeLight);
    await checkoutStepTwoPage.finish();
    expect(await checkoutCompletePage.getSecondaryHeader()).toContainText('Complete');
    expect(await checkoutCompletePage.getSuccessHeader()).toContainText(Message.orderSuccessMessage);
    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/.*inventory/);
  });
});
