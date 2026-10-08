# Import providers from a CSV or JSON file (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Informācijas panelis → Pakalpojumu sniedzēji → **Importēt no faila** izveido API atslēgu savienojumus no CSV vai JSON saraksta. Katra rinda var norādīt uz citu pakalpojumu sniedzēju. Daļēja kļūme ir paredzēta darbība: derīgās rindas tiek importētas arī tad, ja citās rodas kļūmes, un modālajā logā tiek norādīti neveiksmīgo rindu noraidīšanas iemesli.

Šī importēšana **neizveido** jaunus ar OpenAI/Anthropic saderīgus galapunktu mezglus. Vispirms izveidojiet tos (Informācijas panelis → Pakalpojumu sniedzēji → Pievienot ar OpenAI saderīgu vai `omniroute nodes add`) un pēc tam importējiet rindas, kuru kolonnā `provider` ir norādīts attiecīgā mezgla id. Katras rindas `baseUrl` joprojām var pārrakstīt mezgla URL.

## CSV (pozicionāls)

Kolonnu nosaukumiem ir tikai vizuāla nozīme. Parsētājs sadala katru rindu un destrukturē to pēc indeksa:

| Indekss | Lauks      | Obligāts | Piezīmes                                                                                                                               |
| ------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 0       | `provider` | jā       | Esoša pārvaldīta pakalpojumu sniedzēja id (`openai`, `anthropic`, …) **vai** jau reģistrēta ar OpenAI/Anthropic saderīga **mezgla** id |
| 1       | `name`     | jā       | Savienojuma attēlojamais nosaukums                                                                                                     |
| 2       | `apiKey`   | jā       | API atslēga                                                                                                                            |
| 3       | `baseUrl`  | nē       | Konkrētās rindas URL pārrakstīšana                                                                                                     |
| 4       | `priority` | nē       | Vesels skaitlis no 1 līdz 100                                                                                                          |

Pirmā rinda, kuras pirmajā kolonnā ir burtiskais vārds `provider` (neatkarīgi no reģistra), tiek izlaista kā galvene. Tukšās rindas un `#` komentāri tiek izlaisti.

Lejupielādējiet sākuma failu importēšanas modālajā logā (**Lejupielādēt CSV veidni**). Piemērs:

```csv
# OmniRoute pakalpojumu sniedzēju importēšana (pozicionālās kolonnas)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Izdomāts id, piemēram, `openai-compatible-chat-001`, nav mezgls. API šai rindai atgriež `Unknown or unsupported provider`; modālajā logā tas tiek parādīts blakus rindas nosaukumam.

## JSON

JSON objektu masīvs ar tiem pašiem laukiem (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Atšķirībā no CSV JSON atslēgām ir nosaukumi.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
