import { Page } from 'playwright';
import { Base } from '@pages/base';

export class HomePage  extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    findPurchaseOrderById: 'Find purchase order by ID',
  };

  async findOrderById() {
    await this.page.getByRole('button', { name: this.selectors.findPurchaseOrderById }).click();
  }
}

