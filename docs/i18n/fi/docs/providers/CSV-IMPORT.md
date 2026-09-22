# Import providers from a CSV or JSON file (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Hallintapaneeli → Palveluntarjoajat → **Tuo tiedostosta** luo API-avainyhteyksiä CSV- tai JSON-luettelosta. Jokainen rivi voi kohdistua eri palveluntarjoajaan. Osittainen epäonnistuminen kuuluu toimintaperiaatteeseen: kelvolliset rivit tuodaan, vaikka muiden tuonti epäonnistuisi, ja modaali-ikkunassa näytetään, miksi epäonnistuneet rivit hylättiin.

Tämä tuonti **ei** luo uusia OpenAI/Anthropic-yhteensopivia päätepistesolmuja. Luo ne ensin (Hallintapaneeli → Palveluntarjoajat → Lisää OpenAI-yhteensopiva tai `omniroute nodes add`) ja tuo sitten rivit, joiden `provider`-sarake sisältää kyseisen solmun tunnuksen. Rivikohtainen `baseUrl` voi silti ohittaa solmun URL-osoitteen.

## CSV (sijaintiin perustuva)

Sarakkeiden nimet ovat vain kosmeettisia. Jäsennin jakaa jokaisen rivin osiin ja purkaa arvot niiden indeksin perusteella:

| Indeksi | Kenttä     | Pakollinen | Huomautukset                                                                                                                                           |
| ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0       | `provider` | kyllä      | Olemassa olevan hallitun palveluntarjoajan tunnus (`openai`, `anthropic`, …) **tai** jo rekisteröidyn OpenAI/Anthropic-yhteensopivan **solmun** tunnus |
| 1       | `name`     | kyllä      | Yhteyden näyttönimi                                                                                                                                    |
| 2       | `apiKey`   | kyllä      | API-avain                                                                                                                                              |
| 3       | `baseUrl`  | ei         | Rivikohtainen URL-osoitteen ohitus                                                                                                                     |
| 4       | `priority` | ei         | Kokonaisluku väliltä 1–100                                                                                                                             |

Ensimmäinen rivi, jonka ensimmäisessä sarakkeessa on sana `provider` sellaisenaan (kirjainkoosta riippumatta), ohitetaan otsikkorivinä. Tyhjät rivit ja `#`-kommentit ohitetaan.

Lataa aloitustiedosto tuontimodaalista (**Lataa CSV-malli**). Esimerkki:

```csv
# OmniRoute-palveluntarjoajien tuonti (sijaintiin perustuvat sarakkeet)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Keksitty tunnus, kuten `openai-compatible-chat-001`, ei ole solmu. API palauttaa kyseiselle riville virheen `Unknown or unsupported provider`; modaali-ikkuna näyttää sen rivin nimen vieressä.

## JSON

JSON-taulukko objekteja, joissa on samat kentät (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). CSV:stä poiketen JSON-avaimet on nimetty.

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
