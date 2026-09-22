# Cloud Agents (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Fonte fidedigna:** `src/lib/cloudAgent/` e `src/app/api/v1/agents/tasks/`
> **Última atualização:** 2026-06-28 — v3.8.40 (atualização do frontmatter; 4 agentes, incluindo cursor-cloud)

O OmniRoute orquestra agentes de programação de terceiros alojados na cloud (Codex Cloud, Cursor,
Devin, Jules) sob a forma de tarefas de longa duração. Cada agente é encapsulado por uma interface uniforme para que
os clientes possam submeter um pedido + URL de repositório e receber resultados sem terem de lidar com
APIs específicas de cada fornecedor.

Uma tarefa de Agente Cloud **não** é uma conclusão de chat normal. É uma unidade de trabalho
duradoura e composta por várias etapas, que pode demorar entre minutos e horas, pode produzir um Pull Request como
artefacto e suporta mensagens de seguimento e (em alguns fornecedores) pontos de controlo para aprovação do plano.

![Ciclo de vida de uma tarefa de Agente Cloud](../diagrams/exported/cloud-agent-flow.svg)

> Fonte: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agentes suportados

| ID do fornecedor | Classe             | Código-fonte                          | URL base a montante                     | Aprovação do plano |
| ---------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`          | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Sim                |
| `devin`          | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Sim                |
| `codex-cloud`    | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Não (automática)   |
| `cursor-cloud`   | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Não (automática)   |

Registo: `src/lib/cloudAgent/registry.ts` — exporta `getAgent(providerId)`,
`getAvailableAgents()` e `isCloudAgentProvider(providerId)`. O registo é um
`Record<string, CloudAgentBase>` simples, mantido em memória e preenchido durante o carregamento do módulo.

## Arquitetura

```
Cliente (Painel / CLI / API)
  → POST /api/v1/agents/tasks (autenticação de gestão obrigatória)
    → validação de CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ obtém dados de getProviderConnections({ provider, isActive: true })
         (primeiro apiKey, com recurso a accessToken como alternativa)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST para a API do fornecedor a montante
      └─ devolve CloudAgentTask com id interno + externalId
    → insertCloudAgentTask(...) em cloud_agent_tasks (SQLite)

Consulta periódica (sincronização diferida durante a leitura):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // atualiza o estado + as atividades
    → updateCloudAgentTask(...) com o novo estado, resultado, completed_at
    → devolve a tarefa serializada

Interações:
  POST /api/v1/agents/tasks/[id]  corpo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        para "approve"
    → agent.sendMessage(externalId, message, credentials) para "message"
    → o estado muda para "cancelled"                    para "cancel" (apenas local)
```

A sincronização é **diferida**: o estado é atualizado a partir do serviço a montante em cada `GET /tasks/[id]`.
Não existe nenhum processo de consulta em segundo plano. Os painéis que necessitem de um estado atualizado devem consultar o endpoint
GET num intervalo adequado.

## Interface `CloudAgentBase`

Origem: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heurística de cadeia de origem → enumeração
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` lança intencionalmente uma exceção — o Codex Cloud cria planos automaticamente e não tem
nenhuma etapa de aprovação. `CodexCloudAgent.listSources` devolve `[]`.

`CursorCloudAgent` controla os Background / Cloud Agents do Cursor através da respetiva API REST
oficial (`api.cursor.com/v0`) com uma **chave de API de utilizador ou de conta de serviço** — a alternativa
primária e mais segura à reutilização da sessão OAuth do Cursor IDE (fornecedor `cursor`,
que inclui um aviso sobre o risco de banimento). É um adaptador REST simples (sem dependência
nativa de `@cursor/sdk`). `approvePlan` lança uma exceção (os agentes Cursor são executados de forma autónoma); `listSources` lista
os repositórios acessíveis através da chave. O Cursor devolve enumerações de estado em maiúsculas
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), explicitamente mapeadas para o
`CloudAgentStatus` partilhado. `baseUrl` pode ser substituído por credencial, permitindo
corrigir a versão/o caminho da API sem alterar o código.

## Tipos de Domínio

Origem: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // tem de ser um URL válido
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // segundos, inteiro positivo
  cost?: number; // número de vírgula flutuante positivo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // identificador interno `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // identificador do fornecedor de origem
  status: CloudAgentStatus;
  prompt: string; // 1..10000 caracteres
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

Os esquemas de validação (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) são
exportados juntamente com os tipos e utilizados pelos processadores de rotas.

## Base de dados

Origem: `src/lib/cloudAgent/db.ts` — a tabela é criada de forma diferida através de
`createCloudAgentTaskTable()` (também chamada a partir de `src/lib/cloudAgent/index.ts` durante
a importação do módulo).

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

`updateCloudAgentTask` aplica uma **lista de colunas permitidas** para impedir a injeção de SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Qualquer outra chave na atualização parcial é silenciosamente descartada.

## API REST — Ciclo de vida das tarefas

**Autenticação:** Todos os endpoints `/api/v1/agents/tasks*` exigem **autenticação de gestão**
(`requireCloudAgentManagementAuth` envolve `requireManagementAuth` de
`src/lib/api/requireManagementAuth`). Isto é aplicado após o commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Método  | Caminho                       | Finalidade                                                         |
| ------- | ----------------------------- | ------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | Pedido de preflight CORS                                           |
| GET     | `/api/v1/agents/tasks`        | Listar tarefas (filtro: `provider`, `status`, `limit≤500`)         |
| POST    | `/api/v1/agents/tasks`        | Criar tarefa (envia para o serviço externo + guarda)               |
| DELETE  | `/api/v1/agents/tasks?id=...` | Eliminar tarefa pelo id da consulta (**não** cancela externamente) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Pedido de preflight CORS                                           |
| GET     | `/api/v1/agents/tasks/[id]`   | Ler tarefa + sincronizar de forma diferida o estado externo        |
| POST    | `/api/v1/agents/tasks/[id]`   | Ação: `approve` / `message` / `cancel`                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Eliminar tarefa pelo id do caminho                                 |

### Criar uma tarefa

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

Resposta `201`:

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

### Aprovar um plano

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Enviar uma mensagem de seguimento

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Cancelar (apenas o estado local)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` altera o `status` para `"cancelled"` na base de dados local, mas **não** chama o
fornecedor externo — não existe um RPC de interrupção em `CloudAgentBase`. Para interromper a faturação
externa, termine a tarefa na consola do próprio fornecedor.

## API REST — Infraestrutura de Fornecedores Cloud

Estes endpoints auxiliares em `src/app/api/cloud/` são utilizados por clientes remotos
(a CLI, a aplicação Electron ou workers de sincronização) para ler metadados de ligação
do fornecedor e resolver aliases de modelos. São autenticados com uma **chave de API normal**
(através de `validateApiKey`), e não com a autenticação de gestão utilizada pelos endpoints de tarefas.

| Método | Caminho                         | Finalidade                                                                            |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validar a chave de API e devolver metadados de ligação ocultados + aliases de modelos |
| PUT    | `/api/cloud/credentials/update` | Atualizar `accessToken` / `refreshToken` / `expiresAt`                                |
| POST   | `/api/cloud/model/resolve`      | Resolver um alias de modelo para `{ provider, model }`                                |
| GET    | `/api/cloud/models/alias`       | Listar todos os aliases de modelos                                                    |
| PUT    | `/api/cloud/models/alias`       | Definir um alias de modelo (e sincronizar automaticamente com a Cloud, se ativado)    |

`/api/cloud/auth` nunca devolve `apiKey` / `accessToken` / `refreshToken` em bruto.
Devolve `hasApiKey`, `hasAccessToken`, `hasRefreshToken` e uma pré-visualização ocultada
(`maskedApiKey`: primeiros 4 + `****` + últimos 4).

## Resolução de Credenciais

`getCloudAgentCredentials(providerId)` em `src/lib/cloudAgent/api.ts`:

1. Carrega as ligações ativas do fornecedor através de `getProviderConnections({ provider: providerId, isActive: true })`.
2. Para cada ligação, dá preferência a `apiKey` (sem espaços em branco no início e no fim). Como alternativa, utiliza `accessToken`.
3. Devolve o primeiro token não vazio encapsulado como `{ apiKey: token }`.
4. Devolve `null` se não for encontrado nenhum token utilizável — a API responde com `400` e
   `"No active credentials configured for cloud agent provider: <id>"`.

Isto significa que os Agentes Cloud reutilizam a mesma tabela de Ligações de Fornecedores que os
fornecedores de LLM normais. Para ativar o Jules, crie uma ligação ativa com `provider: "jules"`
e uma `apiKey` preenchida.

## Painel

Origem: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Uma página React com `"use client"` que:

- Lista tarefas (consultadas periodicamente através de `GET /api/v1/agents/tasks`).
- Submete novas tarefas através de um formulário que corresponde a `CreateCloudAgentTaskSchema`.
- Apresenta distintivos de estado (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) e compõe a cronologia de `activities[]`.
- Apresenta `result.prUrl` / `commitMessage` / `summary` quando `status === "completed"`.

## Integração com A2A

Os Agentes Cloud podem ser expostos como competências A2A através do registo de uma competência A2A que delegue
o respetivo processador `tasks/send` em `getAgent(...).createTask(...)` e traduza os eventos de estado
das tarefas A2A para o protocolo JSON-RPC 2.0. Consulte [A2A-SERVER.md](./A2A-SERVER.md).

## Adicionar um Novo Agente Cloud

1. Crie `src/lib/cloudAgent/agents/<name>.ts` que estenda `CloudAgentBase`.
2. Implemente `createTask`, `getStatus`, `approvePlan` (ou lance uma exceção se não for aplicável),
   `sendMessage`, `listSources`. Utilize `this.mapStatus(...)` para a normalização de estados.
3. Registe-o em `src/lib/cloudAgent/registry.ts` com um `providerId` estável.
4. Estenda a união de literais `providerId` em `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` e `CreateCloudAgentTaskSchema`).
5. Adicione o fornecedor a `src/shared/constants/providers.ts` se este necessitar de um registo
   de ligação. Os fornecedores baseados em OAuth também necessitam de `src/lib/oauth/providers/`.
6. Adicione testes em `tests/unit/cloud-agent-*.test.ts`.
7. Atualize este documento e a constante `CLOUD_AGENTS` do painel.

## Configuração

| Variável de ambiente | Finalidade                                                                   |
| -------------------- | ---------------------------------------------------------------------------- |
| `DATA_DIR`           | Localização da base de dados SQLite que contém `cloud_agent_tasks`           |
| `JWT_SECRET`         | Necessário para autenticação de gestão nos endpoints de tarefas              |
| `API_KEY_SECRET`     | Necessário para encriptar em repouso as credenciais de ligação ao fornecedor |

Atualmente, não existem variáveis de ambiente específicas do Cloud-Agent — todos os segredos se encontram na
tabela `provider_connections`.

## Ver também

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Código-fonte: `src/lib/cloudAgent/`
- Rotas: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Painel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
