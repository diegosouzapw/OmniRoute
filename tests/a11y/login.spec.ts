import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('login has no a11y violations', async ({ page }) => {
  await page.goto('/login');
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.filter((v: any) => v.impact === 'critical' || v.impact === 'serious')).toEqual([]);
});
