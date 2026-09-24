# Monitoring & Observability Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Trumpai**: „OmniRoute“ pateikiamas su integruotu būklės stebėjimu, teikėjų autopilotu, kvotų sekimu ir stebimumo integracijos taškais. Šiame vadove aprašomas valdymo skydelis, įspėjimai ir trikčių šalinimas.

**Šaltiniai:**

- `src/lib/monitoring/observability.ts` — stebimumo momentinė kopija
- `src/lib/monitoring/comboHealthAutopilot.ts` — derinių būklės autopilotas
- `src/lib/monitoring/providerHealthAutopilot.ts` — teikėjų autopilotas
- `src/lib/monitoring/providerHealthMatrix.ts` — teikėjų būklės matrica
- `src/lib/localHealthCheck.ts` — vietinė būklės patikra
- `src/lib/tokenHealthCheck.ts` — prieigos raktų atnaujinimo būklė
- `src/lib/proxyHealth.ts` — tarpinio serverio būklės podėlis (aprašytas PROXY_GUIDE.md)

---

## Apžvalga

„OmniRoute“ turi **3 stebėjimo sluoksnius**:

```
┌──────────────────────────────────────────────────────────────┐
│  1 sluoksnis: sistemos būklė (serverio lygmuo)                │
│  ├─ localHealthCheck.ts — DB, prievadai, savosios priklausomybės │
│  ├─ db/healthCheck.ts — vientisumas, FK, našlaičiai artefaktai │
│  └─ Valdymo skydelis: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  2 sluoksnis: teikėjų būklė (atsparumas pagal teikėją)         │
│  ├─ providerHealthAutopilot.ts — grandinės pertraukiklis, atvėsimo laikotarpiai │
│  ├─ providerHealthMatrix.ts — būklės įverčiai pagal teikėją / modelį │
│  └─ Valdymo skydelis: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  3 sluoksnis: tiesioginis stebimumas (vykdymo aplinkos momentinės kopijos) │
│  ├─ observability.ts — grandinės pertraukikliai, seansai, kvota │
│  ├─ tokenHealthCheck.ts — OAuth prieigos rakto atnaujinimo būklė │
│  └─ MCP įrankiai: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Valdymo skydelio puslapiai

### `/dashboard/health` (Sistemos būklė)

Aukščiausio lygio būklės valdymo skydelyje rodoma:

| Skiltis                       | Kas rodoma                                                      |
| ----------------------------- | --------------------------------------------------------------- |
| **Serverio būsena**           | Veikimo trukmė, versija, prievadas, aktyvūs ryšiai              |
| **Duomenų bazė**              | Ryšys, vientisumas, WAL dydis, naujausi perkėlimai              |
| **Teikėjų suvestinė**         | Aktyvių ir veikiančių teikėjų bei atvirų pertraukiklių skaičius |
| **Kvotų stebėjimo priemonės** | Aktyvūs seansai, įspėjimai, išnaudotos kvotos                   |
| **Naujausios klaidos**        | Paskutinės 10 klaidų su dėklo sekimo informacija                |
| **Išteklių naudojimas**       | Atmintis, CPU, kaupo apkrovos indikatorius                      |

### `/dashboard/providers` (Teikėjų būklė)

Kiekvieno teikėjo valdymo skydelis:

| Stulpelis | Aprašas                                                         |
| --------- | --------------------------------------------------------------- |
| Teikėjas  | Teikėjo ID + rodomas pavadinimas                                |
| Būklė     | Žalia / geltona / raudona būsena                                |
| Grandinė  | Atvira / uždara / pusiau atvira būsena                          |
| Ryšiai    | Ryšių skaičius, paskutinis atnaujinimas                         |
| Modeliai  | Pasiekiami modeliai, kiekvieno modelio būklė                    |
| Kaina     | Šiandienos kaina, 7 dienų tendencija                            |
| Klaidos   | Klaidų skaičius per paskutines 24 val., dažniausia klaidų klasė |

Spustelėkite teikėją, kad pamatytumėte:

- Naujausias užklausas su delsos išskaidymu
- Kiekvieno ryšio būklės įverčius
- Kiekvieno modelio blokavimus
- Autopiloto rekomendacijas

### `/dashboard/quota` (Kvotų sekimas)

Kiekvienam API raktui:

- Dabartinis naudojimas, palyginti su riba (eigos juosta)
- Kvotos tendencija (30 dienų diagrama)
- Kito nustatymo iš naujo laikas
- Įspėjimų istorija

### `/dashboard/combos` (Derinių būklė)

Kiekvienam deriniui:

- Strategija + tikslai
- Kiekvieno tikslo būklė
- Naujausi atsarginio perjungimo įvykiai
- Sėkmės rodiklis (24 val., 7 d., 30 d.)

---

## Būklės patikros API

OmniRoute pateikia **dvi** HTTP būklės tikrinimo sąsajas. Orkestravimo sistemose jos nėra lygiavertės.

| Kelias                       | Paskirtis                                                                       | Apkrova                                      | Kam naudoti                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET /healthz`               | Gyvavimo ciklo gyvybingumas / parengtis (`ok` / `starting` / `stopping`)        | Minimali (tik fazės žyma)                    | Kubernetes **parengčiai**; švelniai **gyvybingumo** patikrai, jei būtina naudoti HTTP |
| `GET /api/monitoring/health` | Išsami sistemos ir teikėjų suvestinė (DB, atminties krūva, katalogo kiekiai, …) | Didelė (sinchroninis DB / stebėsenos darbas) | Suvestinėms, išorinėms išsamioms patikroms, Docker integruotai būklės patikrai        |

> **Pastaba:** Teikėjų būklės matricos, autopiloto problemos, kvotų stebėjimas, prieigos raktų būklė ir išsamesnė delsos informacija, nei pateikia `/api/monitoring/health`, pasiekiami naudojant **MCP įrankį** `observability_snapshot` arba **suvestinės** puslapius — tam nėra atskirų REST maršrutų.

Abu maršrutai vykdomi toje pačioje **Node įvykių kilpoje** kaip ir užklausų apdorojimas. Procesorių intensyviai naudojanti vykdymo šaka (didelio `GET /v1/models` katalogo apdorojimas, ilgo konteksto glaudinimas / prieigos raktų skaičiavimas) gali uždelsti **visus** HTTP apdorojimo modulius, įskaitant `/healthz`. Užimta įvykių kilpa ≠ neveikiantis procesas. Geriau pašalinti apkrovos šaltinį; patikrų parametrų koregavimas tik sumažina klaidingų proceso nutraukimų skaičių.

### Lengva orkestravimo sistemos patikra

```bash
GET /healthz
# arba HEAD /healthz
```

- **200** ir turinys `ok`, kai serverio gyvavimo ciklo fazė yra parengta
- **503** ir `starting` / `stopping` paleidimo arba išjungimo metu
- Įgyvendinimas: `src/app/healthz/route.ts` (be DB patikros)

### Sistemos būklė (išsami)

```bash
GET /api/monitoring/health
```

Atsakas:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: patikrų podėlis ir SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` yra **atmintyje laikomo patikrų podėlio
matuoklis**, o ne tiesioginė `provider_connections.test_status` išklotinė. Po #12532
užklausos vykdymo šaka nuskaito tik `getCachedCredentialHealthSummary()`; foninės patikros
atnaujina podėlį už įvykių kilpos ribų.

| Sluoksnis                     | Kur                                                                   | Ką tai reiškia                                                                                                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Patikrų podėlio matuoklis     | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Paskutiniai kredencialų būklės patikrų rezultatai, vis dar laikomi proceso atmintyje. `source` visada yra `probe-cache`.                                                                                                      |
| Nepavykusio ryšio informacija | `credentialHealth.failedConnections`                                  | Pateikiama **tik kai `failed > 0`**. Riboto dydžio podėlio eilučių, kurių `status=error`, sąrašas (`connectionId`, `status`, išvalyti `lastError` / `lastErrorType`). `failedOmitted` nustatomas, kai sąrašas buvo apribotas. |
| SQLite išliekanti būsena      | `credentialHealth.staleDbNonOkCount`                                  | **Aktyvių** (`is_active=1`) ryšio eilučių, kurių išsaugotas `test_status` yra žinoma netinkama būsena (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`), skaičius.                            |

Šie du sluoksniai gali sąmoningai nesutapti:

- Matuoklyje `failed=0`, o `staleDbNonOkCount>0` — SQLite vis dar saugo išliekančią
  `test_status` reikšmę (pavyzdžiui, `expired` arba `credits_exhausted`), kurios naujausia
  patikrų podėlio momentinė kopija nepriskiria prie `status=error`.
- Matuoklyje `failed>0`, nors SQLite duomenys rodo tinkamą būklę — naujausia patikra nepavyko ir jos
  rezultatas laikomas podėlyje; DB eilutė dar nebuvo atnaujinta arba vėliau buvo išvalyta.

Gaudami duomenis iš šio galinio taško, nekurkite įspėjimų remdamiesi vien
`provider_connections.test_status`. Tiesioginiams patikrų sutrikimams naudokite
`failed` + `failedConnections`, o kai reikia išsaugotų išliekančių būsenų skaičiaus —
`staleDbNonOkCount`.

### Kubernetes patikrų rekomendacijos

OmniRoute yra **vienas Node procesas** (viena įvykių kilpa). Standartinė Docker `HEALTHCHECK` patikra skirta lengvam `/healthz` galiniam taškui. `/api/monitoring/health` yra **per sunkus** kubelet gyvybingumo patikrų intervalams.

| Zondas           | Rekomenduojamas tikslas                                                                       | Pastabos                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paleidimo**    | HTTP `GET /healthz` su ilgu `failureThreshold` (arba dideliu `startPeriod`)                   | Šaltasis paleidimas ir SQLite migracija gali užtrukti ilgiau nei kelias sekundes                                                                                                                                                                                                                                                                                                                                                  |
| **Parengties**   | HTTP `GET /healthz`                                                                           | Gyvavimo ciklo būsenos `ok` / `starting` / `stopping` (200 arba 503). Būsena vis tiek svyruoja, jei ciklą blokuoja CPU. **200 atsakymas po kelių sekundžių nereiškia tinkamos būklės** (#10303) — tai reiškia, kad įvykių ciklas negavo išteklių prieš įvykdant 3 baitų apdorojimo funkciją                                                                                                                                       |
| **Gyvybingumo**  | HTTP `GET /livez` **arba TCP** pagrindiniame paslaugos prievade (`PORT`, numatytasis `20128`) | `/livez` tik patvirtina, kad procesas veikia (visada grąžina 200, jei apdorojimo funkcija įvykdoma). Jis vis tiek naudoja tą patį įvykių ciklą — užimtas ≠ neveikiantis, be to, įvykių ciklo išteklių stoką (#10303) aptinka ne geriau nei TCP. Rinkitės **TCP**, jei HTTP zondų skirtasis laikas baigiasi esant katalogo ar glaudinimo apkrovai; bet kuriuo atveju **nenutraukite** pod veikimo dėl trumpų įvykių ciklo strigčių |
| **Išsami būklė** | `GET /api/monitoring/health` iš išorinės tikrinimo priemonės                                  | Neskirta kubelet `livenessProbe` ar dažnai vykdomam `readinessProbe`                                                                                                                                                                                                                                                                                                                                                              |

Pavyzdinė konfigūracija (slenksčius pritaikykite pagal šaltojo paleidimo ir glaudinimo apkrovą):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Įvykių ciklui užstrigus, gali baigtis ir HTTP /livez skirtasis laikas. TCP yra
  # konservatyvi alternatyva:
  # tcpSocket:
  #   port: http
```

**Nenukreipkite** kubelet **gyvybingumo** tikrinimo į `/api/monitoring/health`. Šis kelias atlieka realias DB ir stebėsenos operacijas, todėl esant apkrovai klaidingai praneš apie gedimą.

Susiję: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (zondai, kai įvykių ciklas užimtas), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (katalogo kainodaros išteklių eikvojimas), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (glaudinimo žetonų skaičiavimo išteklių eikvojimas).

### Pasirenkamos užklausos kelio operacijos (atmintis, įgūdžiai, žetonų atnaujinimas)

Atminties išgavimas, įgūdžių įterpimas ir OAuth žetonų atnaujinimas naudoja tą patį **pagrindinį Node įvykių ciklą** kaip ir `/healthz`. Tai yra valdymo skydelyje įjungiamos funkcijos (`memoryEnabled`, `skillsEnabled`), o ne vykdytojų telkinys. Žr. [Aplinka — įvykių ciklo sąnaudos](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Teikėjų būklė

> **REST galinio taško nėra.** Teikėjų būklės duomenys pasiekiami naudojant MCP įrankį `observability_snapshot` arba valdymo skydelio puslapyje `/dashboard/providers`.

### Teikėjo informacija

> **REST galinio taško nėra.** Išsami kiekvieno teikėjo informacija pasiekiama valdymo skydelio puslapyje `/dashboard/providers`.

---

## Teikėjų būklės autopilotas

Modulis `providerHealthAutopilot.ts` yra **savaime atsikurianti sistema**, kuri:

1. Aptinka teikėjų problemas (atvirą grandinės pertraukiklį, atvėsimo laikotarpius, blokavimus, kvotos įspėjimus)
2. Generuoja **rekomenduojamus veiksmus** joms išspręsti
3. Pasirinktinai **automatiškai vykdo** mažos rizikos veiksmus

### Aptinkamų problemų tipai

| Problemos rūšis              | Svarba      | Sąlygos pavyzdys                                |
| ---------------------------- | ----------- | ----------------------------------------------- |
| `provider_circuit_open`      | kritinė     | Grandinės pertraukiklis atidarytas po 5 klaidų  |
| `provider_circuit_half_open` | įspėjimas   | Grandinė tikrina, ar sistema atsikūrė           |
| `connection_cooldown`        | įspėjimas   | Ryšiui taikomas atvėsimo laikotarpis po 429     |
| `stale_connection_error`     | įspėjimas   | Paskutinis atnaujinimas nepavyko prieš 30+ min. |
| `terminal_connection_error`  | kritinė     | OAuth prieiga atšaukta, raktas negalioja        |
| `inactive_connection`        | informacinė | Ryšys išjungtas nustatymuose                    |
| `model_lockout`              | įspėjimas   | Konkretus modelis karantine                     |
| `quota_monitor_warning`      | įspėjimas   | Išnaudota 80%+ kvotos                           |

### Generuojamų veiksmų tipai

| Veiksmas                       | Rizika   | Aprašymas                                     |
| ------------------------------ | -------- | --------------------------------------------- |
| `clear_provider_breaker`       | vidutinė | Atkurti uždarą grandinės pertraukiklio būseną |
| `clear_connection_cooldown`    | maža     | Pašalinti ryšio atvėsimo laikotarpį           |
| `clear_stale_connection_error` | maža     | Pašalinti pasenusios klaidos žymą             |
| `clear_model_lockout`          | maža     | Iš naujo įjungti karantine esantį modelį      |
| `reactivate_connection`        | vidutinė | Iš naujo įjungti išjungtą ryšį                |
| `deactivate_connection`        | didelė   | Išjungti probleminį ryšį                      |

### API

> **REST galinio taško nėra.** Autopiloto problemos pasiekiamos per MCP įrankį `observability_snapshot` arba valdymo skydelį. Autopilotas vykdomas viduje; jo veikimas konfigūruojamas nustatymų DB (kiekvieno ryšio lauke `autopilotMode`), o ne aplinkos kintamaisiais — `grep -rn` autopiloto režimo aplinkos kintamajam neranda nė vieno atitikmens.

### Autopiloto režimas

Pagal numatytuosius nustatymus autopilotas veikia **rankiniu režimu** — jis aptinka problemas ir generuoja rekomenduojamus veiksmus, tačiau jų automatiškai nepritaiko. Veiksmus galima pritaikyti valdymo skydelyje.

---

## Kombinacijų būklės autopilotas

`comboHealthAutopilot.ts` yra teikėjų autopiloto atitikmuo, skirtas **konkrečiai kombinacijoms**. Jis:

- Aptinka netinkamos būklės kombinacijas
- Rekomenduoja pakeisti paskirties taškų eiliškumą
- Siūlo išjungti neveikiančius paskirties taškus
- Po N nesėkmių automatiškai pašalina nebeveikiančius paskirties taškus

### Kombinacijų problemų pavyzdžiai

```
Kombinacija „always-on“ (prioriteto strategija)
├─ 1 paskirties taškas: openai/gpt-5 (veikia tinkamai)
├─ 2 paskirties taškas: anthropic/claude-opus-4-6 (⚠️ modelis užblokuotas iki 14:00)
└─ 3 paskirties taškas: kiro/claude-sonnet-4-5 (veikia tinkamai)

Rekomenduojamas veiksmas: pakeisti eiliškumą — perkelti kiro virš anthropic, kol baigsis blokavimas
```

---

## Kvotų stebėjimo priemonės

`observability.ts` pateikia **kiekvieno seanso kvotų stebėjimo priemones**, skirtas prenumeruojamiems teikėjams (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0–100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Būsenų reikšmės

| Būsena      | Kada                     | Naudotojo sąsajos veiksmas                  |
| ----------- | ------------------------ | ------------------------------------------- |
| `starting`  | Vykdoma pradinė apklausa | Sukimosi indikatorius                       |
| `idle`      | Nėra naujausios veiklos  | Paslėpta valdymo skydelyje                  |
| `healthy`   | Likę > 50% kvotos        | Žalias taškas                               |
| `warning`   | Likę < 50% kvotos        | Geltonas įspėjimas                          |
| `exhausted` | Kvota = 0%               | Raudonas blokas, nukreipiama kitam teikėjui |
| `error`     | Apklausa nepavyko        | Raudonas taškas, netrukus kartoti           |

### API

> **REST galinio taško nėra.** Kvotų stebėjimo duomenys pasiekiami per MCP įrankį `observability_snapshot` arba valdymo skydelį.

---

## Stebimumo momentinė kopija

MCP įrankis `observability_snapshot` grąžina **išsamią sistemos momentinę kopiją**, skirtą DI agentams:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* žr. aukščiau */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agentai tai naudoja **maršruto parinkimo sprendimams** priimti, pavyzdžiui: „jei openai grandinė atvira, pirmiausia nukreipti į anthropic“.

---

## Prieigos raktų būklės patikra

OAuth teikėjams (Claude Code, GitHub Copilot, Cursor) reikia **periodiškai atnaujinti prieigos raktus**. `src/lib/tokenHealthCheck.ts` paleidžia foninį planuoklį:

- **Patikros ciklas**: kas 60 sekundžių (patikra naudojant `TICK_MS = 60 * 1000`, esantį `src/lib/tokenHealthCheck.ts:30`)
- **Kiekvieno ryšio būklės patikros intervalas**: pagal numatytuosius nustatymus – 60 minučių (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); galima konfigūruoti nustatymų DB
- **Prevencinis atnaujinimas gavus 401**: jį atlieka kiekvieno ryšio perėmimo priemonė

### Prieigos rakto būklės būsena

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfigūracija

Prieigos raktų būklės patikros konfigūraciją viduje tvarko `tokenHealthCheck.ts`.

### Prieigos raktų būklė

> **REST galinio taško nėra.** Prieigos raktų būklės duomenys pasiekiami valdymo skydelyje arba naudojant MCP įrankį `observability_snapshot`.

---

## Įspėjimai

### Integruoti kanalai

OmniRoute palaiko **3 įspėjimų kanalus**:

| Kanalas                 | Sąranka            | Naudojimo paskirtis                   |
| ----------------------- | ------------------ | ------------------------------------- |
| Valdymo skydelio juosta | Visada įjungta     | Pranešimai programoje                 |
| Webhook                 | Sukonfigūruoti URL | Slack, Discord, PagerDuty             |
| Žurnalas                | Numatytasis        | Išoriniam žurnalų duomenų agregavimui |

### Webhook konfigūracija

> **Pastaba:** Webhook įspėjimų konfigūracija tvarkoma valdymo skydelio nustatymų puslapyje. Webhook URL, įvykių filtravimo ir naudingosios apkrovos tinkinimo parinktis rasite nustatymų naudotojo sąsajoje.

### Įspėjimų tipai

| Įspėjimas                    | Kada                                                                 | Numatytasis svarbumas |
| ---------------------------- | -------------------------------------------------------------------- | --------------------- |
| `provider_circuit_open`      | Kai grandinė atidaroma                                               | kritinis              |
| `provider_circuit_half_open` | Kai grandinė tikrina atkūrimą                                        | informacinis          |
| `quota_warning`              | Kai išnaudota 80 % ar daugiau kvotos                                 | įspėjimas             |
| `quota_exhausted`            | Kai išnaudota 100 % kvotos                                           | kritinis              |
| `token_refresh_failed`       | Po 3 ar daugiau nesėkmingų atnaujinimų iš eilės                      | įspėjimas             |
| `token_expired`              | Kai baigiasi prieigos rakto galiojimas                               | kritinis              |
| `combo_target_unhealthy`     | Kai sudėtinė paskirties vieta 1 val. ar ilgiau yra atvėsimo būsenoje | įspėjimas             |
| `db_integrity_warning`       | Kai išorinio rakto pažeidimų skaičius > 0                            | įspėjimas             |
| `heap_pressure`              | Kai kaupo naudojimas > 80 % ribinės vertės                           | įspėjimas             |

---

## Našumo metrikos

### Stebimos metrikos

| Metrika                 | Tipas      | Šaltinis                        |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | skaitiklis | `services/usage.ts`             |
| `request_latency_ms`    | histograma | `services/usage.ts`             |
| `tokens_consumed`       | skaitiklis | `services/usage.ts`             |
| `cost_usd`              | skaitiklis | `services/usage.ts`             |
| `provider_errors`       | skaitiklis | `services/errorClassifier.ts`   |
| `circuit_state_changes` | skaitiklis | `services/resilience.ts`        |
| `cache_hits`            | skaitiklis | `services/signatureCache.ts`    |
| `compression_savings`   | histograma | `services/compression/stats.ts` |
| `quota_used`            | matuoklis  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | matuoklis  | `observability.ts`              |

### Delsos procentiliai (p50/p95/p99)

> **REST galinio taško nėra.** Delsos procentilių duomenys pasiekiami valdymo skydelio puslapyje `/dashboard/health`. Prometheus/OpenTelemetry eksportavimas planuojamas v3.9 versijai.

### Prometheus / OpenTelemetry eksportavimas (2 etapas)

v3.9 versijai planuojamas savasis eksportavimas į Prometheus, OpenTelemetry ir Datadog.

Kol kas nuskaitykite `/api/monitoring/health` naudodami bet kurią HTTP pagrįstą stebėjimo sistemą (Prometheus blackbox exporter, Datadog HTTP check ir kt.).

---

## Įspėjimų konfigūravimo pavyzdžiai

### Slack

> **Pastaba:** Webhook įspėjimai konfigūruojami valdymo skydelio nustatymų puslapyje — atskirų webhook aplinkos kintamųjų nėra (`grep -rn` negrąžina jokių rezultatų). Webhook URL, įvykių filtravimą ir naudingosios apkrovos tinkinimą rasite nustatymų naudotojo sąsajoje.

### Discord

> Webhook įspėjimams naudojama tokia pati nustatymų naudotojo sąsajos eiga kaip ir Slack. Discord priima tokios pačios struktūros JSON naudingąją apkrovą.

### PagerDuty

> Webhook įspėjimams naudojama ta pati nustatymų naudotojo sąsajos eiga. PagerDuty Events API v2 maršruto parinkimo raktai konfigūruojami nustatymų naudotojo sąsajoje.

### Pasirinktinis Webhook (JSON)

> Tiks bet kuris HTTP galinis taškas, priimantis POST užklausas su JSON turiniu. URL sukonfigūruokite nustatymų naudotojo sąsajoje.

---

## Valdymo skydelio konfigūracija

### Būklės valdymo skydelio tinkinimas

Sukurkite `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Teikėjo prisegimas viršuje

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Trikčių šalinimas

### „Teikėjas rodomas kaip veikiantis, tačiau užklausos nepavyksta“

1. Patikrinkite **autopiloto problemas** — galbūt modelis yra užblokuotas
2. Peržiūrėkite konkrečios klaidų klasės **naujausias klaidas**
3. Teikėjo kortelėje išbandykite **ryšio testą**
4. Patikrinkite, ar teikėjui **netaikomas užklausų dažnio ribojimas išorinėje sistemoje** (vietinėje sistemoje tai nematoma)

### „Kvota rodoma kaip neviršyta, tačiau matau 429 klaidas“

- 429 reiškia, kad, teikėjo duomenimis, išnaudojote savo kvotą
- OmniRoute kvotos stebėjimo duomenys gali būti **pasenę** — teikėjo išorinės sistemos duomenys yra tiksliausi
- Kvotos duomenys automatiškai atnaujinami naudojant vidinį kvotos stebėjimo komponentą

### „Derinys neveikia, nors visi tiksliniai elementai atrodo veikiantys“

- Patikrinkite **derinio būklės** valdymo skydelį, ar nėra tikslinių elementų rikiavimo problemų
- Peržiūrėkite **atsarginių variantų įvykius** — galbūt derinys per greitai išnaudoja visas parinktis
- Patikrinkite, ar **strategija** atitinka jūsų naudojimo scenarijų (prioritetinė, ciklinė arba automatinė)

### „Duomenų bazės būklės patikra nepavyksta“

- Paleiskite `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jei rezultatas yra „ok“ — tai klaidingas įspėjimas, būklės patikra yra pernelyg griežta
- Jei rezultatas kitoks — **sustabdykite OmniRoute** ir vadovaukitės [atkūrimo po avarijos vadovu](./DATABASE_GUIDE.md#disaster-recovery)

### „Atminties kaupo apkrova yra kritinė“

```bash
# Patikrinkite dabartinę kaupo būseną
node -e "console.log(process.memoryUsage())"

# Paleiskite rankinį GC (jei naudojama --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Sumažinkite lygiagrečių užklausų skaičių (nustatykite valdymo skydelio nustatymų puslapyje, o ne aplinkos kintamuoju)
# Aplinkos kintamojo `MAX_CONCURRENT_REQUESTS` nėra — sukonfigūruokite tai skiltyje Nustatymai → Lygiagretumas.
```

---

## Taip pat žr.

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — naudojimo ir išlaidų stebėjimas
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB schema ir būklė
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — tarpinio serverio būklė (atskira podėlio atmintinė)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistemos architektūra
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — išsami grandinės pertraukiklio informacija
- Šaltinis: `src/lib/monitoring/` (4 failai, 2121 kodo eilutė)
