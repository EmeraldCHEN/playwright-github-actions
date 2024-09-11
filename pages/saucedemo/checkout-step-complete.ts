import { Page } from 'playwright';

export class CheckoutCompletePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getSecondaryHeader() {
    return this.page.locator('data-test=secondary-header');
  }

  async getSuccessHeader() {
    return this.page.locator('data-test=complete-header');
  }
 
  async backHome() {
    await this.page.click('data-test=back-to-products');
  }
}

