import { Page } from 'playwright';

export class InventoryItemPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getInventoryItemName() {
    return await this.page.locator('data-test=inventory-item-name');
  }

  async clickAddToCartButton() {
    await this.page.waitForSelector('data-test=add-to-cart'); 
    await this.page.click('data-test=add-to-cart');
  }

  async clickCart() {
    await this.page.click('data-test=shopping-cart-link');
  }
}

