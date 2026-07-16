import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE } from "./playwright.config";

// Locators confirmados em src/app/login/page.tsx: <Input type="password"> dentro de um
// <form onSubmit={handleLogin}> com <Button type="submit">{t("continue")}</Button>.
setup("autentica e salva storageState", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[type="password"]').fill(process.env.HOMOLOG_ADMIN_PASSWORD!);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/dashboard/);
  await expect(page).toHaveURL(/dashboard/);
  await page.context().storageState({ path: STORAGE_STATE });
});
