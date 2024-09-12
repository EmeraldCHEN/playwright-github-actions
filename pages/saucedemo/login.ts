import { Page } from 'playwright';
import { Base } from '@pages/base';

// LoginPage cleass extends Base to add login-specific functionality, making it easy to perform and manage login actions in tests
export class LoginPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
    errorMessage: '.error-message-container',
  };

  async enterUsername(username: string) {
    await this.fill(this.selectors.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.selectors.passwordInput, password);
  }

  async submit() {
    await this.click(this.selectors.loginButton);
  }

  async getErrorMessage() {
    return await this.getTextContent(this.selectors.errorMessage);
  }
}
