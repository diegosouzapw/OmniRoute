# Third-Party Notices

## wreq-js 3.2.0 native transport

OmniRoute ships `wreq-js@3.2.0` and its platform-specific native bindings for browser-
fingerprinted HTTP transport. The npm package and all nine binding tarballs are tied by npm SLSA
attestations to signed tag `v3.2.0` and immutable source commit
[`0d52d5fa252841aeef34d4d063b1766a59612bf7`](https://github.com/sqdshguy/wreq-js/commit/0d52d5fa252841aeef34d4d063b1766a59612bf7).

- Root tarball:
  <https://registry.npmjs.org/wreq-js/-/wreq-js-3.2.0.tgz>
- npm integrity:
  `sha512-dawhEbhvd5hxivKZSvv/mAQGO3mwZYESyctOvIIZ/H3DvQJzUM2UoFQsij0fg7hIClQ/GEQgg+2259UcFwhpMQ==`
- Exact platform, integrity, size, and SHA-256 receipts for all nine native addons:
  [`config/release/wreq-js-native-manifest.json`](config/release/wreq-js-native-manifest.json)
- Locked per-target Cargo closure, with runtime and compile-only packages kept separate:
  [`config/release/wreq-js-rust-license-inventory.json`](config/release/wreq-js-rust-license-inventory.json)
- Deduplicated license texts and attribution notices for the conservative native runtime closure,
  including patched BoringSSL, Unicode ICU4X components, and Mozilla root-certificate data:
  [`config/release/wreq-js-rust-notices.md`](config/release/wreq-js-rust-notices.md)

The native tarballs themselves contain no LICENSE/NOTICE file. The bundled inventory is therefore
shipped beside them. It intentionally over-approximates the locked link-eligible Cargo closure;
exact post-LTO membership cannot be claimed without an upstream artifact SBOM/link map or a
reproducible-build receipt. The Android addon also dynamically requires `libc++_shared.so`, which
is not included in its npm tarball; any artifact that supplies that library needs its separate
LLVM/Apache-with-LLVM-exception notice.

MIT License

Copyright (c) 2025 will-work-for-meal
Copyright (c) 2025 Oleksandr Herasymov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## codex-chatgpt-web

Parts of `open-sse/vendor/codex-chatgpt-web/` are adapted from
[`miuuyy/codex-chatgpt-web`](https://github.com/miuuyy/codex-chatgpt-web), v4.0.7 commit
`b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494`.

MIT License

Copyright (c) 2026 codex-chatgpt-web contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## blackwell-systems/gcf-typescript

The generic-profile codec in
`open-sse/services/compression/engines/headroom/gcf/{decode_generic,generic,index,scalar}.ts`
is adapted from
[`blackwell-systems/gcf-typescript`](https://github.com/blackwell-systems/gcf-typescript/tree/00972f2dc781477eb6d369e62edfe03ad4112a07),
commit `00972f2dc781477eb6d369e62edfe03ad4112a07`. The license below is reproduced
from that commit's
[`LICENSE`](https://github.com/blackwell-systems/gcf-typescript/blob/00972f2dc781477eb6d369e62edfe03ad4112a07/LICENSE).

MIT License

Copyright (c) 2026 Dayna Blackwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## lipis/flag-icons

The country flag SVGs in `docs/assets/flags/` are copied from the `flags/4x3/` directory of
[`lipis/flag-icons`](https://github.com/lipis/flag-icons/tree/086f7e97d657358203916dbe84f61c2bccaa81eb),
commit `086f7e97d657358203916dbe84f61c2bccaa81eb`. The license below is reproduced
from that commit's
[`LICENSE`](https://github.com/lipis/flag-icons/blob/086f7e97d657358203916dbe84f61c2bccaa81eb/LICENSE).

The MIT License (MIT)

Copyright (c) 2013 Panayiotis Lipiridis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## LobeHub provider asset derivatives

Six local provider SVGs contain geometry derived from fixed components in
`@lobehub/icons@5.10.0`. The source package is pinned as follows:

- Tarball:
  <https://registry.npmjs.org/@lobehub/icons/-/icons-5.10.0.tgz>
- npm shasum: `add1baced073a60157d39c7820b8d5c1928a1054`
- npm integrity:
  `sha512-CIpjkISCLRK7haDtSugGFd0o3odaJts8ewJOkUiEFtns3xvsqbl8i24eowBnjw+yMDQVQyNONlhqTD58YC6Ljg==`
- License file in the fixed tarball: `package/LICENSE`

| Local derivative                | Fixed tarball source                      |
| ------------------------------- | ----------------------------------------- |
| `public/providers/360ai.svg`    | `package/es/Ai360/components/Color.js`    |
| `public/providers/baichuan.svg` | `package/es/Baichuan/components/Color.js` |
| `public/providers/codex.svg`    | `package/es/Codex/components/Color.js`    |
| `public/providers/copilot.svg`  | `package/es/Copilot/components/Color.js`  |
| `public/providers/openclaw.svg` | `package/es/OpenClaw/components/Color.js` |
| `public/providers/stepfun.svg`  | `package/es/Stepfun/components/Color.js`  |

The fixed tarball contains this license notice:

MIT License

Copyright (c) 2023 LobeHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

This package notice applies to the derived SVG geometry identified above. It does not grant rights
in any underlying brand name, logo, or trademark.

## theSVG provider assets

At release snapshot `091589089cd134a94df9f6cdab9ba562b2cefd18`, 65 local provider SVGs were
byte-exact matches for `public/icons/<slug>/default.svg` in the theSVG repository at immutable
commit [`7870bc1c5f657d9accbb7f96cc457b8dd3363ee8`](https://github.com/GLINCKER/thesvg/tree/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8).
The fixed upstream evidence includes its
[`LICENSE`](https://github.com/GLINCKER/thesvg/blob/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/LICENSE),
[`LEGAL.md`](https://github.com/GLINCKER/thesvg/blob/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/LEGAL.md),
[`TRADEMARK.md`](https://github.com/GLINCKER/thesvg/blob/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/TRADEMARK.md),
[`LICENSING.md`](https://github.com/GLINCKER/thesvg/blob/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/LICENSING.md),
and
[`src/data/icons.json`](https://github.com/GLINCKER/thesvg/blob/7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/src/data/icons.json).

The byte match proves source provenance for the listed files. It does not prove that a registry
claim was authorized by each brand owner, and it does not relicense the logos or their underlying
brand marks. The theSVG source applies its MIT license to its codebase, tooling, and catalog; its
own legal documents separately reserve trademark rights to the respective owners.

The fixed theSVG source contains this license notice:

MIT License

Copyright (c) 2025 thesvg.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Byte-exact file scope (65/65)

- `public/providers/alibaba.svg`
- `public/providers/anthropic.svg`
- `public/providers/arcee.svg`
- `public/providers/assemblyai.svg`
- `public/providers/aws.svg`
- `public/providers/azure.svg`
- `public/providers/bailian.svg`
- `public/providers/baseten.svg`
- `public/providers/cerebras.svg`
- `public/providers/cline.svg`
- `public/providers/comfyui.svg`
- `public/providers/continue.svg`
- `public/providers/cursor.svg`
- `public/providers/deepgram.svg`
- `public/providers/deepinfra.svg`
- `public/providers/elevenlabs.svg`
- `public/providers/exa.svg`
- `public/providers/fal.svg`
- `public/providers/fireworks.svg`
- `public/providers/friendli.svg`
- `public/providers/gemini.svg`
- `public/providers/grok.svg`
- `public/providers/groq.svg`
- `public/providers/heroku.svg`
- `public/providers/huggingface.svg`
- `public/providers/hyperbolic.svg`
- `public/providers/ibm.svg`
- `public/providers/inference.svg`
- `public/providers/lambda.svg`
- `public/providers/longcat.svg`
- `public/providers/minimax.svg`
- `public/providers/mistral.svg`
- `public/providers/moonshot.svg`
- `public/providers/morph.svg`
- `public/providers/nebius.svg`
- `public/providers/novita.svg`
- `public/providers/nvidia.svg`
- `public/providers/ollama.svg`
- `public/providers/openai.svg`
- `public/providers/openrouter.svg`
- `public/providers/ovhcloud.svg`
- `public/providers/picoclaw.svg`
- `public/providers/poe.svg`
- `public/providers/pollinations.svg`
- `public/providers/qwen.svg`
- `public/providers/recraft.svg`
- `public/providers/replicate.svg`
- `public/providers/roocode.svg`
- `public/providers/runway.svg`
- `public/providers/sambanova.svg`
- `public/providers/searchapi.svg`
- `public/providers/suno.svg`
- `public/providers/tavily.svg`
- `public/providers/topazlabs.svg`
- `public/providers/trae.svg`
- `public/providers/udio.svg`
- `public/providers/upstage.svg`
- `public/providers/v0.svg`
- `public/providers/vercel.svg`
- `public/providers/vllm.svg`
- `public/providers/volcengine.svg`
- `public/providers/voyage.svg`
- `public/providers/windsurf.svg`
- `public/providers/xai.svg`
- `public/providers/zhipu.svg`

### Upstream registry claims

These are claims recorded by the fixed upstream registry. They have not been independently
verified against an authoritative license or brand-owner notice for every asset, so they are not
independent copyright or trademark clearance.

| Upstream registry claim | Count | Clearance status                                                      |
| ----------------------- | ----: | --------------------------------------------------------------------- |
| MIT                     |    46 | Upstream claim only; original per-asset copyright notices remain HOLD |
| CC0-1.0                 |    14 | Upstream claim only; not independently verified with each owner       |
| Apache-2.0              |     1 | Upstream claim only; upstream NOTICE remains HOLD                     |
| brand-use               |     2 | Brand terms, not open-source licenses; owner guidelines remain HOLD   |
| Custom                  |     1 | Custom MiniMax claim; terms remain HOLD                               |
| MISSING                 |     1 | No matching registry claim for HuggingFace; license remains HOLD      |

#### MIT (46)

`alibaba`, `arcee`, `assemblyai`, `aws`, `bailian`, `baseten`, `cerebras`, `comfyui`,
`deepinfra`, `exa`, `fal`, `fireworks`, `friendli`, `gemini`, `grok`, `groq`, `heroku`,
`hyperbolic`, `ibm`, `inference`, `lambda`, `longcat`, `mistral`, `moonshot`, `morph`, `nebius`,
`novita`, `openai`, `picoclaw`, `pollinations`, `qwen`, `recraft`, `roocode`, `runway`,
`sambanova`, `searchapi`, `tavily`, `topazlabs`, `trae`, `udio`, `upstage`, `vllm`, `volcengine`,
`voyage`, `xai`, `zhipu`
<!-- end:MIT -->

#### CC0-1.0 (14)

`anthropic`, `cline`, `cursor`, `deepgram`, `elevenlabs`, `nvidia`, `ollama`, `openrouter`, `poe`,
`replicate`, `suno`, `v0`, `vercel`, `windsurf`
<!-- end:CC0-1.0 -->

#### Apache-2.0 (1)

`continue`
<!-- end:Apache-2.0 -->

#### brand-use (2)

`azure`, `ovhcloud`
<!-- end:brand-use -->

#### Custom (1)

`minimax`
<!-- end:Custom -->

#### MISSING (1)

`huggingface`
<!-- end:MISSING -->

The `continue` Apache-2.0 claim remains HOLD until its authoritative upstream NOTICE obligations
are verified. The `azure` and `ovhcloud` brand-use claims are not open-source licenses and remain
subject to owner guidelines. `minimax` remains HOLD under custom terms. `huggingface` remains HOLD
because its matching file has no entry or license claim in the fixed registry.

### Trademark and affiliation disclaimer

All brand names, logos, and trademarks are the property of their respective owners. OmniRoute uses
these assets nominatively to identify provider integrations. There is no affiliation, sponsorship,
or endorsement by the respective owners. Copyright provenance and source license claims do not
provide trademark clearance; users should follow each owner's official brand guidelines.
