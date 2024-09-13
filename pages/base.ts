import { Page } from 'playwright';

// Base class provides common methods that can be reused across different pages or feature classes
export class Base {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }
  
  async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }
  
  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async getTextContent(selector: string) {
    return await this.page.textContent(selector);
  }

  async waitForLoadState() {
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }
}
