import { test, expect } from '@playwright/test';
import { Url } from '@constants/index';
test.describe('Pet Store API and UI Tests', () => {
  let orderId: number = 1;
  test('should fetch order data by ID from API', async ({ request }) => {
    const response = await request.get(`${Url.petstoreBaseURL}/v2/store/order/${orderId}`); // Fetch pet with ID 1
    expect(response.status()).toBe(200);
    const order = await response.json();
    expect(order).toHaveProperty('id', orderId);
    expect(order).toHaveProperty('petId');
    expect(order).toHaveProperty('quantity');
    expect(order).toHaveProperty('shipDate');
    expect(order).toHaveProperty('status', 'placed');
    expect(order).toHaveProperty('complete', true);
  });
  test('should verify the UI displays order information', async ({ page }) => {
    await page.locator('.opblock-summary-path').click();
    // await page.getByRole('button', { name: 'Try it out' }).click();
    // await page.getByPlaceholder('orderId').click();
    // await page.getByPlaceholder('orderId').fill('1');
    // await page.getByRole('button', { name: 'Execute' }).click();

    // // Verify the response status and content
    // const responseContent = page.locator('.responses-wrapper .response-content');
    // await expect(responseContent).toContainText('id');
    // await expect(responseContent).toContainText('name');
  });
})










