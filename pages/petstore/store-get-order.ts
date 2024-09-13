import { Page } from 'playwright';
import { Base } from '@pages/base';

export class StoreGetOrderPage  extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    buttonTryItOut: 'Try it out',
    orderId: 'orderId',
    responseDescription: '.response-col_description',
    responseBody: 'tbody .response-col_description'
  };

  async tryItOut() {
    await this.page.getByRole('button', { name: this.selectors.buttonTryItOut }).click();
  }

  async enterOrderId(id: string) {
    await this.page.getByPlaceholder(this.selectors.orderId).fill(id);
  }

  async waitForElementVisible(){
    await this.page.waitForSelector(this.selectors.responseDescription);
    await this.waitForLoadState();
  }

  async getResponse() {
    return this.page.locator('.response .response-col_status').first();
  }

  async getResponseContent() {
    await this.getTextContent(this.selectors.responseBody);
  }
}