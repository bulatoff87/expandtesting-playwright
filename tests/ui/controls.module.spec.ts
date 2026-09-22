import { expect, test } from '@playwright/test';

test.describe('UI control modules', () => {
  test.describe.configure({ timeout: 60_000 });

  test('@module web inputs display entered values', async ({ page }) => {
    await page.goto('/inputs');
    await page.getByLabel('Input: Number').fill('42');
    await page.getByLabel('Input: Text').fill('module test');
    await page.getByLabel('Input: Password').fill('public-fixture');
    await page.getByLabel('Input: Date').fill('2026-09-22');

    await page.getByRole('button', { name: 'Display Inputs' }).click();

    await expect(page.locator('#output-number')).toHaveText('42');
    await expect(page.locator('#output-text')).toHaveText('module test');
    await expect(page.locator('#output-password')).toHaveText('public-fixture');
    await expect(page.locator('#output-date')).toHaveText('2026-09-22');
  });

  test('@module web inputs can be cleared', async ({ page }) => {
    await page.goto('/inputs');
    const textInput = page.getByLabel('Input: Text');
    await textInput.fill('temporary value');

    await page.getByRole('button', { name: 'Clear Inputs' }).click();

    await expect(textInput).toHaveValue('');
  });

  test('@module checkboxes change independently', async ({ page }) => {
    await page.goto('/checkboxes');
    const first = page.getByRole('checkbox', { name: 'Checkbox 1' });
    const second = page.getByRole('checkbox', { name: 'Checkbox 2' });

    await first.check();
    await second.uncheck();

    await expect(first).toBeChecked();
    await expect(second).not.toBeChecked();
  });

  test('@module dropdown retains the selected option', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption({ index: 2 });

    await expect(dropdown).toHaveValue('2');
  });

  test('@module horizontal slider accepts an exact value', async ({ page }) => {
    await page.goto('/horizontal-slider');
    const slider = page.getByRole('slider');

    await slider.fill('3.5');

    await expect(slider).toHaveValue('3.5');
    await expect(page.locator('#range')).toHaveText('3.5');
  });
});
