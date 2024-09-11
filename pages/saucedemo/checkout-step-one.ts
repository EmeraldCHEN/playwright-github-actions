import { Page } from 'playwright';

export class CheckoutStepOnePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkoutStepOne(firstName: string, lastName: string, zip: string) {
    await this.page.fill('data-test=firstName', firstName);
    await this.page.fill('data-test=lastName', lastName);
    await this.page.fill('data-test=postalCode', zip);
    await this.page.click('data-test=continue');
  }
}

