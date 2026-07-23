import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Descobre as rotas estáticas do dashboard a partir do próprio repo:
// cada page.tsx sob src/app/(dashboard)/dashboard vira uma rota; grupos (x) somem
// do path e rotas dinâmicas [param] são puladas (sem dado real garantido).
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const BASE = path.join(ROOT, "src", "app", "(dashboard)", "dashboard");

function discoverRoutes(dir: string, prefix = "/dashboard"): string[] {
  const routes: string[] = [];
  if (fs.existsSync(path.join(dir, "page.tsx"))) routes.push(prefix || "/");
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("[") || e.name.startsWith("_")) continue;
    const seg = e.name.startsWith("(") ? "" : `/${e.name}`;
    routes.push(...discoverRoutes(path.join(dir, e.name), `${prefix}${seg}`));
  }
  return [...new Set(routes)];
}

for (const route of discoverRoutes(BASE)) {
  test(`rota ${route} carrega sem crash`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    const res = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(res!.status(), `HTTP em ${route}`).toBeLessThan(400);
    // "networkidle" nunca assenta em telas com polling/websocket ao vivo (30s x 98 rotas
    // estourava o run inteiro) — "load" + um settle curto e suficiente para hidratar e
    // deixar um crash de client component (pageerror / error boundary) aparecer.
    await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => {});
    await page.waitForTimeout(1_500);

    // Error boundary do Next: nunca pode aparecer
    await expect(page.locator("text=Application error")).toHaveCount(0);
    expect(pageErrors, `pageerror em ${route}: ${pageErrors.join(" | ")}`).toHaveLength(0);
  });
}
