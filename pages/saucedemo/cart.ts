import { Page } from 'playwright';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.click('data-test=checkout');
  }
}

