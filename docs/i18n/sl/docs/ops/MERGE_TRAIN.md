# Merge Queue & Manual Merge-Train Runbook (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od različice v3.8.49 (WS3.2/WS3.4 načrta kakovosti/hitrosti) je privzeta pot združevanja
pregledanih PR-jev v `release/vX.Y.Z` **Mergifyjeva čakalna vrsta za združevanje** (`.mergify.yml`);
spodaj dokumentirani **ročni vlak združevanja** je REZERVNA MOŽNOST — uporablja se med incidenti,
zamrznitvami izdaje ali če se paket Mergify Open Source kdaj spremeni.

## Privzeta pot: čakalna vrsta Mergify

1. Kampanje pregledajo PR in potrdijo uspešno izvajanje preverjanj, nato pa ga lastnik odobri prek ⭐
   kontrolne točke pred združitvijo (poročilo + odločitev za vsak element — glejte `/merge-prs`, korak 0.75).
2. Lastnik (ali seja, ki deluje na podlagi lastnikove odločitve) doda oznako **`queue`**.
   Oznaka JE odobritev združitve; Mergify jo samo izvede.
3. Mergify preverja PR-je v čakalni vrsti **zaporedno** (enega naenkrat) s hitrimi kontrolnimi
   točkami in jih združuje (squash). Paketna obdelava + samodejna bisekcija sta na voljo
   v plačljivem paketu Mergify ("Cannot use Merge Queue batch" v brezplačnem paketu, #7220),
   zato `.mergify.yml` ne nastavlja možnosti `batch_size`; paketna obdelava ostaja naloga
   spodaj opisanega ročnega vlaka združitev. PR, katerega preverjanja so po poteku
   `checks_timeout` (240 min = 2× izmerjeni p95 za `quality.yml`) še vedno v teku, je
   odstranjen iz čakalne vrste, namesto da bi jo zaustavil.
4. Po združitvi neprekinjeni delovni tok za zeleno izdajo ob potisku preveri novo konico
   in odpre težavo za določitev izvora, če je kombinacija povzročila regresijo (nikoli ne izvede samodejne povrnitve).

Varovalke (ustrezajo praviloma št. 21/22 v razdelku Hard Rules datoteke `CLAUDE.md`):

- **Zamrznitev izdaje je aktivna** → PR-jev, usmerjenih v zamrznjeno vejo, NE označujte;
  najprej jih preusmerite v aktivno vejo `release/vX+1`.
- **PR druge seje, ki je trenutno v obdelavi** → nikoli ga ne označujte; samo lastniška seja
  doda svoje delo v čakalno vrsto.
- Spremembe, ki zadevajo samo teste, in PR-ji z oznako `hotfix` že izvajajo zmanjšan nabor preverjanj CI
  (glejte `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); pogoji čakalne vrste sprejmejo kateri koli
  nabor preverjanj, ki se je dejansko izvedel (`#check-failure=0` + `#check-pending=0`).

## Rezervna možnost: ročni vlak združevanja

Uporablja se, ko čakalna vrsta ni na voljo. To formalizira prakso, s katero je bilo v enem
dnevu med ciklom v3.8.47 obdelanih 33 PR-jev:

1. **Sestavite paket** (~10–30 pregledanih in odobrenih PR-jev). Preverite kolizije `linked:`
   (isti `tap.testFiles`, isti odseki datoteke CHANGELOG) in jih obdelajte zaporedno.
2. **Preverite ENKRAT**: v izoliranem delovnem drevesu na konici veje izdaje lokalno združite
   vse glave paketa, nato pa zaženite zbirko, enakovredno izdaji
   (`npm run check:release-green`; pred izdajo dodajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` avtomatizira koraka 1–2 (PR-ji s spori
   so izločeni, vlak pa nadaljuje). Polni način zažene `npm run test:unit` — izvajalnik,
   prilagojen računalniku (`--test-concurrency=20`), in **ne** dveh zaporednih 4-jedrnih
   drobcev CI, zaradi katerih je prevladujoča faza uporabljala približno 25 % 16-jedrnega
   računalnika (popravljeno 2026-07-18). `--fast` (praznjenje velikanskih vlakov znotraj dneva,
   lastnik odobril 2026-07-18) ohrani vse statične kontrolne točke + vitest, vendar izvede
   samo datoteke node:test, ki so jih spremenili vkrcani PR-ji; POLNA zbirka se mora še vedno
   izvesti vsaj enkrat dnevno na akumulirani konici (en vlak brez `--fast`).
3. **Uspešno** → zaporedno združite PR-je (pred vsakim znova preverite `state,headRefOid` —
   PR, katerega glava se je premaknila, se vrne v pregled). Dokažite, da je neto sprememba
   vsake združitve lastna sprememba PR-ja (brez samodejnega razreševanja z razveljavitvami:
   z `git diff --stat` preverite izbrise zunaj obsega).
4. **Neuspešno** → razpolovite paket (preverite vsako polovico), namesto da bi PR-je
   ponovno preverjali enega za drugim; problematični PR z dokazi vrnite v čakalno vrsto za pregled.
5. **Nikoli**: ne združujte v zamrznjeno vejo med zamrznitvijo; nikjer ne uporabljajte
   `git stash`; ne izvajajte slepih ponovitev CI v upanju, da bo neuspeh izginil
   (pravilo: neuspeh je informacija).

## Ravni (zakaj je čakalna vrsta varna samo s hitrimi kontrolami)

- **Na PR** (hitre kontrole quality.yml): testi, na katere vpliva TIA, + celotni enotski testi
  v 4 drobcih + vitest + zbirka preverjanj lint + preverjanje tipov + celovitost dokumentacije/dnevnika sprememb.
- **Na paket/konico** (neprekinjeno preverjanje ustreznosti izdaje): STROGE kontrole `--quick`
  ob vsakem potisku v vejo izdaje; polni pregledi `--with-build --full-ci` 3-krat na dan.
- **Na izdajo** (ci.yml na PR-ju izdaje): celotna matrika, vključno z E2E ×9,
  artefaktom paketa + zagonskim preizkusom arhiva tarball ter pokritostjo/omejevalniki.

Nič ni preverjeno manj kot prej — zahtevna površina se le izvaja na paket/konico
namesto na posamezni PR, kar odpravi O(N) povratnih ciklov.

## Predpogoji svežega prevzema za `merge-train.sh`

Skript izvede **predhodno preverjanje**, ki se ob prvi napaki ustavi, v korenskem prevzemu
(pred kakršnim koli delom z delovnim drevesom), zato se okvarjena namestitev nikoli ne more
lažno prikazati kot neuspešen vlak:

1. `npm ci`, nato zaženite namestitveni korak paketa `bun`, ki ga npm blokira:
   `(cd node_modules/bun && node install.js)` — sicer `check:provider-consistency`
   in `check:known-symbols` (oba uporabljata `bun scripts/…`) ne uspeta tako na vlaku KOT
   na osnovi, ne da bi prikazala vrstico s kršitvijo.
2. Ne sme biti odvečnega `node_modules/node_modules` (podvojeno drevo odvisnosti; React se
   naloži dvakrat in zbirke UI vitest takoj odpovejo).
3. `node_modules/.bin/tsc` mora biti prisoten in izvedljiv (pri delni namestitvi manjka).

Vlak izvede blokirajoči `npm run check:cycles:ratchet`; samostojni `npm run check:cycles`
je informativen (izpiše SCC-je in se konča z neničelno izhodno kodo tudi na zdravi osnovi).
