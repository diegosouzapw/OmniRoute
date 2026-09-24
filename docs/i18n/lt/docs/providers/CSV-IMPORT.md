# Import providers from a CSV or JSON file (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Skydelis → Teikėjai → **Importuoti iš failo** sukuria API rakto ryšius iš CSV arba JSON sąrašo. Kiekvienoje eilutėje galima nurodyti kitą teikėją. Dalinis nesėkmingas importavimas yra numatytas veikimas: tinkamos eilutės importuojamos net tada, kai kitų importuoti nepavyksta, o modaliniame lange nurodoma, kodėl nesėkmingos eilutės buvo atmestos.

Šis importavimas **nesukuria** naujų su OpenAI / Anthropic suderinamų galinio taško mazgų. Pirmiausia sukurkite juos (Skydelis → Teikėjai → Pridėti su OpenAI suderinamą teikėją arba `omniroute nodes add`), tada importuokite eilutes, kurių stulpelyje `provider` nurodytas to mazgo id. Kiekvienoje eilutėje nurodytas `baseUrl` vis tiek gali pakeisti mazgo URL.

## CSV (pozicinis)

Stulpelių pavadinimai yra tik kosmetiniai. Analizatorius suskaido kiekvieną eilutę ir priskiria reikšmes pagal indeksą:

| Indeksas | Laukas     | Privalomas | Pastabos                                                                                                                     |
| -------- | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 0        | `provider` | taip       | Esamo valdomo teikėjo id (`openai`, `anthropic`, …) **arba** jau užregistruoto su OpenAI / Anthropic suderinamo **mazgo** id |
| 1        | `name`     | taip       | Rodomas ryšio pavadinimas                                                                                                    |
| 2        | `apiKey`   | taip       | API raktas                                                                                                                   |
| 3        | `baseUrl`  | ne         | Konkrečios eilutės URL pakeitimas                                                                                            |
| 4        | `priority` | ne         | Sveikasis skaičius nuo 1 iki 100                                                                                             |

Pirmoji eilutė, kurios pirmame stulpelyje yra pažodinis žodis `provider` (neatsižvelgiant į raidžių registrą), praleidžiama kaip antraštė. Tuščios eilutės ir `#` komentarai praleidžiami.

Atsisiųskite pradinį failą iš importavimo modalinio lango (**Atsisiųsti CSV šabloną**). Pavyzdys:

```csv
# „OmniRoute“ teikėjų importavimas (poziciniai stulpeliai)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Išgalvotas id, pvz., `openai-compatible-chat-001`, nėra mazgas. API tai eilutei grąžina `Unknown or unsupported provider`; modaliniame lange šis pranešimas rodomas šalia eilutės pavadinimo.

## JSON

JSON objektų masyvas su tais pačiais laukais (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Kitaip nei CSV atveju, JSON raktai yra įvardyti.

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
