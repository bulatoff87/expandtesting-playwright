import { expect, test } from '@playwright/test';
import { uiModules } from '../../src/routes';

test.describe('All published UI modules', () => {
  for (const route of uiModules) {
    test(`@smoke ${route}`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response, `No navigation response for ${route}`).not.toBeNull();
      expect(response!.status(), `${route} returned ${response!.status()}`).toBeLessThan(500);
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }
});
