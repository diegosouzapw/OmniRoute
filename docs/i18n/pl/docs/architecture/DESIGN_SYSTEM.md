---
title: "System designu i tożsamość wizualna"
lastUpdated: 2026-07-11
---

# OmniRoute — System designu i tożsamość wizualna

> **Status:** referencja — opisana tu standaryzacja jest **zaimplementowana** (fazy 1–6: tapeta siatki, prymitywy, centralizacja kolorów statusu, token mono, migracja tokenów DataTable, focus-ring → accent, prymitywy Checkbox/Textarea, `cn()` → tailwind-merge, siatka na każdym samodzielnym ekranie, płynna powłoka treści 4K, nieprzezroczyste powierzchnie tabel danych). Ten dokument to kanoniczny opis tokenów designu dashboardu, komponentów i konwencji; poniższe ujęcie fazowe zachowano jako uzasadnienie każdej decyzji.
> **Zakres:** dashboard OmniRoute (`src/`) i strona marketingowa (`_mono_repo/omnirouteSite/`) dzielą **jedną tożsamość wizualną** — ta sama tapeta siatki w kratkę (32px), te same tokeny kolorów, ustandaryzowane komponenty.
>
> Uwagi praktyczne dla maintainerów:
>
> - Kilka pozostałych hardkodowanych wartości hex jest **celowych** (zawsze ciemny terminal konsoli, stroke’y SVG ReactFlow) i **NIE** wolno ich wciągać do tokenów.
> - „Większa” siatka na działającej instancji to stary build, nie kod — rozmiar siatki to 32px, identyczny jak na stronie.
> - Wartości `--table-*` w dark-theme są bajtowo identyczne z hardkodowanym rgba sprzed migracji; light theme został naprawiony (był błędnie zawsze-ciemny przez martwe fallbacki `var()`).

---

## 1. Cel

Strona marketingowa (`viral.omniroute.online`, `why.omniroute.online`, `omniroute.online`) i dashboard produktu powinny wyglądać jak **jeden produkt**. Strona już pożyczyła paletę z dashboardu — jej `css/tokens.css` wręcz mówi _"Palette mirrors the OmniRoute dashboard (src/app/globals.css)"_. Zatem obie są już zsynchronizowane w ~80% na poziomie kolorów. Czego brakuje na dashboardzie:

1. **Tapeta siatki w kratkę (graph-paper)**, której strona używa na każdej stronie.
2. Garść **współdzielonych tokenów designu**, które ma strona, a dashboard nie (skala radius, gradient brand, `surface-2`, font mono).
3. **Spójność na poziomie komponentów** — część komponentów dashboardu omija tokeny motywu hardkodowanym hex/rgba.

Ten dokument to analiza i plan.

---

## 2. Zasady

- **Jedno źródło prawdy = `src/app/globals.css`.** Strona odzwierciedla dashboard, nigdy odwrotnie. Nowe tokeny lądują najpierw w `globals.css`.
- **Tokeny, nigdy literały.** Komponenty konsumują tokeny semantyczne (`bg-surface`, `text-primary`, `border-border`), nigdy surowy `#hex`.
- **Subtelnie, nie głośno.** Siatka to delikatna tapeta za treścią — nigdy nie wolno obniżać kontrastu tekstu ani walczyć z UI.
- **Świadomość motywu.** Wszystko działa zarówno w `.dark` (sygnaturowy wygląd produktu), jak i w light.
- **Chirurgiczne wdrażanie.** Najpierw siatka + tokeny (niskie ryzyko, wysoka widoczność), potem fale sprzątania komponentów.

---

## 3. Stan obecny — co już jest zsynchronizowane, a co nie

### 3.1 Kolory — już ujednolicone ✅

Każdy kolor brand i surface już pasuje do strony **wartością** (różnią się tylko nazwy — dashboard dodaje prefiks `--color-`). Zweryfikowane w `src/app/globals.css:30-128`:

| Pojęcie                    | Token strony (`tokens.css`)                 | Token dashboardu (`globals.css`) | Zgodność           |
| -------------------------- | ------------------------------------------- | -------------------------------- | ------------------ |
| primary                    | `--primary #e54d5e`                         | `--color-primary #e54d5e`        | ✅                 |
| primary-hover              | `--primary-hover #c93d4e`                   | `--color-primary-hover #c93d4e`  | ✅                 |
| accent                     | `--accent #6366f1`                          | `--color-accent #6366f1`         | ✅                 |
| accent-2                   | `--accent-2 #8b5cf6`                        | `--color-accent-hover #8b5cf6`   | ✅ (przemianowane) |
| accent-3                   | `--accent-3 #a855f7`                        | `--color-accent-light #a855f7`   | ✅ (przemianowane) |
| success / warning / error  | `#22c55e / #f59e0b / #ef4444`               | identyczne                       | ✅                 |
| traffic lights             | `#ff5f56 / #ffbd2e / #27c93f`               | identyczne                       | ✅                 |
| dark bg / surface / border | `#0b0e14 / #161b22 / rgba(255,255,255,.08)` | identyczne                       | ✅                 |
| light bg / surface / text  | `#f9f9fb / #fff / #1a1a2e`                  | identyczne                       | ✅                 |

**Wniosek:** nie ma migracji kolorów do zrobienia. Tożsamość jest już współdzielona; _dokańczamy_ ją, a nie budujemy od nowa.

### 3.2 Luki — czego brakuje dashboardowi

| Luka                     | Strona ma                                                                      | Dashboard                                                     | Działanie              |
| ------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------- |
| **Tapeta siatki**        | `body::before` graph-paper, `--grid-line`, `--grid-size 32px`, `--section-alt` | **✅ dodane (Phase 1)**                                       | **Część A**            |
| **Skala radius**         | `--radius 14px`, `--radius-sm 9px`                                             | `--radius 14px` dodane; `-sm` + przepięcie komponentów w toku | **Część B / Phase 2**  |
| **Gradient brand**       | `--grad-brand 135deg primary→accent-3`                                         | **✅ token dodany (Phase 1)**; użyty w Phase 2                | **Część B**            |
| **Zagnieżdżony surface** | `--surface-2 #1c2230`                                                          | **✅ dodane (Phase 1)**                                       | **Część B**            |
| **Font mono**            | `--font-mono` (ui-monospace stack)                                             | w toku (Phase 4, z konsumentami)                              | **Część B**            |
| **`text-muted` (dark)**  | `#8b8b9e`                                                                      | `#a1a1aa` (zinc-400)                                          | uzgodnić — **Część B** |

### 3.3 Mechanika themingu (żeby nic nie zepsuć)

- **Tailwind v4, CSS-first** (bez `tailwind.config.*`). Tokeny są zdefiniowane w `:root`/`.dark` i udostępniane utility przez `@theme inline` (`globals.css:130-179`).
- **Dark przez klasę `.dark`** na `<html>` (`@custom-variant dark` w `globals.css:22`), przełączaną przez własny store Zustand (`src/store/themeStore.ts`), domyślny motyw = `system` (`src/shared/constants/appConfig.ts:11`). Strona używa zamiast tego `html[data-theme="light"]` — **mechanizmy się różnią, ale nigdy się nie spotykają** (osobne originy), więc nie ma konfliktu. Zachowujemy mechanizm `.dark` dashboardu.
- **Runtime override primary** istnieje (`themeStore.ts:85-97`, presety w `COLOR_THEMES`) — użytkownicy mogą podmienić `--color-primary`. Każdy nowy token (gradient itd.), który odwołuje się do `--color-primary`, dziedziczy te override’y za darmo. ✅
- **Zarezerwowane nazwy radius w Tailwind v4:** `--radius-sm/md/lg/...` napędzają utility `rounded-*`. Ich retroaktywne przedefiniowanie zmienia każdy istniejący `rounded-*` (np. `rounded-sm` jest używany w 12 plikach). Dlatego wartość small-radius i przepięcie komponentów są celowo odłożone do Phase 2, gdzie konsumenci zmieniają się razem.

---

## 4. Część A — Tło siatki w kratkę (główna prośba) — ZAIMPLEMENTOWANE (Phase 1)

### 4.1 Co to jest

Dokładna receptura ze strony (`_mono_repo/omnirouteSite/css/base.css`): **stały, pełnoekranowy pseudo-element** malujący dwa gradienty linii 1px, siedzący na `z-index:-1` za całą treścią.

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

**Dlaczego to działa, mimo że `body` ma nieprzezroczysty `background-color`:** `::before` z `z-index:-1` maluje _nad_ własnym tłem elementu, ale _pod_ jego treścią in-flow. Zatem `--color-bg` to bazowe wypełnienie, siatka leży na nim warstwą, a aplikacja renderuje się nad siatką.

### 4.2 Precedens już w codebase

`src/app/landing/page.tsx:16-26` **już implementuje tę samą siatkę per-page** — ale z **czerwonymi** liniami (`#E54D5E`, opacity `0.06`) na **50px**, plus animowane orby. Wzorzec jest więc sprawdzony w produkcie; ta praca promuje go do **globalnej, theme-aware** tapety.

### 4.3 Dodane tokeny (w `globals.css`)

```css
:root {
  /* light — grid opacity tuned up from the site's 0.045 so the wallpaper is
     actually visible on the dense dashboard (cards/chrome cover most of the viewport) */
  --grid-line: rgba(0, 0, 0, 0.07);
  --grid-size: 32px;
  --section-alt: rgba(0, 0, 0, 0.022);
}
.dark {
  /* dark — tuned up from 0.035 for the same reason */
  --grid-line: rgba(255, 255, 255, 0.06);
  --section-alt: rgba(255, 255, 255, 0.018);
}
```

### 4.4 Jedyny bloker — usunięty

Siatka jest globalna z konstrukcji (pokrywa panel, `auth`/`login`, strony błędów — każdą trasę — naraz). Dokładnie **jeden** element ukrywał ją wewnątrz panelu:

- `src/shared/components/layouts/DashboardLayout.tsx` — zewnętrzny wrapper malował nieprzezroczysty `bg-bg`. Wszystko poniżej jest już przezroczyste (`<main>`, kontener scrolla, wewnętrzny `max-w-7xl`), więc **usunięcie `bg-bg`** pozwala siatce body prześwitywać przez obszar treści (body `--color-bg` pozostaje bazowym wypełnieniem).

  ```diff
  - <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  + <div className="flex h-dvh min-h-0 w-full overflow-hidden">
  ```

### 4.5 Interakcja chrome (sidebar / header)

- `Header` (`Header.tsx:207`, `bg-bg`) i `Sidebar` (`Sidebar.tsx:430`, `bg-sidebar`) pozostają **nieprzezroczyste** → siatka widać **tylko w obszarze treści**, z solidnym chrome’em w ramie. Spokojny default, zgodny z tym, jak strona oddziela chrome od canvas (decyzja D3 = solid).

### 4.6 Strony login / auth / error

Te renderują się bezpośrednio pod `<body>` (bez chrome panelu), więc globalna siatka powinna pojawiać się za nimi automatycznie. **Phase 5 — DONE:** samodzielne pełnoekranowe wrappery były w rzeczywistości nieprzezroczyste (`min-h-screen … bg-bg`, gdzie `bg-bg` to to samo solidne wypełnienie co `<body>`), co ukrywało siatkę na każdym ekranie spoza dashboardu — nie tylko na loginie. Wszystkie są teraz przezroczyste, więc wspólna tapeta prześwituje: `login`, `forgot-password`, `callback`, `maintenance`, `offline`, `status`, `terms`, `privacy`, `onboarding` oraz `ErrorPageScaffold` (obejmuje `400`/`401`). To zamyka **D4** (rozszerzone z samego loginu na każdy samodzielny ekran). Chronione przez `tests/unit/design-grid-background.test.ts`.

### 4.7 Strona landing

`landing/page.tsx` zachowuje bogatsze animowane tło (orby + vignette) — własny marketingowy splash (decyzja D5 = zostawić bez zmian).

---

## 5. Część B — Unifikacja tokenów

Phase 1 dodaje bierne, bezkolizyjne tokeny tożsamości (`--surface-2`/`--color-surface-2`, `--grad-brand`, `--radius`). Phase 2 podłącza skalę radius do Tailwinda i przepina komponenty; Phase 4 dodaje `--font-mono` z konsumentami.

| Token                      | Po co                                                         | Phase                          |
| -------------------------- | ------------------------------------------------------------- | ------------------------------ |
| `--radius` / `--radius-sm` | Jedna skala radius (14/9) zamiast ad-hoc 6/8/12               | 1 (value) / 2 (wire + repoint) |
| `--grad-brand`             | Gradient brand dla primary CTA (red→violet), zgodny ze stroną | 1 (token) / 2 (Button)         |
| `--surface-2`              | Zagnieżdżone panele / nagłówki tabel / wcięte wiersze         | 1                              |
| `--font-mono`              | Bloki kodu, terminal, ID, endpointy                           | 4                              |
| `--text-muted` reconcile   | Wybrać jedną wartość site↔panel (rekomendowane `#a1a1aa`)     | 2                              |

**D2 (text-muted):** strona `#8b8b9e` vs dashboard `#a1a1aa`. Rekomendacja: zostawić **`#a1a1aa` dashboardu** i zaktualizować _stronę_, by pasowała. Kosmetyka.

---

## 6. Część C — Standaryzacja komponentów (Phases 2–4)

Własne komponenty (bez shadcn/Radix), Tailwind v4, tokeny semantyczne **w większości** przyjęte (195 plików importuje wspólny barrel). Praca polega na usunięciu **bypassów**. Dom: `src/shared/components/`.

| #   | Element                                | Plik(i)                                                                                                                  | Problem → cel                                                                                                                   | Phase |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----- |
| C1  | **Wyrównanie radius**                  | `Button.tsx:14-18`, `Card.tsx:39`, `Modal.tsx`, `Input.tsx`, `Select.tsx`                                                | mieszane 6/8/12px → `--radius`/`--radius-sm` (14/9)                                                                             | 2     |
| C2  | **Gradient Button + wariant `accent`** | `Button.tsx:5-12`                                                                                                        | primary to płaski red→red; wyrównać do `--grad-brand`; dodać brakujący wariant `accent`. ~195 importerów — najwyższa widoczność | 2     |
| C3  | **Tabele**                             | `DataTable.tsx:122-176`, `logTableStyles.ts`, `globals.css:405-414`                                                      | 100% inline hardkodowane rgba + nieistniejące vars; migracja do tokenów, wycofanie rozbieżnych stylów                           | 3     |
| C4  | **Centralizacja kolorów statusu**      | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `ProviderCascadeNode.tsx`, `Badge.tsx` + 5 helpers | 6+ kopii tego samego hex → jeden moduł oparty o `--color-success/warning/error`                                                 | 3     |
| C5  | **Ramka Card**                         | `Card.tsx:39`                                                                                                            | `border-white/5` → brand `/8`                                                                                                   | 2     |
| C6  | **Uzgodnienie focus ring** ✅ DONE     | `globals.css` `--focus-ring` (accent) vs `ring-primary/30` kontrolek formularzy                                          | ujednolicone na **accent (violet)**, by pasować do globalnego ring i odróżnić od czerwonego ring błędu; error zostaje czerwony  | 4     |
| C7  | **Dodać `Checkbox` + `Textarea`**      | surowe `<input>`/`<textarea>` z inline `accentColor:#6366f1`                                                             | prymitywy oparte o tokeny                                                                                                       | 4     |
| C8  | **Sweep hardkodowanego hex**           | `ConsoleLogViewer.tsx:240`, `ComboLiveStudio.tsx:306`, kropki Modal, ~14 plików chart                                    | literały → tokeny                                                                                                               | 4     |
| C9  | **`cn()` → clsx + tailwind-merge**     | `src/shared/utils/cn.ts`                                                                                                 | kolidujące klasy się stackują; potrzebne do override’ów C1                                                                      | 2     |

**Już zgodne z brandem (token-driven, potrzebują tylko radius):** `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`.

---

## 7. Plan wdrożenia

- **Phase 1 — Siatka + tokeny tożsamości (TEN PR).** Siatka w `globals.css` + tokeny `--surface-2`/`--grad-brand`/`--radius`; tapeta `body::before`; usunięcie blokera `bg-bg`; statyczny test-guard. Niskie ryzyko, odwracalne w jednym commicie.
- **Phase 2 — Prymitywy (C1, C2, C5) — DONE w tym PR.** Semantyczne utility radius `rounded-card` (14px) / `rounded-control` (9px) dodane przez `@theme` (własne nazwy, więc domyślne `rounded-sm/md/lg/xl` zostają nietknięte — bez blastu na 400 plików); Card/Modal → 14px, Button/Input/Select → 9px; Button primary → `--grad-brand` (red→violet) + nowy wariant `accent`; ramki Card → token `border-border` (0.08). **Odłożone:** `cn()`→tailwind-merge (C9) wymaga nowych deps; ad-hoc sweep `rounded-lg` (326 plików) zostaje jak jest, bo prymitywy niosą większość powierzchni.
- **Phase 3 — Kolory statusu + tabele (C3, C4) — DONE w tym PR.** ✅ **C4** (`src/shared/constants/statusColors.ts` — `STATUS_HEX` jako jedyne źródło; `flow/edgeStyles.ts` + `TokenHealthBadge` przepięte, wierne/ten sam hex). ✅ Token **`--font-mono`**. ✅ **C3 (DataTable)** — zastąpiono każde inline rgba oraz martwe fallbacki `var(--bg-table-header)` / `var(--text-secondary)` zestawem tokenów `--table-*` (`--table-header-bg/-row-zebra/-row-hover/-cell-border/-row-selected`), którego **wartości dark dokładnie równają się staremu hardkodowanemu rgba** (dark bajtowo identyczne), a wartości light naprawiają wcześniej zawsze-ciemny light theme. Border nagłówka → `--color-border`, tekst secondary → `--color-text-muted`. **Wymaga przejścia wizualnego przed merge.** (Nietknięte: `logTableStyles.ts` i legacy reguły Ant `.ant-table` — osobno, niższy priorytet.)
- **Phase 4 — Sprzątanie (C6, C7, C9 done; C8 pending).** ✅ **C9** `cn()` → `twMerge(clsx(...))` (clsx + tailwind-merge dodane jako deps) — `className` wywołującego teraz poprawnie _zastępuje_ kolidującą klasę prymitywu zamiast się stackować. ✅ **C7** nowe prymitywy `Checkbox` + `Textarea` (oparte o tokeny, eksportowane z barrel; addytywne — adopcja 32 surowych checkboxów / 41 surowych textarea może iść inkrementalnie). ✅ **C6** uzgodnienie focus-ring — kontrolki formularzy (`Input`/`Select`/`Textarea`/`Toggle`/`Checkbox`) focusują teraz na pierścieniu **accent (violet)**, by pasować do globalnego `--focus-ring` i nie kolidować z czerwonym pierścieniem błędu; czerwony stan error bez zmian. ⏳ **C8 hex-sweep NIE jest ślepym find/replace** — potwierdzeni sprawcy, którzy są _celowi_ i muszą zostać: `ConsoleLogViewer.tsx:240` (zawsze ciemny terminal), popover `TokenHealthBadge`, stroke’y SVG ReactFlow. Migrować tylko hex naprawdę mający być theme-aware.

Każda faza: `npm run lint` + `npm run typecheck:core` + visual pass.

---

## 8. Otwarte decyzje (rekomendacje)

- **D1 — Button primary:** zostawić red→red czy przełączyć na **red→violet `--grad-brand`**? Rec: **red→violet** (Phase 2).
- **D2 — Kolor linii siatki:** **neutral** (styl strony) — wybrane — vs brand-red. Rozmiar **32px** (zmniejszony o ~30% z oryginalnych 46px na feedback właściciela — komórki 46px czytały się za duże na layoutcie dashboardu).
- **D3 — Vibrancy chrome:** sidebar/header **solid** — wybrane.
- **D4 — Siatka auth/login:** ✅ **DONE (Phase 5)** — nieprzezroczysty `bg-bg` usunięty z każdego samodzielnego pełnoekranowego wrappera (nie tylko login), więc siatka widać na wszystkich ekranach. Zob. §4.6.
- **D5 — Landing page:** zostawić animowany splash bez zmian. Wybrane.
- **D6 — Radius 14/9 w całym produkcie:** Rec: tak (Phase 2).
- **D7 — Phase 1 shipuje jako pierwsze:** Wybrane.
- **D8 — Szerokość layoutu (Phase 5):** powłoka treści dashboardu była ograniczona do `max-w-7xl` (1280px), centrując z szerokimi pustymi gutterami bocznymi na dużych monitorach. ✅ **DONE** — podniesione do płynnego `max-w-[3840px]` (prawdziwe 4K): treść teraz podąża za viewportem do ~4K i centrując się dopiero powyżej (`DashboardLayout.tsx`). Celowo-wąskie strony zostają wąskie z założenia (`ProviderOnboardingWizard` max-w-5xl, `Rtk`/`CavemanContextPageClient` max-w-6xl).
- **D9 — Nieprzezroczyste tabele danych (Phase 6):** gdy obszar treści dashboardu jest już przezroczysty (żeby tapeta siatki prześwitywała, Phase 5), tabele danych, których kontener _nie_ był nieprzezroczystą powierzchnią, przepuszczały siatkę przez przezroczyste even-rows / low-alpha zebra. ✅ **DONE** — każda tabela bez card maluje teraz `bg-surface` (albo, dla prymitywu `<DataTable>`, `background: var(--color-surface)` na kontenerze scrolla). Naprawione: `DataTable` (prymityw), `ProxyLogger`/`RequestLoggerV2` (ich tint `<Card>` `bg-black/5 dark:bg-black/20` wygrywał nad `bg-surface` Card przez tailwind-merge → ~95% przezroczyste), `BatchListTab`/`FilesListTab`/`CacheEntriesTab`/`ReasoningCacheTab`/`cache page`/`FreePoolTab`/`ModelMappingTable`/`HeaderTable`, plus dwie „tabele” CSS-grid w widokach cache (`bg-surface/35` → `bg-surface`). Tabele już wewnątrz `<Card>`/Modal zweryfikowane jako nieprzezroczyste i celowo nietknięte (bg-surface tam to zbędny no-op). Sama siatka **nie wymagała zmian** — `body::before` dashboardu jest bajtowo identyczny ze stroną (`--grid-size: 32px`); każda „większa siatka” na działającej instancji to stary build sprzed `#4143`, nie kod. Chronione przez `tests/unit/design-grid-background.test.ts` (blok Phase 6).

---

## 9. Poza zakresem / ryzyka

- **Bez zmiany palety** — kolory już pasują; dodajemy tylko brakujące tokeny. Zero ryzyka przekolorowania produktu.
- **Bez zmiany silnika motywu** — zachować `.dark` + store Zustand.
- **Przesunięcie radius (Phase 2) jest szerokie** — dotyka każdej karty/przycisku/inputu; przejrzeć wzrokiem zajęte ekrany (tabele, modale) przed merge.
- **Tabele (C3)** niosą najwięcej hardkodowanego stylu i najwyższą powierzchnię regresji — izolować we własnym PR.

---

## 10. Indeks referencyjny

| Obszar                               | Ścieżka                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Tokeny dashboardu                    | `src/app/globals.css` (`:root`, `.dark`, `@theme inline`, `body`, `body::before`)                                    |
| Store motywu                         | `src/store/themeStore.ts`, `src/shared/components/ThemeProvider.tsx`, `src/shared/constants/appConfig.ts:9-11`       |
| Shell panelu (tu odblokowana siatka) | `src/shared/components/layouts/DashboardLayout.tsx`                                                                  |
| Chrome                               | `src/shared/components/Header.tsx:207`, `src/shared/components/Sidebar.tsx:430`                                      |
| Precedens siatki                     | `src/app/landing/page.tsx:16-26`                                                                                     |
| Prymitywy                            | `src/shared/components/{Button,Card,Input,Select,Badge,Modal,Toggle,SegmentedControl,Loading,Tooltip,DataTable}.tsx` |
| Źródła kolorów statusu               | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `logTableStyles.ts`                            |
| Util `cn`                            | `src/shared/utils/cn.ts`                                                                                             |
| Test-guard Phase 1                   | `tests/unit/design-grid-background.test.ts`                                                                          |
| Referencja strony                    | `_mono_repo/omnirouteSite/css/tokens.css`, `css/base.css`                                                            |
