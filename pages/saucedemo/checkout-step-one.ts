import { Page } from 'playwright';
import { Base } from '@pages/base';

export class CheckoutStepOnePage extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    firstnameInput: 'data-test=firstName',
    lastnameInput: 'data-test=lastName',
    postalCodeInput: 'data-test=postalCode',
    continueButton: 'data-test=continue'
  };

  async checkoutStepOne(firstName: string, lastName: string, zip: string) {
    await this.page.fill(this.selectors.firstnameInput, firstName);
    await this.page.fill(this.selectors.lastnameInput, lastName);
    await this.page.fill(this.selectors.postalCodeInput, zip);
    await this.page.click(this.selectors.continueButton);
  }
}

