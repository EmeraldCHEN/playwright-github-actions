import { Page } from 'playwright';
import { Base } from '@pages/base';
import { Product } from '@constants/products';

export class InventoryPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    secondaryHeader: 'data-test=secondary-header',
    addToCartSauceLabsBackpack: 'data-test=add-to-cart-sauce-labs-backpack',
    shoppingCartBadge: 'data-test=shopping-cart-badge',
    removeSauceLabsBackpack: 'data-test=remove-sauce-labs-backpack',
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageSecondaryHeader() {
    return await this.getTextContent(this.selectors.secondaryHeader); 
  }

  async addToCart(itemName: string) {
    await this.click(`text=${itemName}`);
  }

  async clickAddToCartButton(itemName: string) {
    await this.page.waitForLoadState('domcontentloaded')
    if(itemName == Product.sauceLabsBackpack) {
      await this.waitForSelector(this.selectors.addToCartSauceLabsBackpack);
      await this.click(this.selectors.addToCartSauceLabsBackpack);
    }
  }

  async clickRemoveButton(itemName: string) {
    if(itemName == Product.sauceLabsBackpack) {
      await this.waitForSelector(this.selectors.removeSauceLabsBackpack);
      await this.click(this.selectors.removeSauceLabsBackpack);
    }   
  }

  async getCartCount() {
    return this.page.locator(this.selectors.shoppingCartBadge); // returns a Locator not a Promise. so 'await' has no effect on the type of this expression
  }
}
