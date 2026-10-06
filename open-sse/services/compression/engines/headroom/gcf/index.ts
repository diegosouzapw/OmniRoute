/**
 * GCF (Graph Compact Format) — generic profile encoder/decoder.
 * Vendored from gcf-typescript for zero-dependency integration. Current with
 * GCF spec v3.2 (nested object flattening) + [N]: inline-array quoting fix + int64/2^53
 * numeric-domain rendering (SPEC 2.3.1) + root-array surplus count check (SPEC 13).
 * https://github.com/blackwell-systems/gcf-typescript
 *
 * SPDX-License-Identifier: MIT
 */
export { encodeGeneric } from "./generic.ts";
export { decodeGeneric } from "./decode_generic.ts";
