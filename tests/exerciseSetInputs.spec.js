import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/contact_us');
  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.isVisible()) {
    await consent.click();
  }
});

test('Upload a file', async ({ page }) => {
  await page.goto('https://automationexercise.com/contact_us');

  await page.getByPlaceholder('Name').fill('Jay');
  await page.locator('input[name="email"]').fill('example@example.com');
  await page.getByPlaceholder('Subject').fill('This is a test to automate an upload');
  await page.locator('textarea').fill('I am just checking how to automate a file upload and button clicks');

  const filePath = path.join(__dirname, '../fixtures/test.txt');
  await page.locator('input[type="file"]').setInputFiles(filePath);
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
});