# Quality Gates Reference (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ഈ പ്രമാണമാണ് OmniRoute-ലെ എല്ലാ CI ഗുണനിലവാര ഗേറ്റുകൾക്കുമുള്ള ആധികാരിക റഫറൻസ്.
ഓരോ ഗേറ്റും, അത് എന്താണ് സാധൂകരിക്കുന്നത്, ഏത് CI ജോബിലാണ് അത് പ്രവർത്തിക്കുന്നത്, അത്
ഒരു റാച്ചറ്റ് ബേസ്ലൈൻ ആണോ അതോ പാസ്/ഫെയിൽ നയമാണോ ഉപയോഗിക്കുന്നത്, ബിൽഡ് തടയുന്നതാണോ അതോ ഉപദേശാത്മകമാണോ എന്നിവ ഇതിൽ വിവരിക്കുന്നു.

ഒരു ഹ്രസ്വ സംഗ്രഹത്തിനും അനുവദനീയ പട്ടികാ നയത്തിനും `AGENTS.md`-ലെ
"ഗുണനിലവാര ഗേറ്റുകളും റാച്ചറ്റുകളും" വിഭാഗം കാണുക. ഇതേ സിസ്റ്റത്തിന്റെ നിർണായക വിലയിരുത്തൽ,
മെച്യൂരിറ്റി വർഗ്ഗീകരണം, ടൂൾ-അഗ്നോസ്റ്റിക് പുനരാവിഷ്കരണ പദ്ധതി എന്നിവയ്ക്കായി
[ഗുണനിലവാര ഗേറ്റ് പ്ലേബുക്ക്](../ops/QUALITY_GATE_PLAYBOOK.md) കാണുക.

---

## ഗേറ്റ് ഇൻവെന്ററിയും നിർവഹണ പ്രൊഫൈലുകളും

### സ്ഥാനാർഥി പ്രവേശനം

CI, Quality Gates വർക്ക്ഫ്ലോകൾ ഓരോന്നും സ്ഥിരമായ ഒരു വിധി പുറപ്പെടുവിക്കുന്നു: `Gate / CI`,
`Gate / Quality`. അവയുടെ പതിപ്പിട്ട പ്രവേശന നയം, ഓരോ അപ്സ്ട്രീം ജോബിനെയും
നിർബന്ധിതമോ ഉപദേശപരമോ ആയി പട്ടികപ്പെടുത്തുന്നു. ബാധകമായ ഒരു നിർബന്ധിത ജോബ് വിജയിക്കണം:
ലഭ്യമല്ലാത്തത്, റദ്ദാക്കിയത്, ഒഴിവാക്കിയത്, തീർപ്പാകാത്തത്, അജ്ഞാതമായ ഫലങ്ങൾ എന്നിവയ്ക്ക് PASS
സ്ഥാപിക്കാനാവില്ല. സാധുവായ docs-only അല്ലെങ്കിൽ catalog-only വർഗ്ഗീകരണം ഒരു കോഡ് ലെയ്നെ
ബാധകമല്ലാതാക്കാം; ഒരു ഡ്രാഫ്റ്റ് PR സ്വീകാര്യമായ സ്ഥാനാർഥിയല്ല. `hotfix` ലേബൽ തെളിവിന്റെ
ആവശ്യകത ഒഴിവാക്കുന്നില്ല.

രണ്ട് വർക്ക്ഫ്ലോകളും PR-കൾ, main/release ബ്രാഞ്ചുകളിലേക്കുള്ള പുഷുകൾ, മാനുവൽ ഡിസ്പാച്ച്,
merge-group ഇവന്റുകൾ എന്നിവ ഉൾക്കൊള്ളുന്നു. Push, dispatch, merge-group എന്നിവ പൂർണ്ണമായ
തിരഞ്ഞെടുപ്പ് പ്രവർത്തിപ്പിക്കുന്നു. സാധാരണയായി self-hosted റണ്ണറുകൾ തിരഞ്ഞെടുക്കുന്ന ജോബുകൾക്ക്
ഫോർക്കുകളും merge group-ുകളും hosted റണ്ണറുകൾ ഉപയോഗിക്കുന്നു; പുറത്തിറക്കുന്നതിന് മുമ്പ്
മതിയായ hosted ശേഷി പരിശോധിച്ചുറപ്പിക്കണം.

ഓരോ JSON രസീതും ചെക്ക് ഔട്ട് ചെയ്ത SHA, വർക്ക്ഫ്ലോ റൺ, ശ്രമം എന്നിവ തിരിച്ചറിയുന്നു.
ചെക്ക്ഔട്ട്/event SHA പൊരുത്തക്കേട് CLI നിരസിക്കുന്നു. പുതിയതോ നീക്കംചെയ്തതോ ആയ ഒരു ലെയ്ൻ
നിശ്ശബ്ദമായി അപ്രത്യക്ഷമാകാതിരിക്കാൻ, വർക്ക്ഫ്ലോ ടെസ്റ്റുകൾ നയത്തിലെ അംഗത്വത്തെ വിധി ജോബിന്റെ
`needs` പട്ടികയുമായി ബന്ധിപ്പിക്കുന്നു. രസീതുകൾ അവയുടെ സ്വന്തം വർക്ക്ഫ്ലോയെ ഉൾക്കൊള്ളുന്നു;
പ്രസിദ്ധീകരണം, വിന്യാസം, അല്ലെങ്കിൽ നിലവിലുള്ള ഒരു ഉപദേശപരമായ സ്കാനറിന്റെ ആന്തരിക പ്രവർത്തനം
എന്നിവയെ അല്ല. ബ്രാഞ്ച് നിയമങ്ങളിൽ രണ്ട് ചെക്ക് പേരുകളും സജീവമാക്കുന്നത് വേറിട്ടൊരു
അഡ്മിനിസ്ട്രേറ്റീവ് മാറ്റമാണ്; ഈ ജോബുകൾ ചേർക്കുന്നതുകൊണ്ടുമാത്രം ഒരു ബ്രാഞ്ചിന് സംരക്ഷണം
ലഭിക്കില്ല.

### സ്റ്റാറ്റിക് സ്കാൻ ഇൻവെന്ററി

പതിപ്പിട്ട npm-alias ഇൻവെന്ററിയും സ്റ്റാറ്റിക്-സ്കാൻ അംഗത്വവും
`config/quality/gate-manifest.json`-ലാണ്. സ്ക്രിപ്റ്റ് പേരുകളും കൃത്യമായ കമാൻഡുകളും
`package.json`-നോട് ഒത്തുനോക്കി സാധൂകരിക്കാൻ `npm run check:gate-manifest` പ്രവർത്തിപ്പിക്കുക;
കൂട്ടിച്ചേർക്കലുകൾ, നീക്കംചെയ്യലുകൾ, കമാൻഡ് വ്യതിയാനം എന്നിവ ലോക്കൽ ഹുക്കിനെയും CI-യിലെ
മാറ്റ-വർഗ്ഗീകരണ ജോബുകളെയും പരാജയപ്പെടുത്തും. ഒരു alias എന്നത് വർക്ക്ഫ്ലോ ജോബോ, മാട്രിക്സ്
ഇൻസ്റ്റൻസോ, ടെസ്റ്റ് കേസോ അല്ല: ഈ എണ്ണങ്ങൾ പരസ്പരം മാറ്റിസ്ഥാപിക്കാവുന്നവയായി അവതരിപ്പിക്കരുത്.

തിരഞ്ഞെടുത്ത alias-കൾ പ്രവർത്തിപ്പിക്കാതെ പരിശോധിക്കാൻ `npm run quality:scan -- --list`
അല്ലെങ്കിൽ `npm run quality:scan:fast -- --list` ഉപയോഗിക്കുക. റണ്ണർ npm എൻട്രിപോയിന്റ്
വിളിക്കുന്നതിനാൽ, അതിന്റെ റൺടൈം—കോൺഫിഗർ ചെയ്തിടത്ത് Bun ഉൾപ്പെടെ—നിലനിർത്തപ്പെടുന്നു.
ഈ പ്രൊഫൈലുകൾക്ക് പുറത്തുള്ള alias-കൾ പ്രത്യേകം അഭ്യർത്ഥിക്കപ്പെടുന്നവയായി മാനിഫെസ്റ്റ്
രേഖപ്പെടുത്തുന്നു; read-only സ്കാൻ പ്രൊഫൈലുകളിൽ പരിപാലന കമാൻഡുകൾ അനുവദനീയമല്ല.

ഈ പ്രൊഫൈലുകൾ സ്റ്റാറ്റിക് സ്കാൻ മാത്രമാണ് ഉൾക്കൊള്ളുന്നത്. ഉൽപ്പന്ന ടെസ്റ്റുകൾ, കവറേജ്,
പാക്കേജിംഗ്, ബാഹ്യ പരിശോധനകൾ, അല്ലെങ്കിൽ ഒരു സ്ഥാനാർഥിയുടെ പൂർണ്ണ റിലീസ് സ്വീകാര്യത
എന്നിവയ്ക്ക് ഇവ സാക്ഷ്യപത്രം നൽകുന്നില്ല. വർക്ക്ഫ്ലോ പ്രവേശനം ബന്ധിപ്പിച്ചിരിക്കുന്ന
`config/quality/admission-policy.json`, `scripts/quality/admission-verdict.mjs` എന്നിവ
ഉപയോഗിക്കുന്നു. Release-observer പ്രൊഫൈലുകൾ വേറിട്ടുതന്നെ തുടരുന്നു; അവയ്ക്ക് ബാധകമായ
പരിശോധനകളും രസീതുകളും സ്വതന്ത്രമായി പരിശോധിക്കുക. ചുവടെയുള്ള ഗദ്യരൂപത്തിലുള്ള ഇൻവെന്ററി
ഒരു റഫറൻസാണ്, ഒരു ഗേറ്റ് യഥാർഥത്തിൽ പ്രവർത്തിച്ചു എന്നതിന്റെ തെളിവല്ല.

സ്ക്രിപ്റ്റുകൾ `scripts/check/`-ലും (നയ ഗേറ്റുകൾ) `scripts/quality/`-ലും (റാച്ചറ്റ് എൻജിൻ)
സ്ഥിതിചെയ്യുന്നു. CI-യുടെ ആധികാരിക ഉറവിടം `.github/workflows/ci.yml` ആണ്.

### റിലീസ് PR ഫാസ്റ്റ്-പാത്ത് (`quality.yml`)

`.github/workflows/quality.yml`, main/release PR-കളിലും സംരക്ഷിത-ബ്രാഞ്ച് പുഷുകളിലും
dispatch, merge group എന്നിവയിലും CI-യെ പൂരകമാക്കുന്നു. PR-കൾ പാത്ത്-ഫിൽട്ടർ ചെയ്ത വേഗത്തിലുള്ള
പരിശോധനകൾ ഉപയോഗിക്കുന്നു. സ്ഥിരമായി പ്രവർത്തനരഹിതമാക്കിയിരുന്ന ഡ്യൂപ്ലിക്കേറ്റ് ബിൽഡ്
നീക്കംചെയ്തു; യഥാർഥ build/package/boot പരിശോധനകൾ CI-യിൽ തുടരുന്നു.

| ജോബ്                                             | വ്യാപ്തി                                                                                                                                                                                                                                                                  | തടസ്സപ്പെടുത്തുന്നത് |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-കൾ; API docs റഫറൻസുകളും docs-all-ഉം                                                                                                                                                                                                                          | അതെ                  |
| `Fast Quality Gates`                             | Code PR-കൾ; സ്റ്റാറ്റിക് പരിശോധനകൾ, typecheck, dashboard typecheck, ബാധിക്കപ്പെട്ട unit ടെസ്റ്റുകൾ                                                                                                                                                                        | അതെ                  |
| `Forgotten sibling tests`                        | Code PR-കൾ; മാറ്റംവന്ന മൊഡ്യൂളുകളിൽ നിന്ന് സ്റ്റാറ്റിക് ഉപഭോക്താക്കളിലേക്കും സാധ്യതയുള്ള sibling ടെസ്റ്റുകളിലേക്കും പിന്തുടരുന്നു; barrel, dynamic-import പാത്തുകൾ allowlist-ൽ പരാമർശിച്ചിട്ടുള്ള ഒഴിവാക്കലുകളോടെ ഉപദേശപരമായ ഡയഗ്നോസ്റ്റിക്കുകളായി റിപ്പോർട്ട് ചെയ്യുന്നു | **ഉപദേശപരം**         |
| `Vitest (fast-path)`                             | Code PR-കൾ; വേഗത്തിലുള്ള vitest സ്യൂട്ട്                                                                                                                                                                                                                                  | അതെ                  |
| `Unit Tests fast-path`                           | Code PR-കൾ; 4-shard unit സ്യൂട്ട്                                                                                                                                                                                                                                         | അതെ                  |
| `No new ESLint warnings`                         | Code PR-കൾ; suppression-കളെ പരിഗണിക്കുന്ന lint ഗാർഡ്                                                                                                                                                                                                                      | അതെ, forks ഉൾപ്പെടെ  |
| `Merge integrity (changelog + generated skills)` | ഡ്രാഫ്റ്റ് അല്ലാത്ത PR-കൾ; changelog, generated skill സമന്വയം                                                                                                                                                                                                             | അതെ, forks ഉൾപ്പെടെ  |

#### മറന്നുപോയ sibling ടെസ്റ്റുകളുടെ റിപ്പോർട്ട്

`npm run check:forgotten-sibling-tests`, test-impact മാപ്പിന് പിന്നിലുള്ള import resolver
വീണ്ടും ഉപയോഗിക്കുന്നു. മാറ്റംവന്ന ഓരോ production മൊഡ്യൂളിനും, സാധ്യതയുള്ള ടെസ്റ്റ്
pull-request diff-ൽ ഇല്ലാത്തപ്പോൾ, നിർണായകമായ
`changed module/symbol -> static consumer -> candidate sibling test` ശൃംഖലകൾ അത് റിപ്പോർട്ട്
ചെയ്യുന്നു. തടസ്സപ്പെടുത്തുന്ന രീതിയിലുള്ള ഏതെങ്കിലും rollout-നു മുമ്പുള്ള കാലിബ്രേഷനായി,
Markdown സംഗ്രഹവും JSON ഫലവും `forgotten-sibling-tests` വർക്ക്ഫ്ലോ ആർട്ടിഫാക്റ്റായി
നിലനിർത്തുന്നു.

Barrel re-export-ുകളും dynamic import-ുകളും resolution diagnostics മാത്രമാണ്; അവ ഒരിക്കലും
തടസ്സപ്പെടുത്തുന്ന finding സൃഷ്ടിക്കില്ല. അവലോകനം ചെയ്ത exceptions
`config/quality/forgotten-sibling-allowlist.json`-ലാണ്. ഓരോ entry-യും consumer-ഉം candidate
test-ഉം വ്യക്തമാക്കുകയും, കൃത്യമായ കാരണം നൽകുകയും, ഒരു GitHub issue അല്ലെങ്കിൽ pull request-ലേക്ക് link ചെയ്യുകയും വേണം. തെറ്റായ രൂപത്തിലുള്ള entries fail
closed ചെയ്യും. ഇല്ലാതാക്കിയ candidate test-നെയോ `.skip`/`.todo` ചേർക്കുന്ന diff-നെയോ exceptions-ന് suppress ചെയ്യാനാവില്ല;
assertion ദുർബലപ്പെടുത്തലും മറ്റ് masking-ഉം സ്വതന്ത്രമായി merge തടയുന്ന
`check:test-masking` gate-ന്റെ പരിധിയിൽ തുടരും.

### Job: `lint`

`main`-ലേക്കുള്ള ഓരോ PR-ലും പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയുന്നു.

| Script (`npm run ...`)            | പരിശോധിക്കുന്നത്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | തടസ്സപ്പെടുത്തുന്നത്                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js പതിപ്പ് പിന്തുണയ്ക്കുന്ന പരിധിക്കുള്ളിലാണെന്ന്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | അതെ                                     |
| `check:cycles`                    | `src/` + `open-sse/` മുഴുവനിലുമുള്ള circular import-ുകൾ (AST-അധിഷ്ഠിതം, tsconfig `paths` resolve ചെയ്തവ). Bare = advisory, cycle-ുകൾ പട്ടികപ്പെടുത്തുന്നു. `check:cycles:ratchet` (CI പ്രവർത്തിപ്പിക്കുന്നത്) `quality-baseline.json`-ലെ `metrics.cycles` പരിധിയെ എണ്ണം കവിയുമ്പോൾ തടയുന്നു — നിലവിൽ 14, `direction: down`, അതിനാൽ അത് കുറയാൻ മാത്രമേ കഴിയൂ (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | അതെ (ratchet)                           |
| `check:route-validation:t06`      | എല്ലാ route-ുകളിലും Zod schema-കൾ ഉണ്ടെന്ന് (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` എണ്ണം budget കവിയുന്നില്ലെന്ന് (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                     |
| `check:provider-consistency`      | `providers.ts`-ലെ ഓരോ provider-നും `providerRegistry.ts`-ൽ പൊരുത്തപ്പെടുന്ന ഒരു entry ഉണ്ട് (അതുപോലെ തിരിച്ചും, allowlist-ന്റെ പരിധിക്കുള്ളിൽ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | അതെ                                     |
| `check:model-lifecycle`           | കൈകൊണ്ട് പരിപാലിക്കുന്ന മൂന്ന് routing table-കൾ checked-in lifecycle snapshot-മായി (#11503) സ്ഥിരത പുലർത്തുന്നു: `REGISTRY`-ക്ക് route ചെയ്യാൻ കഴിയുന്ന retired id ഒന്നിനും `FITNESS_TABLE` (`taskFitness.ts`) score നൽകുന്നില്ല; ഓരോ `BUILT_IN_ALIASES` target-ഉം `REGISTRY`-യിൽ ഉണ്ടായിരിക്കുകയും retired-id snapshot-ൽ ഇല്ലാതിരിക്കുകയും ചെയ്യുന്നു; `REGISTRY`-യിൽ ഇപ്പോഴും ഉള്ള ഓരോ retired id-യും forward ചെയ്യപ്പെട്ടതോ `allowedRetiredInCatalog`-ൽ ലിസ്റ്റ് ചെയ്തതോ ആണ്; കൂടാതെ `DEFAULT_DEGRADATION_MAP`-ലെ source-ഓ target-ഓ ആ snapshot-ൽ retired ആയി കാണപ്പെടുന്നില്ല. ഒരു model നിലവിൽ live upstream വഴി serve ചെയ്യപ്പെടുന്നു എന്ന് ഇത് തെളിയിക്കുന്നില്ല. Offline — `config/quality/model-lifecycle.json`-മായി താരതമ്യം ചെയ്യുന്നു; ഇത് `npm run quality:refresh-model-lifecycle` ഉപയോഗിച്ച് കൈകൊണ്ട് പുതുക്കുന്നു (network; CI-യുമായി ബന്ധിപ്പിച്ചിട്ടില്ല). `allowedRetiredInCatalog` ഒരു burn-down ratchet ആണ്: tracking issue ഉണ്ടെങ്കിൽ മാത്രം ഒരു entry ചേർക്കുക. | അതെ                                     |
| `check:fetch-targets`             | client-side `src/`-ലെ ഓരോ `fetch("/api/...")`-ഉം യഥാർത്ഥ `route.ts`-ലേക്ക് resolve ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | അതെ                                     |
| `check:deps`                      | repo-യിലെ ഓരോ `package.json`-ലുമുള്ള `npm install` ചെയ്യാവുന്ന എല്ലാ deps-ഉം `dependency-allowlist.json`-ൽ ഉണ്ട്; pin ചെയ്യാത്തതോ slopsquat ചെയ്തതോ ആയ പുതിയ package-കൾ flag ചെയ്യപ്പെടുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | അതെ                                     |
| `audit:deps`                      | `npm audit` (root) — high/critical advisory-കൾ ഒന്നുമില്ല (osv `check:vuln-ratchet`-മായി overlap ചെയ്യുന്നു; Rationalization Backlog കാണുക)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | അതെ                                     |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hash-കൾ, host override-കൾ ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                     |
| `check:licenses`                  | പ്രൊഡക്ഷൻ ഡിപെൻഡൻസികൾക്കായുള്ള SPDX ലൈസൻസ് അനുവദനീയ പട്ടിക                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                     |
| `check:tracked-artifacts`         | ബിൽഡ് ആർട്ടിഫാക്റ്റുകളോ കമ്മിറ്റ് ചെയ്ത `node_modules` സിംലിങ്കുകളോ ഇല്ല (`husky` pre-commit-ലും പ്രവർത്തിക്കുന്നു; pre-push മനഃപൂർവം ലഘുവാക്കിയിരിക്കുന്നു — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | അതെ                                     |
| `check:ai-attribution`            | PR കമ്മിറ്റുകളിലോ ശീർഷകത്തിലോ ബോഡിയിലോ AI/bot `Co-Authored-By` ട്രെയിലറോ AI-ജനറേഷൻ ഫൂട്ടറോ ഇല്ല — കർശന നിയമം #16 (`quality.yml`-ലെ PR→`release/**` fast-gates ലൂപ്പിൽ — ഇവന്റ് പേലോഡ് വായിക്കുന്നു, PR അല്ലെങ്കിൽ ഒന്നും ചെയ്യുന്നില്ല — കൂടാതെ PR→`main` എന്നതിനായുള്ള `ci.yml` lint-ലെ PR-മാത്രമായ ഘട്ടത്തിലും; `husky` `commit-msg` ഹുക്കിലും; മനുഷ്യ സഹ-രചയിതാക്കളെ അനുവദിച്ചിരിക്കുന്നു; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | ഓരോ Vitest ഒഴിവാക്കലും ഒരു ട്രാക്കിംഗ് ഇഷ്യൂ വ്യക്തമാക്കുകയും `config/quality/vitest-exclusions.json`-ൽ ഉൾപ്പെടുകയും ചെയ്യുന്നു (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                     |
| `check:file-size`                 | ഒരു സോഴ്സ് ഫയലും ഓരോ എക്സ്റ്റൻഷനുമുള്ള പരമാവധി പരിധി കവിയുന്നില്ല (റാച്ചറ്റ്: `frozen` പട്ടികയിലെ സ്ഥിരപ്പെടുത്തിയ വലിയ ഫയലുകൾ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | അതെ                                     |
| `check:error-helper`              | executors/handlers-ലെ പിശക് പ്രതികരണങ്ങൾ `buildErrorBody()` / `sanitizeErrorMessage()` ഉപയോഗിക്കുന്നു (കർശന നിയമം #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | അതെ                                     |
| `check:migration-numbering`       | Migration SQL ഫയലുകൾ വിടവുകളോ തനിപ്പകർപ്പുകളോ ഇല്ലാതെ ക്രമാനുഗതമായി നമ്പർ ചെയ്തിരിക്കുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | അതെ                                     |
| `check:public-creds`              | `publicCreds.ts`-ന് പുറത്ത് അക്ഷരാർഥത്തിലുള്ള OAuth `client_id`/`client_secret` അല്ലെങ്കിൽ Firebase Web കീകൾ ഇല്ല (കർശന നിയമം #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | അതെ                                     |
| `check:db-rules`                  | `src/lib/db/` മൊഡ്യൂളുകൾക്ക് പുറത്ത് അസംസ്കൃത SQL ഇല്ല; `localDb.ts`-ൽ നിന്ന് barrel-import-കൾ ഇല്ല (കർശന നിയമങ്ങൾ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | അതെ                                     |
| `check:known-symbols`             | അവയുടെ dispatch ടേബിളുകളിൽ രജിസ്റ്റർ ചെയ്തിരിക്കുന്ന provider executors, routing strategies, translators എന്നിവ ഡിസ്കിലുള്ള ഫയലുകളുമായി പൊരുത്തപ്പെടുന്നു — അനാഥമായതോ പ്രഖ്യാപിക്കാത്തതോ ആയ symbols ഇല്ല                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                     |
| `check:route-guard-membership`    | child process സൃഷ്ടിക്കുന്ന എല്ലാ route-കളും `isLocalOnlyPath()` പ്രകാരം വർഗ്ഗീകരിച്ചിരിക്കുന്നു (കർശന നിയമങ്ങൾ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | അതെ                                     |
| `check:test-discovery`            | repo-യിലെ ഓരോ `*.test.ts` / `*.spec.ts` ഫയലും കുറഞ്ഞത് ഒരു test runner എങ്കിലും ശേഖരിക്കുന്നു (ratchet: `test-discovery-baseline.json`-ലെ orphan list ചുരുങ്ങാൻ മാത്രമേ കഴിയൂ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | അതെ                                     |
| `check:agent-skills-sync`         | സൃഷ്ടിച്ച agent-skills ആർട്ടിഫാക്റ്റുകൾ അവയുടെ സോഴ്സ് കാറ്റലോഗുമായി പൊരുത്തപ്പെടുന്നു (വ്യതിയാനമില്ല)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Provider ലോഗോകൾക്കും അസറ്റുകൾക്കും രേഖപ്പെടുത്തിയ provenance എൻട്രിയുണ്ട്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON കോൺഫിഗ് ഫയലുകൾ പാഴ്സ് ചെയ്യപ്പെടുകയും repo lint നിയമങ്ങൾ പാലിക്കുകയും ചെയ്യുന്നു                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | പിശകുകളില്ലാതെയുള്ള TypeScript കമ്പൈലേഷൻ (ഉപദേശക മുന്നറിയിപ്പുകൾ മാത്രം)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ഉണ്ട്                                   |
| `typecheck:noimplicit:core`       | കർശനമായ `noImplicitAny` — ഭാവിയെ ലക്ഷ്യമിട്ടുള്ളത്; മുമ്പേ നിലവിലുള്ള നിരവധി call site-കൾക്ക് ഇപ്പോഴും annotations ആവശ്യമാണ്                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **ഉപദേശകം** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-ലേക്ക് പരിമിതപ്പെടുത്തിയ `tsc` (#7033) — `typecheck:core`-ന്റെ ശ്രദ്ധാപൂർവം തിരഞ്ഞെടുത്ത 27-ഫയൽ allowlist-ൽ dashboard TSX ഒന്നും ഉൾപ്പെടുന്നില്ല; കൂടാതെ `next build` അതിനെ ഒരിക്കലും type-check ചെയ്യുന്നുമില്ല (`next.config.mjs`-ൽ `ignoreBuildErrors: true` സജ്ജീകരിച്ചിരിക്കുന്നു). അതിനാൽ അവിടെയുള്ള orphaned-identifier regressions (#6625/#6909) CI-ക്ക് ദൃശ്യമായിരുന്നില്ല. ഓരോ ഫയലിലെയും/ഓരോ TS കോഡിലെയും എണ്ണം അടിസ്ഥാനമാക്കിയുള്ള, മാറ്റമില്ലാതെ സൂക്ഷിച്ച baseline-നോട് (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`-ലെ അതേ stale-enforcement രീതി) വ്യത്യാസങ്ങൾ താരതമ്യം ചെയ്യുന്നു — baseline എണ്ണത്തിന് അപ്പുറമുള്ള പുതിയ പിശകുകൾ മാത്രം gate പരാജയപ്പെടുത്തും; മുമ്പേ നിലവിലുള്ള ഒരു പിശക് പരിഹരിക്കുമ്പോൾ `--update` ഉപയോഗിച്ച് baseline ക്രമേണ കുറയ്ക്കുക.                                                                                                                                                  | ഉണ്ട്                                   |

### Job: `quality-gate`

`test-coverage`-ന് ശേഷം പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയുന്നു.

| സ്ക്രിപ്റ്റ്                 | സാധൂകരിക്കുന്നത്                                                                                                                                                                                         | തടസ്സപ്പെടുത്തുന്നത്         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` സൃഷ്ടിക്കുന്നു (ESLint മുന്നറിയിപ്പുകളുടെ എണ്ണം, ലയിപ്പിച്ച shard റിപ്പോർട്ടിൽ നിന്നുള്ള coverage)                                                                                | അതെ (ratchet-ന് മുമ്പുള്ളത്) |
| `quality:ratchet`            | `quality-baseline.json`-ലെ ഓരോ metric-ഉം മോശമായിട്ടില്ല (ESLint മുന്നറിയിപ്പുകൾ ≤ baseline; coverage ≥ baseline)                                                                                         | അതെ                          |
| `check:duplication`          | കോഡ് ആവർത്തനം (jscpd@4) `quality-baseline.json`-ലെ baseline കവിയുന്നില്ല                                                                                                                                 | അതെ                          |
| `check:complexity`           | ഫയൽ-തല cyclomatic complexity പരിധി കവിയുന്നില്ല (core ESLint `complexity` + `max-lines-per-function`)                                                                                                    | അതെ                          |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — പ്രത്യേക ESLint pass; CI ഇവ രണ്ടും ലയിപ്പിച്ച് ഒരൊറ്റ `check:complexity-ratchets` ഘട്ടമായി പ്രവർത്തിപ്പിക്കുന്നു                                | അതെ                          |
| `check:dead-code`            | ഉപയോഗിക്കാത്ത exports / files ratchet (knip) baseline-നെ അപേക്ഷിച്ച് മോശമാകുന്നില്ല                                                                                                                      | അതെ                          |
| `check:compression-budget`   | Compression benchmark budget — ഓരോ engine-ന്റെയും token-savings കുറഞ്ഞ പരിധികൾ മോശമാകരുത്                                                                                                                | അതെ                          |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) മോശമാകുന്നില്ല; `typecheck:noimplicit:core`-നെ വലിയ തോതിൽ ഉൾക്കൊള്ളുന്നു                                                                                         | അതെ                          |
| `check:codeql-ratchet`       | തുറന്ന CodeQL alert-ുകളുടെ എണ്ണം മോശമാകുന്നില്ല (`gh api` വഴി വായിക്കുന്നു; token ഇല്ലെങ്കിൽ തടസ്സമില്ലാതെ skip ചെയ്യുന്നു) — പുതുക്കൽ ഇടവേളയ്ക്കും manual trigger-നും: താഴെയുള്ള "CodeQL ratchet" കാണുക | അതെ                          |

### Job: `quality-extended`

മുഴുവൻ job-ഉം ഉപദേശാത്മകമാണ് (`continue-on-error: true`). npm അടിസ്ഥാനമാക്കിയുള്ള ratchet-ുകൾ
യഥാർത്ഥത്തിൽ പ്രവർത്തിക്കുന്നു; ബാഹ്യ scanner-ുകൾ `gh release download` വഴി install ചെയ്യുകയും binary
ഇപ്പോഴും ലഭ്യമല്ലെങ്കിൽ സ്വയം skip ചെയ്യുകയും ചെയ്യുന്നു (exit 0).

| സ്ക്രിപ്റ്റ്             | സാധൂകരിക്കുന്നത്                                                                                                                                                                                                                                          | തടസ്സപ്പെടുത്തുന്നത്                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:circular-deps`    | Circular dependency-കൾ ഇല്ല (dpdm)                                                                                                                                                                                                                        | **ഉപദേശാത്മകം**                                             |
| `check:bundle-size`      | Bundle വലുപ്പം പരിധി കവിയുന്നില്ല                                                                                                                                                                                                                         | **ഉപദേശാത്മകം**                                             |
| `check:secrets`          | രഹസ്യവിവരങ്ങൾക്കായുള്ള scanning (gitleaks) — binary ഇല്ലെങ്കിൽ skip ചെയ്യുന്നു                                                                                                                                                                            | **ഉപദേശാത്മകം**                                             |
| `check:vuln-ratchet`     | Dependency vulnerability-കൾ (osv-scanner) മോശമാകുന്നില്ല — binary ഇല്ലെങ്കിൽ skip ചെയ്യുന്നു                                                                                                                                                              | **ഉപദേശാത്മകം**                                             |
| `check:workflows`        | Workflow lint (actionlint + zizmor); ലഭ്യമല്ലാത്ത/തകരാറിലായ scanner-ുകൾ, അസാധുവായ report-ുകൾ, അല്ലെങ്കിൽ ലഭ്യമല്ലാത്ത ratchet baseline എന്നിവ INCOMPLETE ആയി പരാജയപ്പെടുന്നു. സാധുവായ കണ്ടെത്തലുകൾ തിരഞ്ഞെടുത്ത strict/advisory/ratchet നയം പിന്തുടരുന്നു | നിർവഹണം നിർബന്ധം; CI-യിൽ zizmor ratchet തടസ്സപ്പെടുത്തുന്നു |
| `check:openapi-breaking` | അടിസ്ഥാന branch-നെ അപേക്ഷിച്ച് public API contract-ലുള്ള (`openapi.yaml`) breaking change-ുകൾ (oasdiff) — `openapiBreaking=N` സൃഷ്ടിക്കുന്നു; oasdiff ഇല്ലെങ്കിലോ അടിസ്ഥാന spec പരിഹരിക്കാനാകുന്നില്ലെങ്കിലോ skip ചെയ്യുന്നു                              | **ഉപദേശാത്മകം**                                             |

### Job: `docs-sync-strict`

`main`-ലേക്കുള്ള ഓരോ PR-ലും പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയുന്നു.

| സ്ക്രിപ്റ്റ്                   | പരിശോധിക്കുന്നത്                                                                                                                                                              | തടയുന്നത്                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | താഴെയുള്ള 6 ഉപ-ഗേറ്റുകൾ ക്രമാനുസൃതമായി പ്രവർത്തിപ്പിക്കുന്ന മെറ്റാ-ഗേറ്റ്                                                                                                     | അതെ                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt പതിപ്പുകളുടെ സ്ഥിരത                                                                                                                             | അതെ                         |
| ↳ `check:docs-counts`          | ഗദ്യത്തിലെ എണ്ണങ്ങൾ (പ്രൊവൈഡർ എണ്ണം, മൈഗ്രേഷൻ എണ്ണം മുതലായവ) യഥാർഥ എണ്ണങ്ങളുടെ റാച്ചറ്റ് പരിധിക്കുള്ളിലാണെന്ന്                                                                | അതെ                         |
| ↳ `check:env-doc-sync`         | `.env.example`-ലെ എല്ലാ env var-കളും docs പട്ടികയിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ടെന്നും തിരിച്ചും അങ്ങനെ തന്നെയാണെന്നും                                                              | അതെ                         |
| ↳ `check:deprecated-versions`  | docs-ൽ ഒഴിവാക്കിയ പതിപ്പ് സ്ട്രിങ്ങുകൾ ഇല്ലെന്ന്                                                                                                                              | അതെ                         |
| ↳ `check:doc-links`            | docs-ലെ ആന്തരിക markdown ലിങ്കുകൾ യഥാർഥ ഫയലുകളിലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് (`[text]`/`(path)` രൂപം)                                                                      | അതെ                         |
| ↳ `check:fabricated-docs`      | docs-ൽ പരാമർശിച്ച routes, env var-കൾ, CLI കമാൻഡുകൾ, hook പേരുകൾ, file path-കൾ എന്നിവ codebase-ൽ നിലവിലുണ്ടെന്ന്. `--strict` വഴി ഹാർഡ് ഗേറ്റ്; ഫ്ലാഗില്ലെങ്കിൽ സോഫ്റ്റ്-ഫെയിൽ. | അതെ (CI-യിൽ `--strict` വഴി) |
| `check:cli-i18n`               | CLI കമാൻഡ് സ്ട്രിങ്ങുകൾ എല്ലാ i18n locale ഫയലുകളിലും ഉണ്ടെന്ന്                                                                                                                | അതെ                         |
| `check:openapi-coverage`       | OpenAPI spec യഥാർഥ routes-ന്റെ കുറഞ്ഞത് റാച്ചറ്റ് ചെയ്ത അടിസ്ഥാനപരിധിയെങ്കിലും ഉൾക്കൊള്ളുന്നുവെന്ന്                                                                           | അതെ                         |
| `check:openapi-security-tiers` | `openapi.yaml`-ലെ സുരക്ഷാ ടയർ annotations `routeGuard.ts` വർഗ്ഗീകരണങ്ങളുമായി പൊരുത്തപ്പെടുന്നുവെന്ന്                                                                          | **ഉപദേശാത്മകം**             |
| `check:openapi-routes`         | `openapi.yaml`-ലെ ഓരോ path-ഉം യഥാർഥ `route.ts`-ലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് (വ്യാജസൃഷ്ടി തടയൽ)                                                                            | അതെ                         |
| `check:docs-symbols`           | `docs/**/*.md`-ലെ ഓരോ `/api/...` പരാമർശവും യഥാർഥ `route.ts`-ലേക്ക് പരിഹരിക്കപ്പെടുന്നുവെന്ന് (വ്യാജസൃഷ്ടി തടയൽ)                                                               | അതെ                         |
| `i18n translation drift`       | i18n locale ഫയലുകളിലെ പരിഭാഷപ്പെടുത്താത്ത keys — മുന്നറിയിപ്പ് മാത്രം                                                                                                         | **ഉപദേശാത്മകം**             |

### ജോലി: `i18n-ui-coverage`

| സ്ക്രിപ്റ്റ്                      | പരിശോധിക്കുന്നത്                                                                                                                                                                     | തടയുന്നത്       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key കവറേജ് ≥ 65% ആണെന്ന്                                                                                                                                                     | അതെ             |
| `check-ui-value-drift` (inline)   | തിരുത്തിയെഴുതിയ ഒരു ഇംഗ്ലീഷ് **value** പഴകിയ പരിഭാഷയൊന്നും ശേഷിപ്പിക്കുന്നില്ലെന്ന്                                                                                                  | അതെ             |
| `check-new-key-coverage` (inline) | ഒരു **പുതിയ** ഇംഗ്ലീഷ് key എല്ലാ locale-ലും പരിഭാഷപ്പെടുത്തിയിട്ടുണ്ടെന്ന് — `__MISSING__:` marker നിരസിക്കപ്പെടും                                                                   | അതെ             |
| `check-translation-ratio`         | ഓരോ locale-ലെയും യഥാർഥ-പരിഭാഷ അനുപാതം (allowlist-ന് പുറത്തുള്ള ഇംഗ്ലീഷിനോട് സമാനമായ / placeholder / നഷ്ടമായ leaves) `config/quality/i18n-translation-baseline.json` + slack കവിയരുത് | **ഉപദേശാത്മകം** |

`fetch-depth: 0` ആവശ്യമാണ് — value-drift ഗേറ്റ് merge base-നെതിരെ `en.json` diff ചെയ്യുന്നു.

#### `check-ui-value-drift` — പഴകിയ-പരിഭാഷാ ഗേറ്റ്

മറ്റ് ഗേറ്റുകൾക്ക് ഘടനാപരമായി കാണാൻ കഴിയാത്ത ഒരേയൊരു i18n regression ഇത് കണ്ടെത്തുന്നു: ഒരു ഇംഗ്ലീഷ് value
തിരുത്തിയെഴുതിയിട്ടും _മുമ്പത്തെ_ ഇംഗ്ലീഷ് value-യിൽ നിന്ന് ഉരുത്തിരിഞ്ഞ പരിഭാഷകൾ അവിടെത്തന്നെ ശേഷിക്കുന്നു; അതിനാൽ
ഇംഗ്ലീഷിതര ഉപയോക്താക്കൾ ആത്മവിശ്വാസത്തോടെ എഴുതപ്പെട്ടതെങ്കിലും ഇപ്പോൾ തെറ്റായ ഉള്ളടക്കം തുടർന്നും വായിക്കുന്നു.

ഇത് യഥാർഥത്തിൽ റിലീസ് ചെയ്യപ്പെട്ടു. Antigravity login helper ചേർത്തപ്പോൾ (#5203)
`oauthModal.googleOAuthWarning` തിരുത്തിയെഴുതപ്പെട്ടു; **43 locale-കളിൽ 39 എണ്ണത്തിലും** ഓപ്പറേറ്റർമാരോട് "പൂർണ്ണ URL
പകർത്തി താഴെ ഒട്ടിക്കുക" എന്ന് പറയുന്ന വാചകം നിലനിന്നു — ആ provider-നായി പൂർത്തിയാക്കാനാകാത്ത ഒരു flow. #8463 വരെ
ഇത് ശ്രദ്ധിക്കപ്പെടാതെ പോയതിന്റെ കാരണങ്ങൾ:

- `sync-ui-keys` **ഇല്ലാത്ത** keys മാത്രമേ backfill ചെയ്യൂ, **പഴകിയവ** ഒരിക്കലും ചെയ്യില്ല;
- `check-ui-keys-coverage` key-യുടെ _സാന്നിധ്യം_ എണ്ണുന്നതിനാൽ, പഴകിയ പരിഭാഷയും ഉൾപ്പെടുത്തിയതായി കണക്കാക്കപ്പെടുന്നു;
- `check-translation-drift` `docs/i18n/<locale>/**.md` documentation mirrors ആണ് ട്രാക്ക് ചെയ്യുന്നത് —
  അത് ഒരിക്കലും `src/i18n/messages/*.json` വായിക്കുന്നില്ല. 2026-09 re-sync മുതൽ `docs-sync-strict` ജോലിയിൽ തടയുന്നു:
  ഒരു core doc തിരുത്തുക → `npm run i18n:run -- --files=<doc>` (section-level, ചെലവുകുറഞ്ഞത്).

**Diff-aware ആണ്, baseline-backed അല്ല.** ഇത് merge base-ലെ `en.json`-നെ working tree-യുമായി താരതമ്യം ചെയ്യുന്നു; ഇംഗ്ലീഷ് മൂല്യം മാറിയ ഓരോ key-ക്കും, മാറ്റമൊന്നും വരുത്താത്ത translation ഇപ്പോഴും കൈവശമുള്ള locale കാലഹരണപ്പെട്ടതായി കണക്കാക്കുന്നു. ഇത് മനഃപൂർവം **നിലവിലുള്ള കടബാധ്യതയെ അതേപടി നിർത്തുന്നു** — ദീർഘകാലമായി നിലനിൽക്കുന്ന ഒരു translation ഏത് പഴയ ഇംഗ്ലീഷ് മൂല്യത്തിൽനിന്ന് വന്നതാണെന്ന് diff-ന് വെളിപ്പെടുത്താനാകില്ല; അതിനാൽ നിലവിലെ മാറ്റം സ്പർശിക്കുന്നവയെ മാത്രമാണ് gate വിലയിരുത്തുന്നത്. ബദൽ മാർഗമായ (ഓരോ key-ക്കും hash baseline) ഏകദേശം 600 KB വലുപ്പമുള്ള generated file ആവശ്യപ്പെടും; ഇത് നിലവിലുള്ള ഏറ്റവും വലിയ baseline-ന്റെ 3 മടങ്ങാണ്, കൂടാതെ ഓരോ i18n PR-ലും അനാവശ്യ മാറ്റങ്ങൾ സൃഷ്ടിക്കും.

ഇത് പാലിക്കാൻ രണ്ട് മാർഗങ്ങളുണ്ട്:

1. ബാധിക്കപ്പെട്ട translations പുതുക്കുക, അല്ലെങ്കിൽ
2. അവയെ `__MISSING__:<new english>` ആയി സജ്ജീകരിക്കുക — തുടർന്ന് runtime തിരുത്തിയ ഇംഗ്ലീഷ് നൽകുകയും
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ആ key translation-നുള്ള queue-യിൽ ചേർക്കുകയും ചെയ്യും.

string-ന്റെ **അർത്ഥം** മാറിയിട്ടുണ്ടെങ്കിൽ, **key-യുടെ പേര് മാറ്റുന്നതിന്** മുൻഗണന നൽകുക: ഒരു പുതിയ key-ക്ക് കാലഹരണപ്പെട്ട translation പാരമ്പര്യമായി ലഭിക്കാനാവില്ല. #8463 ഉപയോഗിച്ച മാതൃക അതാണ്.

```bash
npm run i18n:check-value-drift          # കർശനം (CI പ്രവർത്തിപ്പിക്കുന്നത്)
npm run i18n:check-value-drift:warn     # റിപ്പോർട്ട് മാത്രം
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

base catalog വായിക്കാനാകാത്തപ്പോൾ (base ref ഇല്ലാത്ത shallow clone), `check-openapi-breaking`-ന്റെ പ്രവർത്തനം അനുകരിച്ച് `SKIP reason=base-unresolved` സഹിതം 0 exit code നൽകുന്നു.

### Job: `i18n`

സമ്പൂർണ്ണ i18n validation matrix (ഓരോ locale-നും ഓരോ job). മുഴുവൻ job-വും advisory ആണ്.

| Script                          | പരിശോധിക്കുന്നത്                             | Blocking                                                |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | ഓരോ locale-ലെയും translation-ന്റെ സമ്പൂർണ്ണത | **Advisory** (മുഴുവൻ job-ലും `continue-on-error: true`) |

### Job: `pr-test-policy`

pull request-ുകളിൽ മാത്രം പ്രവർത്തിക്കുന്നു.

| Script                 | പരിശോധിക്കുന്നത്                                                                                                                                  | Blocking |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, അല്ലെങ്കിൽ `bin/` എന്നിവയിലെ production code മാറ്റുന്ന PR-ുകളിൽ tests ഉൾപ്പെടുത്തുകയോ പുതുക്കുകയോ വേണം (Hard Rule #8)        | അതെ      |
| `check:test-masking`   | മാറ്റിയ test files ആകെ assert count കുറയ്ക്കുകയോ `assert.ok(true)` tautologies ചേർക്കുകയോ ചെയ്യുന്നില്ല                                           | അതെ      |
| `check:pr-evidence`    | മാറ്റത്തിനുള്ള test/VPS തെളിവുകൾ PR body-ൽ ഉദ്ധരിക്കുന്നു (PR prose grep ചെയ്ത് Hard Rule #18 യാന്ത്രികമാക്കുന്നു — ഇത് ദുർബലമാണ്; Backlog കാണുക) | അതെ      |

### Job: `test-vitest`

`build`-ന് ശേഷം പ്രവർത്തിക്കുന്നു. പരാജയപ്പെട്ടാൽ merge തടയുന്നു.

| Suite            | പരിശോധിക്കുന്നത്                                         | Blocking                                                                                                                             |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | അതെ                                                                                                                                  |
| `test:vitest:ui` | UI component tests — vitest runner                       | **Blocking** — മുമ്പേ നിലവിലുള്ള failures `vitest.config.ts`-ൽ വ്യക്തമായി ഒഴിവാക്കിയിരിക്കുന്നു; പുതിയ failures job പരാജയപ്പെടുത്തും |

### Nightly workflows (scheduled, advisory)

ഇവ cron schedule-ൽ (കൂടാതെ `workflow_dispatch` വഴിയും) പ്രവർത്തിക്കുന്നു; PR-ുകളിൽ ഒരിക്കലും പ്രവർത്തിക്കില്ല. എല്ലാം advisory ആണ്.

| Workflow               | പരിശോധിക്കുന്നത്                                                                                                                                                            | Blocking     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | random seed-ഉം ഉയർന്ന run count-ഉം ഉപയോഗിച്ചുള്ള fast-check property tests                                                                                                  | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                       | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret ഇല്ലെങ്കിൽ ഒഴിവാക്കപ്പെടും)                                                                          | **Advisory** |
| `nightly-schemathesis` | `docs/openapi.yaml` ഉപയോഗിച്ച് live OmniRoute-നെതിരെയുള്ള OpenAPI contract fuzzing (schemathesis) — spec ലംഘനങ്ങൾ / കൈകാര്യം ചെയ്യാത്ത 500s വെളിപ്പെടുത്തുന്നു (Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | വേഗത്തിലുള്ള unit lane-ലെ Stryker mutation-testing score — അതിജീവിക്കുന്ന mutants ദുർബലമായ asserts വെളിപ്പെടുത്തുന്നു                                                       | **Advisory** |
| `nightly-compat`       | പിന്തുണയ്ക്കുന്ന `engines.node` ranges-ലുടനീളമുള്ള Node engine compatibility matrix                                                                                         | **Advisory** |

---

## വേഗതാ ഘട്ടം (2026-08-30 → v4.0 LTS): എല്ലാ ബേസ്ലൈനുകളും 20% ഇളവുചെയ്തു

ഉടമയുടെ തീരുമാനം (2026-08-30): v4.0 മോഡുലറൈസേഷൻ വരെ, സാങ്കേതിക കടം നിയന്ത്രിക്കുന്നതിനേക്കാൾ
വേഗത്തിൽ റിലീസ് ചെയ്യുന്നതിനാണ് പ്രാധാന്യം. എല്ലാ **സംഖ്യാപരമായ** റാച്ചറ്റ് ബേസ്ലൈനുകളും ഓഡിറ്റ് ചെയ്യാവുന്ന
ഒറ്റ നടപടിയിൽ 20% ഇളവുചെയ്തു; ഈ ഘട്ടം `config/quality/quality-baseline.json`-ൽ പ്രഖ്യാപിച്ചിരിക്കുന്നു:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| എന്താണ് മാറിയത്                                                                                                                                                                                                                | എവിടെ                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — കുറഞ്ഞതാണു മെച്ചം എന്ന കൗണ്ടുകൾ ×1.2, ഉയർന്നതാണു മെച്ചം എന്ന ശതമാനങ്ങൾ ÷1.2 (കവറേജ് പരിധി 60 ആയി നിലനിർത്തി, `eslintErrors` 0 ആയി തുടരുന്നു, `eslintWarnings` 0 → ഫ്രീസ് ചെയ്ത suppression കൗണ്ടിന്റെ 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` കുറിപ്പിൽ ഓരോ മാറ്റത്തിന്റെയും മുമ്പ് → ശേഷം മൂല്യങ്ങൾ നൽകിയിരിക്കുന്നു) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                                        |
| `cap`, `testCap`, എല്ലാ `frozen[*]` / `testFrozen[*]` വരി പരിധികളും ×1.2                                                                                                                                                       | `file-size-baseline.json`                                                                                                      |
| ഓരോ ഫയലിലെയും / ഓരോ TS കോഡിലെയും കൗണ്ടുകൾ ×1.2                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`                         |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                                                     |
| `_policy.requireTighten === false` ആയിരിക്കുമ്പോൾ `--require-tighten` ഉപദേശാത്മകമാകുന്നു                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                                                    |
| രാത്രികാല `bank-ratchet-shrinks` താൽക്കാലികമായി നിർത്തുന്നു (അത് അളന്ന ചുരുക്കം ബാങ്ക് ചെയ്ത് ലഭ്യമായ അധികപരിധി ഇല്ലാതാക്കും)                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                                                  |

അനുവദനീയ പട്ടികകൾ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ബജറ്റുകളല്ല, അതിനാൽ അവയിൽ മാറ്റം വരുത്തിയിട്ടില്ല. വിജയ/പരാജയ നയ ഗേറ്റുകൾ (രഹസ്യങ്ങൾ, SQL നിയമങ്ങൾ,
ഡോക്സ്/env കരാർ, i18n തുല്യത, യൂണിറ്റ് ടെസ്റ്റുകൾ) മാറ്റമില്ലാതെ തുടരുന്നു — പരാജയപ്പെട്ട ടെസ്റ്റ് ഇപ്പോഴും പരാജയപ്പെട്ട ടെസ്റ്റ് തന്നെയാണ്.

**ടൂളിംഗ്**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ഒറ്റത്തവണത്തെ
  ഇളവുനൽകൽ (`scripts/quality/relax-baselines.mjs`); ഒരേ കുറിപ്പ് ഉപയോഗിച്ച് രണ്ടുതവണ പ്രവർത്തിക്കാൻ അനുവദിക്കില്ല.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI അളക്കുന്ന അതേ രീതിയിൽ എല്ലാ സംഖ്യാപരമായ ഗേറ്റുകളും അളക്കുകയും ഓരോ ഗേറ്റിലും ശേഷിക്കുന്ന അധികപരിധി പ്രിന്റ് ചെയ്യുകയും ചെയ്യുന്നു
  (`scripts/quality/baseline-headroom.mjs`). രാത്രികാല `baseline-headroom` ജോലി, സജീവമായി പരിപാലിക്കുന്ന
  **📈 Baseline headroom (velocity phase)** ഇഷ്യൂവിലേക്ക് പട്ടിക പോസ്റ്റ് ചെയ്യുകയും ഏതെങ്കിലും ഗേറ്റ് അതിന്റെ
  പരിധിയുടെ 10%-ത്തിനുള്ളിലോ ഇതിനകം പരിധി കവിഞ്ഞോ ആണെങ്കിൽ `headroom-alert` ലേബൽ ചേർക്കുകയും ചെയ്യുന്നു. ആ ഇഷ്യൂ
  മുൻകൂർ മുന്നറിയിപ്പാണ്: ദിവസങ്ങൾക്കുള്ളിൽ നിറയുന്ന ഒരു ബജറ്റ് അർത്ഥമാക്കുന്നത് ഇളവ് മുഴുവൻ ടീമും ഉപയോഗിക്കുന്നതിനു പകരം
  ഏതാനും PR-കൾ ഉപയോഗിച്ചുതീർക്കുന്നു എന്നാണ് — പ്രശ്നമുള്ള ഗേറ്റിന്റെ `_rebaseline_*` കുറിപ്പുകൾ പരിശോധിക്കുക.

**പുതിയ-കോഡ് മോഡ് (Clean-as-You-Code) — 2026-08-30 മുതൽ, PR ഫാസ്റ്റ്-പാത്തിന് മാത്രം**

`pull_request` ഇവന്റുകളിൽ `quality.yml`, `check:file-size`,
`check:complexity-ratchets`, `check:dead-code` എന്നിവയ്ക്ക് `--base-ref <PR base SHA>` കൈമാറുന്നു. ആ മോഡിൽ, ഗേറ്റ് HEAD-നെ
മെർജ്-ബേസുമായി താരതമ്യം ചെയ്യുന്നു, എന്നാൽ **PR മാറ്റം വരുത്തിയ ഫയലുകളിൽ മാത്രം പരിമിതപ്പെടുത്തുന്നു** (`scripts/check/newCodeMode.mjs`:
മെർജ്-ബേസ് ഒരു താൽക്കാലിക `git worktree`-യിൽ സൃഷ്ടിക്കുന്നു; ESLint/knip അവിടെയും HEAD-ലും പ്രവർത്തിപ്പിച്ച്
ഓരോ ഫയലിലെയും കൗണ്ടുകളുടെ വ്യത്യാസം കണക്കാക്കുന്നു):

- **തടയുന്നത്** — PR മാറ്റം വരുത്തിയ ഫയലുകളിൽ സൈക്ലോമാറ്റിക്/കോഗ്നിറ്റീവ് ലംഘനങ്ങളോ ഡെഡ് എക്സ്പോർട്ടുകളോ ചേർത്തു
  (ലോഗിലെ `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **ഉപദേശാത്മകം** — ഫ്രീസ് ചെയ്ത ബേസ്ലൈനുമായി താരതമ്യപ്പെടുത്തിയ ആഗോള മൊത്തം. പാരമ്പര്യമായി ലഭിച്ച ഡ്രിഫ്റ്റ് ഒരു
  കുറ്റമില്ലാത്ത PR-നെ ഒരിക്കലും പരാജയപ്പെടുത്തില്ല; റിലീസ് റീകൺസിലിയേഷനിൽ ഡ്രിഫ്റ്റ് വീണ്ടും ഫ്രീസ് ചെയ്യുകയും headroom ജോലി നിരീക്ഷിക്കുകയും ചെയ്യും.

`workflow_dispatch` റണ്ണുകൾക്കും, release-green സ്വീപ്പിനും, രാത്രികാല headroom ജോലിക്കും PR ബേസ് ഇല്ലാത്തതിനാൽ
അവ കേവല (ആഗോള) താരതമ്യം നിലനിർത്തുന്നു. കവറേജ്, ഡ്യൂപ്ലിക്കേഷൻ, ടൈപ്പ്-കവറേജ് എന്നിവ ഇപ്പോൾ ആഗോളമായി തന്നെ തുടരുന്നു
(അവയുടെ ടൂളുകൾ കുറഞ്ഞ ചെലവിൽ ഓരോ ഫയലിലെയും വ്യത്യാസം നൽകുന്നില്ല) — അതേ രീതിയിൽ കൈകാര്യം ചെയ്യാനുള്ള സാധ്യതയുള്ളവയാണ് ഇവ.

**v4.0-ൽ ഘട്ടം അവസാനിപ്പിക്കൽ (LTS = മുമ്പത്തേക്കാൾ കർശനം, "സാധാരണ നിലയിലേക്കുള്ള മടക്കം" അല്ല)**

1. മാറ്റങ്ങളൊന്നുമില്ലാത്ത `release/v4.0.0` ടിപ്പിൽ: രേഖയ്ക്കായി `npm run quality:headroom --json` പ്രവർത്തിപ്പിക്കുക, തുടർന്ന്
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ഓരോ typecheck ഗേറ്റിന്റെയും
   `--update` പ്രവർത്തിപ്പിക്കുക — എല്ലാ baseline-ഉം അളന്ന മൂല്യത്തിലേക്ക് താഴുന്നു.
2. `quality-baseline.json`-ൽ നിന്ന് `_policy` ഇല്ലാതാക്കുക (`--require-tighten`-ഉം രാത്രികാല
   banking-ഉം വീണ്ടും സജ്ജമാക്കുന്നു), `check-openapi-coverage.mjs`-ൽ `THRESHOLD = 36` (അല്ലെങ്കിൽ അതിലും ഉയർന്നത്) പുനഃസ്ഥാപിക്കുക.
3. modularization പ്രയോജനപ്പെട്ടിടങ്ങളിൽ അളന്ന മൂല്യത്തേക്കാൾ കൂടുതൽ കർശനമാക്കുക: file-size `cap` വീണ്ടും 1000
   (അല്ലെങ്കിൽ 800) ആക്കുക, coverage floor-കൾ +5 ആക്കുക, modularize ചെയ്ത package-ുകൾക്ക് dead export-ുകൾ 0 ആക്കുക.

## റാച്ചറ്റ് ബേസ്ലൈൻ (`quality-baseline.json`)

റാച്ചറ്റ് എൻജിൻ (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` വായിക്കുകയും
പുതുതായി ശേഖരിച്ച `quality-metrics.json`-മായി അതിനെ താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു. അനുവദനീയമായ എപ്സിലോണിനപ്പുറം
പിന്നോട്ട് പോകുന്ന ഏതൊരു മെട്രിക്കും ബിൽഡ് പരാജയപ്പെടാൻ കാരണമാകും.

നിലവിൽ ട്രാക്ക് ചെയ്യുന്ന മെട്രിക്കുകൾ:

| മെട്രിക്              | ദിശ    | അർത്ഥം                                  |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint മുന്നറിയിപ്പുകളുടെ എണ്ണം കൂടരുത് |
| `coverage.statements` | `up`   | സ്റ്റേറ്റ്മെന്റ് കവറേജ് കുറയരുത്        |
| `coverage.lines`      | `up`   | ലൈൻ കവറേജ് കുറയരുത്                     |
| `coverage.functions`  | `up`   | ഫംഗ്ഷൻ കവറേജ് കുറയരുത്                  |
| `coverage.branches`   | `up`   | ബ്രാഞ്ച് കവറേജ് കുറയരുത്                |

യഥാർഥമായൊരു മെച്ചപ്പെടുത്തലിനുശേഷം ബേസ്ലൈൻ പുതുക്കാൻ:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ഫ്ലാഗ് നിലവിൽ അളന്ന മൂല്യങ്ങൾ `quality-baseline.json`-ലേക്ക് എഴുതുന്നു.
മെട്രിക് മെച്ചപ്പെടുത്തിയ മാറ്റത്തോടൊപ്പം ഈ ഫയലും കമ്മിറ്റ് ചെയ്യുക. ബേസ്ലൈൻ പുതുക്കാതെ
ഒരു മെട്രിക് മെച്ചപ്പെടുത്തുന്ന PR, `--require-tighten` വഴി കണ്ടെത്തപ്പെടും (ഘട്ടം 6A.5,
നടപ്പാക്കൽ ശേഷിക്കുന്നു).

### CodeQL റാച്ചറ്റ്: പുതുക്കൽ ആവൃത്തിയും മാനുവൽ ട്രിഗറും

`check:codeql-ratchet` വായിക്കുന്നത് **ഒരു ഷെഡ്യൂൾ അനുസരിച്ച് പുതുക്കുന്ന റിപ്പോയുടെ അവസ്ഥയാണ് — ഓരോ PR-നും പ്രത്യേകം അല്ല.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` റിപ്പോർട്ട് ചെയ്യുന്നത്
`state: configured`, `schedule: weekly` എന്നാണ്: ഇത് GitHub-ന്റെ ഡിഫോൾട്ട്-സെറ്റപ്പ് സ്കാനാണ്, ഓരോ പുഷിനുമുള്ള
വിശകലനമല്ല. അനന്തരഫലം: അലർട്ടുകൾ പരിഹരിക്കുന്ന ഒരു PR മെർജ് ചെയ്തശേഷവും, അടുത്ത ഷെഡ്യൂൾ ചെയ്ത സ്കാൻ
പ്രവർത്തിക്കുന്നതുവരെ റാച്ചറ്റ് പഴയതും കൂടുതലുമായ എണ്ണം വായിച്ചുകൊണ്ടിരിക്കും — അതിനാൽ സ്കാൻ പുതുക്കിയ നിലയിലെത്തുന്നതുവരെ,
പരിഹാര PR-ന്റെ സ്വന്തം തുടർ PR-കൾ ഉൾപ്പെടെ തുറന്നിരിക്കുന്ന എല്ലാ PR-ലും അത് ഒരു റിഗ്രഷൻ റിപ്പോർട്ട് ചെയ്യും.

**മാനുവൽ പുതുക്കൽ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` വിശകലനം വീണ്ടും പ്രവർത്തിപ്പിക്കുകയും
മിനിറ്റുകൾക്കുള്ളിൽ അലർട്ടുകൾ വീണ്ടും പ്രസിദ്ധീകരിക്കുകയും ചെയ്യുന്നു. ആദ്യം `.github/workflows/codeql.yml`
വായിക്കുക — GitHub-ന്റെ "ഡിഫോൾട്ട് സെറ്റപ്പുമായി ഇത് വൈരുധ്യമുണ്ടാക്കുന്നതിനാൽ" ഇത് `workflow_dispatch`-മാത്രമാണെന്ന്
അതിന്റെ ഹെഡർ വിശദീകരിക്കുന്നു (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ട്രിഗറുകൾ പുനഃസ്ഥാപിക്കുന്നതിന് ആദ്യം **ഉടമയുടെ നടപടി** ആവശ്യമാണ്: Settings → Code security →
CodeQL: Default → Advanced. ആ മാറ്റം വരുത്താതെ ഒരു `schedule:` ട്രിഗർ ചേർക്കരുത് — അത്
പരാജയപ്പെടുന്ന റണ്ണുകൾ മാത്രമേ സൃഷ്ടിക്കൂ.

**എണ്ണം കുറഞ്ഞശേഷം ബേസ്ലൈൻ കർശനമാക്കുക** — `node scripts/check/check-codeql-ratchet.mjs
--update` പുതുതായി അളന്ന എണ്ണം `quality-baseline.json` →
`metrics.codeqlAlerts.value`-ലേക്ക് എഴുതുന്നു; അതിനാൽ പഴയ പരമാവധി പരിധിയിലേക്കുള്ള ഒരു റിഗ്രഷൻ റാച്ചറ്റ് നിശ്ശബ്ദമായി
അനുവദിക്കില്ല. പ്രായോഗിക ഉദാഹരണം (2026-09-02/03): PR #12502 യഥാർഥമായ 7 അലർട്ടുകൾ പരിഹരിച്ചു
(അളന്ന തുറന്ന അലർട്ടുകൾ 13 → 6); അതുമായി പൊരുത്തപ്പെടാൻ PR #12530 നിശ്ചലപ്പെടുത്തിയ ബേസ്ലൈൻ 11 → 6 ആയി കർശനമാക്കി;
ശേഷിച്ച 6 അലർട്ടുകൾ ഓരോന്നിനും പ്രത്യേകം ന്യായീകരണം നൽകി നിരസിച്ച്, തുറന്ന അലർട്ടുകളുടെ എണ്ണം 0 ആക്കി.

**നിരസിക്കലുകൾ ഓപ്പറേറ്ററുടെ തീരുമാനമാണ് (കർശന നിയമം #14)** — നിരസിക്കൽ കമന്റിൽ സാങ്കേതിക ന്യായീകരണം
രേഖപ്പെടുത്താതെ ഒരു CodeQL അലർട്ടും ഒരിക്കലും നിരസിക്കരുത്: അപ്സ്ട്രീം-പ്രോട്ടോക്കോൾ ആവശ്യകതയ്ക്ക് `won't fix`,
ഒരു ടെസ്റ്റ് ഫിക്സ്ചറിന് `used in tests`, CodeQL-ന് കണ്ടെത്താനാകാത്ത ഒരു സാനിറ്റൈസറിന് `false positive`
(മുൻമാതൃക: `docs/security/ERROR_SANITIZATION.md`).

---

## ടെസ്റ്റ് റീട്രൈ നയം (WS5.4, v3.8.49)

റീട്രൈ ഓരോ റണ്ണറിനും പ്രത്യേകം ബാധകമാണ്; ഒരിക്കലും ആഗോളമായി എല്ലാത്തിനും ബാധകമാകില്ല — അത്തരം ഒരു ബ്ലാങ്കറ്റ് റീട്രൈ യഥാർത്ഥ റിഗ്രഷനുകളെ
കാണാൻ കഴിയാത്ത ഫ്ലേക്കുകളാക്കി മാറ്റുന്നു:

| റണ്ണർ            | നയം                                                                                                                                          | കാരണം                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | CI-യിൽ മാത്രം `retries: 1`, കൂടെ `trace: on-first-retry`                                                                                     | ബ്രൗസർ/നെറ്റ്വർക്ക് ടൈമിംഗ് യഥാർത്ഥത്തിൽ നിർണയിക്കാനാവാത്തതാണ്; ട്രേസോടുകൂടിയ ഒരു റീട്രൈ, ഒരു ഫ്ലേക്കിനെ രോഗനിർണയം നടത്താവുന്ന ആർട്ടിഫാക്റ്റാക്കി മാറ്റുന്നു |
| Vitest           | ആഗോള റീട്രൈ ഇല്ല. ഫ്ലേക്കിയാണെന്ന് തെളിയിക്കപ്പെട്ട ടെസ്റ്റിന് വ്യക്തമായ ഓരോ-ടെസ്റ്റ് റീട്രൈ നൽകും (diff-ൽ ദൃശ്യമാകും, PR-ൽ അവലോകനം ചെയ്യും) | ക്വാറന്റൈൻ പട്ടികയെ repo-യിൽ നിലനിർത്തുന്നു; ഒരിക്കലും അവ്യക്തമാക്കുന്നില്ല                                                                                  |
| node:test (unit) | ഒരിക്കലും റീട്രൈ ഇല്ല                                                                                                                        | ഫ്ലേക്കിയായ യൂണിറ്റ് ടെസ്റ്റ് ടെസ്റ്റിലെ ഒരു ബഗ് ആണ് — അത് പരിഹരിക്കുക, വീണ്ടും പ്രവർത്തിപ്പിച്ച് ഭാഗ്യം പരീക്ഷിക്കരുത്                                      |

ഫ്ലേക്ക് ടെലിമെട്രി ലഭ്യമായിക്കഴിഞ്ഞുള്ള ലക്ഷ്യ SLO-കൾ (WS5.2/5.3): ഓരോ ടെസ്റ്റിനും <1% ഫ്ലേക്ക് നിരക്ക്
("ഇപ്പോൾ പരിഹരിക്കുക" എന്ന പരിധി), ഓരോ പൈപ്പ്ലൈനും ≥95% വിജയനിരക്ക്. ഇവ വ്യവസായ റഫറൻസ് മൂല്യങ്ങളാണ് —
നമ്മുടെ സ്വന്തം അളവുകൾക്കനുസരിച്ച് വീണ്ടും കാലിബ്രേറ്റ് ചെയ്യുക.

## റിലീസ്-തല റാച്ചറ്റ് ഡ്രിഫ്റ്റ് (WS5.5, v3.8.49)

ഒരു റാച്ചറ്റ് (ഫയൽ വലുപ്പം, സങ്കീർണ്ണത, eslint മുന്നറിയിപ്പുകൾ) ശുദ്ധമായ റിലീസ്
ടിപ്പിൽ റിഗ്രസ് ചെയ്യുമ്പോൾ — അതായത്, മെർജുകളുടെ **സംയോജനമാണ്** അതിനെ റിഗ്രസ് ചെയ്തത്, ഒരു PR-നും അതിന്റെ
സ്വന്തം ബ്രാഞ്ചിൽ ആ റിഗ്രഷൻ ഒറ്റയ്ക്ക് പുനരാവിഷ്കരിക്കാൻ കഴിയുന്നില്ല — പരിഹാരം **റിലീസ് ക്യാപ്റ്റന്റെ ഉത്തരവാദിത്തമാണ്; ഒരിക്കൽ മാത്രം,
റിലീസ് ബ്രാഞ്ചിൽ**: എക്സ്ട്രാക്ഷൻ/റീഫാക്ടർ ചെയ്യുന്നതിന് മുൻഗണന നൽകുക; രേഖപ്പെടുത്തിയ
ന്യായീകരണ എൻട്രിയോടുകൂടി മാത്രമേ റീബേസ്ലൈൻ ചെയ്യാവൂ. കോമ്പിനേഷൻ ഡ്രിഫ്റ്റ് ഒരിക്കലും ഒരു കോൺട്രിബ്യൂട്ടർ PR-ലേക്ക് തള്ളരുത്, കൂടാതെ
ഓരോ PR-നും പ്രത്യേകം റീബേസ്ലൈൻ ചെയ്യരുത് (അത് യഥാർത്ഥ റിഗ്രഷനുകൾ മറയ്ക്കുന്നു). ആദ്യം വേർതിരിച്ചറിയുക: നിങ്ങളുടെ PR ആണ് അതിന് കാരണമായതെന്ന് കരുതുന്നതിന് മുമ്പ്,
ഒരു പ്രോബ് വർക്ക്ട്രീയിൽ ശുദ്ധമായ ടിപ്പിനെതിരെ പരാജയം പുനരാവിഷ്കരിക്കുക.

## റാച്ചറ്റ് ചുരുക്കങ്ങൾ ബാങ്ക് ചെയ്യൽ — താഴോട്ടുള്ള ദിശ (#8584)

റാച്ചറ്റ് പകുതി മാത്രമാണ് ഓട്ടോമാറ്റിക്, ഓട്ടോമാറ്റിക്കായിരിക്കുന്നത് തെറ്റായ പകുതിയുമാണ്. ഒരു പരിധി **ഉയർത്തുന്നത്**
പത്ത് സെക്കൻഡ് മാത്രം എടുക്കുന്ന മാനുവൽ JSON തിരുത്തലാണ്; പരാജയപ്പെടുന്ന PR-ന്റെ തടസ്സം നീക്കാനുള്ള ഏറ്റവും വേഗമേറിയ മാർഗവും അതാണ്.
ഒരു പരിധി **താഴ്ത്തുന്നതിന്**, ആരെങ്കിലും `--update` പ്രവർത്തിപ്പിച്ച് ഫലം കമ്മിറ്റ് ചെയ്യണം — കൂടാതെ
`bank-ratchet-shrinks` job വരുന്നതുവരെ ഒരു workflow-വും അത് പ്രവർത്തിപ്പിച്ചിരുന്നില്ല. അളന്ന ഫലം
(2026-07-25): 18 ഫ്രോസൺ ഫയലുകൾ ഇതിനകം 800-ലൈൻ പുതിയ-ഫയൽ പരിധിയിലോ അതിൽ താഴെയോ ആയിരുന്നു; ഏറ്റവും മോശമായത്
132× (`src/shared/validation/schemas.ts`, 2,523 പരിധി നിലനിർത്തുന്ന 19 വരികൾ); സങ്കീർണ്ണതാ പരിധി
~37 റീബേസ്ലൈൻ കുറിപ്പുകളിലൂടെ `1794 → 2169` ആയി ഉയർന്നു, കൃത്യമായി ഒരേയൊരു കുറവോടെ
(−1); കൂടാതെ "അടുത്ത സൈക്കിളിൽ `--update` വഴി കർശനമാക്കുക" എന്ന് 31 തവണ എഴുതിയെങ്കിലും
ഒരിക്കൽ മാത്രമാണ് പാലിക്കപ്പെട്ടത്. അതിന് അർഹത നൽകിയ കോഡിനേക്കാൾ കൂടുതൽ കാലം നിലനിൽക്കുന്ന ഒരു പരിധി, പൂർത്തിയാക്കിയ ഓരോ
ഡീകമ്പോസിഷനെയും നിശ്ശബ്ദമായി ആ ഫയൽ അടുത്തതായി തിരുത്തുന്നയാൾക്കുള്ള വളർച്ചാ അലവൻസാക്കി മാറ്റുന്നു.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ആ ലൂപ്പ് അടയ്ക്കുന്നു:

|                    |                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| പ്രവർത്തിക്കുന്നത് | `schedule` (ദിവസം 3×) + `workflow_dispatch` — മനഃപൂർവം `push`-ൽ **അല്ല**                                               |
| അളക്കുന്നത്        | ഏറ്റവും ഉയർന്ന `release/vX.Y.Z`; `release-green`-ലെ അതേ റെസല്യൂഷനും ഇൻജക്ഷൻ ഗാർഡും                                     |
| എഴുതുന്നത്         | `check:file-size --update`, `check:complexity-ratchets --update` എന്നിവ (രണ്ടും രൂപകൽപ്പനപ്രകാരം ചുരുക്കൽ മാത്രം)      |
| പരിശോധിക്കുന്നത്   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                               |
| അയയ്ക്കുന്നത്      | റിലീസ് ബ്രാഞ്ചിനെതിരെ എല്ലായ്പ്പോഴും നിലവിലുള്ള ഒരൊറ്റ PR — നിർബന്ധിതമായി അപ്ഡേറ്റ് ചെയ്യും, ഒരിക്കലും സ്പാം ചെയ്യില്ല |

ബാങ്കിംഗ് ഓരോ പുഷിനും പകരം ബാച്ചായാണ് നടത്തുന്നത്, കാരണം അതിന് ലേറ്റൻസി ആവശ്യകതയില്ല (8h-നുള്ളിൽ
ഒരു ചുരുക്കം ബാങ്ക് ചെയ്താൽ മതി); അതേസമയം ഓരോ മെർജിനുമുള്ള റൺ, മെർജ് കാമ്പെയ്നുകളുടെ സമയത്ത് PR ബ്രാഞ്ച് ആവർത്തിച്ച്
റീബിൽഡ് ചെയ്യുകയും ഓരോ തവണയും സമ്പൂർണ്ണ ESLint പരിശോധനയ്ക്കുള്ള ചെലവ് വഹിക്കുകയും ചെയ്യും. കണ്ടെത്തൽ `push`-ൽ തന്നെ തുടരുന്നു
(`release-green`); ബാങ്കിംഗ് മാത്രമാണ് ബാച്ച് ചെയ്യുന്നത്.

### സുരക്ഷാ വെരിഫയർ

job മേൽനോട്ടമില്ലാതെ ബേസ്ലൈനുകളിലേക്ക് എഴുതുന്നതിനാൽ, അത് സ്വീകാര്യമാക്കുന്നത് `verify-ratchet-bank.mjs` ആണ്.
ഇത് `--update`-ന് ശേഷമുള്ള ട്രീയെ `HEAD`-മായി diff ചെയ്യുകയും, ഓരോ മാറ്റവും താഴെപ്പറയുന്നവയിൽ ഒന്നല്ലെങ്കിൽ,
**ഏതെങ്കിലും കമ്മിറ്റ് ഉണ്ടാകുന്നതിന് മുമ്പ് job നിർത്തലാക്കുകയും** ചെയ്യുന്നു — ഒരു PR-ഉം തുറക്കില്ല:

- `frozen` / `testFrozen` സംഖ്യാ എൻട്രി **താഴ്ത്തിയത്** അല്ലെങ്കിൽ **നീക്കിയത്**
- `complexity-baseline.json` → `count` **താഴ്ത്തിയത്**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **താഴ്ത്തിയത്**

മറ്റെന്തും പരാജയപ്പെടും: ഒരു സംഖ്യ ഉയർത്തുക, ഒരു എൻട്രി ചേർക്കുക, `cap`/`testCap` മാറ്റുക, അല്ലെങ്കിൽ
ഒരു `_rebaseline_*` കുറിപ്പ് ഇല്ലാതാക്കുക/വീണ്ടും എഴുതുക (ഓരോ പരിധിയും എന്തുകൊണ്ട് നിലവിലുണ്ട് എന്നതിനുള്ള ഓഡിറ്റ് ട്രെയിലാണ് ആ കുറിപ്പുകൾ;
ഫയൽ എൻട്രികൾക്കൊപ്പം അതേ `frozen` ഒബ്ജക്റ്റിനുള്ളിലാണ് അവ സൂക്ഷിച്ചിരിക്കുന്നത്).
ഒരു പരിധി ഉയർത്താൻ കഴിയുന്ന ബോട്ട് നിലവിലെ അവസ്ഥയെക്കാൾ തീർച്ചയായും മോശമായിരിക്കും. റിഗ്രഷൻ
ഗാർഡ്: `tests/unit/verify-ratchet-bank.test.ts`.

job ഒരിക്കലും `release/*`-ലേക്ക് പുഷ് ചെയ്യില്ല — ഒരു മനുഷ്യൻ PR മെർജ് ചെയ്യുന്നതിനാൽ, തെറ്റായ അളവ്
അവലോകനം ചെയ്യപ്പെടാതെ ഉൾപ്പെടാൻ കഴിയില്ല.

## അനുവദനീയ പട്ടികാ നയം

മുൻപേ നിലവിലുണ്ടായിരുന്ന ലംഘനങ്ങളിൽ പരാജയപ്പെടാൻ പാടില്ലാത്ത എല്ലാ ഗേറ്റുകളും സ്ഥിരപ്പെടുത്തിയ ഒരു അനുവദനീയ പട്ടിക ഉപയോഗിക്കുന്നു
(ഉദാ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). നയം ഇതാണ്:

**മൂലകാരണം പരിഹരിക്കുക; ലംഘനം മുൻപേ നിലവിലുണ്ടായിരിക്കുകയും അതേ PR-ൽ പരിഹരിക്കാൻ കഴിയാതിരിക്കുകയും ചെയ്യുമ്പോൾ മാത്രം അനുവദനീയ പട്ടിക ഉപയോഗിക്കുക.**

ഒരു അനുവദനീയ പട്ടികയിലേക്ക് എൻട്രി ചേർക്കുമ്പോൾ:

1. ന്യായീകരണം ഉൾക്കൊള്ളുന്ന ഒരു കമന്റ് ചേർക്കുക.
2. ട്രാക്കിംഗ് ഇഷ്യൂവിനെ പരാമർശിക്കുക (ഉദാ., `// #3498 — ഘട്ടം 2 സവിശേഷത, ഇതുവരെ നടപ്പാക്കിയിട്ടില്ല`).
3. ലംഘനം പരിഹരിക്കുന്ന അതേ PR-ൽ ആ എൻട്രി നീക്കം ചെയ്യുക — സജീവമായ ഒരു ലംഘനത്തെ ഇനി ഒഴിവാക്കാത്ത കാലഹരണപ്പെട്ട എൻട്രി തന്നെ ഒരു തകരാറാണ് (നടപ്പാക്കിയശേഷം, അനാഥമായ അനുവദനീയ പട്ടികാ എൻട്രിയിൽ 6A.3 stale-enforcement ഗേറ്റ് പരാജയപ്പെടും).

ടെസ്റ്റുകൾ വേഗത്തിൽ പാസാക്കാൻ അനുവദനീയ പട്ടികാ എൻട്രികൾ ചേർക്കരുത്. വളർന്നുകൊണ്ടിരിക്കുന്ന
അനുവദനീയ പട്ടികയോടുകൂടിയ ഗ്രീൻ ഗേറ്റ് ഗുണനിലവാരത്തെക്കുറിച്ചുള്ള വ്യാജമായ ആത്മവിശ്വാസമാണ്.

### നിങ്ങളുടെ PR-ൽ ഒരു ഗേറ്റ് പരാജയപ്പെടുമ്പോൾ

1. **ഗേറ്റ് ഔട്ട്പുട്ട് ശ്രദ്ധാപൂർവം വായിക്കുക** — ഏത് ഫയലോ സിംബലോ നിയമം ലംഘിച്ചുവെന്ന് അത് കൃത്യമായി വ്യക്തമാക്കുന്നു.
2. **ലംഘനം പരിഹരിക്കുക** — ഭൂരിഭാഗം ഗേറ്റുകളും നിർണായകമായ ഫയൽസിസ്റ്റം പരിശോധനകളാണ്; കോഡ് ശരിയായ ഉടൻ അവ പാസാകും.
3. **ലംഘനം മുൻപേ നിലവിലുണ്ടായിരുന്നതാണെങ്കിൽ** (അതായത്, നിങ്ങൾ അത് അവതരിപ്പിച്ചതല്ലെങ്കിലും ഇപ്പോൾ ഗേറ്റ് അതിനെ ഉൾക്കൊള്ളുന്നു): ന്യായീകരണ കമന്റും ട്രാക്കിംഗ് ഇഷ്യൂവും സഹിതം അനുവദനീയ പട്ടികാ എൻട്രി ചേർക്കുക.
4. **ഗേറ്റ് ഒരു റാച്ചെറ്റാണെങ്കിൽ** (കവറേജ്, ESLint മുന്നറിയിപ്പുകൾ, ആവർത്തനം, സങ്കീർണ്ണത):
   നിങ്ങളുടെ മാറ്റം മെട്രിക് മോശമാക്കി. അടിസ്ഥാന പ്രശ്നം പരിഹരിക്കുക, അല്ലെങ്കിൽ മാറ്റം ഉദ്ദേശ്യപൂർവവും മെട്രിക്കിന്റെ നിലവാരത്തകർച്ച സ്വീകാര്യവുമാണെങ്കിൽ (അപൂർവമായി) `npm run quality:ratchet -- --update` പ്രവർത്തിപ്പിക്കുക — എന്നാൽ അതിന്റെ കാരണം PR വിവരണത്തിൽ രേഖപ്പെടുത്തുക.
5. **ഉപദേശാത്മക ഗേറ്റുകൾ** (`continue-on-error: true`) വിവരദായകമാണ് — അവ ലയനം തടയില്ലെങ്കിലും CI സംഗ്രഹത്തിൽ ദൃശ്യമാകും. എന്നിരുന്നാലും അവ പരിഹരിക്കുക.

---

## ഒരു പുതിയ ഗേറ്റ് ചേർക്കൽ

1. `scripts/check/check-<name>.mjs` (അല്ലെങ്കിൽ `.ts`) സൃഷ്ടിക്കുക. നയ ഗേറ്റുകൾ 0/1 നിലയിൽ പുറത്തുകടക്കുന്നു.
   റാച്ചെറ്റ്-രീതിയിലുള്ള ഗേറ്റുകൾ `collect-metrics.mjs` വഴി `quality-metrics.json`-ലേക്ക് ഒരു മെട്രിക് പുറപ്പെടുവിക്കുന്നു.
2. `package.json`-ലേക്ക് `"check:<name>": "node scripts/check/check-<name>.mjs"` ചേർക്കുക.
3. ഉചിതമായ ജോബിന് കീഴിൽ `.github/workflows/ci.yml`-ൽ അത് ബന്ധിപ്പിക്കുക
   (നയം → `lint` അല്ലെങ്കിൽ `docs-sync-strict`; റാച്ചെറ്റ് → `quality-gate`).
4. അതിന് ഒരു അനുവദനീയ പട്ടികയുണ്ടെങ്കിൽ, കാലഹരണപ്പെട്ട എൻട്രികൾ സ്വയമേവ കണ്ടെത്തുന്നതിനായി
   `scripts/check/lib/allowlist.mjs`-ൽ നിന്നുള്ള `reportStaleEntries()` പ്രയോഗിക്കുക.
5. ഗേറ്റിന്റെ കണ്ടെത്തൽ ലോജിക് ഉൾക്കൊള്ളുന്ന ഒരു ടെസ്റ്റ് `tests/unit/build/`-ൽ എഴുതുക.
6. ഈ പ്രമാണം അപ്ഡേറ്റ് ചെയ്യുക (പ്രസക്തമായ ജോബ് പട്ടികയിൽ ഒരു വരി ചേർക്കുക).

---

## ഏജന്റ് ടൂളിംഗ്: ലൂപ്പിനുള്ളിലെ LSP (ഓപ്റ്റ്-ഇൻ)

CI ഗേറ്റുകൾക്ക് പുറമേ, OmniRoute ഒരു **ഓപ്റ്റ്-ഇൻ** `agent-lsp` സ്കാഫോൾഡ്
(ഒരു പ്രോജക്റ്റ്-തല `.mcp.json`, Fase 7 Task 15) ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. കോഡിംഗ് ഏജന്റുകൾക്ക് ഒരു TypeScript ലാംഗ്വേജ് സർവർ ലഭ്യമാക്കാൻ `.mcp.json`
സൃഷ്ടിക്കുക; അങ്ങനെ അവർ കോഡ് എഴുതുന്നതിന് **മുമ്പ്** സിംബലുകളും /
ഡയഗ്നോസ്റ്റിക്സും പരിഹരിക്കും — ഉറവിടത്തിൽത്തന്നെ "കെട്ടിച്ചമച്ച സിംബൽ" പിശകുകൾ കുറയ്ക്കുന്ന
`typecheck:core`-ന്റെ കംപൈൽ-ബിഫോർ-ക്ലെയിം സഹചാരിയാണിത്. ഇത് മനഃപൂർവം
സ്വയമേവ ലോഡ് ചെയ്യപ്പെടുന്നില്ല (MCP↔LSP ബ്രിഡ്ജ് നിങ്ങൾ തിരഞ്ഞെടുത്ത് പരിശോധിക്കണം); തകരാറുള്ള ഒരു എൻട്രി ഒരു
കണക്ഷൻ പിശക് ലോഗ് ചെയ്യുക മാത്രമേ ചെയ്യൂ, സെഷനുകളെ ഒരിക്കലും തകർക്കുകയില്ല.

---

## യുക്തിസഹമാക്കൽ ബാക്ക്ലോഗ് (ROI അവലോകനം — ഘട്ടം 9 തരംഗം 3)

ഈ ഇൻവെന്ററി 2026-06-17-ന് `ci.yml`-മായി പൊരുത്തപ്പെടുത്തി (മുൻ പതിപ്പിൽ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` എന്നിവ വിട്ടുപോയിരുന്നു). പൊരുത്തപ്പെടുത്തിയ സെറ്റിന്റെ ROI അവലോകനം
താഴെപ്പറയുന്ന യുക്തിസഹമാക്കൽ സ്ഥാനാർഥികളെ കണ്ടെത്തി. **ലയിപ്പിക്കലുകൾ യാന്ത്രിക CI
മാറ്റങ്ങളാണ്; ഫ്ലിപ്പുകൾ/ഒഴിവാക്കലുകൾ ഓപ്പറേറ്റർക്കായി നീക്കിവച്ചിരിക്കുന്ന നയപരമായ തീരുമാനങ്ങളാണ്.** താഴെപ്പറയുന്നവയിൽ
ഒന്നും ഇതുവരെ പ്രയോഗിച്ചിട്ടില്ല.

**മുകളിൽ രേഖപ്പെടുത്താത്തവയും** (ഉപദേശാത്മകം, കുറഞ്ഞ സിഗ്നൽ): `docs-lint` ജോലി
(markdownlint + Vale, മുഴുവൻ ജോലിക്കും `continue-on-error`) കൂടാതെ സ്വതന്ത്ര സ്കാനർ വർക്ക്ഫ്ലോകളായ
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `quality-baseline.json`-ൽ
`semgrepFindings: 0` ഉണ്ട്, എന്നാൽ `ci.yml`-ലെ ഒരു ബ്ലോക്കിങ് റാച്ചറ്റുമായി അത് ബന്ധിപ്പിച്ചിട്ടില്ല — ഈ മെട്രിക്
നിലവിൽ അനാഥമാണ്.

### ലയിപ്പിക്കൽ / ഡ്യൂപ്ലിക്കേഷൻ നീക്കംചെയ്യൽ (യാന്ത്രികം, കുറഞ്ഞ അപകടസാധ്യത)

ഓരോ സ്ഥാനാർഥിയെയും 2026-06-17-ലെ തത്സമയ ഗേറ്റ് നിലയ്ക്കെതിരെ സാധൂകരിച്ചു (വിശ്വസിക്കുക, എന്നാൽ പരിശോധിക്കുക);
"വ്യക്തമായ" പല ലയിപ്പിക്കലുകളും മറഞ്ഞിരിക്കുന്ന സാങ്കേതിക കടം ഒളിപ്പിക്കുന്നതായി കണ്ടെത്തി, അവ **ശുദ്ധമായ പകരക്കാരല്ല**.

- **`check:docs-sync` രണ്ടുതവണ പ്രവർത്തിക്കുന്നു** — `lint` ജോലിയിൽ സ്വതന്ത്രമായും `check:docs-all` (`docs-sync-strict`)-ന്റെ ഉള്ളിലും husky pre-commit ഹുക്കിലും വീണ്ടും. ✅ **പൂർത്തിയായി** — സ്വതന്ത്ര `lint` ഇൻവൊക്കേഷൻ നീക്കംചെയ്തു.
- **CVE സ്കാനിങ്** — ❌ **ശുദ്ധമായി ലയിപ്പിക്കാനാകില്ല.** ഏതെങ്കിലും high/critical CVE കണ്ടെത്തിയാൽ `audit:deps` കർശനമായി പരാജയപ്പെടുന്നു; `check:vuln-ratchet` (osv) ബേസ്ലൈനുമായി താരതമ്യപ്പെടുത്തിയുള്ള ഒരു _പിന്നോട്ടുപോക്ക്_ ഉണ്ടായാൽ മാത്രമാണ് പരാജയപ്പെടുന്നത് (നിലവിൽ 1 MODERATE). അർത്ഥശാസ്ത്രം വ്യത്യസ്തമാണ് — `audit:deps` ഒഴിവാക്കിയാൽ സമ്പൂർണ്ണ high/critical ഗേറ്റ് നഷ്ടപ്പെടും. രണ്ടും നിലനിർത്തുക.
- **സൈക്കിൾ കണ്ടെത്തൽ** — ✅ **പൂർത്തിയായി** (#15159 G-01/G-02). ഇവിടെയുള്ള പഴയ വാചകം `check:cycles`-നെ "ഹരിതമായ, ക്യൂറേറ്റ് ചെയ്ത" ഗേറ്റ് എന്ന് വിളിക്കുകയും `check:circular-deps` (dpdm) 91 സൈക്കിളുകൾ റിപ്പോർട്ട് ചെയ്തതിനാൽ അത് ബ്ലോക്കിങ്ങായി നിലനിർത്തുന്നതിനെ ന്യായീകരിക്കുകയും ചെയ്തിരുന്നു. ആ ഹരിതനില ഒരു **വ്യാജ ഹരിതനില** ആയിരുന്നു: `check:cycles` 5 ഉപഡയറക്ടറികൾ (450 ഫയലുകൾ) സ്കാൻ ചെയ്തു, സ്റ്റാറ്റിക് `import|export … from` മാത്രമാണ് പൊരുത്തപ്പെടുത്തിയത്, കൂടാതെ എല്ലാ `@/`, `@omniroute/open-sse/` സ്പെസിഫയറുകളും ഒഴിവാക്കി; അതിനാൽ റിപ്പോയിൽ ആധിപത്യം പുലർത്തിയ dynamic-import + alias സൈക്കിളുകൾ അതിന് കാണാനായില്ല. പരിഹരിച്ചു: ഗേറ്റ് ഇപ്പോൾ `src` + `open-sse` (5023 ഫയലുകൾ) പരിശോധിക്കുന്നു, TypeScript AST-യിൽ നിന്ന് സ്പെസിഫയറുകൾ ശേഖരിക്കുന്നു (അതിനാൽ `import("…")` കണക്കാക്കപ്പെടും, എന്നാൽ type-position `typeof import("…")` കണക്കാക്കപ്പെടില്ല), കൂടാതെ tsconfig `paths` റിസോൾവ് ചെയ്യുന്നു. ഇത് 0 അല്ല, **14** സൈക്കിളുകൾ കണ്ടെത്തുന്നു. നിലവിലുള്ള 14 സൈക്കിളുകൾ ഒരു ഗേറ്റ് PR-ൽ പരിഹരിക്കാനാകാത്തതിനാൽ, `check:cycles` ഇപ്പോൾ ഒരു **റാച്ചറ്റ്** ആണ് (`--ratchet`, `quality-baseline.json`-ൽ പരിധി `metrics.cycles.value = 14`, `direction: down`) — ഏതൊരു _പിന്നോട്ടുപോക്കും_ ഇത് തടയുന്നു, എണ്ണം കുറയുക മാത്രമേ ചെയ്യാനാകൂ. CI `npm run check:cycles:ratchet` പ്രവർത്തിപ്പിക്കുന്നു. കുറച്ചുകൊണ്ടുവരൽ **A-01**-നൊപ്പം നടക്കും. വിശാലമായ രണ്ടാമത്തെ അഭിപ്രായമായി `check:circular-deps` (dpdm) ഉപദേശാത്മകമായി തുടരുന്നു.
- **സങ്കീർണ്ണത** — ✅ **പൂർത്തിയായി** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ഒരൊറ്റ ESLint പരിശോധന, ruleId അനുസരിച്ച് എണ്ണുന്നതിനാൽ cyclomatic+max-lines, cognitive ബേസ്ലൈനുകൾ സ്വതന്ത്രമായി തുടരുന്നു; പ്രാദേശിക `--update`-നായി വ്യക്തിഗത `check:complexity` / `check:cognitive-complexity` നിലനിർത്തിയിട്ടുണ്ട്.
- **`/api` ആന്റി-ഹാലൂസിനേഷൻ** — ✅ **പൂർത്തിയായി** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-യുടെ ഒരൊറ്റ FS ഇൻവെന്ററി, openapi-routes + docs-symbols ഇപ്പോഴും സ്വതന്ത്രമായി റിപ്പോർട്ട് ചെയ്യുന്നു; പ്രാദേശിക റണ്ണുകൾക്കായി വ്യക്തിഗതവ നിലനിർത്തിയിട്ടുണ്ട്.
- **`check:node-runtime` 11 ജോലികളിൽ പ്രവർത്തിക്കുന്നു** — ⚠️ **കുറഞ്ഞ ROI.** ഓരോന്നും പ്രത്യേക റണ്ണറാണ്, പരിശോധന <1s ആണ്; വിലകുറഞ്ഞ ഓരോ-ജോലി സംരക്ഷണവും നഷ്ടപ്പെടുന്നതിന് പകരമായി മൊത്തം ലാഭം ~10s മാത്രം. മാറ്റത്തിന്റെ ബുദ്ധിമുട്ടിന് തക്ക മൂല്യമില്ല.
- **CI lint-ലെ `typecheck:noimplicit:core`** — ✅ **lint ജോലിയിൽ നിന്ന് നീക്കംചെയ്തു** (ഉപദേശാത്മകമായ `continue-on-error` ആയിരുന്നു); ബ്ലോക്കിങ് ടൈപ്പ് ഉപരിതലം `typecheck:core` + `check:type-coverage` ആണ്. പ്രാദേശിക സ്ക്രിപ്റ്റ് നിലനിർത്തി.

### ഫ്ലിപ്പ് / തീരുമാനം (ഓപ്പറേറ്റർ നയം)

- `check:openapi-security-tiers` (ഉപദേശാത്മകം) — ❌ **വൃത്തിയായി ഫ്ലിപ്പ് ചെയ്യാനാകില്ല.** ഇത് 0-ൽ എക്സിറ്റ് ചെയ്യുന്നുവെങ്കിലും `LOCAL_ONLY_API_PREFIXES`-ന്റെ കീഴിലുള്ള നിരവധി `traffic-inspector` റൂട്ടുകളിൽ `x-loopback-only: true` അനോട്ടേഷൻ ഇല്ലെന്ന് മുന്നറിയിപ്പ് നൽകുന്നു. ഇത് നിർബന്ധമാക്കുന്നതിന് ആദ്യം ആ അനോട്ടേഷനുകൾ `openapi.yaml`-ൽ ചേർക്കേണ്ടതുണ്ട്.
- `typecheck:noimplicit:core` (ഉപദേശാത്മകം) — ബ്ലോക്കിങ് `check:type-coverage` റാച്ചറ്റ് ഇതിനെ വലിയൊരളവിൽ ഉൾക്കൊള്ളുന്നു. ഒരു റാച്ചറ്റിലേക്ക് ഫ്ലിപ്പ് ചെയ്യുക, അല്ലെങ്കിൽ ആവർത്തനമായ രണ്ടാമത്തെ `tsc` പാസ് ഒഴിവാക്കുക.
- `test:vitest:ui` (ഇപ്പോൾ **ബ്ലോക്കിങ്**) — മുൻപേ നിലവിലുണ്ടായിരുന്ന പരാജയങ്ങൾ `vitest.config.ts`-ൽ `// #8618` ട്രാക്കിങ് കമന്റുകൾ ഉപയോഗിച്ച് വ്യക്തമായി ഒഴിവാക്കിയിട്ടുണ്ട്; പുതിയ പരാജയങ്ങൾ ജോലി പരാജയപ്പെടുത്തും.
- `check:secrets` (gitleaks, രേഖപ്പെടുത്തിയ 3 false-positive-ുകളിൽ ഫ്രീസ് ചെയ്ത ബ്ലോക്കിങ് റാച്ചറ്റ്) — 0-ൽ എത്താൻ ആ 3 എണ്ണം allowlist ചെയ്യുക, അല്ലെങ്കിൽ ഉപദേശാത്മകമായി തരംതാഴ്ത്തുക. GitHub-ന്റെ നേറ്റീവ് secret-scanning + `check:public-creds` എന്നിവയുമായി ഓവർലാപ്പ് ചെയ്യുന്നു.
- `check:pr-evidence` (ബ്ലോക്കിങ്, PR-body ഗദ്യം greps ചെയ്യുന്നു) — false-positive സാധ്യത ഉയർന്നതാണ്; ഒഴിവാക്കിയാൽ Hard Rule #18 നടപ്പാക്കൽ ദുർബലമാകും, അതിനാൽ ഇത് യഥാർത്ഥ നയപരമായ തീരുമാനമാണ്.
- `semgrep` (ഉപദേശാത്മക സ്വതന്ത്ര ഘടകം) — OWASP കുടുംബങ്ങളിൽ CodeQL-മായി ഓവർലാപ്പ് ചെയ്യുന്നു; അതിന്റെ ബേസ്ലൈൻ ഒരു റാച്ചറ്റുമായി ബന്ധിപ്പിക്കുക, അല്ലെങ്കിൽ ഒഴിവാക്കുക.

---

## അനുബന്ധ ഡോക്യുമെന്റേഷൻ

- സപ്ലൈ ചെയിൻ (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — കീ-സെറ്റ് പാരിറ്റി ഗേറ്റ്

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, ജോലി `i18n-ui-coverage`).
ഓരോ `src/i18n/messages/<locale>.json`-ലെയും ലീഫ് കീ സെറ്റിനെ `en.json`-മായി താരതമ്യം ചെയ്യുകയും,
കീ എപ്പോൾ ചേർത്തതാണെന്നത് പരിഗണിക്കാതെ, ഏതെങ്കിലും ലീഫ് ഇല്ലാതിരിക്കുകയോ അധികമായിരിക്കുകയോ ചെയ്താൽ
പരാജയപ്പെടുകയും ചെയ്യുന്നു. `__MISSING__:` പ്ലേസ്ഹോൾഡറുകൾ നിലവിലുള്ളതായി കണക്കാക്കപ്പെടുന്നു
(അവയുടെ ഉള്ളടക്കം റേഷ്യോ ഗേറ്റിന്റെ പരിധിയിലാണ്). ഡിഫ് അടിസ്ഥാനമാക്കിയുള്ള/ശതമാന അടിസ്ഥാനമാക്കിയുള്ള
രണ്ട് ഗേറ്റുകളുടെയും സമ്പൂർണ്ണ പൂരകമാണിത്: `check-ui-keys-coverage` ഓരോ locale-നും 80 % എന്ന
കുറഞ്ഞ പരിധി നിർബന്ധമാക്കുന്നു (~13,000 കീകളിൽ 43 എണ്ണം ഇല്ലെങ്കിലും 99.7 % എന്നാണ് കാണിക്കുക);
`check-new-key-coverage` ഒരു PR `en.json`-ലേക്ക് ചേർക്കുന്ന കീകൾ മാത്രം വിലയിരുത്തുന്നു. ഒരു locale
ബാച്ചിന്റെ branch സൃഷ്ടിക്കുന്ന ദിവസത്തെ `en.json`-ൽ നിന്നാണ് അത് ജനറേറ്റ് ചെയ്യുന്നത്; base പുതിയ
കീകൾ ചേർത്തുകൊണ്ടിരിക്കുമ്പോൾ, ദിവസങ്ങളോളം വിവർത്തനം തുടരുന്നു. ബാച്ച് PR സ്വയം പുതിയ കീകളൊന്നും
ചേർക്കാത്തതിനാൽ, batch 1 (#13044) ഒൻപത് locale-കളിൽ 43 കീകൾ കുറവായും batch 2 (#13660) എട്ട്
locale-കളിൽ 10 കീകൾ കുറവായും ലാൻഡ് ചെയ്തപ്പോൾ രണ്ട് സഹോദര ഗേറ്റുകളും നിശ്ശബ്ദമായിരുന്നു
(2026-09-15). പരാജയം പരിഹരിക്കാൻ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ഉപയോഗിക്കുക; ഒരു `extra`
ലീഫ് എന്നത് source-ൽ നിന്ന് അത് നീക്കം ചെയ്തുവെന്നാണ് അർത്ഥം — locale-ൽ നിന്ന് അത് ഇല്ലാതാക്കുക.
`--warn` പരാജയപ്പെടുത്താതെ റിപ്പോർട്ട് ചെയ്യുന്നു. `--catalog=cli` ഉപയോഗിച്ചാൽ ഇതേ താരതമ്യം
`bin/cli/locales`-ൽ നടത്തുന്നു (`npm run i18n:check-keys:cli`); രണ്ട് ഘട്ടങ്ങളും
`i18n-ui-coverage` ജോലിയിലാണ്.

#### `check-new-key-coverage` — പുതിയ കീയ്ക്കുള്ള i18n ഗേറ്റ്

`check-ui-value-drift`-ന്റെ സഹോദര ഗേറ്റ്. വിവർത്തനങ്ങൾ പുതുക്കാതെ വിട്ടിരിക്കെ ഒരു ഇംഗ്ലീഷ് മൂല്യം
**വീണ്ടും എഴുതിയാൽ** അത് ആ ഗേറ്റ് കണ്ടെത്തുന്നു; ഒരു ഇംഗ്ലീഷ് കീ **ചേർത്തിരിക്കെ** ചില locale-കൾക്ക്
അത് ലഭിക്കാതെ പോയാൽ ഈ ഗേറ്റ് കണ്ടെത്തുന്നു.

`check-ui-keys-coverage`-ന് ഈ വിഭാഗം കണ്ടെത്താനാവില്ല: അത് ഓരോ locale-നും ഒരു ശതമാനപരമായ കുറഞ്ഞ
പരിധി നിർബന്ധമാക്കുന്നു; ~13,000 ലീഫുകളിൽ പതിനൊന്ന് കീകൾ ഇല്ലെങ്കിലും coverage 99.9% ആയിരിക്കും.
ഓരോ ഭാഷയ്ക്കുമുള്ള ഒരു ശതമാനത്തിന് "ഈ ഫീച്ചർ വിവർത്തനം ചെയ്യാതെ പുറത്തിറങ്ങി" എന്ന് പ്രകടിപ്പിക്കാനാവില്ല
— ഒരു മുഴുവൻ ഫീച്ചറും ഒരു പുതിയ locale-ൽ ടെക്സ്റ്റൊന്നുമില്ലാതെ ലാൻഡ് ചെയ്യുകയും ആ സംഖ്യയിൽ യാതൊരു
മാറ്റവും ഉണ്ടാക്കാതിരിക്കുകയും ചെയ്യാം.

ഇത് രേഖപ്പെടുത്തുന്ന സംഭവം: Orchestration Canvas-ന്റെ Phase 3-ലെ പതിനൊന്ന് കീകൾ അന്ന് നിലവിലുണ്ടായിരുന്ന
42 locale-കളിലേക്കും വിവർത്തനം ചെയ്തു. മണിക്കൂറുകൾക്കുശേഷം EU-language batch (#13044) repo-യെ
51 locale-കളിലേക്ക് എത്തിച്ചു; പുതുതായി വന്ന ഒൻപത് locale-കൾക്ക് (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) അവ ഒരിക്കലും ലഭിച്ചില്ല. ഒരു കീ ഇല്ലെങ്കിൽ `deepMergeFallback` പകരം ഇംഗ്ലീഷ്
നൽകുന്നതിനാൽ, ശൂന്യമായ UI-യ്ക്ക് പകരം വിവർത്തനം ചെയ്യാത്ത UI ആയിരുന്നു പരാജയരീതി — യഥാർത്ഥമായതും
രൂപകൽപ്പനാപരമായി നിശ്ശബ്ദമായതും.

അതിന്റെ സഹോദര ഗേറ്റ് പോലെതന്നെ ഇതും **diff-aware** ആണ്; merge base-ലെ ഇംഗ്ലീഷിനെ working tree-യുമായി
താരതമ്യം ചെയ്യുന്നതിനാൽ, നേരത്തേ നിലവിലുണ്ടായിരുന്ന വിടവുകൾ അതേപടി നിലനിൽക്കുകയും ഗേറ്റ് പ്രവർത്തനക്ഷമമാക്കാൻ
migration ആവശ്യമില്ലാതിരിക്കുകയും ചെയ്യുന്നു.

**ഒരു `__MISSING__:<english>` മാർക്കർ ഇതിനെ തൃപ്തിപ്പെടുത്തുന്നില്ല (2026-09-17 മുതൽ).** മുമ്പ് ഇത്
രേഖപ്പെടുത്തിയിരുന്ന മാറ്റിവെക്കൽ മാർഗമായിരുന്നു — runtime ശരിയായ ഇംഗ്ലീഷിലേക്ക് fallback ചെയ്യുന്നു —
എന്നാൽ 2026-09-16-ലെ എട്ട് feature PR-കൾ 61 കീകൾ ചേർക്കുകയും വിവർത്തനം ചെയ്യുന്നതിനുപകരം എല്ലാ 65
locale-കളിലും മാർക്കർ പതിപ്പിക്കുകയും ചെയ്തു: ഈ ഗേറ്റ് അവയെല്ലാം അംഗീകരിച്ചു, PR-കളെ ഒന്നും തടഞ്ഞില്ല,
തുടർന്ന് തടസ്സപ്പെടുത്തുന്ന യഥാർത്ഥ-വിവർത്തന റേഷ്യോ ഗേറ്റ് release tip-ൽ എല്ലാവർക്കുമായി പരാജയപ്പെട്ടു
(pt-BR 3.2 % > 2.5 % + 0.5). ഇപ്പോൾ ഒരു മാർക്കർ ഇല്ലാത്ത വിവർത്തനമായി കണക്കാക്കപ്പെടുന്നു. പരാജയം
പരിഹരിക്കാൻ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
ഉപയോഗിക്കുക; അല്ലെങ്കിൽ `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env ഇല്ലാതെ
ആരംഭിക്കാൻ വിസമ്മതിക്കുന്നു) ഉപയോഗിച്ച് എല്ലാ locale-കളും സമാന്തരമായി പരിഹരിക്കുക. ഇംഗ്ലീഷിൽ തന്നെ
തുടരേണ്ട ഒരു കീ (നിശ്ചിത product/engine/flag പേര്) `scripts/i18n/untranslatable-keys.json`-ലാണ്
ഉൾപ്പെടുത്തേണ്ടത്; ഒരിക്കലും മാർക്കറിന് പിന്നിലല്ല. `vi` മാർക്കറുകൾ പൂർണ്ണമായും നിരോധിക്കുന്നു
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — മാറ്റിവെച്ച ടെസ്റ്റുകളുടെ ഗേറ്റ്

`vitest.config.ts`-ലെ `exclude` പട്ടികയിലുള്ള ഒരു ഫയൽ പ്രവർത്തിപ്പിക്കപ്പെടാത്ത ഒരു ടെസ്റ്റാണ്; tree
വായിക്കുന്നവർക്ക് അത് coverage പോലെ തോന്നുകയും ചെയ്യും. അറുപത്തിരണ്ട് ഫയലുകൾ
`// #8618 — pre-existing failure; remove this exclusion when fixed` എന്ന കമന്റിന് പിന്നിൽ
കുമിഞ്ഞുകൂടി. Issue #8618, 2026-08-11-ന് അടച്ചു; എന്നാൽ അത് ട്രാക്ക് ചെയ്തിരുന്ന പട്ടിക 45
എൻട്രികളിൽ നിന്ന് 62 ആയി വളർന്നു, പുതുതായി ചേർന്ന ഓരോ എൻട്രിയും അവസാനിച്ചുപോയ issue-ലേക്ക്
ചൂണ്ടിക്കാണിക്കുന്ന കമന്റ് ഏറ്റെടുത്തു. ഒടുവിൽ പട്ടികയിലെ ഓരോ ഫയലും പ്രത്യേകം അളന്നപ്പോൾ (#13204),
**62-ൽ 51 എണ്ണം source-ൽ യാതൊരു മാറ്റവുമില്ലാതെ നിലവിലെ tree-യ്ക്കെതിരെ വിജയിച്ചു**.

യഥാർത്ഥ ഫയലിലേക്ക് resolve ചെയ്യുന്ന ഓരോ exclusion-നും (a) ഒരു tracking issue വ്യക്തമാക്കണമെന്നും
(b) അതിന്റെ അളന്ന status സഹിതം `config/quality/vitest-exclusions.json`-ൽ ഉൾപ്പെടണമെന്നും ഗേറ്റ്
നിർബന്ധമാക്കുന്നു. അതിനാൽ പുതിയൊരു exclusion ചേർക്കുന്നത് 60-entry array-യിലെ മറ്റൊരു വരിയാകുന്നതിനുപകരം
ഒരു സമർപ്പിത ഫയലിലെ review ചെയ്യാവുന്ന diff ആകുന്നു. ഒഴിവാക്കിയ ടെസ്റ്റുകൾ ഇത് മനഃപൂർവം വീണ്ടും
പ്രവർത്തിപ്പിക്കുന്നില്ല — അതിന് ~10 മിനിറ്റ് ചെലവാകും, അത് ഒരു periodic job-ലാണ് ഉൾപ്പെടേണ്ടത്;
ഓരോന്നും അവസാനം അളന്ന സമയം inventory രേഖപ്പെടുത്തുന്നു.
