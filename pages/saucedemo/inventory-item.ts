import { Page } from 'playwright';
import { Base } from '@pages/base';

export class InventoryItemPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    inventoryItemName: 'data-test=inventory-item-name',
    addToCart: 'data-test=add-to-cart',
    shoppingCartLink: 'data-test=shopping-cart-link'
  };

  async getInventoryItemName() {
    return this.page.locator(this.selectors.inventoryItemName);
  }

  async clickAddToCartButton() {
    await this.waitForSelector(this.selectors.addToCart); 
    await this.click(this.selectors.addToCart);
  }

  async clickCart() {
    await this.click(this.selectors.shoppingCartLink);
  }
}

