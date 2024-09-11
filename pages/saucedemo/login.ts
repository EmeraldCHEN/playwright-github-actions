import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('/');
  }

  async enterUsername(username: string) {
    await this.page.fill('#user-name', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('#password', password);
  }

  async submit() {
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    return await this.page.textContent('.error-message-container');
  }
}
