## DOCS-XSS-TRAVERSAL - Stored XSS and Path Traversal in Documentation Rendering
**Date:** 2026-06-28
**Vulnerability:** Stored XSS via `dangerouslySetInnerHTML` with unsanitized markdown output and potential Path Traversal in the i18n documentation fallback logic.
**Learning:** Server-side rendering of user-provided (or contributor-provided) markdown in Next.js requires explicit sanitization when using `dangerouslySetInnerHTML`. Standard library `dompurify` requires a DOM environment (provided by `jsdom`) to run on the server. Path traversal checks must combine regex validation of input segments with absolute path resolution (`path.resolve`) and a prefix check (`startsWith`) for robust defense.
**Prevention:** Always sanitize HTML rendered from markdown on the server. Use a centralized sanitizer utility. Validate all file-system related input parameters against a strict allowlist (e.g., `/^[a-z0-9-]+$/i`).
