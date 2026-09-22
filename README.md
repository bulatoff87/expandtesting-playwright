# Expand Testing Playwright

Playwright + TypeScript test framework for `https://practice.expandtesting.com`.
It keeps API and UI execution independent and provides two tiers for each:
fast `@smoke` checks and the full `@regression` suite.

## Run

```bash
npm ci
npx playwright install chromium
npm run test:api:smoke
npm run test:api:regression
npm run test:ui:smoke
npm run test:ui:regression
```

Use two Warp windows to run API and UI concurrently:

```bash
# Warp window 1
npm run test:api

# Warp window 2
npm run test:ui
```

The commands write to separate artifact directories, so both Warp processes are safe to run in parallel.

## Coverage model

- `tests/api`: Practice API and Notes API contract, positive, and negative checks.
- `tests/ui/all-modules.smoke.spec.ts`: route-level health coverage for every published module.
- `tests/ui/*regression.spec.ts`: behavioral coverage for forms and browser interactions.
- `.github/workflows/playwright.yml`: four independent CI jobs through a matrix.

The public practice site changes often. A non-breaking route smoke test accepts 2xx/3xx/4xx
responses but fails server errors; behavioral tests assert the stable user-visible contract.
