# Self-Hosted Runner Box Operations (.113 pool) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samostalno hostani skup (`self-hosted, omni-release` na svih osam izvršitelja; `omni-build` na dva) radi na poslužitelju **.113**.
Izmjereno 2026-08-28 (post mortem za v3.8.50, III. dio):

| resurs      | vrijednost                                                                                                                      | što to znači za raspoređivanje                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **31 GB / 32 jezgre** (bilo je 16 GB kada je ovaj dokument prvi put napisan)                                                    | jedan `next-build` doseže **~14 GB** → 2 istodobne zahtjevne izgradnje zasićuju poslužitelj, a 3 ga ruše (2026-08-28 06:42Z: opterećenje 56, izgubljena dva zadatka) |
| swap        | 15 GB                                                                                                                           | uz korištenje swapa uspio je dovršiti objavu v3.8.50; opterećenje je vidljivo u `/proc/pressure/memory`                                                              |
| `/tmp`      | **12 GB tmpfs = RAM**                                                                                                           | sve što je ondje spremljeno zauzima memoriju; ostaci se čiste nakon 3 h                                                                                              |
| disk        | 188 GB                                                                                                                          | radne kopije `_work` za 8 izvršitelja dosežu ~70 GB bez ograničenja                                                                                                  |
| izvršitelji | **6 procesa za osluškivanje**: 4 OmniRoute (1 `omni-build` + 1 samo za `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | svi dijele gore navedenu memoriju; `omniroute-113-3/-4/-7/-8` su onemogućeni (`systemctl enable --now` ponovno pokreće jedan)                                        |

## Instalirajte čistač (jednokratno, na poslužitelju)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): svakih 30 min, zapisivanje u /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je obavezan: čistač prije uklanjanja jednokratnom snimkom otvorenih
datoteka potvrđuje da se putanja ne koristi, a bez tog alata ne uklanja ništa i
to prijavljuje (izlazni kod 1). Svaku promjenu najprije isprobajte s `--dry-run` —
ispisuje točno što bi učinio i ne mijenja ništa.

Što radi pri svakom pokretanju: čisti naše ostatke (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) nakon **3 h na tmpfs-u** i 24 h u direktoriju
`_work/_temp` na disku; prekida proces `next-build` stariji od 75 min (nijedan
zadatak ne traje toliko — 2026-08-27 jedan je trajao 70 min nakon što je GitHub
njegov zadatak proglasio izgubljenim); uklanja radne kopije starije od 48 h za
izvršitelje čija je jedinica **zaustavljena**; upozorava kada je zauzeće diska ≥
85 %, memorijski PSI `full/avg60` ≥ 10 % i kada broj procesa za osluškivanje
premašuje `MAX_ACTIVE_RUNNERS` (uz raščlambu na omniroute/ostale). Izlazni kod 1
= potrebna je intervencija; pročitajte zapisnik.

## Jedinice runnera: KillMode

Zadani `KillMode=process` runnera ostavlja proces `Runner.Worker → npm → next-build`
aktivnim kada se jedinica zaustavi ili ponovno pokrene — napušteni build nastavlja trošiti RAM i
CPU iako nije povezan ni s jednim poslom. Svaka OmniRoute jedinica ima dopunsku konfiguraciju
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s postavkom `KillMode=mixed`: prvo se listeneru šalje SIGTERM, a zatim se cijeloj kontrolnoj grupi
šalje SIGKILL pri isteku `TimeoutStop`. Postavka stupa na snagu pri sljedećem ponovnom pokretanju jedinice — ponovno pokrećite **jedan runner
odjednom, samo kada je neaktivan**, pri čemu provjera neaktivnosti i ponovno pokretanje moraju biti u istoj naredbi.

## Pravila rada

- **Ograničenje za zahtjevne buildove: JEDAN istodobno — nametnuto oznakom (od 2026-08-29).** Svaki posao
  koji izvršava puni `next build` cilja `[self-hosted, omni-build]`, a samo
  **`omniroute-113-5`** ima tu oznaku (dodanu putem API-ja za runnere — bez
  ponovne registracije): `ci.yml` `Build`, `npm-publish.yml` `publish`, obje
  provjere `nightly-release-green` i **amd64** u `docker-publish.yml` (hostani
  runner sa 7 GB naišao je na ResourceExhausted za ovo stablo — #11976). Dockerov arm64 dio ostaje na
  `ubuntu-24.04-arm` (nema ARM stroja) uz webpack. Docker amd64 također koristi webpack:
  Turbopack se za ovo stablo srušio unutar BuildKita (`TurbopackInternalError:
there must be a path to a root`, izvršavanje 33253576569), čak i s 31 GB; arm64 webpack build istog
  stabla uspio je na hostanom ARM-u. `docker-publish` amd64 dijeli grupu konkurentnosti
  `heavy-build-main` s poslom `Build` iz `ci.yml`
  (`cancel-in-progress: false`), pa čeka u redu za jedino mjesto. Docker Engine
  mora biti na `omniroute-113-5` (`docker info` prvi je korak posla objavljivanja).
  Prethodno je ograničenje bilo dva, što je bilo pogrešno za 31 GB: dana
  2026-08-29 u 17:26 UTC dva istodobna procesa `next-build` (15,4 GB + 17,2 GB RSS) smanjila su
  slobodnu memoriju stroja na 5 GB, uz 4 GB korištenog swapa, pa je kernel zbog OOM-a prekinuo jedan od njih — systemd
  je evidentirao prekid u jedinici _drugog_ runnera, `runsvc.sh` je SIGKILL-om prekinuo taj listener, a
  posao na njemu završio je porukom "The runner has received a shutdown signal" (istim tekstom kao kod
  OOM-a hostanog runnera). `omniroute-113-6` zadržava samo `omni-release`. Zahtjevni buildovi iz
  spajanja u `main`, PR-ova i noćnog izvršavanja sada se serijaliziraju preko jednog mjesta; čekanje u redu je cijena toga.
  Drugo mjesto vraća se onoga dana kada Proxmox VM dobije više RAM-a (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Skup za lagane poslove: `omni-light` (2026-08-29, #11965).** `omniroute-113` i `omniroute-113-2` imaju
  oznaku `omni-light` za poslove kojima je potreban samo backend `next build` (~5–6 GB), ali ne i puni build: noćne
  poslove Schemathesis, promptfoo, garak i axe-a11y. Izvršavali su se na hostanom runneru sa 7 GB i
  rušili na `release/v3.8.51` dok ih nitko nije nadzirao. Najgori slučaj na stroju jest 2 zahtjevna + 2 lagana ≈
  30 + 12 GB — više od 31 GB RAM-a, ali unutar 16 GB swapa; pravo rješenje za veću rezervu jest više RAM-a
  na Proxmox VM-u (`tomni-proxmox-113`), čime ograničenja putem oznaka postaju 3 zahtjevna + 2 lagana.
- **Namjerno manje listenera.** Četiri OmniRoute jedinice onemogućene su 2026-08-29 — budući da samo
  `Build` iz `ci.yml` i noćni poslovi koriste stroj, 8 listenera bilo je neaktivno, a svaki dodatni predstavlja
  potencijalnog korisnika 14 GB memorije. Ograničenje janitora jest 6 (`MAX_ACTIVE_RUNNERS=6` u cronu): broji
  svaki `Runner.Listener` na stroju, a OmniHeuris + OmniMind dodaju još dva uz naša četiri.
- **Nikada ručno ne čistite `/tmp` ili `_work` dok je bilo koji runner zauzet.** Provjera
  nakon koje slijedi brisanje s vremenskim razmakom između tih radnji razlog je zbog kojeg je aktivni posao Build izgubio svoj
  `_work` 2026-08-27. Janitor obavlja provjeru i uklanjanje u jednom koraku;
  prepustite to njemu.
- Zaustavljanje runnera usred posla otkazuje posao (potvrđeno uživo): koristite `systemctl stop` samo
  kada njegov listener nema podređeni proces `Runner.Worker` — i učinite to jednom naredbom.
- Tijekovi rada ne smiju pohranjivati artefakte u `/tmp` (nalazi se u RAM-u). Preuzimajte ih u
  `$RUNNER_TEMP` (na disku, zasebno za svaki runner) — preuzimanje artefakta `next-build` od 1,3 GB na tmpfs trajalo je 27–32
  minute, dok je prijenos s diska trajao 2 minute.
- VPS `.15` služi samo za homologaciju — na njemu se nikada ne izvršavaju CI runneri.
