/**
 * GCF (Graph Compact Format) — generic profile encoder/decoder.
 * Vendored from gcf-typescript for zero-dependency integration. Current with
 * GCF spec v3.2 (nested object flattening) + [N]: inline-array quoting fix.
 * https://github.com/blackwell-systems/gcf-typescript
 *
 * SPDX-License-Identifier: MIT
 */
export { encodeGeneric } from "./generic.ts";
export { decodeGeneric } from "./decode_generic.ts";
