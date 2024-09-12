import { Page } from 'playwright';
import { Base } from '@pages/base';

export class CheckoutStepTwoPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    inventoryItemName: 'data-test=inventory-item-name',
    finishButton: 'data-test=finish'
  };

  async getInventoryItemName() {
    return this.page.locator(this.selectors.inventoryItemName);
  }
 
  async finish() {
    await this.page.click(this.selectors.finishButton);
  }
}

