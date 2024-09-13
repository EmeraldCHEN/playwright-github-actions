import { test, expect } from '@playwright/test';
import { Url, Response } from '@constants/index';
import { Base } from '@pages/base';
import { HomePage, StoreGetOrderPage } from '@pages/petstore';

test.describe('Pet Store API and UI Tests', () => {
  let orderIdGreaterThanOne: number = 8;
  let orderIdLessThanOne: number = 0;
  let base: Base;
  let homePage: HomePage;
  let storeGetOrderPage: StoreGetOrderPage;

  test('should fetch order data by ID with value greater than 1 from API', async ({ request }) => {
    const response = await request.get(`${Url.petstoreBaseURL}/v2/store/order/${orderIdGreaterThanOne}`); // Fetch pet with order ID 
    expect(response.status()).toBe(200);orderIdGreaterThanOne
    const orderResponseBody = await response.json();
    // Define expected properties and their values
    const expectedProperties = [
      { key: 'id', value: orderIdGreaterThanOne },
      { key: 'petId', value: 3 }, 
      { key: 'quantity', value: 2 },
      { key: Response.body.keyShipDate, value: '2024-09-13T00:00:35.058+0000'},
      { key: 'status', value: Response.body.valuePlaced },
      { key: 'complete',  condition: (value: Boolean) => typeof value === 'boolean' }
    ];
    // Check each expected property
    expectedProperties.forEach(({ key, value, condition }) => {
      if (condition) {
        expect(condition(orderResponseBody[key])).toBe(true);
      } else {
        expect(orderResponseBody).toHaveProperty(key, value);
      }
    });
  });

  test('should not fetch order data by ID with value less than 1 from API', async ({ request }) => {
    const response = await request.get(`${Url.petstoreBaseURL}/v2/store/order/${orderIdLessThanOne}`); // Fetch pet with order ID 
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('type', 'error');
    expect(responseBody).toHaveProperty('message', 'Order not found');
  });

  test('should verify the UI displays order information', async ({ page }) => {
    base = new Base(page);
    homePage = new HomePage(page);
    storeGetOrderPage = new StoreGetOrderPage(page);

    await base.goTo(Url.petstoreBaseURL);
    await homePage.findOrderById();
    await storeGetOrderPage.tryItOut();
    await storeGetOrderPage.enterOrderId(orderIdGreaterThanOne.toString());
    await page.getByRole('button', { name: 'Execute' }).click();
    await storeGetOrderPage.waitForElementVisible();
    
    // Verify the response status and content
    await expect(await storeGetOrderPage.getResponse()).toContainText('200'); 
    expect(await storeGetOrderPage.getResponseContent()).toContain(orderIdGreaterThanOne.toString());
    expect(await storeGetOrderPage.getTextContent('tbody .response-col_description')).toContain(Response.body.keyShipDate);
    expect(await storeGetOrderPage.getTextContent('tbody .response-col_description')).toContain(Response.body.valuePlaced); 
  });
})

