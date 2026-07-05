import { test, expect } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Welcome to OmniRoute v4');
});

test('login page renders', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});

test('dashboard home renders', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('providers page renders', async ({ page }) => {
  await page.goto('/dashboard/providers');
  await expect(page.locator('h2').first()).toContainText('Providers');
});

test('usage page renders', async ({ page }) => {
  await page.goto('/dashboard/usage');
  await expect(page.locator('h2').first()).toContainText('Usage');
});

test('health page renders with SSE', async ({ page }) => {
  await page.goto('/dashboard/health');
  await expect(page.locator('h2').first()).toContainText('Health');
  await expect(page.getByText('Disconnected')).toBeVisible();
});

test('settings page renders', async ({ page }) => {
  await page.goto('/dashboard/settings/general');
  await expect(page.locator('h2').first()).toContainText('General settings');
});
