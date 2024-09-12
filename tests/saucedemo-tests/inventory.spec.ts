import { test, expect } from '@playwright/test';
import { Base } from '@pages/base';
import { LoginPage, InventoryPage } from '@pages/saucedemo';
import { Credential, Product } from '@constants/index';

test.describe('Sauce Demo Inventory Tests', () => {
  let base: Base;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
   
  test.beforeEach(async ({ page }) => {
    base = new Base(page);  
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await base.goTo('/');
    await loginPage.enterUsername(Credential.standardUsername);
    await loginPage.enterPassword(Credential.validPassword);
    await loginPage.submit();
  });

  test('can add an item to the cart then remove it from the cart', async ({ page }) => {
    expect(await inventoryPage.getPageSecondaryHeader()).toContain('Products');
    await inventoryPage.clickAddToCartButton(Product.sauceLabsBackpack);
    expect(await inventoryPage.getCartCount()).toHaveText('1');
    await inventoryPage.clickRemoveButton(Product.sauceLabsBackpack);
    expect(await inventoryPage.getCartCount()).not.toBe('1');
  });
});
