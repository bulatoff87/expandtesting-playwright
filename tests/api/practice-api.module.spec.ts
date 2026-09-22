import { expect, test } from '@playwright/test';

const publicApiTimeout = 30_000;

test.describe('Practice API modules', () => {
  test('@module addition returns the calculated result', async ({ request }) => {
    const response = await request.get('/api/add?a=7&b=5', { timeout: publicApiTimeout });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({ result: 12 });
  });

  test('@module echo preserves submitted input', async ({ request }) => {
    const response = await request.post('/api/echo', {
      data: { name: 'module-check' },
      timeout: publicApiTimeout,
    });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({ message: 'Hi module-check' });
  });

  test('@module random color returns a hexadecimal value', async ({ request }) => {
    const response = await request.get('/api/random-color', { timeout: publicApiTimeout });
    const body = (await response.json()) as { color: string };

    expect(response.status()).toBe(200);
    expect(body.color).toMatch(/^#[0-9a-f]{1,6}$/i);
  });

  test('@module random number returns a finite number', async ({ request }) => {
    const response = await request.get('/api/random-number', { timeout: publicApiTimeout });
    const body = (await response.json()) as { number: number };

    expect(response.status()).toBe(200);
    expect(Number.isFinite(body.number)).toBeTruthy();
  });

  test('@module server time is a valid ISO timestamp', async ({ request }) => {
    const response = await request.get('/api/time', { timeout: publicApiTimeout });
    const body = (await response.json()) as { time: string };

    expect(response.status()).toBe(200);
    expect(body.time).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(Number.isNaN(Date.parse(body.time))).toBeFalsy();
  });

  test('@module phone code resolves a known country', async ({ request }) => {
    const response = await request.get('/api/phone-code/US', { timeout: publicApiTimeout });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      status: 'success',
      countryCode: 'US',
      phoneCode: '+1',
    });
  });
});
