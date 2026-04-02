// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await expect(page).toHaveTitle(/TodoMVC/);
});

test('add a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const todoSection = page.getByPlaceholder("What needs to be done?")
  await todoSection.click();
  await todoSection.fill('Send birthday gift to Joana')
  await page.keyboard.press('Enter')

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Send birthday gift to Joana")).toBeVisible();
});
