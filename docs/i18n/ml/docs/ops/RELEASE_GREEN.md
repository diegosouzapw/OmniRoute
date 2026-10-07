# Release-Green: keeping the queue and release branch green (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ഇത് പരിഹരിക്കുന്ന പ്രശ്നം

**പൂർണ്ണ ഗേറ്റ്** (`.github/workflows/ci.yml` — യൂണിറ്റ് ഷാർഡുകൾ, vitest, റാച്ചറ്റുകൾ,
`package-artifact`, SonarQube, E2E) പ്രവർത്തിക്കുന്നത് **റിലീസ് PR-ൽ മാത്രം** ആണ് (PR → `main`).
`release/**` ലക്ഷ്യമിടുന്ന PR-കൾക്ക് **ഫാസ്റ്റ്-ഗേറ്റുകൾ** (`quality.yml`: TIA ബാധിച്ച ടെസ്റ്റുകൾ + typecheck + lint)
ലഭിക്കും; കോഡ് മാറ്റങ്ങൾക്ക് ഒരു **ഉപദേശാത്മക** പ്രൊഡക്ഷൻ ബിൽഡും ലഭിക്കും. അനന്തരഫലം: റിലീസിൽ മാത്രം സംഭവിക്കുന്ന പരാജയങ്ങൾ
റിലീസ് ബ്രാഞ്ചിൽ നിശ്ശബ്ദമായി അടിഞ്ഞുകൂടുകയും റിലീസ് സമയത്ത് **~40 മിനിറ്റ് വീതമുള്ള പാളികളായി പൊട്ടിത്തെറിക്കുകയും** ചെയ്യാം,
ഓരോന്നായി.

ആ പരാജയങ്ങൾ **മുൻകൂട്ടി കണ്ടെത്താനാണ്** "release-green family" നിലവിലുള്ളത് — ഏത് സമയത്തും പൂർണ്ണ
ഗേറ്റിന് തുല്യമായ പരിശോധനകൾ **ലോക്കലായി / റിലീസിന് പുറത്ത്** നടത്തി സാധൂകരിക്കുക, അതുവഴി റിലീസ് PR അതിന്റെ ആദ്യ CI റണ്ണിൽത്തന്നെ
ഗ്രീൻ ആയിരിക്കും.

> **വിട്ടുവീഴ്ചയില്ലാത്ത തത്ത്വം:** ഇതൊന്നും കോൺട്രിബ്യൂട്ടറെ തടയുന്നില്ല. അവരുടെ PR പരാജയപ്പെടുത്തുന്ന ഒരു നിർബന്ധിത
> ചെക്ക് ഞങ്ങൾ ചേർക്കുന്നില്ല. **ഡ്രിഫ്റ്റ്** (റാച്ചറ്റുകൾ) റിലീസ് സമയത്ത് മെയിന്റെയ്നർ വീണ്ടും ബേസ്ലൈൻ ചെയ്യേണ്ടതാണ് —
> അത് ഒരിക്കലും കോൺട്രിബ്യൂട്ടറുടെ ആശങ്കയല്ല. ഒരു ഘടകവും PR **ക്ലോസ്** ചെയ്യുന്നില്ല (ക്രെഡിറ്റ് മോഷണം),
> പാസാകാനായി ഒരു ടെസ്റ്റിനെയും **ദുർബലപ്പെടുത്തുന്നുമില്ല**.

## ഫാമിലി (4 ഘടകങ്ങൾ) — ഓരോന്നും സ്വതന്ത്രമായി പ്രവർത്തിക്കുന്ന വിധം

| ഘടകം                                                                       | അത് എന്താണ്                                                                                | എപ്പോൾ പ്രവർത്തിപ്പിക്കണം                                                           | വ്യാപ്തി                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| **`/green-prs`** (സൊല്യൂഷൻ A)                                              | **തുറന്ന PR-കളുടെ ക്യൂവിൽ** മെയിന്റെയ്നർ ആവശ്യാനുസരണം നടത്തുന്ന സ്കാൻ                      | **സ്വതന്ത്രമായി, ഇടയ്ക്കിടെ** — പ്രത്യേകിച്ച് ഒരു `/generate-release`-ന് **മുമ്പ്** | മുഴുവൻ PR ക്യൂ → `release/**`               |
| **`/validate-release-green`** (സൊല്യൂഷൻ C — `npm run check:release-green`) | വാലിഡേഷൻ എഞ്ചിൻ: ഒരു ബ്രാഞ്ചിനോ മെർജ് കാൻഡിഡേറ്റിനോ എതിരെ പൂർണ്ണ ഗേറ്റ് പുനഃസൃഷ്ടിക്കുന്നു | സ്വതന്ത്രമായി, ഏത് സമയത്തും                                                         | ഒരു നിർദ്ദിഷ്ട ബ്രാഞ്ച് അല്ലെങ്കിൽ merge-PR |
| **`/babysit <PR#>`**                                                       | **ഒരു** PR-ന്റെ **ലൈവ് CI** ഗ്രീൻ ആകുന്നതുവരെ നിയന്ത്രിക്കുന്നു                            | സ്വതന്ത്രമായി, ഓരോ PR-നും                                                           | ഒരൊറ്റ PR                                   |
| **`nightly-release-green.yml`** (സൊല്യൂഷൻ D)                               | ഓട്ടോമേറ്റഡ് നൈറ്റ്ലി വർക്ക്ഫ്ലോ; HARD റെഡ് ഉണ്ടായാൽ issue തുറക്കുന്നു                     | ഓട്ടോമാറ്റിക് (cron)                                                                | സജീവമായ റിലീസ് ബ്രാഞ്ച്                     |

**"ഇത് റിലീസുകൾക്കായി മാത്രമാണോ?" എന്നതിനുള്ള ഹ്രസ്വ ഉത്തരം:** **അല്ല.** `/green-prs`
**റിലീസുകൾക്കിടയിൽ, ഇടയ്ക്കിടെ** പ്രവർത്തിപ്പിക്കാനാണ് രൂപകൽപ്പന ചെയ്തത്. സ്വതന്ത്രമായി പ്രവർത്തിപ്പിക്കുന്നതാണ് സാധാരണ രീതി —
റിലീസ് എന്നത് ഇത് പ്രവർത്തിപ്പിക്കുമ്പോൾ ഏറ്റവും കൂടുതൽ മൂല്യം ലഭിക്കുന്ന സന്ദർഭം മാത്രമാണ്.

## PR-ൽ-നിന്ന്-release-ലേക്കുള്ള ഉപദേശക build

`quality.yml` ഇപ്പോൾ draft അല്ലാത്ത code PR-കൾക്കും Mergify queue branch-കൾക്കുമായി `Build (advisory)` ഉൾക്കൊള്ളുന്നു.
ഇത് `ci.yml`-ലെ production build recipe അതേപടി പിന്തുടരുന്നു: Node 24, `npm-ci-retry`,
`check:node-runtime`, കൂടാതെ `OMNIROUTE_USE_TURBOPACK=1` ഉപയോഗിച്ചുള്ള `npm run build`. ഈ workflow-ൽ തുടർന്നുള്ള ഒരു quality job-ഉം build artifact ഉപയോഗിക്കുന്നില്ലാത്തതിനാൽ, ഇത് മനഃപൂർവം build artifact upload ചെയ്യുന്നില്ല.
സ്ഥിരതയുള്ള release-PR run-ുകളുടെ ഒരാഴ്ചയ്ക്ക് ശേഷം `continue-on-error` നീക്കംചെയ്യുക; അപ്പോൾ ഈ signal,
PR-ൽ-നിന്ന്-release-ലേക്കുള്ള ഒരു blocking gate ആയി മാറും.

## പരിഹാരം C — `npm run check:release-green` (engine)

നിലവിലെ working tree-യ്ക്കെതിരെ release-ന് തുല്യമായ validation പുനരാവിഷ്കരിക്കുകയും ഓരോ red-നെയും തരംതിരിക്കുകയും ചെയ്യുന്നു:

- **HARD** (typecheck, lint error-കൾ, unit, vitest, db-rules, public-creds, ഐച്ഛികമായ
  `package-artifact`) → **യഥാർത്ഥ defect**; `exit 1`. Source branch-ൽ പരിഹരിക്കുന്നു (TDD, Rule #18).
- **DRIFT** (eslint **warning-കൾ**, cognitive-complexity, file-size) → cycle-ൽ അടിഞ്ഞുകൂടിയ ratchet drift,
  **contributor-ന്റെ തെറ്റല്ല**; ഇത് report ചെയ്യുക മാത്രമാണ് ചെയ്യുന്നത്, കൂടാതെ **release സമയത്ത് maintainer
  rebaseline ചെയ്യുന്നു**. Drift **ഒരിക്കലും** exit code മാറ്റുന്നില്ല — അതിനാൽ ഇത് ആരെയും block ചെയ്യുന്നില്ല.

```bash
npm run check:release-green                 # നിലവിലെ branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # ഘടനാബദ്ധമായ output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest ഒഴിവാക്കുന്നു (drift+typecheck+lint മാത്രം)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact ഉൾക്കൊള്ളുന്നു (മന്ദഗതിയിലുള്ളത്)
```

പ്രശ്നനിർണ്ണയം നടത്തി **report** ചെയ്യുക മാത്രം ചെയ്യുന്നു (auto-fix ഇല്ല). Green ആക്കുന്നതിനുള്ള fix orchestration
`/green-prs`-ലും `/review-prs`-ലുമാണ്.

## പരിഹാരം A — `/green-prs` (queue scan)

നടപടിക്രമം (സംഗ്രഹം — വിശദാംശങ്ങൾക്ക് `green-prs` skill കാണുക):

1. സജീവമായ release branch-നെതിരെയുള്ള തുറന്ന PR-കളുടെ queue **Inventory** ചെയ്യുക.
2. ഓരോ PR-ഉം **Triage** ചെയ്യുക (viable / reject-worthy / needs-author) — reject/needs-author ഇനങ്ങൾ
   **report ചെയ്യപ്പെടും, close ചെയ്യപ്പെടില്ല** (author തീരുമാനിക്കുന്നു).
3. viable ആയ ഓരോ PR-നും, ഒരു **ഒറ്റപ്പെട്ട worktree**-യിൽ (Rule #19), PR-നെ release tip-ലേക്ക് കൊണ്ടുവന്ന്
   `npm run check:release-green` പ്രവർത്തിപ്പിക്കുക:
   - **HARD** → co-authorship വഴി **contributor-ന്റെ branch-ൽ** പരിഹരിക്കുക (author-ന്റെ "Merged" status നിലനിർത്തുന്നു),
     എല്ലാ HARD-കളും തീരുന്നതുവരെ വീണ്ടും പ്രവർത്തിപ്പിക്കുക.
   - **DRIFT** → അതേപടി വിടുക; release സമയത്ത് ഇത് rebaseline ചെയ്യും.
4. PR × (verdict, HARD red-കൾ, fixed?, DRIFT, ഇപ്പോൾ release-green ആണോ?) table **Report** ചെയ്യുക.

Merge ചെയ്യാതെ queue **തയ്യാറാക്കാൻ** കഴിയും; വ്യക്തമായി ആവശ്യപ്പെടുമ്പോൾ മാത്രമേ merge ചെയ്യൂ — കൂടാതെ ഒരിക്കലും ഒരു PR close ചെയ്യില്ല.

## ശുപാർശ ചെയ്യുന്ന ആവൃത്തി

- **`/green-prs` ഇടയ്ക്കിടെ പ്രവർത്തിപ്പിക്കുക** (ഉദാ., ആഴ്ചതോറും), കൂടാതെ ഒരു
  `/generate-release`-ന് മുമ്പ് **എപ്പോഴും** പ്രവർത്തിപ്പിക്കുക.
- തുടർച്ചയായ signal ആയി **`nightly-release-green.yml`** (പരിഹാരം D) നിലനിർത്തുക: ഇത് ഒരു
  HARD red issue തുറക്കുമ്പോൾ, scan നടത്താനുള്ള സമയമാണ്.
- ഒരു branch അല്ലെങ്കിൽ നിർദ്ദിഷ്ട merge candidate പരിശോധിക്കാൻ **`/validate-release-green`** ആവശ്യാനുസരണം ഉപയോഗിക്കുക.
- ഒരു നിർദ്ദിഷ്ട PR-നെ live CI-ൽ green ആക്കേണ്ടിവരുമ്പോൾ **`/babysit <PR#>`** ഉപയോഗിക്കുക.

## Release-മായുള്ള ബന്ധം

- `/generate-release`, **Phase 0 (pre-flight)**-ൽ validation വിളിക്കുന്നു: release PR തുറക്കുന്നതിന് മുമ്പ് DRIFT rebaseline ചെയ്യുകയും
  HARD പരിഹരിക്കുകയും ചെയ്യുന്നു.
- Merge തീരുമാനം എടുക്കുന്ന ഘട്ടത്തിൽ `/review-prs`, release-green gate ഉപയോഗിക്കുന്നു (green-before-merge).

എല്ലാ ഘടകങ്ങളുടെയും ലക്ഷ്യം ഒന്നുതന്നെയാണ്: release ദിവസത്തിൽ 40-minute layer-ുകളിലായി
red-ുകളിലൂടെ സഞ്ചരിക്കുന്നതിന് പകരം, **ആദ്യ CI run-ൽ തന്നെ ഒരു green release PR**.
