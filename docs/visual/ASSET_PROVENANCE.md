# Asset Provenance

> **Last updated**: 2026-07-09
> **Purpose**: Track origin, license, and usage rights for all visual and binary assets

## Asset Inventory

### Icons

| Icon Set | Source | License | Location |
|----------|--------|---------|----------|
| lucide-react | npm | ISC | `node_modules/lucide-react` |
| (custom SVGs) | — | Internal | `src/assets/icons/` |

### Images & Graphics

| Asset | Source | License | Notes |
|-------|--------|---------|-------|
| Logo | Internal design | Proprietary | `src/assets/logo/` |
| Favicon | Derived from logo | Proprietary | `public/favicon.ico` |
| OG image | Internal design | Proprietary | `public/og-image.png` |
| Screenshots | Internal | Proprietary | `docs/screenshots/` |

### Fonts

| Font Family | Source | License | Weight Used |
|-------------|--------|---------|-------------|
| Inter | Google Fonts / npm (`@fontsource/inter`) | SIL OFL 1.1 | 400, 500, 600, 700 |
| JetBrains Mono | npm (`@fontsource/jetbrains-mono`) | SIL OFL 1.1 | 400 (code blocks) |

### Brand Colors

| Color | Usage | Hex | Origin |
|-------|-------|-----|--------|
| Brand primary | Headers, CTAs, active states | `#6366f1` (Indigo-500) | Tailwind default palette |
| Brand accent | Highlights, badges | `#06b6d4` (Cyan-500) | Tailwind default palette |
| Background | Page bg | `#0f172a` (Slate-900) | Tailwind default palette |

See `src/theme/tokens.css` for the complete token set.

## Third-Party Dependency Licenses

For npm dependencies, the SBOM workflow generates a CycloneDX SBOM on every release:

```bash
# Generate SBOM
npx @cyclonedx/cyclonedx-npm --output-format json --output-file sbom.json

# Check licenses
npx license-checker --summary
```

## Adding a New Asset

1. **Add the file** to the appropriate directory under `src/assets/`
2. **Update this document** with source, license, and usage
3. **For external assets**: verify license compatibility with MIT + Apache 2.0
4. **For proprietary assets**: ensure internal design review approval
5. **Run visual regression**: `npx playwright test --config=tests/visual/playwright.config.ts`

## Prohibited Assets

The following are NOT permitted:
- Assets with unknown provenance
- Assets under copyleft licenses (GPL, AGPL) unless explicitly vetted
- AI-generated assets without clear usage rights documentation
- Assets requiring attribution without the attribution being published

## Related Documents

- `src/theme/tokens.css` — Design token definitions
- `docs/visual/typography.md` — Typography system
- `docs/visual/motion.md` — Motion and animation guidelines
- `.github/workflows/sbom.yml` — SBOM generation workflow
- `LICENSE` + `LICENSE-APACHE` + `LICENSE-MIT` — Project licenses
