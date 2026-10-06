# OmniRoute A2A Server Documentation (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute älykkäänä reititysagenttina

A2A-rajapinnalla on kaksi puolta:

- **JSON-RPC 2.0** osoitteessa `POST /a2a` (ensisijainen aloituspiste, määritelty tiedostossa `src/app/a2a/route.ts`).
- **REST** polun `/api/a2a/*` alla koontinäyttöjä ja työkaluja varten (tila, tehtäväluettelo, peruutus).

Tehtäviä hallinnoi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, oletusarvoinen TTL on 5 minuuttia). Taidot välitetään suoritettaviksi `A2A_SKILL_HANDLERS`-käsittelijöiden kautta tiedostossa `src/lib/a2a/taskExecution.ts`.

## Agentin löytäminen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Palauttaa Agent Card -kuvauksen, joka sisältää OmniRouten ominaisuudet, taidot ja todennusvaatimukset.

Agent Card -kuvauksen `version`-kentän arvo saadaan muuttujasta `process.env.npm_package_version` (katso `src/app/.well-known/agent.json/route.ts:13`), joten se pysyy automaattisesti synkronoituna `package.json`-tiedoston kanssa jokaisessa julkaisussa.

---

## Todennus

Kaikki `/a2a`-pyynnöt edellyttävät API-avainta `Authorization`-otsakkeessa:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jos palvelimelle ei ole määritetty API-avainta, todennus ohitetaan.

## Käyttöönotto

A2A:ta hallitaan **Endpoints → A2A** -valitsimella, ja se on oletusarvoisesti poistettu käytöstä. Kun se on poistettu käytöstä,
`GET /api/a2a/status` ilmoittaa `status: "disabled"` ja `online: false`; JSON-RPC-kutsut osoitteeseen
`POST /a2a` palauttavat HTTP 503 -vastauksen sekä JSON-RPC-virhekoodin `-32000`.

---

## JSON-RPC 2.0 -menetelmät

### `message/send` — Synkroninen suoritus

Lähettää viestin taidolle ja odottaa täydellistä vastausta.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Vastaus:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE-suoratoisto

Toimii samoin kuin `message/send`, mutta palauttaa Server-Sent Events -tapahtumia reaaliaikaista suoratoistoa varten.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE-tapahtumat:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Tehtävän tilan kysely

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tehtävän peruuttaminen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Käytettävissä olevat taidot

OmniRoute tarjoaa 6 A2A-taitoa, jotka on kytketty käsittelijöihin tiedostossa `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kukin taitomoduuli sijaitsee hakemistossa `src/lib/a2a/skills/`.

| Taito                   | ID                   | Kuvaus                                                                                                                                                                          | Tunnisteet                  | Esimerkit                                      |
| :---------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------- | :--------------------------------------------- |
| Älykäs reititys         | `smart-routing`      | Reitittää kehotteen optimaalisen palveluntarjoajan tai yhdistelmän kautta käyttämällä OmniRouten yhdistelmämoottoria ja pisteytystä                                             | reititys, palveluntarjoajat | "Reititä tämä kehote parhaan mallin kautta"    |
| Kiintiöiden hallinta    | `quota-management`   | Raportoi palveluntarjoajakohtaisen kiintiötilan ja auttaa kutsujia päättämään, milloin pyyntöjä tulee rajoittaa tai palveluntarjoajaa vaihtaa                                   | kiintiö, palveluntarjoajat  | "Tarkista palveluntarjoajan anthropic kiintiö" |
| Palveluntarjoajien haku | `provider-discovery` | Luettelee asennetut palveluntarjoajat sekä niiden ominaisuudet, ilmaistason tiedot ja OAuth-tilan                                                                               | palveluntarjoajat, haku     | "Mitä palveluntarjoajia on käytettävissä?"     |
| Kustannusanalyysi       | `cost-analysis`      | Arvioi pyynnön tai keskustelun kustannukset luettelon ja viimeaikaisen käytön perusteella                                                                                       | kustannukset, käyttö        | "Arvioi tämän keskustelun kustannukset"        |
| Terveysraportti         | `health-report`      | Koostaa palveluntarjoajakohtaisesti piirikatkaisijan, jäähdytysajan ja lukituksen tilan                                                                                         | tila, vikasietoisuus        | "Näytä kaikkien palveluntarjoajien tila"       |
| Ominaisuuksien luettelo | `list-capabilities`  | Palauttaa koko 45 kohdan Agent Skills -luettelon (23 API + 21 CLI + 1 määritys) markdown-taulukkona sekä SKILL.md-tiedostojen suorat URL-osoitteet kontekstin lisäämistä varten | luettelo, haku, taidot      | "Luettele kaikki OmniRouten ominaisuudet"      |

> Agent-kortti tulee pitää yhdenmukaisena ajantasaisen 352 palveluntarjoajan luettelon kanssa. Palveluntarjoajien määrät sekä maksuttomuutta ja todennuksen tarpeettomuutta koskevat metatiedot saadaan suorituksenaikaisesta rekisteristä.

### `list-capabilities`-taidon tiedot

`list-capabilities`-taito on erityisen hyödyllinen ulkoisille agenteille, joiden on selvitettävä, mitä OmniRoute tarjoaa, ennen API-kutsujen lähettämistä. Se palauttaa jäsennellyn markdown-taulukkoartefaktin:

```
| ID | Nimi | Luokka | Alue | Päätepisteet/komennot | Suora URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Todennus ja istunnot | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Jokainen rivi sisältää `rawUrl`-sarakkeen, jotta agentit voivat hakea täydellisen SKILL.md-tiedoston välittömästi. `metadata.totalSkills`-kenttä vastaa luettelon kokoa (tällä hetkellä 45). Toteutus: `src/lib/a2a/skills/listCapabilities.ts`. Katso myös [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (täydentävä)

JSON-RPC-päätepiste `/a2a` on ensisijainen A2A-käyttöpiste. Alla olevat REST-päätepisteet tarjoavat täydentävän käyttöliittymän koontinäytöille ja ulkoisille työkaluille:

| Päätepiste                   | Menetelmä | Kuvaus                                                          | Todennus                                     |
| :--------------------------- | :-------- | :-------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET       | Palvelimen tila, rekisteröidyt taidot                           | (julkinen)                                   |
| `/api/a2a/tasks`             | GET       | Tehtävien luettelo suodattimilla                                | hallinta                                     |
| `/api/a2a/tasks/[id]`        | GET       | Hae tehtävä tunnuksen perusteella                               | hallinta                                     |
| `/api/a2a/tasks/[id]/cancel` | POST      | Peruuta käynnissä oleva tehtävä                                 | hallinta                                     |
| `/.well-known/agent.json`    | GET       | Agenttikortti (A2A-haku)                                        | (julkinen, välimuistissa 3600 s)             |
| `/api/a2a/tasks`             | POST      | Saapuva delegointi OmniConductor-kalustolle (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Saapuva Conductor-delegointi (`POST /api/a2a/tasks`):** ulkoiset A2A-agentit delegoivat ohjelmointityötä OmniConductor-kalustolle OmniRouten kautta. Runko: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — vain Conductor-kaluston taidot (Agent Cardissa ilmoitetut) ovat delegoitavissa; `metadata.conductor.repo.url` on pakollinen (kalusto työskentelee git-repositorioiden parissa). Reitti muunnetaan keskittimen `POST /v1/tasks` -pyynnöksi käyttämällä palvelinpuolen `CONDUCTOR_ORCHESTRATOR_TOKEN`-tunnusta (varalla `CONDUCTOR_HUB_TOKEN`) ja palauttaa vastauksen `201 { conductor_task_id, state: "submitted" }`; tehtävien tilat välittyvät takaisin SSE→A2A-peilauksen (RF1) kautta ja näkyvät pyynnöllä `GET /api/a2a/tasks?skill=conductor`.

---

## Uuden taidon lisääminen

1. **Luo taitotiedosto:** `src/lib/a2a/skills/<your-skill>.ts`

   Vie asynkroninen funktio `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Noudata olemassa olevien taitojen, kuten `smartRouting.ts`, rakennetta.

2. **Rekisteröi käsittelijä:** lisää tiedostossa `src/lib/a2a/taskExecution.ts` merkintä kohteeseen `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...olemassa olevat taidot
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Julkaise Agent Cardissa:** lisää tiedoston `src/app/.well-known/agent.json/route.ts` `skills`-taulukkoon:

   ```json
   {
     "id": "your-skill",
     "name": "Taitosi",
     "description": "Lyhyt, käyttäjän tarkoitukseen keskittyvä kuvaus",
     "tags": ["routing", "quota"],
     "examples": ["Esimerkki luonnollisen kielen kutsusta"]
   }
   ```

4. **Kirjoita testit:** `tests/unit/a2a-<your-skill>.test.ts`. Kattaa onnistunut suorituspolku ja virhepolku.

5. **Dokumentoi** uusi taito tämän tiedoston `Available Skills` -taulukossa.

---

## Tehtävien elinaika

Tehtävät vanhenevat `ttlMinutes`-ajan kuluttua (oletus 5 min) — asetus määritetään `A2ATaskManager`-konstruktorissa tiedostossa `src/lib/a2a/taskManager.ts:82`. Voit mukauttaa sitä luomalla oman version `A2ATaskManager`-instanssista ja välittämällä eri arvon (esim. `new A2ATaskManager(15)`, kun elinaika on 15 minuuttia). Taustalla toimiva ajastettu prosessi poistaa vanhentuneet tehtävät 60 sekunnin välein.

---

## Tehtävän elinkaari

```
lähetetty → käsittelyssä → valmis
                         → epäonnistunut
                         → peruutettu
```

- Tehtävät vanhenevat oletusarvoisesti 5 minuutin kuluttua (katso [Tehtävien elinaika](#task-ttl))
- Lopputilat: `completed`, `failed`, `cancelled`
- Tapahtumaloki seuraa jokaista tilasiirtymää

---

## Virhekoodit

| Koodi  | Merkitys                             |
| :----- | :----------------------------------- |
| -32700 | Jäsennysvirhe (virheellinen JSON)    |
| -32600 | Virheellinen pyyntö / Ei valtuutettu |
| -32601 | Menetelmää tai taitoa ei löytynyt    |
| -32602 | Virheelliset parametrit              |
| -32603 | Sisäinen virhe                       |
| -32000 | A2A-päätepiste on poistettu käytöstä |

---

## Integraatioesimerkit

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
