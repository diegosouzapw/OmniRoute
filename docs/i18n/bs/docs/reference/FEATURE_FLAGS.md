# FEATURE_FLAGS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

# Feature Flags

> Runtime prekidači koji mijenjaju ponašanje OmniRoute-a **bez ponovnog raspoređivanja (redeploy)**.
> Svaka zastavica navedena ovdje je definisana u
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — jedinom izvoru istine. I kontrolna tabla i REST API čitaju iz te datoteke, tako da je tabela ispod generisana da odgovara 1:1.

---

## Šta su Feature Flags

Feature flag je imenovani prekidač (boolean ili enum) čija se vrijednost može promijeniti tokom izvršavanja (runtime) i sačuvati u bazi podataka, bez potrebe za ponovnim raspoređivanjem procesa. Svaka zastavica je opisana pomoću `FeatureFlagDefinition` sa `key`, `label`, `description`, `category`, `defaultValue`, `type` i `requiresRestart` hintom.

### Redoslijed razrješenja

**Efektivna vrijednost** zastavice se razrješava pomoću
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) sa sljedećim
prioritetom (najviši pobjeđuje):

1. **DB override** — vrijednost pohranjena u `key_value` tabeli pod
   `feature_flags` imenskim prostorom (postavljena putem kontrolne table ili REST API-ja).
2. **Environment variable** — `process.env[<KEY>]`, ako je postavljena i nije prazna.
3. **Definition default** — `defaultValue` iz `featureFlagDefinitions.ts`.

Boolean zastavica se smatra **omogućenom** kada je njena efektivna vrijednost `"true"`,
`"1"` ili `"yes"` (pogledajte `isFeatureFlagEnabled()`).

> [!NOTE]
> Većina zastavica također ima odgovarajuću environment varijablu **istog imena**
> dokumentovanu u [`ENVIRONMENT.md`](./ENVIRONMENT.md). DB override zastavice ima
> prednost nad tom environment varijablom. Zastavica sa
> `requiresRestart: true` se odmah pohranjuje, ali se ponovo čita samo pri pokretanju procesa
> — njeno prebacivanje prikazuje baner **"Restart Server"** na kontrolnoj tabli.

---

## Katalog zastavica

72 zastavice u 6 kategorija. **Default** je definisana podrazumijevana vrijednost — vrijednost koja se koristi kada nije prisutan ni DB override ni environment varijabla.

### Sigurnost (10)

| Ključ                                   | Tip     | Default  | Opis                                                                                                                                                                                                                                                                        |
| --------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | Zahtijevaj API ključ za sve dolazne zahtjeve.                                                                                                                                                                                                                               |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | Omogući sanitizaciju unosa za sve zahtjeve.                                                                                                                                                                                                                                 |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | Prompt injection guard mod. Vrijednosti: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                                  |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | Rediguj PII iz zahtjeva (nezavisno od `INPUT_SANITIZER_MODE`).                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | Sanitizuj PII iz odgovora provajdera.                                                                                                                                                                                                                                       |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | Mod za sanitizaciju PII odgovora. Vrijednosti: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                            |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | Blokiraj odlazne zahtjeve prema privatnim/internim IP opsezima.                                                                                                                                                                                                             |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | Dozvoli autentifikovanim korisnicima kontrolne table da otkriju pohranjene API ključeve umjesto da vide samo maskirane vrijednosti.                                                                                                                                         |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | Uključi prefiks naloga u AUTH linije logova (npr. "Using <provider> account: abc12345..."). Onemogućeno po defaultu tako da su identifikatori naloga redigovani iz dijeljenih/multi-tenant logova procesa. Nezavisno od Debug moda; uključivanje Debug moda ne otkriva ovo. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | Kada je OIDC omogućen, onemogući prijavu lozinkom tako da se korisnici mogu autentifikovati samo putem OIDC Single Sign-On. Kada je onemogućeno (default), dostupni su i prijava lozinkom i OIDC.                                                                           |

### Mreža (15)

| Ključ                                           | Tip     | Zadano  | Ponovno pokretanje | Opis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓                  | Omogući stealth način rada TLS otiska (fingerprint).                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |                    | Dozvoli /v1/audio/* rutama korištenje OpenAI-kompatibilnih čvorova provajdera hostovanih izvan localhost-a. Isključeno po zadanim postavkama — rutiranje zvuka na udaljeni host mijenja egress identitet i mora biti eksplicitna odluka operatera. Loopback čvorovi su uvijek dozvoljeni i na njih ovo ne utiče.                                                                                                                                                                                                   |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |                    | Kada nijedan proxy nije dodijeljen konekciji, automatski odaberi prvi radni proxy iz registra. Isključeno po zadanim postavkama (u suprotnom, bilo koji proxy iz registra postaje globalna rezervna opcija — #3332).                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |                    | Dozvoli OAuth i tokovima validacije provajdera da zaobiđu fiksirani proxy i povežu se direktno kada pre-provjere dostupnosti proxy-ja ne uspiju. Isključeno po zadanim postavkama jer ovo može promijeniti egress IP.                                                                                                                                                                                                                                                                                              |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |                    | U slučaju mrežnog izuzetka (timeout, konekcija odbijena/resetovana) za izvršilac rotacije više naloga, kada nalog koji ne uspijeva nema namjenski proxy, primijeni kratko hlađenje i preskoči ostale naloge bez proxy-ja za ostatak zahtjeva umjesto ponovnog pokušaja za svaki. Uključeno po zadanim postavkama (sigurno: nema promjene egress IP-a, samo smanjuje rizik od latencije/hlađenja na nalozima sa dijeljenim egress-om). Onemogućite da vratite trenutnu propagaciju pri prvom izuzetku bez proxy-ja. |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |                    | Proxy poolovi i rotacija po nalogu za opencode prestaju ponovo nuditi proxy koji je upravo otkazao (odbijena TCP proba, ili primljen 429 preko njega) na period po procesu koji se udvostručuje pri svakom ponavljanju, do određenog limita. Status proxy-ja se ne zapisuje; sa svakim kandidatom koji se ostavi po strani, izbor ostaje nepromijenjen. Isključeno po zadanim postavkama.                                                                                                                          |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |                    | Prikazati, ispod proxy pool-a na kontrolnoj tabli, koliko je uočenih egress IP adresa opsluživalo njegove članove u posljednja 24 sata i koliko ih je konekcija koristilo. Samo za čitanje, izračunato iz proxy loga, nikada se ne koristi za rutiranje. Isključeno po zadanim postavkama.                                                                                                                                                                                                                         |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |                    | Za OpenCode izvršilac, pratite prvi bajt tijela strimovanog Responses odgovora (prozor: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, zadano `15000`). 2xx Responses strim koji ostane tih nakon isteka prozora tretira se kao zastao: nalog se hladi i zahtjev se jednom rotira na sljedeći nalog; drugi zastoj dovodi do brzog neuspjeha. Isključeno po zadanim postavkama: zastali strimovi čekaju do isteka timeout-a spremnosti strima.                                                                                  |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |                    | OpenCode izvršilac: pri 403/451 koji nosi `user_blocked` odbijanje (nije geo, nije Cloudflare fingerprint odbijanje), ohladite odbijeni nalog i rotirajte na sljedeći nalog najviše jednom po zahtjevu; drugo odbijanje se vraća kakvo jeste, bez oznake uspjeha. Isključeno po zadanim postavkama: rutiranje oko upstream blokade korisnika može izgledati kao izbjegavanje i proširiti oznaku (flag) kroz flotu.                                                                                                 |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |                    | OpenCode rotacija: nakon dva uzastopna prolazna upstream neuspjeha (5xx ili prazan 400), pauzirajte prije sljedećeg naloga — 1.5s udvostručavanja po daljem neuspjehu, ograničeno na 6s po pauzi i 10s po zahtjevu, preskače se pri prekidu konekcije od strane klijenta; neuspjelo tijelo se oslobađa prije čekanja. Isključeno po zadanim postavkama: failover ostaje trenutni.                                                                                                                                  |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |                    | OpenCode rotacija: zaustavite talas naloga pri prvom 429 klasifikovanom kao stvarno ograničenje stope (parseable `Retry-After`, ili tijelo koje imenuje ograničenje stope/upotrebe) i vratite taj upstream 429 nepromijenjen. Neklasifikovani 429-ovi nastavljaju rotaciju. Isključeno po zadanim postavkama: besplatni nivo je ograničen po egress IP-u (#9611), pa svaki 429 rotira, a iscrpljeni talas vraća posljednji upstream 429.                                                                           |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓                  | Onemogući verifikaciju TLS certifikata za MITM proxy. **Opasnost.**                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |                    | Dozvoli URL-ove provajdera koji ukazuju na privatne/interne mreže.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |                    | Dozvoli dodavanje/validaciju provajdera na lokalnim/privatnim adresama (127.0.0.1, localhost, LAN). Uključeno po zadanim postavkama (lokalno-prvo); onemogućite za strogo blokiranje samo javnih adresa. Cloud-metadata ostaje blokiran.                                                                                                                                                                                                                                                                           |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓                  | Omogući režim provajdera kompatibilan sa Claude Code.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### Politike (5)

| Ključ                           | Tip     | Zadano     | Opis                                                                                                                                                                                                                                      |
| ------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | Način primjene politike korištenja alata. Vrijednosti: `disabled`, `warn`, `block`.                                                                                                                                                       |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | Automatski omogući ograničenje stope (rate limiting) na osnovu obrazaca korištenja.                                                                                                                                                       |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | Preskoči OmniRoute lokalnu provjeru kontekstnog prozora / maksimalnog broja ulaznih tokena za direktne zahtjeve prema jednom modelu. Uzvodna ograničenja se i dalje primjenjuju.                                                          |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | Odbij zahtjeve prije slanja kada ciljnom modelu nedostaju potrebne mogućnosti (vizija, alati, strukturirani izlaz, kontekstni prozor). Štiti direktne zahtjeve prema jednom provajderu koji zaobilaze filter kompatibilnosti combo-sloja. |
| `RADAR_ENABLED`                 | boolean | `false`    | Omogući OmniRoute Radar modul (ekrani sa feedom kataloga i sinhronizacija). Isključeno po zadanim postavkama; omogućavanje samo otključava korisnički interfejs — sinhronizacija podataka ostaje posebna opcija za uključivanje.          |

### Runtime (32)

| Ključ                                       | Tip     | Zadano  | Ponovno pokretanje | Opis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |                    | Generiši i ubaci sažetke razgovora kada kombinovano rutiranje prebacuje modele. Onemogući da bi se prebacivanja modela tretirala nezavisno i spriječili pozadinski zahtjevi za primopredaju za sve postojeće i buduće kombinacije.                                                                                                                                                                                                                                                                                                                                 |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |                    | Odbaci stavke izlazne faze internog komentara iz Responses API passthrough streamova prije prosljeđivanja klijentima. Onemogući da bi primio sirovi upstream komentar.                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |                    | Primijeni ograničenja opsega na pristup MCP alatu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |                    | Komprimuj opise MCP alata da smanjiš upotrebu tokena.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |                    | Omogući obradu pozadinskih zadataka tokom izvršavanja (runtime).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓                  | Onemogući sve pozadinske usluge (osvježavanje kvote, sinhronizacija, itd).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |                    | Vjeruj RTK filterima na nivou projekta bez validacije.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓                  | Pokreni WebSocket server kontrolne table u realnom vremenu pri uvozu (port 20132 po zadanim postavkama).                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |                    | Dozvoli Codexu da koristi Responses-over-WebSocket transport. Kada je isključeno, Codex se vraća na HTTP odgovore.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |                    | Dozvoli Codexu da koristi lokalni app-server WebSocket JSON-RPC transport (codexTransport=app-server). Kada je isključeno, konekcije koje su se opredijelile za app-server vraćaju se na druge Codex transporte.                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |                    | Rutiraj zahtjeve sa iscrpljenim budžetom na hitnog besplatnog fallback provajdera/model. (Pogledajte [Emergency Budget Fallback](#emergency-budget-fallback) ispod.)                                                                                                                                                                                                                                                                                                                                                                                               |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |                    | Omogući transparentno rano ponovno pokušavanje za skraćene upstream SSE streamove prije nego što bilo koji bajt odgovora stigne do klijenta.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |                    | Dozvoli oporavak streama da ponovo zatraži i spoji odgovor nakon što su bajtovi već stigli do klijenta.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |                    | Učini nastavak poziva alata usred streama sigurnim: nikada ne nastavljaj prekinuti stream nakon što je poziv alata emitovan (u toku ili već završen sa finish_reason tool_calls), i zatvori nakon jednog praznog nastavka umjesto trošenja cijelog budžeta. Isključeno: ponašanje izdanja.                                                                                                                                                                                                                                                                         |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |                    | Prebaci se jednom na sestrinsku konekciju kada se SSE stream zatvori prije emitovanja bilo kakvog korisnog okvira i kada je ograničeni ponovni pokušaj na istoj konekciji potrošen; bez upotrebljive sestrinske konekcije vraća se originalni `STREAM_EARLY_EOF` 502. Zadano isključeno: early-EOF ostaje terminalan nakon ponovnog pokušaja na istoj konekciji.                                                                                                                                                                                                   |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |                    | Uključi polja sa imenima pogodnim za prikaz u `/v1/models` odgovorima. Onemogući za klijente koji očekuju samo ID-ove modela.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |                    | Kontroliše kako se prefiksiraju ID-ovi modela u /v1/models. 'dual' (zadano) emituje i alias i kanonske prefikse provider-id-a radi kompatibilnosti unazad. 'alias' emituje samo kratki alias prefiks (npr. ds-web/model, a ne deepseek-web/model). 'canonical' emituje samo puni provider-id prefiks. Vrijednosti: `dual`, `alias`, `canonical`.                                                                                                                                                                                                                   |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |                    | Omogući periodičnu Arena AI leaderboard ELO sinhronizaciju za rangiranje inteligencije modela.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |                    | Reklamiraj `claude/<provider>/<model>` mirror ID-ove na `/v1/models` tako da otkrivanje modela Claude Code gateway-a izlista modele koji nisu Claude. Globalni nivo troslojne kapije (env pobjeđuje nad override-om kontrolne table). Pogledajte [Claude Code configuration](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                             |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |                    | Glavni prekidač za no-think/<provider>/<model> gateway alias-e. Uključeno (zadano): /v1/models reklamira no-thinking varijantu za svaki kvalifikovani Claude model sposoban za razmišljanje, a no-think/ ID poslat u zahtjevu se razrješava nazad na pravi model sa potisnutim rezonovanjem. Isključeno: varijante se ne reklamiraju, a no-think/ ID se tretira kao bilo koji drugi nepoznati ID modela. Opt-in/opt-out za ModelSpec.noThinkingAlias po modelu se i dalje primjenjuje dok je ovo uključeno.                                                        |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |                    | Onemogući generisanje varijanti nivoa razmišljanja (npr. -low, -medium, -high) u /v1/models katalogu.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓                  | Omogući adaptivne virtuelne pristupne trake po zakupcu za dispatch provajdera (#9654): burst jednog zakupca više ne uzrokuje 503 drugom. OMNIROUTE_CHAT_VIRTUAL_LANES env var pobjeđuje nad ovim override-om kontrolne table; promjene stupaju na snagu pri ponovnom pokretanju servera.                                                                                                                                                                                                                                                                           |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |                    | Reklamiraj <gateway-alias>/<model> mirror ID-ove na /v1/models za modele čiji kanonski vlasnik nema aktivne akreditive, ali ih passthrough gateway sa aktivnim akreditivima rutira. Upozorenje: dodaje unose u katalog za sve klijente kada je omogućeno globalno.                                                                                                                                                                                                                                                                                                 |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |                    | Omogući detekciju balansa za New-API / One-API / Sub2API agregator kompatibilne čvorove. Kada je omogućeno, kompatibilni čvorovi sa postavljenim aggregator flagom će prijaviti svoj balans u kontrolnoj tabli i quota-preflight rutiranju.                                                                                                                                                                                                                                                                                                                        |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |                    | Nastavi pozive alata u vlasništvu servera koji nisu streaming dok model ne vrati odgovor upotrebljiv za klijenta.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |                    | Statistika pretrage i nedavne pretrage broje samo provajdere koji još uvijek imaju aktivnu konekciju (provajderi bez ključa kao što je duckduckgo-free uvijek se broje). Isključeno zadržava svaki sačuvani red pretrage sa ID-om provajdera.                                                                                                                                                                                                                                                                                                                      |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |                    | Stranice provajdera na kontrolnoj tabli: prikaži Free značku samo na signalima koje provajder poštuje — odbacuje heuristiku imena za prikaz, ne-boolean free polja i :free sufikse na registrovanim provajderima bez dokumentovanog besplatnog nivoa. Isključeno zadržava historijsko pravilo za značke.                                                                                                                                                                                                                                                           |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |                    | Na agregiranim 429/503 nedostupnim odgovorima, izostavi `Retry-After` kada nije poznato konkretno vrijeme za ponovni pokušaj (umjesto sintetičke 1s), dodaj `error.retry_after_provenance` (`signal` \| `none`), i dozvoli putanjama za pražnjenje kombinacija da čitaju prozne savjete za ponovni pokušaj iz JSON-a i plain-text upstream tijela. Polje se pojavljuje samo na odgovorima koje je napravio `unavailableResponse()`; ostala 429/503 tijela su nepromijenjena.                                                                                       |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |                    | Kada `priority` combo cilj označen kao fallback-only-on-quota-exhaustion zaustavi kombinaciju iz razloga koji dokazano nije kvota (otvoren prekidač strujnog kola provajdera, preskakanje prediktivne latencije), odgovori sa 502 umjesto 503 koji izgleda kao kvota. Lockout, cooldown, unavailable, exhaustion i concurrency-cap zaustavljanja zadržavaju 503.                                                                                                                                                                                                   |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |                    | Običan Mistral 401 (`{"detail":"Unauthorized"}`, bez eksplicitnog auth signala) je identičan za opozvani ključ i za iscrpljenu kvotu. Kada je uključeno, hladi konekciju umjesto da je parkira kao `expired`, najviše 3 puta na sat po konekciji; sljedeći je parkira, tako da opozvani ključ i dalje konvergira. Zadano isključeno: svaki običan Mistral 401 parkira konekciju kao i prije.                                                                                                                                                                       |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |                    | Dohvati katalog xAI modela uživo za `xai-oauth` konekcije sa `https://api.x.ai/v1/models` koristeći OAuth bearer token, umjesto zamrznutog statičkog seed-a. Zadano isključeno: `xai-oauth` nastavlja služiti statički seed nepromijenjen. Pri bilo kakvoj grešci u razrješavanju, otkrivanje se vraća na seed (neprovjereno da li x.ai prihvata OAuth bearer na ovom endpointu).                                                                                                                                                                                  |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |                    | Dozvoli automatskom čišćenju da obriše terminalne (završene/neuspjele/otkazane/istekle) Batch API poslove starije od `OMNIROUTE_BATCH_RETENTION_DAYS`, zajedno sa njihovim kontrolnim tačkama po liniji, i očisti BLOB sadržaj učitanih datoteka nakon njihovog `expires_at`. Zadano isključeno: svaka postojeća instalacija zadržava ove podatke tačno kao prije dok se operater ne odluči za to. Ruta `DELETE /api/v1/batches/delete-completed` koju pokreće operater ostaje nepromijenjena u svakom slučaju — to je poseban, bezuslovan ugovor o javnom API-ju. |

### CLI (5)

| Ključ                                 | Tip     | Zadano  | Ponovno pokretanje | Opis                                                                                                                                                                                                                                          |
| ------------------------------------- | ------- | ------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓                  | Omogući način kompatibilnosti za sve CLI klijente.                                                                                                                                                                                            |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |                    | Omogući sloj kompatibilnosti za alias modela.                                                                                                                                                                                                 |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |                    | Omogući automatsku sinkronizaciju podataka o cijenama (također zahtijeva varijablu okruženja `PRICING_SYNC_ENABLED`).                                                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |                    | Nakon sinkronizacije modela provajdera, automatski (ponovo) zapiši ~/.codex/*.config.toml datoteke profila iz kataloga uživo. Nikada ne mijenja aktivnu/zadanu Codex konfiguraciju. Isključeno prema zadanim postavkama.                      |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |                    | Nakon sinkronizacije modela provajdera, automatski (ponovo) zapiši ~/.claude/profiles/<name>/settings.json Claude Code profile iz kataloga uživo. Nikada ne mijenja aktivnu/zadanu Claude konfiguraciju. Isključeno prema zadanim postavkama. |

### Zdravlje (5)

| Ključ                                     | Tip     | Zadano  | Opis                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | Onemogući krajnju tačku (endpoint) za provjeru zdravlja lokalne instance.                                                                                                                                                                                                                                   |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | Onemogući provjeru zdravlja validacije tokena.                                                                                                                                                                                                                                                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | Omogući mrežni pristup u sandbox okruženju vještina.                                                                                                                                                                                                                                                        |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | U provjeri zdravlja proxyja, sonda koju je cilj odbio (401/403/429) resetuje niz uzastopnih neuspjeha proxyja. Isključeno prema zadanim postavkama: odbijanje ostaje neutralno (#10654). 5xx greška ostaje neodlučena u svakom slučaju; odbijanje nikada ne uklanja, onemogućava ili ponovo aktivira proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | Pokreni provjeru integriteta/zdravlja baze podataka pri pokretanju nakon što server počne prihvatati zahtjeve (putem `setImmediate`) umjesto blokiranja pokretanja dok se ne završi (#13717). Isključeno prema zadanim postavkama: pokretanje se blokira potpuno isto kao i prije ovog PR-a.                |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` i njegov naslijeđeni alias
> `INJECTION_GUARD_BLOCK_THRESHOLD` podešavaju `block` način rada
> `INJECTION_GUARD_MODE`, ali su to obične varijable okruženja koje čita
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> a ne feature flagovi: nemaju DB override i nemaju prekidač na dashboardu. Pogledajte
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> Kolona `Restart` označava flagove sa `requiresRestart: true` — vrijednost se
> trenutno pohranjuje, ali stupa na snagu tek nakon ponovnog učitavanja procesa.
> Enum flagovi odbijaju bilo koju vrijednost izvan dozvoljenog skupa (validirano
> na strani servera u `setFeatureFlagOverride()` i REST `PUT` handleru).

---

## Prebacivanje zastavica

### Kontrolna tabla

Idite na **Kontrolna tabla → Postavke → Zastavice funkcija**
(`/dashboard/settings/feature-flags`). Mreža
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
podržava:

- **Pretragu** po ključu ili opisu, i **filtriranje** po kategoriji (plus sintetički
  prikaz **Zahtijeva ponovno pokretanje**).
- **Prekidač** za booleove zastavice i **padajući meni** za enum zastavice
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- **Oznaku izvora** za svaku zastavicu — `DB`, `ENV`, ili `DEF` — koja pokazuje
  odakle dolazi efektivna vrijednost.
- Dugme **Resetuj** (prikazano samo za zastavice iz `DB`-a) za uklanjanje
  nadjačavanja, i dugme **Resetuj sva nadjačavanja** na dnu.
- Baner **Ponovo pokreni server** kada se promijeni zastavica `requiresRestart`.

### REST API

Sve operacije idu kroz jednu rutu:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
Svaki metod zahtijeva autentifikovanu sesiju kontrolne table (u suprotnom `401`).

#### `GET /api/settings/feature-flags`

Vraća svaku zastavicu sa njenom efektivnom vrijednošću, izvorom i sažetkom.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... svih 72 zastavice
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

Postavite ili uklonite pojedinačno nadjačavanje. Tijelo: `{ key: string; value?: string }`.
Izostavljanje `value` uklanja nadjačavanje (vraćajući env / default).

```bash
# Postavi DB nadjačavanje
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Ukloni nadjačavanje (bez "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

Odgovor ponavlja novu `effectiveValue`/`source`, `previousValue`/
`previousSource`, i `requiresRestart`. Nepoznati ključevi i enum vrijednosti
izvan opsega se odbijaju sa `400`.

#### `DELETE /api/settings/feature-flags`

Briše **sva** DB nadjačavanja odjednom, vraćajući svaku zastavicu na njenu env /
default vrijednost. Vraća `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> Zastavice sa `requiresRestart: true` stupaju na snagu tek nakon ponovnog
> učitavanja procesa. Tok ponovnog pokretanja kontrolne table poziva
> `POST /api/restart` i zatim vrši upite `GET /api/health/ping` dok server
> ponovo ne bude aktivan.

---

## Rezervna opcija za hitni budžet

`OMNIROUTE_EMERGENCY_FALLBACK` (kategorija `runtime`, default `true`) kontroliše
putanju hitne besplatne rezervne opcije u
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
Kada je omogućeno, zahtjevi koji iscrpe svoj budžet se usmjeravaju na besplatnog
rezervnog provajdera/model umjesto da odmah ne uspiju. Postavite na `false` (ili
`0`) — putem prekidača na kontrolnoj tabli, DB nadjačavanja ili
`OMNIROUTE_EMERGENCY_FALLBACK` varijable okruženja — da onemogućite ovo ponašanje
i dozvolite da zahtjevi sa iscrpljenim budžetom ne uspiju. (Prikazano kao prekidač
na kontrolnoj tabli u PR-ovima #3741 / #3752.)

---

## Vidi također

- [Referenca varijabli okruženja](./ENVIRONMENT.md) — većina zastavica ima
  istoimenu varijablu okruženja dokumentiranu tamo (DB override ima
  prednost nad njom).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — izvor istine za svaku zastavicu.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — logika razrješenja (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — perzistencija DB override-a
  u `feature_flags` imenskom prostoru tabele `key_value`.
