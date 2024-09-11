import { Page } from 'playwright';

export class CheckoutStepTwoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getInventoryItemName() {
    return await this.page.locator('data-test=inventory-item-name');
  }
 
  async finish() {
    await this.page.click('data-test=finish');
  }
}

