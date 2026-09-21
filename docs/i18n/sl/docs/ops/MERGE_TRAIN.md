# Merge Queue & Manual Merge-Train Runbook (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od v3.8.49 (WS3.2/WS3.4 načrta kakovosti/hitrosti) je privzeta pot združevanja
pregledanih PR-jev v `release/vX.Y.Z` **Mergifyjeva čakalna vrsta za združevanje** (`.mergify.yml`);
spodaj dokumentirani **ročni vlak združevanja** je REZERVNA MOŽNOST — uporablja se med incidenti,
zamrznitvami izdaj ali če se paket Mergify Open Source kadar koli spremeni.

## Privzeta pot: Mergifyjeva čakalna vrsta

1. Kampanje pregledajo PR in potrdijo, da je zelen, nato pa ga odobri lastnikova ⭐
   kontrola pred združitvijo (poročilo + odločitev za vsako postavko — glejte `/merge-prs`, korak 0.75).
2. Lastnik (ali seja, ki deluje na podlagi lastnikove odločitve) doda oznako **`queue`**.
   Oznaka JE odobritev združitve; Mergify jo le izvede.
3. Mergify združi do 10 PR-jev iz čakalne vrste v paket, preveri paket s hitrimi kontrolami
   in ga združi (squash). Rdeč paket se **samodejno razpolovi** — problematični PR
   se izolira v približno log2(N) ponovnih preverjanjih in odstrani iz čakalne vrste; preostali nadaljujejo.
4. Po združitvi neprekinjeni delovni tok release-green ob potisku preveri novo konico
   in odpre zadevo za določitev izvora, če je kombinacija povzročila regresijo (nikoli ne izvede samodejne povrnitve).

Varovala (odražajo stroga pravila št. 21/22 v `CLAUDE.md`):

- **Zamrznitev izdaje je aktivna** → PR-jev, ki ciljajo na zamrznjeno vejo, NE označujte; najprej jih preusmerite na
  aktivno vejo `release/vX+1`.
- **PR druge seje, ki je v obdelavi** → nikoli ga ne označujte; samo lastniška seja uvršča
  svoje delo v čakalno vrsto.
- Razlike, ki spreminjajo samo teste, in PR-ji z oznako `hotfix` že izvajajo skrčen CI (glejte
  `RELEASE_CHECKLIST.md` → Hitra pot za hitre popravke); pogoji čakalne vrste sprejmejo kateri koli
  nabor preverjanj, ki se je dejansko izvedel (`#check-failure=0` + `#check-pending=0`).

## Rezervna možnost: ročni vlak združevanja

Uporablja se, ko čakalna vrsta ni na voljo. To formalizira prakso, s katero je bilo med
ciklom v3.8.47 v enem dnevu obdelanih 33 PR-jev:

1. **Sestavite paket** (~10–30 pregledanih in odobrenih PR-jev). Preverite navzkrižja `linked:`
   (iste datoteke `tap.testFiles`, isti odseki CHANGELOG) in jih obdelajte zaporedno.
2. **Preverite ENKRAT**: v izoliranem delovnem drevesu, ki izhaja iz konice veje izdaje, lokalno združite vse
   glave paketa, nato pa zaženite nabor, enakovreden izdajnemu
   (`npm run check:release-green`, pred izdajo dodajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` avtomatizira koraka 1–2 (PR-ji v navzkrižju
   izstopijo, vlak pa nadaljuje). Polni način zažene `npm run test:unit` — izvajalnik,
   prilagojen računalniku (`--test-concurrency=20`), in **ne** dveh zaporednih 4-jedrnih razdelkov CI,
   zaradi katerih je prevladujoča faza uporabljala približno 25 % 16-jedrnega računalnika (popravljeno
   2026-07-18). `--fast` (praznjenje ogromnega vlaka znotraj dneva, odobril lastnik 2026-07-18)
   ohrani vse statične kontrole + vitest, vendar zažene samo datoteke node:test, ki so jih spremenili
   vkrcani PR-ji; POLNI nabor se mora na zbrani konici še vedno izvesti vsaj enkrat na dan
   (en vlak brez `--fast`).
3. **Zeleno** → zaporedno združite PR-je (pred vsakim ponovno preverite `state,headRefOid` —
   PR, katerega glava se je premaknila, se vrne v pregled). Dokažite, da je neto razlika vsake združitve
   lastna sprememba PR-ja (brez povrnitev zaradi samodejnega razreševanja: preglejte `git diff --stat` glede
   izbrisov zunaj obsega).
4. **Rdeče** → razpolovite paket (preverite vsako polovico), namesto da bi PR-je ponovno preverjali
   enega za drugim; problematični PR z dokazili vrnite v čakalno vrsto za pregled.
5. **Nikoli**: med zamrznitvijo ne združujte v zamrznjeno vejo; nikjer ne uporabljajte `git stash`;
   ne izvajajte splošnih ponovitev CI v upanju, da bo rdeče stanje izginilo (pravilo: rdeče stanje je informacija).

## Ravni (zakaj je čakalna vrsta varna samo s hitrimi kontrolami)

- **Na PR** (hitre kontrole quality.yml): testi, na katere vpliva TIA, + polne enote v 4 razdelkih +
  vitest + sklop preverjanj lint + preverjanje tipov + celovitost dokumentacije/dnevnika sprememb.
- **Na paket/konico** (neprekinjeni release-green): STROGE kontrole `--quick` ob vsakem potisku v
  vejo izdaje; polni pregledi `--with-build --full-ci` 3×/dan.
- **Na izdajo** (ci.yml na PR-ju izdaje): celotna matrika, vključno z E2E ×9,
  artefaktom paketa + osnovnim zagonskim preizkusom arhiva tarball ter pokritostjo/pragovi.

Nič ni preverjeno manj kot prej — zahtevni del se le izvaja na paket/konico
namesto na vsak PR, kar odpravi O(N) povratnih ciklov.
