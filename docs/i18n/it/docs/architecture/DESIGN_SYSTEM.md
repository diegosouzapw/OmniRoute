# OmniRoute — Design System & Visual Identity (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/DESIGN_SYSTEM.md) · 🇪🇹 [am](../../../am/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇦 [ar](../../../ar/docs/architecture/DESIGN_SYSTEM.md) · 🇦🇿 [az](../../../az/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇬 [bg](../../../bg/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇩 [bn](../../../bn/docs/architecture/DESIGN_SYSTEM.md) · 🇨🇿 [cs](../../../cs/docs/architecture/DESIGN_SYSTEM.md) · 🇩🇰 [da](../../../da/docs/architecture/DESIGN_SYSTEM.md) · 🇩🇪 [de](../../../de/docs/architecture/DESIGN_SYSTEM.md) · 🇬🇷 [el](../../../el/docs/architecture/DESIGN_SYSTEM.md) · 🇪🇸 [es](../../../es/docs/architecture/DESIGN_SYSTEM.md) · 🇪🇪 [et](../../../et/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇷 [fa](../../../fa/docs/architecture/DESIGN_SYSTEM.md) · 🇫🇮 [fi](../../../fi/docs/architecture/DESIGN_SYSTEM.md) · 🇫🇷 [fr](../../../fr/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇪 [ga](../../../ga/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [gu](../../../gu/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [ha](../../../ha/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇱 [he](../../../he/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [hi](../../../hi/docs/architecture/DESIGN_SYSTEM.md) · 🇭🇷 [hr](../../../hr/docs/architecture/DESIGN_SYSTEM.md) · 🇭🇺 [hu](../../../hu/docs/architecture/DESIGN_SYSTEM.md) · 🇦🇲 [hy](../../../hy/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇩 [id](../../../id/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [ig](../../../ig/docs/architecture/DESIGN_SYSTEM.md) · 🇯🇵 [ja](../../../ja/docs/architecture/DESIGN_SYSTEM.md) · 🇬🇪 [ka](../../../ka/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇭 [km](../../../km/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [kn](../../../kn/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇷 [ko](../../../ko/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇹 [lt](../../../lt/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇻 [lv](../../../lv/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [ml](../../../ml/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [mr](../../../mr/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇾 [ms](../../../ms/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇹 [mt](../../../mt/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇲 [my](../../../my/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇵 [ne](../../../ne/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇱 [nl](../../../nl/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇴 [no](../../../no/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [or](../../../or/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [pa](../../../pa/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇭 [phi](../../../phi/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇱 [pl](../../../pl/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇹 [pt](../../../pt/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇴 [ro](../../../ro/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇺 [ru](../../../ru/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇰 [si](../../../si/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇰 [sk](../../../sk/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇮 [sl](../../../sl/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇸 [sr](../../../sr/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇪 [sv](../../../sv/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇪 [sw](../../../sw/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [ta](../../../ta/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [te](../../../te/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇭 [th](../../../th/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇷 [tr](../../../tr/docs/architecture/DESIGN_SYSTEM.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇰 [ur](../../../ur/docs/architecture/DESIGN_SYSTEM.md) · 🇺🇿 [uz](../../../uz/docs/architecture/DESIGN_SYSTEM.md) · 🇻🇳 [vi](../../../vi/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [yo](../../../yo/docs/architecture/DESIGN_SYSTEM.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/DESIGN_SYSTEM.md)

---

> **Stato:** riferimento — la standardizzazione descritta qui è **implementata** (fasi 1–6: sfondo a griglia, primitive, centralizzazione dei colori di stato, token mono, migrazione dei token di DataTable, focus-ring → accent, primitive Checkbox/Textarea, `cn()` → tailwind-merge, griglia su ogni schermata autonoma, contenitore fluido dei contenuti in 4K, superfici opache delle tabelle dati). Questo documento è la descrizione canonica dei token di design, dei componenti e delle convenzioni della dashboard; la suddivisione in fasi riportata di seguito viene mantenuta come motivazione di ciascuna decisione.
> **Ambito:** la dashboard di OmniRoute (`src/`) e il sito di marketing (`_mono_repo/omnirouteSite/`) condividono **un'unica identità visiva** — stesso sfondo a griglia tipo carta millimetrata (32px), stessi token di colore, componenti standardizzati.
>
> Note pratiche per i manutentori:
>
> - Diversi valori esadecimali ancora codificati direttamente sono **intenzionali** (terminale della console sempre scuro, tratti SVG di ReactFlow) e **NON** devono essere sostituiti indiscriminatamente con token.
> - Una griglia "più grande" su un'istanza in esecuzione indica una build obsoleta, non un problema nel codice — la dimensione della griglia è 32px, identica a quella del sito.
> - I valori `--table-*` del tema scuro sono identici byte per byte ai valori rgba codificati direttamente prima della migrazione; il tema chiaro è stato corretto (era erroneamente sempre scuro a causa di fallback `var()` inutilizzati).

---

## 1. Scopo

Il sito di marketing (`viral.omniroute.online`, `why.omniroute.online`, `omniroute.online`) e la dashboard del prodotto devono apparire come **un unico prodotto**. Il sito ha già adottato la propria palette dalla dashboard — il suo `css/tokens.css` afferma persino _"La palette rispecchia la dashboard di OmniRoute (src/app/globals.css)"_. Pertanto, i due sono già allineati per circa l'80% a livello cromatico. Ciò che manca nella dashboard:

1. Lo **sfondo a griglia tipo carta millimetrata** utilizzato dal sito in ogni pagina.
2. Alcuni **token di design condivisi** presenti nel sito ma assenti nella dashboard (scala dei raggi, gradiente del brand, `surface-2`, font mono).
3. **Coerenza a livello di componenti** — diversi componenti della dashboard ignorano i token del tema usando valori hex/rgba codificati direttamente.

Questo documento contiene l'analisi e il piano.

---

## 2. Principi

- **Unica fonte di verità = `src/app/globals.css`.** Il sito rispecchia la dashboard, mai il contrario. I nuovi token vengono introdotti prima in `globals.css`.
- **Token, mai valori letterali.** I componenti utilizzano token semantici (`bg-surface`, `text-primary`, `border-border`), mai valori `#hex` grezzi.
- **Discreto, non invadente.** La griglia è uno sfondo tenue posizionato dietro i contenuti — non deve mai ridurre il contrasto del testo né interferire con l'interfaccia utente.
- **Compatibile con i temi.** Tutto funziona sia in `.dark` (l'aspetto distintivo del prodotto) sia nel tema chiaro.
- **Implementazione mirata.** Prima vengono distribuiti la griglia e i token (basso rischio, alta visibilità), quindi le correzioni dei componenti in più fasi.

---

## 3. Stato attuale — cosa è già allineato e cosa non lo è

### 3.1 Colori — già unificati ✅

Ogni colore del brand e ogni superficie corrispondono già al sito **in termini di valore** (differiscono soltanto i nomi — la dashboard usa il prefisso `--color-`). Verificato in `src/app/globals.css:30-128`:

| Concetto                           | Token del sito (`tokens.css`)               | Token della dashboard (`globals.css`) | Corrispondenza  |
| ---------------------------------- | ------------------------------------------- | ------------------------------------- | --------------- |
| primario                           | `--primary #e54d5e`                         | `--color-primary #e54d5e`             | ✅              |
| primario-hover                     | `--primary-hover #c93d4e`                   | `--color-primary-hover #c93d4e`       | ✅              |
| accento                            | `--accent #6366f1`                          | `--color-accent #6366f1`              | ✅              |
| accento-2                          | `--accent-2 #8b5cf6`                        | `--color-accent-hover #8b5cf6`        | ✅ (rinominato) |
| accento-3                          | `--accent-3 #a855f7`                        | `--color-accent-light #a855f7`        | ✅ (rinominato) |
| successo / avviso / errore         | `#22c55e / #f59e0b / #ef4444`               | identici                              | ✅              |
| semafori                           | `#ff5f56 / #ffbd2e / #27c93f`               | identici                              | ✅              |
| sfondo / superficie / bordo scuri  | `#0b0e14 / #161b22 / rgba(255,255,255,.08)` | identici                              | ✅              |
| sfondo / superficie / testo chiari | `#f9f9fb / #fff / #1a1a2e`                  | identici                              | ✅              |

**Conclusione:** non è necessaria alcuna migrazione dei colori. L'identità è già condivisa; la stiamo _completando_, non ricostruendo.

### 3.2 Lacune — cosa manca nella dashboard

| Lacuna                   | Il sito ha                                                                            | Dashboard                                                                  | Azione                     |
| ------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------- |
| **Sfondo a griglia**     | carta millimetrata `body::before`, `--grid-line`, `--grid-size 32px`, `--section-alt` | **✅ aggiunto (Fase 1)**                                                   | **Parte A**                |
| **Scala dei raggi**      | `--radius 14px`, `--radius-sm 9px`                                                    | `--radius 14px` aggiunto; `-sm` + riallineamento dei componenti in sospeso | **Parte B / Fase 2**       |
| **Gradiente del brand**  | `--grad-brand 135deg primary→accent-3`                                                | **✅ token aggiunto (Fase 1)**; utilizzato nella Fase 2                    | **Parte B**                |
| **Superficie annidata**  | `--surface-2 #1c2230`                                                                 | **✅ aggiunto (Fase 1)**                                                   | **Parte B**                |
| **Font monospaziato**    | `--font-mono` (stack ui-monospace)                                                    | in sospeso (Fase 4, insieme agli elementi che lo utilizzano)               | **Parte B**                |
| **`text-muted` (scuro)** | `#8b8b9e`                                                                             | `#a1a1aa` (zinc-400)                                                       | riconciliare — **Parte B** |

### 3.3 Meccanismi di tematizzazione (per evitare di compromettere qualcosa)

- **Tailwind v4, CSS-first** (nessun `tailwind.config.*`). I token sono definiti in `:root`/`.dark` ed esposti alle utility tramite `@theme inline` (`globals.css:130-179`).
- **Modalità scura tramite la classe `.dark`** su `<html>` (`@custom-variant dark` in `globals.css:22`), attivata/disattivata da uno store Zustand personalizzato (`src/store/themeStore.ts`), tema predefinito = `system` (`src/shared/constants/appConfig.ts:11`). Il sito usa invece `html[data-theme="light"]` — **i meccanismi sono diversi ma non entrano mai in contatto** (origini separate), quindi non c'è conflitto. Manteniamo il meccanismo `.dark` della dashboard.
- **Esiste un override del colore primario in fase di esecuzione** (`themeStore.ts:85-97`, preset in `COLOR_THEMES`) — gli utenti possono sostituire `--color-primary`. Qualsiasi nuovo token (gradiente, ecc.) che faccia riferimento a `--color-primary` eredita automaticamente questi override. ✅
- **Nomi riservati di Tailwind v4 per i raggi:** `--radius-sm/md/lg/...` sono alla base delle utility `rounded-*`. Ridefinirli modifica retroattivamente ogni `rounded-*` esistente (ad esempio, `rounded-sm` è usato in 12 file). Pertanto, il valore del raggio piccolo e il riallineamento dei componenti sono intenzionalmente rinviati alla Fase 2, in cui gli elementi che li utilizzano verranno modificati insieme.

---

## 4. Parte A — Lo sfondo a griglia di carta millimetrata (richiesta principale) — IMPLEMENTATO (Fase 1)

### 4.1 Che cos'è

La ricetta esatta del sito (`_mono_repo/omnirouteSite/css/base.css`): uno **pseudo-elemento fisso, esteso all'intera viewport** che disegna due gradienti lineari da 1px, posizionato con `z-index:-1` dietro a tutti i contenuti.

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

**Perché funziona anche se `body` ha un `background-color` opaco:** un `::before` con `z-index:-1` viene disegnato _sopra_ lo sfondo dell'elemento stesso, ma _sotto_ il relativo contenuto nel flusso. Quindi `--color-bg` costituisce il riempimento di base, la griglia viene sovrapposta e l'app viene renderizzata sopra la griglia.

### 4.2 Precedente già presente nella codebase

`src/app/landing/page.tsx:16-26` **implementa già questa stessa griglia a livello di pagina**, ma con linee **rosse** (`#E54D5E`, opacità `0.06`) a intervalli di **50px**, oltre a sfere animate. Il pattern è quindi già collaudato nel prodotto; questo intervento lo promuove a sfondo **globale e sensibile al tema**.

### 4.3 Token aggiunti (in `globals.css`)

```css
:root {
  /* tema chiaro — opacità della griglia aumentata rispetto allo 0.045 del sito affinché lo sfondo sia
     effettivamente visibile nella dashboard densa (schede/elementi dell'interfaccia coprono gran parte della viewport) */
  --grid-line: rgba(0, 0, 0, 0.07);
  --grid-size: 32px;
  --section-alt: rgba(0, 0, 0, 0.022);
}
.dark {
  /* tema scuro — aumentata rispetto a 0.035 per lo stesso motivo */
  --grid-line: rgba(255, 255, 255, 0.06);
  --section-alt: rgba(255, 255, 255, 0.018);
}
```

### 4.4 L'unico elemento bloccante — rimosso

La griglia è globale per costruzione (copre contemporaneamente il pannello, `auth`/`login`, le pagine di errore — ogni route). Esattamente **un** elemento la nascondeva all'interno del pannello:

- `src/shared/components/layouts/DashboardLayout.tsx` — il wrapper esterno disegnava uno sfondo opaco `bg-bg`. Tutto ciò che si trova al suo interno è già trasparente (`<main>`, il contenitore di scorrimento e il contenitore interno `max-w-7xl`), quindi **rimuovere `bg-bg`** consente alla griglia del body di essere visibile attraverso l'area dei contenuti (il `--color-bg` del body rimane il riempimento di base).

  ```diff
  - <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  + <div className="flex h-dvh min-h-0 w-full overflow-hidden">
  ```

### 4.5 Interazione con gli elementi dell'interfaccia (barra laterale / intestazione)

- `Header` (`Header.tsx:207`, `bg-bg`) e `Sidebar` (`Sidebar.tsx:430`, `bg-sidebar`) rimangono **opachi** → la griglia appare **solo nell'area dei contenuti**, incorniciata da elementi dell'interfaccia a tinta unita. È una scelta visiva sobria e predefinita, coerente con il modo in cui il sito separa gli elementi dell'interfaccia dalla superficie dei contenuti (decisione D3 = tinta unita).

### 4.6 Pagine di login / autenticazione / errore

Queste vengono renderizzate direttamente sotto `<body>` (senza gli elementi del pannello), quindi la griglia globale dovrebbe apparire automaticamente dietro di esse. **Fase 5 — COMPLETATA:** i wrapper autonomi a schermo intero erano effettivamente opachi (`min-h-screen … bg-bg`, dove `bg-bg` è lo stesso riempimento a tinta unita di `<body>`), e ciò nascondeva la griglia in ogni schermata esterna alla dashboard, non soltanto nella pagina di login. Ora sono tutti trasparenti, così da mostrare lo sfondo condiviso: `login`, `forgot-password`, `callback`, `maintenance`, `offline`, `status`, `terms`, `privacy`, `onboarding` ed `ErrorPageScaffold` (che copre `400`/`401`). Questo completa **D4** (esteso dalla sola pagina di login a ogni schermata autonoma). Verificato da `tests/unit/design-grid-background.test.ts`.

### 4.7 Pagina di destinazione

`landing/page.tsx` mantiene il proprio sfondo animato più ricco (sfere + vignettatura), ovvero la propria presentazione promozionale (decisione D5 = lasciare invariato).

---

## 5. Parte B — Unificazione dei token

La Fase 1 aggiunge i token di identità inerti e privi di collisioni (`--surface-2`/`--color-surface-2`, `--grad-brand`, `--radius`). La Fase 2 integra la scala dei raggi in Tailwind e aggiorna i componenti; la Fase 4 aggiunge `--font-mono` e i relativi utilizzatori.

| Token                       | Motivo                                                                   | Fase                                      |
| --------------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| `--radius` / `--radius-sm`  | Un'unica scala dei raggi (14/9) invece di valori ad hoc 6/8/12           | 1 (valore) / 2 (integrazione + revisione) |
| `--grad-brand`              | Gradiente del brand per le CTA primarie (rosso→viola), coerente col sito | 1 (token) / 2 (Button)                    |
| `--surface-2`               | Pannelli annidati / intestazioni di tabella / righe rientrate            | 1                                         |
| `--font-mono`               | Blocchi di codice, terminale, ID, endpoint                               | 4                                         |
| riconciliare `--text-muted` | Scegliere un unico valore sito↔pannello (`#a1a1aa` consigliato)          | 2                                         |

**D2 (text-muted):** sito `#8b8b9e` vs dashboard `#a1a1aa`. Si consiglia di mantenere **il valore `#a1a1aa` della dashboard** e aggiornare il _sito_ affinché corrisponda. Modifica estetica.

---

## 6. Parte C — Standardizzazione dei componenti (Fasi 2–4)

Componenti personalizzati (senza shadcn/Radix), Tailwind v4, token semantici adottati **per la maggior parte** (195 file importano il barrel condiviso). Il lavoro consiste nell'eliminare le **eccezioni**. Percorso principale: `src/shared/components/`.

| #   | Elemento                                               | File                                                                                                                    | Problema → Obiettivo                                                                                                                                  | Fase |
| --- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| C1  | **Allineamento dei raggi**                             | `Button.tsx:14-18`, `Card.tsx:39`, `Modal.tsx`, `Input.tsx`, `Select.tsx`                                               | valori misti di 6/8/12px → `--radius`/`--radius-sm` (14/9)                                                                                            | 2    |
| C2  | **Gradiente del pulsante + variante `accent`**         | `Button.tsx:5-12`                                                                                                       | il primario usa un rosso→rosso uniforme; allinearlo a `--grad-brand`; aggiungere la variante `accent` mancante. ~195 importatori — massima visibilità | 2    |
| C3  | **Tabelle**                                            | `DataTable.tsx:122-176`, `logTableStyles.ts`, `globals.css:405-414`                                                     | valori rgba hardcoded al 100% + variabili inesistenti; migrare ai token, eliminare gli stili divergenti                                               | 3    |
| C4  | **Centralizzare i colori di stato**                    | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `ProviderCascadeNode.tsx`, `Badge.tsx` + 5 helper | oltre 6 copie degli stessi valori esadecimali → un unico modulo basato su `--color-success/warning/error`                                             | 3    |
| C5  | **Bordo della card**                                   | `Card.tsx:39`                                                                                                           | `border-white/5` → brand `/8`                                                                                                                         | 2    |
| C6  | **Riconciliazione dell'anello di focus** ✅ COMPLETATO | `globals.css` `--focus-ring` (accent) vs `ring-primary/30` dei controlli dei moduli                                     | unificato su **accent (viola)** per corrispondere all'anello globale + distinguerlo dall'anello di errore rosso; l'errore rimane rosso                | 4    |
| C7  | **Aggiungere `Checkbox` + `Textarea`**                 | `<input>`/`<textarea>` grezzi con `accentColor:#6366f1` inline                                                          | primitive basate sui token                                                                                                                            | 4    |
| C8  | **Revisione dei valori esadecimali hardcoded**         | `ConsoleLogViewer.tsx:240`, `ComboLiveStudio.tsx:306`, punti della modale, ~14 file di grafici                          | valori letterali → token                                                                                                                              | 4    |
| C9  | **`cn()` → clsx + tailwind-merge**                     | `src/shared/utils/cn.ts`                                                                                                | le classi in conflitto si accumulano; necessario per gli override di C1                                                                               | 2    |

**Già coerenti con il brand (basati sui token, richiedono solo il raggio):** `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`.

---

## 7. Piano di rollout

- **Fase 1 — Griglia + token di identità (QUESTA PR).** Griglia in `globals.css` + token `--surface-2`/`--grad-brand`/`--radius`; sfondo `body::before`; rimozione dell'elemento bloccante `bg-bg`; test statico di controllo. Rischio basso, reversibile con un singolo commit.
- **Fase 2 — Primitive (C1, C2, C5) — COMPLETATA in questa PR.** Utility semantiche per i raggi `rounded-card` (14px) / `rounded-control` (9px) aggiunte tramite `@theme` (nomi personalizzati, quindi i valori predefiniti `rounded-sm/md/lg/xl` restano invariati — nessuna modifica massiva su 400 file); Card/Modal → 14px, Button/Input/Select → 9px; Button primario → `--grad-brand` (rosso→viola) + nuova variante `accent`; bordi delle Card → token `border-border` (0.08). **Rimandato:** `cn()`→tailwind-merge (C9) richiede nuove dipendenze; la revisione ad hoc di `rounded-lg` (326 file) resta invariata, poiché le primitive coprono la maggior parte delle superfici.
- **Fase 3 — Colori di stato + tabelle (C3, C4) — COMPLETATA in questa PR.** ✅ **C4** (`src/shared/constants/statusColors.ts` — `STATUS_HEX` come unica fonte; `flow/edgeStyles.ts` + `TokenHealthBadge` reindirizzati, fedeli/stessi valori esadecimali). ✅ Token **`--font-mono`**. ✅ **C3 (DataTable)** — sostituiti tutti gli rgba inline e i fallback inutilizzati `var(--bg-table-header)` / `var(--text-secondary)` con un set di token `--table-*` (`--table-header-bg/-row-zebra/-row-hover/-cell-border/-row-selected`) i cui **valori per il tema scuro corrispondono esattamente ai precedenti rgba codificati direttamente** (tema scuro identico byte per byte) e i cui valori per il tema chiaro correggono il tema chiaro, che in precedenza risultava sempre scuro. Bordo dell'intestazione → `--color-border`, testo secondario → `--color-text-muted`. **Richiede una verifica visiva prima del merge.** (Non modificati: `logTableStyles.ts` e le regole legacy Ant `.ant-table` — interventi separati e con priorità inferiore.)
- **Fase 4 — Pulizia (C6, C7, C9 completati; C8 in sospeso).** ✅ **C9** `cn()` → `twMerge(clsx(...))` (clsx + tailwind-merge aggiunti come dipendenze) — ora il `className` di un chiamante _sostituisce_ correttamente la classe conflittuale di una primitiva anziché aggiungersi a essa. ✅ **C7** nuove primitive `Checkbox` + `Textarea` (basate sui token, esportate dal barrel; aggiunta non distruttiva — l'adozione delle 32 checkbox native / 41 textarea native può procedere in modo incrementale). ✅ **C6** uniformazione del focus ring — i controlli dei moduli (`Input`/`Select`/`Textarea`/`Toggle`/`Checkbox`) ora, quando ricevono il focus, mostrano il ring **accent (viola)** per corrispondere al valore globale `--focus-ring` ed evitare conflitti con il ring rosso degli errori; lo stato di errore rosso resta invariato. ⏳ **La revisione dei valori esadecimali C8 NON è un find/replace indiscriminato** — elementi problematici confermati come _intenzionali_ e da mantenere: `ConsoleLogViewer.tsx:240` (terminale sempre scuro), popover di `TokenHealthBadge`, tratti SVG di ReactFlow. Migrare soltanto i valori esadecimali effettivamente destinati ad adattarsi al tema.

Per ogni fase: `npm run lint` + `npm run typecheck:core` + una verifica visiva.

---

## 8. Decisioni aperte (raccomandazioni)

- **D1 — Button primario:** mantenere rosso→rosso o passare a **rosso→viola `--grad-brand`**? Raccomandazione: **rosso→viola** (Fase 2).
- **D2 — Colore delle linee della griglia:** **neutro** (stile del sito) — scelto — anziché rosso del brand. Dimensione **32px** (ridotta di circa il 30% rispetto ai 46px originali in seguito al feedback del responsabile — le celle da 46px risultavano troppo grandi nel layout della dashboard).
- **D3 — Vivacità dell'interfaccia:** sidebar/header **a tinta unita** — scelto.
- **D4 — Griglia di autenticazione/login:** ✅ **COMPLETATA (Fase 5)** — `bg-bg` opaco rimosso da ogni wrapper autonomo a schermo intero (non soltanto dal login), così la griglia è visibile in tutte le schermate. Vedere §4.6.
- **D5 — Landing page:** lasciare invariato lo splash animato. Scelto.
- **D6 — Raggi 14/9 in tutto il prodotto:** raccomandazione: sì (Fase 2).
- **D7 — La Fase 1 viene rilasciata per prima:** scelto.
- **D8 — Larghezza del layout (Fase 5):** il contenitore dei contenuti della dashboard era limitato a `max-w-7xl` (1280px), risultando centrato con ampi margini laterali vuoti sui monitor di grandi dimensioni. ✅ **COMPLETATA** — limite innalzato a un `max-w-[3840px]` fluido (4K reale): ora il contenuto segue la viewport fino a circa 4K e viene centrato soltanto oltre tale dimensione (`DashboardLayout.tsx`). Le pagine intenzionalmente strette restano tali per scelta progettuale (`ProviderOnboardingWizard` max-w-5xl, `Rtk`/`CavemanContextPageClient` max-w-6xl).
- **D9 — Tabelle dati opache (Fase 6):** ora che l'area dei contenuti della dashboard è trasparente (così da mostrare lo sfondo a griglia, Fase 5), nelle tabelle dati il cui contenitore _non_ era una superficie opaca, la griglia traspariva attraverso le righe pari trasparenti / l'effetto zebra a bassa opacità. ✅ **COMPLETATA** — ora ogni tabella priva di Card applica `bg-surface` (oppure, per la primitiva `<DataTable>`, `background: var(--color-surface)` sul relativo contenitore di scorrimento). Correzioni apportate a: `DataTable` (primitiva), `ProxyLogger`/`RequestLoggerV2` (la sfumatura `bg-black/5 dark:bg-black/20` della loro `<Card>` prevaleva sul `bg-surface` della Card tramite tailwind-merge → trasparenza di circa il 95%), `BatchListTab`/`FilesListTab`/`CacheEntriesTab`/`ReasoningCacheTab`/`cache page`/`FreePoolTab`/`ModelMappingTable`/`HeaderTable`, oltre alle due "tabelle" CSS Grid nelle viste della cache (`bg-surface/35` → `bg-surface`). Le tabelle già all'interno di una `<Card>`/Modal sono state verificate come opache e intenzionalmente lasciate invariate (`bg-surface` sarebbe ridondante e privo di effetto). La griglia stessa **non ha richiesto alcuna modifica** — il `body::before` della dashboard è identico byte per byte a quello del sito (`--grid-size: 32px`); qualsiasi "griglia più grande" visibile in un'istanza in esecuzione è dovuta a una build obsoleta precedente a `#4143`, non al codice. Controllo garantito da `tests/unit/design-grid-background.test.ts` (blocco della Fase 6).

---

## 9. Fuori ambito / rischi

- **Nessuna modifica alla palette** — i colori sono già coerenti; aggiungiamo solo i token mancanti. Nessun rischio di ricolorare il prodotto.
- **Nessuna modifica al motore dei temi** — mantenere `.dark` + store Zustand.
- **La modifica dei raggi (Fase 2) è estesa** — interessa ogni scheda/pulsante/input; controllare visivamente le schermate più dense (tabelle, modali) prima del merge.
- **Le tabelle (C3)** contengono il maggior numero di stili hardcoded e presentano la superficie di regressione più ampia — isolarle in una PR dedicata.

---

## 10. Indice dei riferimenti

| Area                                       | Percorso                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Token della dashboard                      | `src/app/globals.css` (`:root`, `.dark`, `@theme inline`, `body`, `body::before`)                                    |
| Store del tema                             | `src/store/themeStore.ts`, `src/shared/components/ThemeProvider.tsx`, `src/shared/constants/appConfig.ts:9-11`       |
| Shell del pannello (griglia sbloccata qui) | `src/shared/components/layouts/DashboardLayout.tsx`                                                                  |
| Chrome                                     | `src/shared/components/Header.tsx:207`, `src/shared/components/Sidebar.tsx:430`                                      |
| Precedente della griglia                   | `src/app/landing/page.tsx:16-26`                                                                                     |
| Primitive                                  | `src/shared/components/{Button,Card,Input,Select,Badge,Modal,Toggle,SegmentedControl,Loading,Tooltip,DataTable}.tsx` |
| Sorgenti dei colori di stato               | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `logTableStyles.ts`                            |
| Utilità `cn`                               | `src/shared/utils/cn.ts`                                                                                             |
| Test di protezione della Fase 1            | `tests/unit/design-grid-background.test.ts`                                                                          |
| Riferimento del sito                       | `_mono_repo/omnirouteSite/css/tokens.css`, `css/base.css`                                                            |
