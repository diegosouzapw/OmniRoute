# Release-Green: keeping the queue and release branch green (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ਇਸ ਨਾਲ ਹੱਲ ਹੋਣ ਵਾਲੀ ਸਮੱਸਿਆ

**ਪੂਰਾ ਗੇਟ** (`.github/workflows/ci.yml` — ਯੂਨਿਟ ਸ਼ਾਰਡ, vitest, ਰੈਚਟ,
`package-artifact`, SonarQube, E2E) **ਸਿਰਫ਼ ਰਿਲੀਜ਼ PR** (PR → `main`) ਉੱਤੇ ਚੱਲਦਾ ਹੈ। `release/**`
ਨੂੰ ਟਾਰਗੇਟ ਕਰਨ ਵਾਲੇ PR ਨੂੰ **ਫਾਸਟ-ਗੇਟ** (`quality.yml`: TIA-ਪ੍ਰਭਾਵਿਤ ਟੈਸਟ + ਟਾਈਪਚੈੱਕ + ਲਿੰਟ)
ਮਿਲਦੇ ਹਨ ਅਤੇ, ਕੋਡ ਤਬਦੀਲੀਆਂ ਲਈ, ਇੱਕ **ਸਲਾਹਕਾਰੀ** ਪ੍ਰੋਡਕਸ਼ਨ ਬਿਲਡ ਮਿਲਦਾ ਹੈ। ਨਤੀਜਾ: ਸਿਰਫ਼ ਰਿਲੀਜ਼ ਨਾਲ ਸੰਬੰਧਿਤ ਰੈੱਡ
ਅਜੇ ਵੀ ਰਿਲੀਜ਼ ਬ੍ਰਾਂਚ ਉੱਤੇ ਚੁੱਪਚਾਪ ਇਕੱਠੇ ਹੋ ਸਕਦੇ ਹਨ ਅਤੇ ਰਿਲੀਜ਼ ਸਮੇਂ **~40 ਮਿੰਟ ਦੀਆਂ ਪਰਤਾਂ ਵਿੱਚ ਵਿਸਫੋਟ ਕਰ ਸਕਦੇ ਹਨ**,
ਇੱਕ ਵਾਰ ਵਿੱਚ ਇੱਕ।

"release-green ਫੈਮਿਲੀ" ਇਨ੍ਹਾਂ ਰੈੱਡਾਂ ਦਾ **ਪਹਿਲਾਂ ਹੀ ਅਨੁਮਾਨ ਲਗਾਉਣ** ਲਈ ਮੌਜੂਦ ਹੈ — ਕਿਸੇ ਵੀ ਸਮੇਂ, ਪੂਰੇ
ਗੇਟ ਦੇ ਬਰਾਬਰ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ **ਸਥਾਨਕ ਤੌਰ 'ਤੇ / ਰਿਲੀਜ਼ ਤੋਂ ਬਾਹਰ** ਜਾਂਚਣ ਲਈ, ਤਾਂ ਜੋ ਰਿਲੀਜ਼ PR ਆਪਣੀ ਪਹਿਲੀ
CI ਰਨ ਉੱਤੇ ਹੀ ਗ੍ਰੀਨ ਹੋਵੇ।

> **ਗੈਰ-ਸਮਝੌਤਾਯੋਗ ਸਿਧਾਂਤ:** ਇਸ ਵਿੱਚੋਂ ਕੁਝ ਵੀ ਯੋਗਦਾਨਕਾਰ ਨੂੰ ਬਲੌਕ ਨਹੀਂ ਕਰਦਾ। ਅਸੀਂ ਕੋਈ ਅਜਿਹੀ ਲਾਜ਼ਮੀ
> ਜਾਂਚ ਨਹੀਂ ਜੋੜਦੇ ਜੋ ਉਨ੍ਹਾਂ ਦੇ PR ਨੂੰ ਅਸਫਲ ਕਰੇ। **ਡ੍ਰਿਫਟ** (ਰੈਚਟ) ਰਿਲੀਜ਼ ਸਮੇਂ ਮੇਨਟੇਨਰ ਵੱਲੋਂ ਮੁੜ ਬੇਸਲਾਈਨ ਕਰਨ ਲਈ ਹੈ —
> ਇਹ ਕਦੇ ਵੀ ਯੋਗਦਾਨਕਾਰ ਦੀ ਚਿੰਤਾ ਨਹੀਂ ਹੈ। ਕੋਈ ਵੀ ਹਿੱਸਾ PR ਨੂੰ **ਬੰਦ** ਨਹੀਂ ਕਰਦਾ (ਕ੍ਰੈਡਿਟ ਦੀ ਚੋਰੀ) ਅਤੇ ਨਾ ਹੀ
> ਪਾਸ ਹੋਣ ਲਈ ਕਿਸੇ ਟੈਸਟ ਨੂੰ **ਕਮਜ਼ੋਰ** ਕਰਦਾ ਹੈ।

## ਫੈਮਿਲੀ (4 ਹਿੱਸੇ) — ਅਤੇ ਹਰੇਕ ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ ਕਿਵੇਂ ਚੱਲਦਾ ਹੈ

| ਹਿੱਸਾ                                                                 | ਇਹ ਕੀ ਹੈ                                                                         | ਕਦੋਂ ਚਲਾਉਣਾ ਹੈ                                                                        | ਦਾਇਰਾ                       |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------- |
| **`/green-prs`** (ਹੱਲ A)                                              | ਮੇਨਟੇਨਰ ਵੱਲੋਂ **ਖੁੱਲ੍ਹੇ PR ਦੀ ਕਤਾਰ** ਦੀ ਮੰਗ ਉੱਤੇ ਸਕੈਨਿੰਗ                         | **ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ, ਸਮੇਂ-ਸਮੇਂ ਉੱਤੇ** — ਅਤੇ ਖ਼ਾਸ ਕਰਕੇ `/generate-release` ਤੋਂ **ਪਹਿਲਾਂ** | ਪੂਰੀ PR ਕਤਾਰ → `release/**` |
| **`/validate-release-green`** (ਹੱਲ C — `npm run check:release-green`) | ਪ੍ਰਮਾਣਿਕਤਾ ਇੰਜਣ: ਕਿਸੇ ਬ੍ਰਾਂਚ ਜਾਂ ਮਰਜ ਉਮੀਦਵਾਰ ਲਈ ਪੂਰੇ ਗੇਟ ਨੂੰ ਦੁਬਾਰਾ ਪੇਸ਼ ਕਰਦਾ ਹੈ | ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ, ਕਿਸੇ ਵੀ ਸਮੇਂ                                                          | ਕੋਈ ਖ਼ਾਸ ਬ੍ਰਾਂਚ ਜਾਂ ਮਰਜ-PR  |
| **`/babysit <PR#>`**                                                  | **ਇੱਕ** PR ਦੀ **ਲਾਈਵ CI** ਨੂੰ ਗ੍ਰੀਨ ਹੋਣ ਤੱਕ ਚਲਾਉਂਦਾ ਹੈ                           | ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ, ਪ੍ਰਤੀ PR                                                              | ਇੱਕ PR                      |
| **`nightly-release-green.yml`** (ਹੱਲ D)                               | ਸਵੈਚਾਲਿਤ ਰਾਤਰੀ ਵਰਕਫ਼ਲੋ; HARD ਰੈੱਡ ਹੋਣ ਉੱਤੇ ਇਸ਼ੂ ਖੋਲ੍ਹਦਾ ਹੈ                       | ਸਵੈਚਾਲਿਤ (cron)                                                                       | ਸਰਗਰਮ ਰਿਲੀਜ਼ ਬ੍ਰਾਂਚ         |

**"ਕੀ ਇਹ ਸਿਰਫ਼ ਰਿਲੀਜ਼ਾਂ ਲਈ ਹੈ?" ਦਾ ਛੋਟਾ ਜਵਾਬ:** **ਨਹੀਂ।** `/green-prs` ਨੂੰ
**ਰਿਲੀਜ਼ਾਂ ਦੇ ਵਿਚਕਾਰ, ਸਮੇਂ-ਸਮੇਂ ਉੱਤੇ** ਚਲਾਉਣ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਸੀ। ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ ਚਲਾਉਣਾ ਆਮ ਵਰਤੋਂ ਹੈ — ਰਿਲੀਜ਼ ਸਿਰਫ਼
ਉਹ ਪਲ ਹੈ ਜਦੋਂ ਇਸਨੂੰ ਚਲਾਉਣਾ ਸਭ ਤੋਂ ਵੱਧ ਮੁੱਲ ਦਿੰਦਾ ਹੈ।

## PR-ਤੋਂ-release ਸਲਾਹਕਾਰੀ ਬਿਲਡ

`quality.yml` ਵਿੱਚ ਹੁਣ non-draft code PRs ਅਤੇ Mergify queue branches ਲਈ `Build (advisory)` ਸ਼ਾਮਲ ਹੈ।
ਇਹ `ci.yml` ਤੋਂ production build recipe ਦੀ ਨਕਲ ਕਰਦਾ ਹੈ: Node 24, `npm-ci-retry`,
`check:node-runtime`, ਅਤੇ `OMNIROUTE_USE_TURBOPACK=1` ਨਾਲ `npm run build`। ਇਹ ਜਾਣਬੁੱਝ ਕੇ
build artifact ਅੱਪਲੋਡ ਨਹੀਂ ਕਰਦਾ ਕਿਉਂਕਿ ਇਸ workflow ਵਿੱਚ ਕੋਈ downstream quality job ਇਸਦੀ ਵਰਤੋਂ ਨਹੀਂ ਕਰਦੀ।
ਸਥਿਰ release-PR runs ਦੇ ਇੱਕ ਹਫ਼ਤੇ ਬਾਅਦ `continue-on-error` ਹਟਾਓ, ਤਾਂ ਜੋ ਇਹ signal ਇੱਕ
blocking PR-to-release gate ਬਣ ਜਾਵੇ।

## ਹੱਲ C — `npm run check:release-green` (ਇੰਜਣ)

ਮੌਜੂਦਾ working tree ਉੱਤੇ release ਦੇ ਬਰਾਬਰ validation ਨੂੰ ਦੁਹਰਾਉਂਦਾ ਹੈ ਅਤੇ ਹਰੇਕ red ਨੂੰ ਵਰਗੀਕ੍ਰਿਤ ਕਰਦਾ ਹੈ:

- **HARD** (typecheck, lint errors, unit, vitest, db-rules, public-creds, ਵਿਕਲਪਿਕ
  `package-artifact`) → **ਅਸਲ ਖਾਮੀ**; `exit 1`। Source branch ਉੱਤੇ ਠੀਕ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (TDD, ਨਿਯਮ #18)।
- **DRIFT** (eslint **warnings**, cognitive-complexity, file-size) → cycle ਵਿੱਚ ਇਕੱਠੀ ਹੋਈ ratchet drift,
  **contributor ਦੀ ਗਲਤੀ ਨਹੀਂ**; ਇਸਦੀ ਸਿਰਫ਼ ਰਿਪੋਰਟ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਅਤੇ **release ਵੇਲੇ maintainer ਵੱਲੋਂ
  rebaseline** ਕੀਤੀ ਜਾਂਦੀ ਹੈ। Drift exit code ਨੂੰ **ਕਦੇ ਵੀ** ਨਹੀਂ ਬਦਲਦੀ — ਇਸ ਲਈ ਇਹ ਕਦੇ ਵੀ ਕਿਸੇ ਨੂੰ block ਨਹੀਂ ਕਰਦੀ।

```bash
npm run check:release-green                 # ਮੌਜੂਦਾ branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # ਸੰਰਚਿਤ output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest ਨੂੰ ਛੱਡਦਾ ਹੈ (ਸਿਰਫ਼ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact ਸ਼ਾਮਲ ਕਰਦਾ ਹੈ (ਹੌਲਾ)
```

ਸਿਰਫ਼ ਜਾਂਚ ਅਤੇ **ਰਿਪੋਰਟ** ਕਰਦਾ ਹੈ (ਕੋਈ auto-fix ਨਹੀਂ)। Fix-to-green orchestration
`/green-prs` ਅਤੇ `/review-prs` ਵਿੱਚ ਮੌਜੂਦ ਹੈ।

## ਹੱਲ A — `/green-prs` (queue scan)

ਪ੍ਰਕਿਰਿਆ (ਸੰਖੇਪ — ਵੇਰਵਿਆਂ ਲਈ `green-prs` skill ਵੇਖੋ):

1. ਸਰਗਰਮ release branch ਦੇ ਮੁਕਾਬਲੇ open PRs ਦੀ queue ਦੀ **ਸੂਚੀ ਬਣਾਓ**।
2. ਹਰੇਕ PR ਨੂੰ **triage** ਕਰੋ (viable / reject-worthy / needs-author) — reject/needs-author ਨੂੰ
   **ਰਿਪੋਰਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਬੰਦ ਨਹੀਂ** (ਫ਼ੈਸਲਾ author ਕਰਦਾ ਹੈ)।
3. ਹਰੇਕ viable PR ਲਈ, ਇੱਕ **ਅਲੱਗ worktree** (ਨਿਯਮ #19) ਵਿੱਚ, PR ਨੂੰ release tip ਤੱਕ ਲਿਆਓ ਅਤੇ
   `npm run check:release-green` ਚਲਾਓ:
   - **HARD** → co-authorship ਰਾਹੀਂ **contributor ਦੀ branch ਉੱਤੇ** ਠੀਕ ਕਰੋ (author ਦਾ "Merged" status ਬਰਕਰਾਰ ਰਹਿੰਦਾ ਹੈ),
     ਸਾਰੇ HARD ਸਾਫ਼ ਹੋਣ ਤੱਕ ਮੁੜ ਚਲਾਓ।
   - **DRIFT** → ਇਸਨੂੰ ਛੱਡ ਦਿਓ; release ਵੇਲੇ ਇਸਨੂੰ rebaseline ਕੀਤਾ ਜਾਵੇਗਾ।
4. PR × (verdict, HARD reds, fixed?, DRIFT, ਹੁਣ release-green?) ਦੀ ਸਾਰਣੀ **ਰਿਪੋਰਟ** ਕਰੋ।

Queue ਨੂੰ merge ਕੀਤੇ ਬਿਨਾਂ **ਤਿਆਰ** ਕਰ ਸਕਦਾ ਹੈ; ਸਿਰਫ਼ ਸਪਸ਼ਟ ਬੇਨਤੀ ਉੱਤੇ ਹੀ merge ਕਰਦਾ ਹੈ — ਅਤੇ ਕਿਸੇ PR ਨੂੰ ਕਦੇ ਬੰਦ ਨਹੀਂ ਕਰਦਾ।

## ਸਿਫ਼ਾਰਸ਼ੀ ਸਮਾਂ-ਸਾਰਣੀ

- **`/green-prs` ਨੂੰ ਸਮੇਂ-ਸਮੇਂ ਉੱਤੇ ਚਲਾਓ** (ਉਦਾਹਰਨ ਲਈ, ਹਫ਼ਤਾਵਾਰੀ) ਅਤੇ
  `/generate-release` ਤੋਂ **ਹਮੇਸ਼ਾ ਪਹਿਲਾਂ**।
- ਇੱਕ ਲਗਾਤਾਰ signal ਵਜੋਂ **`nightly-release-green.yml`** (ਹੱਲ D) ਨੂੰ ਕਾਇਮ ਰੱਖੋ: ਜਦੋਂ ਇਹ
  HARD red issue ਖੋਲ੍ਹਦਾ ਹੈ, ਤਾਂ scan ਕਰਨ ਦਾ ਸਮਾਂ ਆ ਗਿਆ ਹੈ।
- ਕਿਸੇ branch ਜਾਂ ਕਿਸੇ ਖ਼ਾਸ merge candidate ਦੀ ad-hoc ਜਾਂਚ ਕਰਨ ਲਈ **`/validate-release-green`** ਵਰਤੋ।
- ਜਦੋਂ ਕਿਸੇ ਖ਼ਾਸ PR ਨੂੰ live CI ਉੱਤੇ green ਤੱਕ ਲਿਜਾਣ ਦੀ ਲੋੜ ਹੋਵੇ, ਤਾਂ **`/babysit <PR#>`** ਵਰਤੋ।

## Release ਨਾਲ ਸੰਬੰਧ

- `/generate-release`, **Phase 0 (pre-flight)** ਵਿੱਚ validation ਨੂੰ call ਕਰਦਾ ਹੈ: release PR ਖੋਲ੍ਹਣ ਤੋਂ ਪਹਿਲਾਂ
  DRIFT ਨੂੰ rebaseline ਕਰਦਾ ਅਤੇ HARD ਨੂੰ ਠੀਕ ਕਰਦਾ ਹੈ।
- `/review-prs`, merge ਦੇ ਫ਼ੈਸਲੇ ਵਾਲੇ ਪੜਾਅ ਉੱਤੇ release-green gate ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ (green-before-merge)।

ਸਾਰੇ ਹਿੱਸਿਆਂ ਦਾ ਟੀਚਾ ਇੱਕੋ ਹੈ: release ਵਾਲੇ ਦਿਨ 40-ਮਿੰਟ ਦੀਆਂ ਪਰਤਾਂ ਵਿੱਚ
reds ਨਾਲ ਜੂਝਣ ਦੀ ਬਜਾਏ, **ਪਹਿਲੇ CI run ਉੱਤੇ ਇੱਕ green release PR**।
