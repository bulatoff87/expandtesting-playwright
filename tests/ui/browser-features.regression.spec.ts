import { expect, test } from '@playwright/test';

test.describe('Browser features', () => {
  test('@regression JavaScript alert', async ({ page }) => {
    await page.goto('/js-dialogs');
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /alert/i }).first().click();
    await expect(page.locator('#dialog-response')).toHaveText('OK');
  });

  test('@regression new window', async ({ page, context }) => {
    await page.goto('/windows');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: /click here/i }).click(),
    ]);
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.locator('body')).toBeVisible();
  });

  test('@regression horizontal slider', async ({ page }) => {
    await page.goto('/horizontal-slider');
    const slider = page.locator('input[type=range]');
    await slider.fill('3.5');
    await expect(slider).toHaveValue('3.5');
  });

  test('@regression sortable table has expected fixture', async ({ page }) => {
    await page.goto('/tables');
    await expect(page.getByRole('table').first()).toContainText('jsmith@gmail.com');
    await expect(page.getByRole('table').first().locator('tbody tr')).toHaveCount(4);
  });
});
