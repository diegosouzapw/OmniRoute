# Model Exposure Allow/Deny List (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Funkcja opcjonalna, domyślnie wyłączona (gdy `modelVisibilityAllowlist`/`modelVisibilityDenylist` są puste,
> katalog `/v1/models` ORAZ każda pula kandydatów `auto/*` pozostają identyczne bajt w bajt). Ustawienie pokrewne
> wobec `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`), przeznaczone dla operatorów, którzy chcą mieć
> wyselekcjonowaną listę modeli z powodów niezwiązanych z kosztami.

## Dlaczego to istnieje

`hidePaidModels` odpowiada na pytanie „czy ten model jest bezpłatny?”, a `hideAutoCombos` — „czy wirtualne
identyfikatory `auto/*` powinny być w ogóle udostępniane?” — żadne z nich nie pozwala operatorowi wybrać dowolnego
podzbioru modeli (np. udostępnić dokładnie te modele, które powinien widzieć dany klient Claude Code / OpenCode,
niezależnie od cen). #11481 dodaje taką możliwość w postaci dwóch niezależnych, opcjonalnych ustawień będących tablicami ciągów znaków.

## Ustawienia

| Klucz                      | Typ        | Wartość domyślna | Znaczenie                                                           |
| -------------------------- | ---------- | ---------------- | ------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`             | Wpisy pasujące do kandydata ukrywają go w katalogu/puli kandydatów. |
| `modelVisibilityAllowlist` | `string[]` | `[]`             | Gdy lista nie jest pusta, widoczne pozostają TYLKO pasujące wpisy.  |

Oba ustawienia przyjmują do 500 wpisów, z których każdy może mieć maksymalnie 200 znaków (walidacja Zod w
`src/shared/validation/settingsSchemas.ts`). Wpis jest jednym z poniższych:

- dokładny identyfikator katalogowy — `"gpt-4o"` (sam identyfikator modelu) lub `"openai/gpt-4o"` (z prefiksem dostawcy), albo
- wzorzec glob używający `*`/`?` — np. `"openai/gpt-4*"` lub `"anthropic/*"` — dopasowywany przy użyciu
  tego samego współdzielonego mechanizmu `globToRegex()` (`src/shared/utils/globPattern.ts`), który jest już używany przez
  mapowania kombinacji dla poszczególnych modeli w `ModelRoutingSection` oraz `freeModels.ts::matchesOnlyPaidModels`.

Priorytet: najpierw sprawdzana jest lista blokowanych wpisów (zablokowany wpis jest zawsze ukryty, nawet jeśli
pasuje również do listy dozwolonych); gdy lista dozwolonych nie jest pusta, zachowane zostają wyłącznie pasujące do niej wpisy.

## Dwa punkty kontroli, nie jeden

Wniosek z #6512 (filtrowanie katalogu wyłącznie za pomocą `hidePaidModels` nadal pozwalało `auto/*` kierować żądania do
płatnego modelu, ponieważ pula kandydatów kombinacji była tworzona niezależnie) ma tu dokładnie takie samo zastosowanie.
Predykat dopasowujący `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) jest wywoływany w OBU miejscach:

- `src/app/api/v1/models/catalog.ts` — w samym wykazie `/v1/models`, w tych samych 5 punktach kontroli dla poszczególnych źródeł,
  które są już zabezpieczone przez `shouldHidePaid()` (statyczne `PROVIDER_MODELS`, zsynchronizowane rekordy dostawców,
  rekordy niestandardowe, rekordy oparte na aliasach, rekordy zarządzanego mechanizmu rezerwowego).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — wywoływane
  z `virtualFactory.ts::buildPreparedPool`, bezpośrednio po równoważnym wywołaniu
  `filterPaidOnlyCandidates()`, dzięki czemu zablokowany model nigdy nie może zostać wybrany do puli kandydatów `auto/*`.

## Co NIE jest filtrowane

Odzwierciedla to istniejące zachowanie `hideAutoCombos`: identyfikator modelu wysłany **jawnie** (nie za pośrednictwem `auto/*`
i nieodkryty przez wykaz katalogu) nigdy nie jest blokowany podczas przekazywania żądania — filtrowane są wyłącznie
widoczność i członkostwo w puli kandydatów. Jest to niezależne od `hidePaidModels`;
operator może chcieć wyselekcjonowanego zestawu z powodów niezwiązanych z kosztami, dlatego oba
ustawienia składają się jako niezależne filtry połączone operatorem AND, tak samo jak istniejąca kompozycja wielu flag w
`catalog.ts`.

Eksport ustawień (`GET /api/settings/export-json`) zawiera obie tablice bez zmian, podobnie jak każde inne
pole ustawień — w przeciwieństwie do filtra eksportu kroków kombinacji w `hidePaidModels` nie występuje tutaj ryzyko
ponownego wczytania: zablokowany identyfikator osadzony w wyeksportowanym kroku kombinacji jest jawnym wyborem routingu
dokonanym przez operatora, a nie czymś, co należy usunąć na granicy eksportu.
