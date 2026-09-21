# Reasoning Routing (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regulile de rutare a raționamentului extind rutarea existentă pentru modele și combinații. Atunci când nu se potrivește nicio regulă activă,
comportamentul existent pentru gândire, sufix, valorile implicite ale conexiunii și traducerea furnizorului rămâne
neschimbat.

## Administrare

Administrarea regulilor este disponibilă în **Setări → Rutare globală**. Editorul cheilor API oferă aceeași
interfață de administrare, filtrată pentru cheia selectată.

API-ul de administrare este expus prin aceste rute:

- `GET` și `POST` la `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` și `DELETE` la `/api/settings/reasoning-routing-rules/[id]`
- `POST` la `/api/settings/reasoning-routing-rules/simulate`

Toate rutele utilizează `requireManagementAuth`. Datele de intrare sunt validate cu schemele din
`src/shared/validation/schemas/reasoningRouting.ts`. Simulatorul nu efectuează niciodată un apel în amonte.

## Rezolvarea regulilor

Evaluarea inițială selectează exact o regulă. Domeniile sunt verificate în această ordine:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

În cadrul unui domeniu, valoarea mai mare pentru `priority` are întâietate, urmată de o potrivire exactă a modelului în detrimentul unui șablon glob,
apoi de ordonarea stabilă după `createdAt` și `id`. `requestTags` sunt citite exclusiv din `metadata.tags`
și acceptă potrivirea `any` sau `all`.

O regulă `connection` este evaluată numai atunci când nicio regulă inițială nu a fost selectată și o conexiune concretă la furnizor a fost
deja aleasă. Aceasta poate modifica numai efortul și bugetul.

## Efort și buget

`sourceEffort` acceptă `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` și
`ultra`. `missing` înseamnă că solicitarea nu conține nici un nivel discret de efort, nici un comutator pentru gândire
sau un buget de gândire. Prin urmare, un semnal exclusiv de buget este identificat numai de `any`.

`effortMode` are trei variante:

- `inherit` păstrează efortul clientului, permițând în continuare schimbarea modelului sau a combinației.
- `default` setează `targetEffort` numai atunci când nu este prezent niciun semnal explicit de raționament.
- `force` înlocuiește nivelul discret de efort cu `targetEffort`.

Independent, `budgetAction` poate fi `preserve`, `remove` sau `set`. `force` cu `none` elimină
toate câmpurile recunoscute pentru efort și buget. Utilizarea `none` împreună cu `set` nu este validă.

Solicitările care vizează modele cunoscute ca fiind incompatibile sunt respinse înainte de apelul în amonte. Pentru țintele de tip combinație,
intrările incompatibile sunt eliminate; dacă nu mai rămâne niciuna, solicitarea returnează starea `400`.
Datele necunoscute privind capabilitățile generează un avertisment și lasă regula activă.

## Securitate și transporturi

Modelul sursă și modelul țintă sau combinația sursă și combinația țintă rămân supuse politicii existente pentru cheia API.
O regulă de raționament nu extinde niciodată permisiunile pentru modele, combinații sau cote.

Motorul este integrat în Chat Completions, Responses, Anthropic Messages și calea internă
Codex WebSocket. Calea WebSocket acceptă numai modele țintă Codex; țintele de tip combinație nu pot fi
executate prin aceasta. Decizia regulii este stocată în urma existentă a rutei, fără secrete.

## Persistență

Migrarea `src/lib/db/migrations/126_reasoning_routing_rules.sql` creează tabelul
`reasoning_routing_rules`. Regulile fac referire la chei API, combinații și conexiuni la furnizori stocate.
Ștergerile elimină regulile asociate. Stratul de acces la baza de date din
`src/lib/db/reasoningRoutingRules.ts` menține un cache invalidabil pentru calea solicitării.

Regulile sunt incluse în copiile de siguranță SQLite, în exportul complet al bazei de date și în pachetul de sincronizare a configurației.
`reconcileReasoningRulesForSync` dezactivează regulile importate cu referințe lipsă și raportează aceste
conflicte.
