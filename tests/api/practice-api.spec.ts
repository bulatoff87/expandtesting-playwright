import { expect, test } from '@playwright/test';

test.describe('Practice API', () => {
  test('@smoke health check', async ({ request }) => {
    const response = await request.get('/api/health-check');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
  });

  const getCases = [
    ['random color', '/api/random-color'],
    ['random number', '/api/random-number'],
    ['server time', '/api/time'],
    ['cars', '/api/cars'],
    ['public IP', '/api/myip'],
    ['city by coordinates', '/api/get-city?lat=48.8566&lon=2.3522'],
    ['location details', '/api/location-details?latitude=51.5074&longitude=-0.1278'],
    ['addition', '/api/add?a=7&b=5'],
    ['currency conversion', '/api/currency-convert?from=USD&to=EUR&amount=10'],
    ['phone code', '/api/phone-code/US'],
  ] as const;

  for (const [name, url] of getCases) {
    test(`@regression ${name}`, async ({ request }) => {
      const response = await request.get(url);
      expect(response.status(), await response.text()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
    });
  }

  test('@regression echo returns submitted name', async ({ request }) => {
    const response = await request.post('/api/echo', { data: { name: 'playwright-contract-check' } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ message: 'Hi playwright-contract-check' });
  });

  test('@regression invalid math request is rejected', async ({ request }) => {
    const response = await request.get('/api/add?a=abc&b=5');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
