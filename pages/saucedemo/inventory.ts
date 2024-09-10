import { Page } from 'playwright';

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getInventoryList() {
    return await this.page.getByTestId('data-test=inventory-list');
  }

  async addToCart(itemName: string) {
    await this.page.click(`text=${itemName}`);
  }

  async clickAddToCartButton(itemName: string) {
    await this.page.waitForLoadState('domcontentloaded')
    if(itemName == 'Sauce Labs Backpack') {
      await this.page.waitForSelector('data-test=add-to-cart-sauce-labs-backpack');
      await this.page.click('data-test=add-to-cart-sauce-labs-backpack');
    }
  }

  async clickRemoveButton(itemName: string) {
    if(itemName == 'Sauce Labs Backpack') {
      await this.page.click('data-test=remove-sauce-labs-backpack');
    }   
  }

  async getCartCount() {
    return await this.page.textContent('data-test=shopping-cart-badge');
  }
}
