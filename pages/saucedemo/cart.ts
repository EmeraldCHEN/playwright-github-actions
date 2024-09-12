import { Page } from 'playwright';
import { Base } from '@pages/base';

export class CartPage  extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    checkoutButton: 'data-test=checkout'
  };

  async checkout() {
    await this.page.click(this.selectors.checkoutButton);
  }
}

