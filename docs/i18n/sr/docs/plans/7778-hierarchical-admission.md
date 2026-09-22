# #7778 hierarchical admission cleanup plan (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../plans/7778-hierarchical-admission.md) · 🇪🇹 [am](../../../am/docs/plans/7778-hierarchical-admission.md) · 🇸🇦 [ar](../../../ar/docs/plans/7778-hierarchical-admission.md) · 🇦🇿 [az](../../../az/docs/plans/7778-hierarchical-admission.md) · 🇧🇬 [bg](../../../bg/docs/plans/7778-hierarchical-admission.md) · 🇧🇩 [bn](../../../bn/docs/plans/7778-hierarchical-admission.md) · 🇨🇿 [cs](../../../cs/docs/plans/7778-hierarchical-admission.md) · 🇩🇰 [da](../../../da/docs/plans/7778-hierarchical-admission.md) · 🇩🇪 [de](../../../de/docs/plans/7778-hierarchical-admission.md) · 🇬🇷 [el](../../../el/docs/plans/7778-hierarchical-admission.md) · 🇪🇸 [es](../../../es/docs/plans/7778-hierarchical-admission.md) · 🇪🇪 [et](../../../et/docs/plans/7778-hierarchical-admission.md) · 🇮🇷 [fa](../../../fa/docs/plans/7778-hierarchical-admission.md) · 🇫🇮 [fi](../../../fi/docs/plans/7778-hierarchical-admission.md) · 🇫🇷 [fr](../../../fr/docs/plans/7778-hierarchical-admission.md) · 🇮🇪 [ga](../../../ga/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [gu](../../../gu/docs/plans/7778-hierarchical-admission.md) · 🇳🇬 [ha](../../../ha/docs/plans/7778-hierarchical-admission.md) · 🇮🇱 [he](../../../he/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [hi](../../../hi/docs/plans/7778-hierarchical-admission.md) · 🇭🇷 [hr](../../../hr/docs/plans/7778-hierarchical-admission.md) · 🇭🇺 [hu](../../../hu/docs/plans/7778-hierarchical-admission.md) · 🇦🇲 [hy](../../../hy/docs/plans/7778-hierarchical-admission.md) · 🇮🇩 [id](../../../id/docs/plans/7778-hierarchical-admission.md) · 🇳🇬 [ig](../../../ig/docs/plans/7778-hierarchical-admission.md) · 🇮🇹 [it](../../../it/docs/plans/7778-hierarchical-admission.md) · 🇯🇵 [ja](../../../ja/docs/plans/7778-hierarchical-admission.md) · 🇬🇪 [ka](../../../ka/docs/plans/7778-hierarchical-admission.md) · 🇰🇭 [km](../../../km/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [kn](../../../kn/docs/plans/7778-hierarchical-admission.md) · 🇰🇷 [ko](../../../ko/docs/plans/7778-hierarchical-admission.md) · 🇱🇹 [lt](../../../lt/docs/plans/7778-hierarchical-admission.md) · 🇱🇻 [lv](../../../lv/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [ml](../../../ml/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [mr](../../../mr/docs/plans/7778-hierarchical-admission.md) · 🇲🇾 [ms](../../../ms/docs/plans/7778-hierarchical-admission.md) · 🇲🇹 [mt](../../../mt/docs/plans/7778-hierarchical-admission.md) · 🇲🇲 [my](../../../my/docs/plans/7778-hierarchical-admission.md) · 🇳🇵 [ne](../../../ne/docs/plans/7778-hierarchical-admission.md) · 🇳🇱 [nl](../../../nl/docs/plans/7778-hierarchical-admission.md) · 🇳🇴 [no](../../../no/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [or](../../../or/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [pa](../../../pa/docs/plans/7778-hierarchical-admission.md) · 🇵🇭 [phi](../../../phi/docs/plans/7778-hierarchical-admission.md) · 🇵🇱 [pl](../../../pl/docs/plans/7778-hierarchical-admission.md) · 🇵🇹 [pt](../../../pt/docs/plans/7778-hierarchical-admission.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/plans/7778-hierarchical-admission.md) · 🇷🇴 [ro](../../../ro/docs/plans/7778-hierarchical-admission.md) · 🇷🇺 [ru](../../../ru/docs/plans/7778-hierarchical-admission.md) · 🇱🇰 [si](../../../si/docs/plans/7778-hierarchical-admission.md) · 🇸🇰 [sk](../../../sk/docs/plans/7778-hierarchical-admission.md) · 🇸🇮 [sl](../../../sl/docs/plans/7778-hierarchical-admission.md) · 🇸🇪 [sv](../../../sv/docs/plans/7778-hierarchical-admission.md) · 🇰🇪 [sw](../../../sw/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [ta](../../../ta/docs/plans/7778-hierarchical-admission.md) · 🇮🇳 [te](../../../te/docs/plans/7778-hierarchical-admission.md) · 🇹🇭 [th](../../../th/docs/plans/7778-hierarchical-admission.md) · 🇹🇷 [tr](../../../tr/docs/plans/7778-hierarchical-admission.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/plans/7778-hierarchical-admission.md) · 🇵🇰 [ur](../../../ur/docs/plans/7778-hierarchical-admission.md) · 🇺🇿 [uz](../../../uz/docs/plans/7778-hierarchical-admission.md) · 🇻🇳 [vi](../../../vi/docs/plans/7778-hierarchical-admission.md) · 🇳🇬 [yo](../../../yo/docs/plans/7778-hierarchical-admission.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/plans/7778-hierarchical-admission.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/plans/7778-hierarchical-admission.md)

---

1. Učvrstite postojeći ugovor semafora sa jednim ključem i novi atomski ugovor
   sa više ključeva ciljanim testovima: bez delimičnih rezervacija, FIFO čekanje
   u redu, prekid, istek vremena, pun red, idempotentno oslobađanje, statistika
   i čišćenje.
2. Generalizujte postojeći semafor naloga na mestu. Zadržite `acquire()` kao
   omotač radi kompatibilnosti oko `acquireMany()`; nemojte dodavati drugi
   planer niti zavisnost.
3. Zamenite pribavljanje samo za nalog u `chatCore` jednim kumulativnim
   globalnim/providerskim/naloškim pribavljanjem neposredno pre `withRateLimit`.
   Ponovo pribavite ceo skup kad god rotacija naloga promeni vezu i zadržite
   oslobađanje sve do završetka strimovanja.
4. Proširite postojeći tok podešavanja otpornosti (tipovi, podrazumevane
   vrednosti, normalizacija, šema, API odgovor, UI i prevodi) globalnim i
   providerskim ograničenjima. Preimenujte staru Bottleneck kontrolu
   konkurentnosti u konkurentnost na nivou veze/kvote kako bi njen stvarni
   opseg bio eksplicitan.
5. Pokrenite ciljane testove, lint, proveru tipova, statičke provere i kompletan
   skup testova; dokumentujte promenu ponašanja u dnevniku izmena.

Ponašanje koje je namerno zadržano: nulta/null konkurentnost zaobilazi kapiju,
pozivaoci koji rade samo sa nalogom nastavljaju da koriste `acquire()`, kontrole
blokiranih naloga zadržavaju svoj format ključa i API, a ponašanje reda za
providersko ograničenje brzine ostaje nepromenjeno.
