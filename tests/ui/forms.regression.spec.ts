import { expect, test } from '@playwright/test';

test.describe('Forms and controls', () => {
  test('@regression login success and logout', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/secure/);
    await expect(page.getByText(/logged into a secure area/i)).toBeVisible();
  });

  test('@regression login error', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill('wrong-user');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(/username is invalid/i)).toBeVisible();
  });

  test('@regression add and remove element', async ({ page }) => {
    await page.goto('/add-remove-elements');
    await page.getByRole('button', { name: /add element/i }).click();
    const remove = page.getByRole('button', { name: /delete/i });
    await expect(remove).toHaveCount(1);
    await remove.click();
    await expect(remove).toHaveCount(0);
  });

  test('@regression checkbox toggles', async ({ page }) => {
    await page.goto('/checkboxes');
    const boxes = page.locator('input[type=checkbox]');
    await boxes.first().check();
    await expect(boxes.first()).toBeChecked();
    await boxes.last().uncheck();
    await expect(boxes.last()).not.toBeChecked();
  });

  test('@regression dropdown selection', async ({ page }) => {
    await page.goto('/dropdown');
    const select = page.locator('#dropdown');
    await select.selectOption({ index: 1 });
    await expect(select).not.toHaveValue('');
  });
});
