import { Page } from 'playwright';
import { Base } from '@pages/base';

export class CheckoutCompletePage  extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    secondaryHeader: 'data-test=secondary-header',
    completeHeader: 'data-test=complete-header',
    backToProducts: 'data-test=back-to-products'
  };

  async getSecondaryHeader() {
    return this.page.locator(this.selectors.secondaryHeader);
  }

  async getSuccessHeader() {
    return this.page.locator(this.selectors.completeHeader);
  }
 
  async backHome() {
    await this.page.click(this.selectors.backToProducts);
  }
}

