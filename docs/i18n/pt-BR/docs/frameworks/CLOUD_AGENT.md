# Cloud Agents (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Fonte da verdade:** `src/lib/cloudAgent/` e `src/app/api/v1/agents/tasks/`
> **Última atualização:** 2026-06-28 — v3.8.40 (atualização do frontmatter; 4 agentes, incluindo cursor-cloud)

O OmniRoute orquestra agentes de programação de terceiros hospedados na nuvem (Codex Cloud, Cursor,
Devin, Jules) como tarefas de longa duração. Cada agente é encapsulado por uma interface uniforme para que
os clientes possam enviar um prompt + URL do repositório e receber resultados sem precisar lidar com
APIs específicas de cada provedor.

Uma tarefa de Agente de Nuvem **não** é uma conclusão de chat comum. Ela é uma unidade de trabalho
durável e composta por várias etapas, que pode levar de minutos a horas, produzir um Pull Request como
artefato e oferecer suporte a mensagens de acompanhamento e (em alguns provedores) etapas de aprovação do plano.

![Ciclo de vida de uma tarefa de Agente de Nuvem](../diagrams/exported/cloud-agent-flow.svg)

> Fonte: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agentes compatíveis

| ID do provedor | Classe             | Código-fonte                          | URL base upstream                       | Aprovação do plano |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Sim                |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Sim                |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Não (automática)   |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Não (automática)   |

Registro: `src/lib/cloudAgent/registry.ts` — exporta `getAgent(providerId)`,
`getAvailableAgents()` e `isCloudAgentProvider(providerId)`. O registro é um
`Record<string, CloudAgentBase>` simples, mantido em memória e preenchido no carregamento do módulo.

## Arquitetura

```
Cliente (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (autenticação de gerenciamento obrigatória)
    → validação por CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ obtém de getProviderConnections({ provider, isActive: true })
         (apiKey primeiro, com fallback para accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST para a API upstream do provedor
      └─ retorna CloudAgentTask com id interno + externalId
    → insertCloudAgentTask(...) em cloud_agent_tasks (SQLite)

Sondagem (sincronização tardia durante a leitura):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // atualiza o status + as atividades
    → updateCloudAgentTask(...) com novo status, resultado e completed_at
    → retorna a tarefa serializada

Interações:
  POST /api/v1/agents/tasks/[id]  corpo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        para "approve"
    → agent.sendMessage(externalId, message, credentials) para "message"
    → o status muda para "cancelled"                    para "cancel" (apenas local)
```

A sincronização é **tardia**: o status é atualizado a partir do upstream a cada `GET /tasks/[id]`.
Não há nenhum processo de sondagem em segundo plano. Dashboards que precisem de um estado atualizado devem consultar o endpoint GET
em um intervalo adequado.

## Interface `CloudAgentBase`

Fonte: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // string heurística do provedor → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` lança uma exceção intencionalmente — o Codex Cloud cria planos automaticamente e
não possui uma etapa de aprovação. `CodexCloudAgent.listSources` retorna `[]`.

`CursorCloudAgent` opera os Background / Cloud Agents do Cursor por meio de sua API REST
oficial (`api.cursor.com/v0`) com uma **chave de API de usuário ou de conta de serviço** — a alternativa
primária e mais segura à reutilização da sessão OAuth do Cursor IDE (provedor `cursor`,
que inclui um aviso de risco de banimento). Ele é um adaptador REST simples (sem dependência
nativa de `@cursor/sdk`). `approvePlan` lança uma exceção (os agentes do Cursor são executados
de forma autônoma); `listSources` lista os repositórios acessíveis pela chave. O Cursor retorna enums
de status em letras maiúsculas (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), mapeados explicitamente para o
`CloudAgentStatus` compartilhado. `baseUrl` pode ser sobrescrita por credencial para que a versão/o caminho
da API possa ser corrigido sem uma alteração no código.

## Tipos de domínio

Fonte: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // deve ser uma URL válida
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // segundos, inteiro positivo
  cost?: number; // número de ponto flutuante positivo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // id interno `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id do provedor externo
  status: CloudAgentStatus;
  prompt: string; // de 1 a 10.000 caracteres
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
exportados juntamente com os tipos e são usados pelos manipuladores de rota.

## Banco de dados

Fonte: `src/lib/cloudAgent/db.ts` — a tabela é criada sob demanda por meio de
`createCloudAgentTaskTable()` (também chamada em `src/lib/cloudAgent/index.ts` durante
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

`updateCloudAgentTask` impõe uma **lista de colunas permitidas** para evitar injeção de SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Qualquer outra chave na atualização parcial é descartada silenciosamente.

## API REST — Ciclo de vida da tarefa

**Autenticação:** Todos os endpoints `/api/v1/agents/tasks*` exigem **autenticação de gerenciamento**
(`requireCloudAgentManagementAuth` encapsula `requireManagementAuth` de
`src/lib/api/requireManagementAuth`). Isso é aplicado após o commit `588a0333`
(_"fix(auth): exigir autenticação de gerenciamento para APIs de agente e cooldown"_).

| Método  | Caminho                       | Finalidade                                                       |
| ------- | ----------------------------- | ---------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Preflight de CORS                                                |
| GET     | `/api/v1/agents/tasks`        | Listar tarefas (filtros: `provider`, `status`, `limit≤500`)      |
| POST    | `/api/v1/agents/tasks`        | Criar tarefa (envia ao provedor upstream + persiste)             |
| DELETE  | `/api/v1/agents/tasks?id=...` | Excluir tarefa pelo id da query (**não** cancela no upstream)    |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Preflight de CORS                                                |
| GET     | `/api/v1/agents/tasks/[id]`   | Ler tarefa + sincronizar status sob demanda a partir do upstream |
| POST    | `/api/v1/agents/tasks/[id]`   | Ação: `approve` / `message` / `cancel`                           |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Excluir tarefa pelo id do caminho                                |

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

### Enviar uma mensagem de acompanhamento

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Cancelar (somente status local)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` altera o `status` para `"cancelled"` no banco de dados local, mas **não** chama o
provedor upstream — não há RPC de cancelamento em `CloudAgentBase`. Para interromper a cobrança
no upstream, encerre a tarefa no console do próprio provedor.

## API REST — Infraestrutura de Provedores de Nuvem

Esses endpoints auxiliares em `src/app/api/cloud/` são usados por clientes remotos
(a CLI, o aplicativo Electron ou workers de sincronização) para ler metadados de conexão
de provedores e resolver aliases de modelos. Eles são autenticados com uma **chave de API comum**
(via `validateApiKey`), e não com a autenticação de gerenciamento usada pelos endpoints de tarefas.

| Método | Caminho                         | Finalidade                                                                              |
| ------ | ------------------------------- | --------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validar a chave de API e retornar metadados de conexão mascarados + aliases de modelos  |
| PUT    | `/api/cloud/credentials/update` | Atualizar `accessToken` / `refreshToken` / `expiresAt`                                  |
| POST   | `/api/cloud/model/resolve`      | Resolver um alias de modelo para `{ provider, model }`                                  |
| GET    | `/api/cloud/models/alias`       | Listar todos os aliases de modelos                                                      |
| PUT    | `/api/cloud/models/alias`       | Definir um alias de modelo (e sincronizá-lo automaticamente com a nuvem, se habilitado) |

`/api/cloud/auth` nunca retorna `apiKey` / `accessToken` / `refreshToken` sem mascaramento. Ele
retorna `hasApiKey`, `hasAccessToken`, `hasRefreshToken` e uma prévia mascarada
(`maskedApiKey`: os 4 primeiros + `****` + os 4 últimos).

## Resolução de Credenciais

`getCloudAgentCredentials(providerId)` em `src/lib/cloudAgent/api.ts`:

1. Carrega conexões de provedores ativas por meio de `getProviderConnections({ provider: providerId, isActive: true })`.
2. Para cada conexão, dá preferência a `apiKey` (sem espaços em branco nas extremidades). Se não estiver disponível, usa `accessToken`.
3. Retorna o primeiro token não vazio encapsulado como `{ apiKey: token }`.
4. Retorna `null` se nenhum token utilizável for encontrado — a API responde com `400` e
   `"No active credentials configured for cloud agent provider: <id>"`.

Isso significa que os Agentes de Nuvem reutilizam a mesma tabela de Conexões de Provedores que os provedores
de LLM comuns. Para habilitar o Jules, crie uma conexão ativa com `provider: "jules"`
e uma `apiKey` preenchida.

## Painel

Fonte: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Uma página React `"use client"` que:

- Lista tarefas (consultadas periodicamente por meio de `GET /api/v1/agents/tasks`).
- Envia novas tarefas por meio de um formulário mapeado para `CreateCloudAgentTaskSchema`.
- Exibe indicadores de status (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) e renderiza a linha do tempo de `activities[]`.
- Exibe `result.prUrl` / `commitMessage` / `summary` quando `status === "completed"`.

## Integração com A2A

Os Agentes de Nuvem podem ser expostos como habilidades A2A registrando-se uma habilidade A2A que delega
seu manipulador `tasks/send` para `getAgent(...).createTask(...)` e converte os eventos de status
das tarefas A2A para o protocolo JSON-RPC 2.0. Consulte [A2A-SERVER.md](./A2A-SERVER.md).

## Adição de um Novo Agente de Nuvem

1. Crie `src/lib/cloudAgent/agents/<name>.ts` estendendo `CloudAgentBase`.
2. Implemente `createTask`, `getStatus`, `approvePlan` (ou lance uma exceção se não for aplicável),
   `sendMessage`, `listSources`. Use `this.mapStatus(...)` para normalizar o status.
3. Registre-o em `src/lib/cloudAgent/registry.ts` com um `providerId` estável.
4. Estenda a união de literais de `providerId` em `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` e `CreateCloudAgentTaskSchema`).
5. Adicione o provedor a `src/shared/constants/providers.ts` caso ele precise de um registro
   de conexão. Provedores baseados em OAuth também precisam de `src/lib/oauth/providers/`.
6. Adicione testes em `tests/unit/cloud-agent-*.test.ts`.
7. Atualize este documento e a constante `CLOUD_AGENTS` do painel.

## Configuração

| Variável de ambiente | Finalidade                                                                     |
| -------------------- | ------------------------------------------------------------------------------ |
| `DATA_DIR`           | Localização do banco de dados SQLite que contém `cloud_agent_tasks`            |
| `JWT_SECRET`         | Obrigatório para autenticação de gerenciamento nos endpoints de tarefas        |
| `API_KEY_SECRET`     | Obrigatório para criptografar em repouso as credenciais de conexão do provedor |

Atualmente, não existem variáveis de ambiente específicas do Cloud-Agent — todos os segredos ficam na
tabela `provider_connections`.

## Veja também

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Fonte: `src/lib/cloudAgent/`
- Rotas: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Painel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
