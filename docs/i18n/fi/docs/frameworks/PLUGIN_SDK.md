# OmniRoute Plugin SDK (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Pika-aloitus

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## API-viite

### `definePlugin(def: PluginDefinition): Plugin`

Tehdasfunktio, joka luo oletusarvoilla varustetun Plugin-olion.

**Parametrit:**

- `name` (merkkijono, pakollinen) — Lisäosan nimi kebab-case-muodossa
- `priority` (numero, valinnainen, oletusarvo: 100) — Pienempi arvo suoritetaan ensin
- `enabled` (totuusarvo, valinnainen, oletusarvo: true) — Otetaanko käyttöön käynnistyksen yhteydessä?
- `onRequest` (funktio, valinnainen) — Suoritetaan ennen keskustelunkäsittelijää
- `onResponse` (funktio, valinnainen) — Suoritetaan keskustelunkäsittelijän jälkeen
- `onError` (funktio, valinnainen) — Suoritetaan käsittelijän virheen yhteydessä

### `blockRequest(response?): BlockingHookResult`

Estä pyyntö ja palauta valinnaisesti mukautettu vastaus.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Muokkaa pyynnön runkoa ennen kuin se saavuttaa palveluntarjoajan.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Liitä metatietoja pyynnön kontekstiin.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Lisäosan konteksti (`PluginContext`)

| Kenttä      | Tyyppi                    | Kuvaus                          |
| ----------- | ------------------------- | ------------------------------- |
| `requestId` | `string`                  | Pyynnön yksilöllinen tunniste   |
| `model`     | `string`                  | Pyydetyn mallin nimi            |
| `provider`  | `string`                  | Kohdepalveluntarjoajan tunniste |
| `body`      | `Record<string, unknown>` | Pyynnön runko                   |
| `headers`   | `Record<string, string>`  | Pyynnön otsakkeet               |
| `metadata`  | `Record<string, unknown>` | Muokattavat metatiedot          |
| `timestamp` | `number`                  | Pyynnön aikaleima               |

## Manifesti (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Koukkujen prioriteetti

Koukuille voidaan määrittää prioriteetti (pienempi = suoritetaan ensin):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Tai ne voidaan määrittää yksinkertaisina totuusarvoina (oletusprioriteetti 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Käyttöoikeusjärjestelmä

Liitännäiset suoritetaan eristetyssä virtuaalikoneympäristössä. Ulkoisten resurssien käyttö edellyttää nimenomaisia käyttöoikeuksia:

| Käyttöoikeus | Sallii                                                       |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Vain luku -välityspalvelin kohteelle `process.env`           |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Ilman käyttöoikeutta vastaavat globaalit muuttujat eivät yksinkertaisesti ole käytettävissä eristetyssä ympäristössä.

## Määritysskeema

Määritä mukautettavat asetukset kohdassa `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ulkoisen API:n avain" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Kenttätyypit: `string`, `number`, `boolean`, `select`

Kentän valinnat: `default`, `min`, `max`, `enum`, `description`

Määritysarvot tallennetaan tietokantaan, ja ne ovat käytettävissä hallintapaneelin määrityssivulla.

## Sisäänrakennetut tapahtumat

| Tapahtuma         | Ajankohta                                                      | Hyötykuorma                   |
| ----------------- | -------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Ennen keskustelukäsittelijää                                   | Pyynnön konteksti             |
| `onResponse`      | Keskustelukäsittelijän jälkeen                                 | Vastauksen tiedot             |
| `onError`         | Käsittelijän virheen yhteydessä                                | Virheobjekti                  |
| `onModelSelect`   | Malli valittu reititystä varten                                | Mallin tiedot                 |
| `onComboResolve`  | Yhdistelmäreititys ratkaistu                                   | Yhdistelmän kohteet           |
| `onRateLimit`     | Nopeusrajoitus saavutettu                                      | Rajoituksen tiedot            |
| `onQuotaExhaust`  | Kiintiö käytetty loppuun                                       | Kiintiön tiedot               |
| `onProviderError` | Palveluntarjoaja palautti virheen                              | Virheen tiedot                |
| `onStreamStart`   | SSE-suoratoisto aloitettu                                      | Suoratoiston tiedot           |
| `onStreamEnd`     | SSE-suoratoisto päättynyt                                      | Suoratoiston tilastot         |
| `onInstall`       | Liitännäinen asennettu                                         | `{ name, version, manifest }` |
| `onActivate`      | Liitännäinen aktivoitu                                         | `{ name, version, manifest }` |
| `onDeactivate`    | Liitännäinen poistettu käytöstä                                | `{ name, version, manifest }` |
| `onUninstall`     | Liitännäisen asennus poistettu (ennen tiedostojen poistamista) | `{ name, version, manifest }` |

## Esimerkit

### Pyyntöloki

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Nopeusrajoitin

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minuutti
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### Vastauksen muunnin

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
