import { test, expect } from '@playwright/test';

test('default serves Svelte', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('?web=next sets cookie and redirects to Next.js', async ({ page, context }) => {
  await page.goto('/dashboard?web=next');
  await expect(page).toHaveURL(/nextjs/);
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'web_stack')?.value).toBe('next');
});

test('?web=svelte sets cookie and stays Svelte', async ({ page, context }) => {
  await page.goto('/dashboard?web=svelte');
  await expect(page.locator('h1')).toContainText('Dashboard');
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'web_stack')?.value).toBe('svelte');
});

test('cookie=next redirects to Next.js', async ({ page, context }) => {
  await context.addCookies([{ name: 'web_stack', value: 'next', url: 'http://localhost:4321' }]);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/nextjs/);
});
