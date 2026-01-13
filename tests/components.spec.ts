import { test, expect } from '@playwright/test';

test.describe('my-select (Light DOM)', () => {
  test('renders async options and keeps selection', async ({ page }) => {
    await page.goto('/my-select.html');

    await page.waitForSelector('my-select.hydrated');
    const select = page.locator('my-select select');
    await expect(select).toBeVisible();

    // Wait for async options to load
    await expect(select.locator('option')).toHaveCount(3);
    await expect(select).toHaveValue('editor');
  });
});

test.describe('my-input (Light DOM)', () => {
  test('hydrates slotted input and keeps value', async ({ page }) => {
    await page.goto('/my-input.html');

    await page.waitForSelector('my-input.hydrated');
    const input = page.locator('my-input input');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue(/example.com/);
  });
});

test.describe('my-radio (Light DOM)', () => {
  test('renders radios and keeps checked state', async ({ page }) => {
    await page.goto('/my-radio.html');

    await page.waitForSelector('my-radio.hydrated');
    const radios = page.locator('my-radio input[type="radio"]');
    await expect(radios).toHaveCount(2);
    await expect(radios.nth(0)).toBeChecked();
    await expect(radios.nth(1)).not.toBeChecked();
  });
});

test.describe('my-checkbox (Light DOM)', () => {
  test('renders checkboxes and keeps checked state', async ({ page }) => {
    await page.goto('/my-checkbox.html');

    await page.waitForSelector('my-checkbox.hydrated');
    const checkboxes = page.locator('my-checkbox input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
  });
});
