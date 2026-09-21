# Cloud Agents (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Totuuden lähde:** `src/lib/cloudAgent/` ja `src/app/api/v1/agents/tasks/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40 (frontmatter-tietojen päivitys; 4 agenttia, mukaan lukien cursor-cloud)

OmniRoute orkestroi kolmansien osapuolten pilvipalveluissa toimivia koodausagentteja (Codex Cloud, Cursor,
Devin, Jules) pitkäkestoisina tehtävinä. Jokainen agentti on kääritty yhtenäisen rajapinnan taakse, jotta
asiakkaat voivat lähettää kehotteen + repositorion URL-osoitteen ja vastaanottaa tulokset ilman
palveluntarjoajakohtaisten API-rajapintojen käsittelyä.

Cloud Agent -tehtävä **ei** ole tavallinen keskustelun täydennyspyyntö. Se on pysyvä, monivaiheinen
työyksikkö, jonka suorittaminen voi kestää minuuteista tunteihin, joka voi tuottaa Pull Requestin
artefaktinaan ja joka tukee jatkoviestejä sekä (joillakin palveluntarjoajilla) suunnitelman hyväksyntävaiheita.

![Cloud Agent -tehtävän elinkaari](../diagrams/exported/cloud-agent-flow.svg)

> Lähde: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Tuetut agentit

| Palveluntarjoajan tunnus | Luokka             | Lähde                                 | Ylävirran perus-URL-osoite              | Suunnitelman hyväksyntä |
| ------------------------ | ------------------ | ------------------------------------- | --------------------------------------- | ----------------------- |
| `jules`                  | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Kyllä                   |
| `devin`                  | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Kyllä                   |
| `codex-cloud`            | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ei (automaattinen)      |
| `cursor-cloud`           | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ei (automaattinen)      |

Rekisteri: `src/lib/cloudAgent/registry.ts` — vie funktiot `getAgent(providerId)`,
`getAvailableAgents()` ja `isCloudAgentProvider(providerId)`. Rekisteri on tavallinen
muistinsisäinen `Record<string, CloudAgentBase>`, joka täytetään moduulia ladattaessa.

## Arkkitehtuuri

```
Asiakas (hallintapaneeli / CLI / API)
  → POST /api/v1/agents/tasks (hallinnan todennus vaaditaan)
    → CreateCloudAgentTaskSchema-validointi (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ noutaa kohteesta getProviderConnections({ provider, isActive: true })
         (ensin apiKey, varalla accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST ylävirran palveluntarjoajan API-rajapintaan
      └─ palauttaa CloudAgentTask-olion, joka sisältää sisäisen id:n + externalId:n
    → insertCloudAgentTask(...) cloud_agent_tasks-tauluun (SQLite)

Kysely (laiska synkronointi lukemisen yhteydessä):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // päivittää tilan + aktiviteetit
    → updateCloudAgentTask(...) uudella tilalla, tuloksella ja completed_at-arvolla
    → palauttaa sarjallistetun tehtävän

Vuorovaikutukset:
  POST /api/v1/agents/tasks/[id]  runko: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        toiminnolle "approve"
    → agent.sendMessage(externalId, message, credentials) toiminnolle "message"
    → tila vaihtuu arvoon "cancelled"                   toiminnolle "cancel" (vain paikallinen)
```

Synkronointi on **laiskaa**: tila päivitetään ylävirrasta jokaisella `GET /tasks/[id]`-pyynnöllä.
Taustalla toimivaa kyselymekanismia ei ole. Ajantasaista tilaa tarvitsevien hallintapaneelien tulee kutsua GET-
päätepistettä sopivin väliajoin.

## `CloudAgentBase`-rajapinta

Lähde: `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // heuristinen palveluntarjoajan merkkijono → enumeraatio
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` aiheuttaa tarkoituksella poikkeuksen — Codex Cloud luo suunnitelmat automaattisesti, eikä siinä ole hyväksyntävaihetta. `CodexCloudAgent.listSources` palauttaa arvon `[]`.

`CursorCloudAgent` ohjaa Cursorin Background / Cloud Agents -agentteja virallisen REST-rajapinnan (`api.cursor.com/v0`) kautta käyttäen **käyttäjän tai palvelutilin API-avainta** — tämä on turvallisempi, ensisijaisen osapuolen vaihtoehto Cursor IDE:n OAuth-istunnon uudelleenkäytölle (palveluntarjoaja `cursor`, johon liittyy varoitus porttikiellon riskistä). Se on tavallinen REST-sovitin (ei natiivia `@cursor/sdk`-riippuvuutta). `approvePlan` aiheuttaa poikkeuksen (Cursor-agentit toimivat itsenäisesti); `listSources` luettelee avaimella käytettävissä olevat tietovarastot. Cursor palauttaa SUURAAKKOSIN kirjoitetut tilaenumeraatiot (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), jotka yhdistetään eksplisiittisesti yhteiseen `CloudAgentStatus`-enumeraatioon. `baseUrl` voidaan ohittaa tunnistetietokohtaisesti, joten API-versio tai -polku voidaan korjata ilman koodimuutosta.

## Toimialatyypit

Lähde: `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // on oltava kelvollinen URL-osoite
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunteja, positiivinen kokonaisluku
  cost?: number; // positiivinen liukuluku
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // sisäinen `task_...`-tunniste
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ulkoisen palveluntarjoajan tunniste
  status: CloudAgentStatus;
  prompt: string; // 1..10000 merkkiä
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

Validointiskeemat (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) viedään tyyppien rinnalla, ja reittien käsittelijät käyttävät niitä.

## Tietokanta

Lähde: `src/lib/cloudAgent/db.ts` — taulu luodaan tarvittaessa laiskasti
`createCloudAgentTaskTable()`-funktion avulla (sitä kutsutaan myös tiedostosta `src/lib/cloudAgent/index.ts`
moduulin tuonnin yhteydessä).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` käyttää SQL-injektion estämiseksi **sarakkeiden sallittujen arvojen luetteloa**:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Kaikki muut osittaisen päivityksen avaimet hylätään ilman ilmoitusta.

## REST API — tehtävän elinkaari

**Todennus:** Kaikki `/api/v1/agents/tasks*`-päätepisteet edellyttävät **hallintatodennusta**
(`requireCloudAgentManagementAuth` ympäröi tiedoston
`src/lib/api/requireManagementAuth` `requireManagementAuth`-toiminnon). Tämä vaatimus on ollut voimassa commitiin `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_) tehdystä muutoksesta lähtien.

| Menetelmä | Polku                         | Tarkoitus                                                                                    |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| OPTIONS   | `/api/v1/agents/tasks`        | CORS-esipyyntö                                                                               |
| GET       | `/api/v1/agents/tasks`        | Listaa tehtävät (suodattimet: `provider`, `status`, `limit≤500`)                             |
| POST      | `/api/v1/agents/tasks`        | Luo tehtävä (lähettää sen ulkoiseen palveluun ja tallentaa)                                  |
| DELETE    | `/api/v1/agents/tasks?id=...` | Poista tehtävä kyselyparametrin id:n perusteella (ei **peruuta** sitä ulkoisessa palvelussa) |
| OPTIONS   | `/api/v1/agents/tasks/[id]`   | CORS-esipyyntö                                                                               |
| GET       | `/api/v1/agents/tasks/[id]`   | Lue tehtävä ja synkronoi sen tila laiskasti ulkoisesta palvelusta                            |
| POST      | `/api/v1/agents/tasks/[id]`   | Toiminto: `approve` / `message` / `cancel`                                                   |
| DELETE    | `/api/v1/agents/tasks/[id]`   | Poista tehtävä polussa olevan id:n perusteella                                               |

### Tehtävän luominen

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

Vastaus `201`:

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### Suunnitelman hyväksyminen

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Jatkoviesin lähettäminen

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Peruuttaminen (vain paikallinen tila)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` vaihtaa paikallisen tietokannan `status`-arvoksi `"cancelled"`, mutta **ei** kutsu
ulkoista palveluntarjoajaa — `CloudAgentBase` ei sisällä keskeytyksen RPC-kutsua. Lopeta tehtävä
palveluntarjoajan omassa hallintakonsolissa, jotta ulkoisen palvelun laskutus päättyy.

## REST API — pilvipalveluntarjoajien integrointi

Näitä hakemiston `src/app/api/cloud/` alla olevia avustavia päätepisteitä käyttävät etäasiakkaat
(CLI, Electron-sovellus tai synkronointityöntekijät) palveluntarjoajan yhteysmetatietojen
lukemiseen ja mallialiasten selvittämiseen. Todennus tehdään **tavallisella API-avaimella**
(`validateApiKey`-toiminnon kautta), ei tehtäväpäätepisteiden käyttämällä hallintatodennuksella.

| Menetelmä | Polku                           | Tarkoitus                                                                 |
| --------- | ------------------------------- | ------------------------------------------------------------------------- |
| POST      | `/api/cloud/auth`               | Validoi API-avain ja palauta peitetyt yhteysmetatiedot sekä mallialiakset |
| PUT       | `/api/cloud/credentials/update` | Päivitä `accessToken` / `refreshToken` / `expiresAt`                      |
| POST      | `/api/cloud/model/resolve`      | Selvitä mallialias muotoon `{ provider, model }`                          |
| GET       | `/api/cloud/models/alias`       | Listaa kaikki mallialiakset                                               |
| PUT       | `/api/cloud/models/alias`       | Aseta mallialias (ja synkronoi se automaattisesti Cloudiin, jos käytössä) |

`/api/cloud/auth` ei koskaan palauta käsittelemättömiä `apiKey`- / `accessToken`- / `refreshToken`-arvoja. Se
palauttaa arvot `hasApiKey`, `hasAccessToken`, `hasRefreshToken` sekä peitetyn esikatselun
(`maskedApiKey`: ensimmäiset 4 + `****` + viimeiset 4).

## Tunnistetietojen selvittäminen

`getCloudAgentCredentials(providerId)` tiedostossa `src/lib/cloudAgent/api.ts`:

1. Lataa aktiiviset palveluntarjoajayhteydet kutsulla `getProviderConnections({ provider: providerId, isActive: true })`.
2. Suosii jokaiselle yhteydelle `apiKey`-arvoa (josta ympäröivät välilyönnit on poistettu). Käyttää vaihtoehtoisesti `accessToken`-arvoa.
3. Palauttaa ensimmäisen ei-tyhjän tunnisteen muodossa `{ apiKey: token }`.
4. Palauttaa `null`, jos käyttökelpoista tunnistetta ei löydy — API vastaa tilakoodilla `400` ja viestillä
   `"No active credentials configured for cloud agent provider: <id>"`.

Tämä tarkoittaa, että Cloud Agentit käyttävät samaa Provider Connection -taulua kuin tavalliset LLM-palveluntarjoajat.
Ota Jules käyttöön luomalla aktiivinen yhteys, jossa `provider: "jules"`
ja `apiKey` on määritetty.

## Hallintapaneeli

Lähde: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React-sivu, jossa on `"use client"` ja joka:

- Listaa tehtävät (hakemalla niitä säännöllisesti komennolla `GET /api/v1/agents/tasks`).
- Lähettää uusia tehtäviä lomakkeella, joka vastaa `CreateCloudAgentTaskSchema`-rakennetta.
- Näyttää tilamerkinnät (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) ja renderöi `activities[]`-aikajanan.
- Näyttää arvot `result.prUrl` / `commitMessage` / `summary`, kun `status === "completed"`.

## Integrointi A2A:n kanssa

Cloud Agentit voidaan tarjota A2A-taitoina rekisteröimällä A2A-taito, joka delegoi
`tasks/send`-käsittelijänsä kutsulle `getAgent(...).createTask(...)` ja muuntaa A2A-tehtävien
tilatapahtumat JSON-RPC 2.0 -protokollaan. Katso [A2A-SERVER.md](./A2A-SERVER.md).

## Uuden Cloud Agentin lisääminen

1. Luo `CloudAgentBase`-luokan laajentava tiedosto `src/lib/cloudAgent/agents/<name>.ts`.
2. Toteuta `createTask`, `getStatus`, `approvePlan` (tai heitä poikkeus, jos se ei sovellu),
   `sendMessage`, `listSources`. Käytä tilojen normalisointiin `this.mapStatus(...)`-metodia.
3. Rekisteröi agentti tiedostossa `src/lib/cloudAgent/registry.ts` vakaan `providerId`-arvon alle.
4. Laajenna `providerId`-literaalien unionityyppiä tiedostossa `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` ja `CreateCloudAgentTaskSchema`).
5. Lisää palveluntarjoaja tiedostoon `src/shared/constants/providers.ts`, jos se tarvitsee yhteystietueen.
   OAuth-pohjaiset palveluntarjoajat tarvitsevat myös toteutuksen hakemistoon `src/lib/oauth/providers/`.
6. Lisää testit tiedostoihin `tests/unit/cloud-agent-*.test.ts`.
7. Päivitä tämä dokumentti ja hallintapaneelin `CLOUD_AGENTS`-vakio.

## Määritykset

| Ympäristömuuttuja | Tarkoitus                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| `DATA_DIR`        | `cloud_agent_tasks`-taulun sisältävän SQLite-tietokannan sijainti         |
| `JWT_SECRET`      | Vaaditaan tehtäväpäätepisteiden hallinnan todentamiseen                   |
| `API_KEY_SECRET`  | Vaaditaan palveluntarjoajayhteyksien tunnistetietojen salaamiseen levossa |

Cloud Agentiin liittyviä ympäristömuuttujia ei tällä hetkellä ole — kaikki salaisuudet ovat
`provider_connections`-taulussa.

## Katso myös

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Lähdekoodi: `src/lib/cloudAgent/`
- Reitit: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Hallintapaneeli: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
