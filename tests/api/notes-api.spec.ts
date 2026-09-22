import { expect, test } from '@playwright/test';

const api = '/notes/api';

test.describe('Notes API public contract', () => {
  test('@smoke health endpoint', async ({ request }) => {
    const response = await request.get(`${api}/health-check`);
    expect(response.ok()).toBeTruthy();
  });

  test('@regression login validates missing credentials', async ({ request }) => {
    const response = await request.post(`${api}/users/login`, { data: {} });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('@regression notes reject anonymous access', async ({ request }) => {
    const response = await request.get(`${api}/notes`);
    expect([401, 403]).toContain(response.status());
  });
});
