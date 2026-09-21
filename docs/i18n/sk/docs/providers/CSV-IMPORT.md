# Import providers from a CSV or JSON file (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Poskytovatelia → **Importovať zo súboru** vytvorí pripojenia pomocou API kľúčov zo zoznamu vo formáte CSV alebo JSON. Každý riadok môže byť určený pre iného poskytovateľa. Čiastočné zlyhanie je súčasťou fungovania: platné riadky sa importujú aj vtedy, keď iné zlyhajú, a modálne okno uvedie dôvody odmietnutia neúspešných riadkov.

Tento import **nevytvára** nové uzly koncových bodov kompatibilných s OpenAI/Anthropic. Najprv ich vytvorte (Dashboard → Poskytovatelia → Pridať koncový bod kompatibilný s OpenAI alebo `omniroute nodes add`) a potom importujte riadky, ktorých stĺpec `provider` obsahuje id daného uzla. Hodnota `baseUrl` pre jednotlivý riadok môže naďalej prepísať URL adresu uzla.

## CSV (pozičné)

Názvy stĺpcov sú iba kozmetické. Syntaktický analyzátor rozdelí každý riadok a deštrukturalizuje ho podľa indexu:

| Index | Pole       | Povinné | Poznámky                                                                                                                                        |
| ----- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | áno     | Existujúce id spravovaného poskytovateľa (`openai`, `anthropic`, …) **alebo** id už zaregistrovaného **uzla** kompatibilného s OpenAI/Anthropic |
| 1     | `name`     | áno     | Zobrazovaný názov pripojenia                                                                                                                    |
| 2     | `apiKey`   | áno     | API kľúč                                                                                                                                        |
| 3     | `baseUrl`  | nie     | Prepísanie URL adresy pre jednotlivý riadok                                                                                                     |
| 4     | `priority` | nie     | Celé číslo od 1 do 100                                                                                                                          |

Prvý riadok, ktorého prvý stĺpec obsahuje doslovné slovo `provider` (bez ohľadu na veľkosť písmen), sa preskočí ako hlavička. Prázdne riadky a komentáre začínajúce znakom `#` sa preskočia.

Úvodný súbor si môžete stiahnuť z modálneho okna importu (**Stiahnuť šablónu CSV**). Príklad:

```csv
# Import poskytovateľov OmniRoute (pozičné stĺpce)
provider,name,apiKey,baseUrl,priority
openai,Produkčný OpenAI,sk-your-openai-key,,1
```

Vymyslené id, napríklad `openai-compatible-chat-001`, nie je uzlom. API pre takýto riadok vráti hlásenie `Unknown or unsupported provider`; modálne okno ho zobrazí vedľa názvu riadka.

## JSON

Pole JSON objektov s rovnakými poľami (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Na rozdiel od CSV sú kľúče JSON pomenované.

```json
[
  {
    "provider": "openai",
    "name": "Produkčný OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
