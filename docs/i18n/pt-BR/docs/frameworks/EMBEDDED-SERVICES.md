# Embedded Services (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versão:** v3.8.44
> **Última atualização:** 2026-07-03
> **Público:** Engenheiros que adicionam, mantêm ou depuram serviços integrados (9Router, CLIProxyAPI, Mux, Bifrost).

Serviços integrados são ferramentas auxiliares de processo instaladas localmente que o OmniRoute instala, supervisiona e
disponibiliza como destinos de roteamento de primeira classe. Diferentemente dos provedores externos (que são acessados pela internet
por meio de chaves de API), os serviços integrados são executados na mesma máquina que o OmniRoute e se comunicam por loopback.

---

## Sumário

1. [Visão geral](#1-overview)
2. [Arquitetura — 4 camadas](#2-architecture--4-layers)
3. [Máquina de estados do ciclo de vida](#3-lifecycle-state-machine)
4. [Referência da API](#4-api-reference)
5. [Segurança](#5-security)
6. [Adição de um novo serviço integrado](#6-adding-a-new-embedded-service)
7. [Solução de problemas](#7-troubleshooting)
8. [Perguntas frequentes](#8-faq)

---

## 1. Visão geral

### Por que usar serviços integrados?

Cinco serviços são integrados:

| Serviço         | Pacote npm                                 | Porta padrão | Finalidade                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------ | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                                  |    20130     | Roteador de IA que o OmniRoute pode usar como subprovedor. Modelos disponibilizados como `9router/{sub}/{model}`                                                                                                               |
| **CLIProxyAPI** | Binário de release do GitHub (`cliproxy`)  |     8317     | Adaptador de proxy local para fluxos de autenticação da CLI da Anthropic. Fornece roteamento de contingência quando os tokens OAuth expiram                                                                                    |
| **Mux**         | `mux` (`mux server` sem interface gráfica) |     8322     | Daemon local de orquestração de agentes (coder/mux). Apenas com ciclo de vida gerenciado — não é um destino de roteamento (sem proxy de LLM).                                                                                  |
| **Bifrost**     | `@maximhq/bifrost`                         |     8080     | Backend de retransmissão de gateway de IA em Go. Quando está em execução, é selecionado automaticamente pela rota de retransmissão (`/v1/relay/`)                                                                              |
| **Dario**       | `@askalf/dario`                            |     3456     | Proxy de assinatura do Claude — alternativa/contingência ao CLIProxyAPI para tráfego no formato do Claude Code; a chave injetada se torna `DARIO_ADMIN_TOKEN`, restringindo o acesso ao seu plano de controle OAuth `/admin/*` |

Todos os cinco seguem o mesmo modelo de supervisão:

- O OmniRoute os instala em `DATA_DIR/services/{name}/` (isolados do próprio `package.json` do OmniRoute)
- O OmniRoute os inicia e monitora como processos filhos
- O OmniRoute injeta uma chave de API efêmera no ambiente do processo filho e a rotaciona sem interrupção (quando aplicável)
- Todas as rotas de gerenciamento (`/api/services/*`) são **LOCAL_ONLY** — acessíveis apenas por loopback (regra rígida nº 17)

### Principais decisões (do plano de design)

| Decisão                                        | Valor                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| Acesso do painel à interface nativa do 9Router | Proxy reverso em `/dashboard/providers/services/9router/embed/*`             |
| Mecanismo de instalação                        | `npm install {package}` via `execFile` (sem interpolação de shell)           |
| Modo de consumo                                | Provedor registrado como `9router/{sub}/{model}` no mecanismo de roteamento  |
| Gerenciamento de chaves de API                 | O OmniRoute gera, criptografa em repouso (AES-256-GCM) e injeta via ambiente |
| Localização no painel                          | `/dashboard/providers/services` (três abas)                                  |
| Inicialização automática                       | Alternância por serviço, desativada por padrão                               |

---

## 2. Arquitetura — 4 camadas

```
┌────────────────────────────────────────────────────────────────────┐
│  Camada 1 — UI                                                     │
│  /dashboard/providers/services  (abas: CLIProxyAPI | 9Router | Mux)│
│  Logs ao vivo (SSE), Iniciar/Parar/Reiniciar/Atualizar, Configurações, Instalar│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Estrutura + roteamento de abas por ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch do Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Camada 2 — API (LOCAL_ONLY — somente loopback)                    │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy reverso HTTP + WebSocket → upstream do 9Router)          │
│                                                                    │
│  Proteção: LOCAL_ONLY_API_PREFIXES inclui "/api/services/" e       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ chamadas no processo
┌──────────────────────▼─────────────────────────────────────────────┐
│  Camada 3 — ServiceSupervisor (src/lib/services/)                  │
│                                                                    │
│  ServiceSupervisor.ts   Supervisor genérico (child_process.spawn)  │
│    ├── instalação: execFile('npm', ['install', pkg, '--prefix'])   │
│    ├── início:     spawn(node, [entrypoint], {env, cwd})           │
│    ├── chave API:  crypto.randomBytes(32) → env NINEROUTER_API_KEY │
│    ├── porta:      20130 para o 9Router (configurável)             │
│    ├── logs:       buffer circular de stdio de 5 MB → eventos SSE  │
│    ├── integridade: HTTP GET /health a cada 2–5 s, recuperação tardia│
│    └── ciclo de vida: SIGTERM 15 s → SIGKILL                       │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inicializa todos os SERVICES[] ao iniciar o processo│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models periódico → tabela service_models│
│  ringBuffer.ts      Buffer circular de logs (5 MB por serviço)     │
│  healthCheck.ts     Sonda HTTP periódica de integridade             │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (adaptadores de instalação)                   │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP compatível com OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Camada 4 — Provedor / Roteamento                                  │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Consulta novamente a porta e a chave API por requisição (sem cache).│
│    Remove o prefixo "9router/" do ID do modelo antes do proxy.     │
│    Retorna 503 service_not_running se o supervisor não estiver em "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entrada para "9router": isEmbeddedService: true                 │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modelos armazenados como "9router/{sub}/{model}" (com prefixo). │
│    Sincronizados a cada 5 min por modelSync.ts.                    │
│                                                                    │
│  O Mux tem APENAS o ciclo de vida gerenciado (Camadas 1–3) — ele é │
│  um daemon de orquestração de agentes, não um proxy de LLM, por isso│
│  não possui uma entrada de executor/provedor na Camada 4 e nunca é │
│  um destino de roteamento.                                         │
└────────────────────────────────────────────────────────────────────┘
```

### Principais arquivos-fonte

| Arquivo                                     | Função                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Classe principal: ciclo de vida, bloqueio, integridade, buffer circular |
| `src/lib/services/bootstrap.ts`             | Registro no nível do processo e inicialização automática                |
| `src/lib/services/registry.ts`              | Mapa singleton `ferramenta → supervisor`                                |
| `src/lib/services/apiKey.ts`                | Geração de chaves, criptografia AES-256-GCM em repouso                  |
| `src/lib/services/modelSync.ts`             | Sincronização periódica de modelos (5 min) + sob demanda                |
| `src/lib/services/ringBuffer.ts`            | Buffer circular de logs de 5 MB com assinatura SSE                      |
| `src/lib/services/healthCheck.ts`           | Sondagem de integridade via HTTP (intervalo configurável)               |
| `src/lib/services/installers/ninerouter.ts` | Instalação/atualização/desinstalação via npm para o 9Router             |
| `src/lib/services/installers/cliproxy.ts`   | Instalação/atualização/desinstalação via npm para a CLIProxyAPI         |
| `src/lib/services/installers/mux.ts`        | Instalação/atualização/desinstalação via npm para o Mux                 |
| `src/app/api/services/9router/_lib.ts`      | Função auxiliar `getOrInitSupervisor()`                                 |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint compartilhado de logs SSE                                      |
| `open-sse/executors/ninerouter.ts`          | Executor do provedor (Camada 4)                                         |

---

## 3. Máquina de estados do ciclo de vida

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
              verificação de saúde ok│         falha / SIGTERM   │
                               ┌────▼─────┐  (saída em até 5s)   │
                               │ running  │──── falha ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Os estados são armazenados na tabela `version_manager` do banco de dados (coluna `status`) e espelhados
no estado em memória de `ServiceSupervisor`. O estado em memória é a fonte autoritativa para
um processo em execução; o estado do banco de dados é a alternativa persistente durante a inicialização.

### Transições de estado

| De              | Evento                                     | Para                   |
| --------------- | ------------------------------------------ | ---------------------- |
| `not_installed` | `install()` é concluído com sucesso        | `stopped`              |
| `stopped`       | `start()` é chamado                        | `starting`             |
| `starting`      | a verificação de saúde retorna 200         | `running`              |
| `starting`      | o processo encerra antes de ficar saudável | `error`                |
| `running`       | `stop()` é chamado                         | `stopping` → `stopped` |
| `running`       | o processo encerra inesperadamente (< 5 s) | `error` (falha rápida) |
| `running`       | o processo encerra inesperadamente (> 5 s) | `error`                |
| `error`         | `start()` é chamado                        | `starting`             |
| qualquer        | `stop()` durante `stopping`                | nenhuma operação       |

### Bloqueio de operação

`ServiceSupervisor` serializa as operações do ciclo de vida por meio de um bloqueio assíncrono de operação
(`withLock()`). Chamadas simultâneas a `start()` no mesmo supervisor resultam em exatamente
uma criação de processo; o segundo chamador aguarda e retorna o status existente. Isso evita
condições de corrida quando, por exemplo, a inicialização automática e um botão da interface são acionados simultaneamente.

---

## 4. Referência da API

Todas as rotas em `/api/services/` são **LOCAL_ONLY** (somente loopback, regra rígida nº 17).
Solicitações que não sejam de loopback recebem `403 LOCAL_ONLY`, independentemente do token de autenticação.

### 4.1 Endpoints do 9Router (11 rotas)

#### `POST /api/services/9router/install`

Instala o 9Router a partir do npm. Cria `DATA_DIR/services/9router/` com seus próprios
`package.json` e `node_modules/`. Não entra em conflito com as dependências do próprio OmniRoute.

**Corpo da solicitação** (todos os campos são opcionais):

```json
{ "version": "latest" }
```

| Campo     | Tipo     | Padrão     | Descrição                                 |
| --------- | -------- | ---------- | ----------------------------------------- |
| `version` | `string` | `"latest"` | tag de versão do npm ou semver a instalar |

**Respostas:**

| Status | Descrição                                                                        |
| ------ | -------------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                           |
| `400`  | Corpo da solicitação inválido (falha na validação do Zod)                        |
| `409`  | Instalação já em andamento (bloqueio mantido)                                    |
| `500`  | Falha na instalação do npm — consulte `message` para obter uma mensagem amigável |

**Observações:** Usa `execFile('npm', [...])` — sem shell e sem interpolação (regra rígida nº 13).
Erros EACCES são apresentados como mensagens amigáveis.

---

#### `POST /api/services/9router/start`

Inicia o 9Router. Registra um supervisor caso ainda não esteja registrado e, em seguida, chama
`supervisor.start()`. É idempotente quando já está em execução.

**Corpo da solicitação:** nenhum

**Respostas:**

| Status | Descrição                                                        |
| ------ | ---------------------------------------------------------------- |
| `200`  | Objeto `ServiceStatus` (consulte o esquema abaixo)               |
| `409`  | O 9Router não está instalado (`status: "not_installed"`)         |
| `503`  | Falha na inicialização (erro de processo — consulte `lastError`) |

**Esquema de ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Interrompe o 9Router de forma controlada. Envia SIGTERM, aguarda 15 s e, em seguida, envia SIGKILL caso ainda esteja ativo.
É idempotente quando já está parado.

**Corpo da solicitação:** nenhum

**Respostas:**

| Status | Descrição                          |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Falha inesperada na interrupção    |

---

#### `POST /api/services/9router/restart`

Equivale a `stop()` seguido de `start()` sob o bloqueio de operação.

**Corpo da solicitação:** nenhum

**Respostas:** iguais às de `start` (retorna o `ServiceStatus` final).

---

#### `POST /api/services/9router/update`

Atualiza o 9Router para uma versão mais recente do npm. Se o serviço estiver em execução, ele será interrompido
primeiro; a instalação do npm será executada (instalando a versão mais recente no local) e, em seguida, o
serviço será reiniciado.

**Corpo da solicitação** (todos os campos são opcionais):

```json
{ "version": "latest" }
```

**Respostas:**

| Status | Descrição                                                       |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Corpo inválido                                                  |
| `500`  | Falha na atualização do npm                                     |

---

#### `POST /api/services/9router/rotate-key`

Gera uma nova chave de API para o 9Router, criptografa-a em repouso e reinicia o serviço
(se estiver em execução) para que ele obtenha a nova chave de seu ambiente. A chave antiga é
invalidada imediatamente.

**Corpo da solicitação:** nenhum

**Respostas:**

| Status | Descrição                                  |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Falha na rotação                           |

**Segurança:** A nova chave nunca é retornada na resposta (sem vazamento de credenciais).
Ela é armazenada de forma criptografada (AES-256-GCM) na tabela `version_manager`.

---

#### `GET /api/services/9router/status`

Retorna o status combinado em tempo real + BD, incluindo metadados de versão e uma prévia da chave de API.

**Respostas:**

| Status | Descrição                  |
| ------ | -------------------------- |
| `200`  | Consulte o esquema abaixo  |
| `500`  | Falha na leitura do status |

**Esquema da resposta:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Alterna o sinalizador de inicialização automática. Quando `enabled: true`, o serviço é iniciado automaticamente
na próxima vez que o OmniRoute for inicializado (se o serviço estiver instalado).

**Corpo da solicitação:**

```json
{ "enabled": true }
```

**Respostas:**

| Status | Descrição             |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Corpo inválido        |

---

#### `GET /api/services/9router/logs`

Fluxo SSE de logs em tempo real do buffer circular de stdout/stderr do 9Router.

**Parâmetros de consulta:**

| Parâmetro | Tipo      | Padrão | Descrição                                                                                            |
| --------- | --------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200    | Quantas linhas históricas enviar primeiro (máximo de 1000)                                           |
| `filter`  | `string`  | nenhum | Filtro de substring sem distinção entre maiúsculas e minúsculas (sem regex — protegido contra ReDoS) |

**Eventos SSE:**

| Evento      | Dados       | Descrição                  |
| ----------- | ----------- | -------------------------- |
| `snapshot`  | `LogLine[]` | Trecho histórico inicial   |
| `log`       | `LogLine`   | Linha de log em tempo real |
| `heartbeat` | `{}`        | Keep-alive a cada 15 s     |

**Esquema de LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Respostas:**

| Status | Descrição                                          |
| ------ | -------------------------------------------------- |
| `200`  | `text/event-stream`                                |
| `400`  | Parâmetro `filter` muito longo (> 200 caracteres)  |
| `404`  | Serviço não encontrado (supervisor não registrado) |

---

### 4.2 Endpoints do CLIProxyAPI (10 rotas)

O CLIProxyAPI tem o mesmo formato de endpoints que o 9Router, exceto por `rotate-key`, além de
`accounts`, `provider-expose` e `auto-restart-adopted`. Agora, ele recebe uma
chave de API dedicada do plano de dados, injetada na inicialização (`needsApiKey: true` em
`bootstrap.ts`, usada para sincronização de modelos); `status` inclui menos campos.

| Método | Caminho                             | Descrição                                      |
| ------ | ----------------------------------- | ---------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instala o CLIProxyAPI a partir do npm          |
| `POST` | `/api/services/cliproxy/start`      | Inicia o CLIProxyAPI                           |
| `POST` | `/api/services/cliproxy/stop`       | Interrompe o CLIProxyAPI                       |
| `POST` | `/api/services/cliproxy/restart`    | Reinicia o CLIProxyAPI                         |
| `POST` | `/api/services/cliproxy/update`     | Atualiza para uma versão mais recente          |
| `GET`  | `/api/services/cliproxy/status`     | Status em tempo real + BD (sem `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Alterna a inicialização automática             |

O endpoint compartilhado `GET /api/services/{name}/logs` (consulte §4.1) funciona para todos os
quatro serviços usando o segmento dinâmico `[name]`.

---

### 4.3 Endpoints do Mux (8 rotas)

O Mux tem o mesmo formato de endpoints que o CLIProxyAPI — não há rota `rotate-key` na superfície
da API (o token bearer é gerado da mesma forma que o do 9Router, por meio de
`getOrCreateApiKey("mux")`, e injetado pela variável de ambiente `MUX_SERVER_AUTH_TOKEN`, mas
ainda não há um endpoint dedicado para rotação). O Mux é gerenciado apenas em seu ciclo de vida: diferentemente
do 9Router, ele não possui um executor da Camada 4 e nunca é registrado como provedor de roteamento.

| Método | Caminho                        | Descrição                                    |
| ------ | ------------------------------ | -------------------------------------------- |
| `POST` | `/api/services/mux/install`    | Instala o Mux pelo npm (`npm i mux`)         |
| `POST` | `/api/services/mux/start`      | Inicia o Mux (`mux server`)                  |
| `POST` | `/api/services/mux/stop`       | Interrompe o Mux                             |
| `POST` | `/api/services/mux/restart`    | Reinicia o Mux                               |
| `POST` | `/api/services/mux/update`     | Atualiza para uma versão mais recente do npm |
| `GET`  | `/api/services/mux/status`     | Status em tempo real + BD                    |
| `POST` | `/api/services/mux/auto-start` | Alterna a inicialização automática           |

---

### 4.4 Endpoints do Bifrost (8 rotas)

O Bifrost é um backend de retransmissão de gateway de IA em Go (`@maximhq/bifrost`). Ele usa o mesmo
formato de endpoints que o CLIProxyAPI (sem `rotate-key` — o Bifrost gerencia suas próprias chaves de
provedores em `config.json`, no diretório especificado por `-app-dir`).

| Método | Caminho                            | Descrição                                                                       |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Instala o Bifrost a partir do npm (`@maximhq/bifrost`)                          |
| `POST` | `/api/services/bifrost/start`      | Inicia o Bifrost na porta 8080 (padrão)                                         |
| `POST` | `/api/services/bifrost/stop`       | Interrompe o Bifrost                                                            |
| `POST` | `/api/services/bifrost/restart`    | Reinicia o Bifrost                                                              |
| `POST` | `/api/services/bifrost/update`     | Atualiza para uma versão mais recente                                           |
| `GET`  | `/api/services/bifrost/status`     | Status em tempo real + no banco de dados                                        |
| `POST` | `/api/services/bifrost/auto-start` | Ativa ou desativa a inicialização automática                                    |
| `GET`  | `/api/services/bifrost/logs`       | Acompanhamento de logs via SSE (pela rota dinâmica compartilhada `[name]/logs`) |

**Configuração do roteamento:** Quando `BIFROST_BASE_URL` não está definida e a instância
supervisionada do Bifrost está em execução, `getBifrostRoutingConfig()` (em `routingBackend.ts`) usa automaticamente
`http://127.0.0.1:{port}` como a URL base do relay. A variável de ambiente `BIFROST_BASE_URL` explícita
sempre tem precedência.

---

### 4.5 Endpoints do Dario (12 rotas)

Mesmo formato de ciclo de vida dos outros serviços (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), além de um plano de controle OAuth
protegido por token em `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (todos protegidos por `DARIO_ADMIN_TOKEN`).

### 4.6 Proxy reverso (incorporação do painel do 9Router)

O painel incorpora a interface web do 9Router em um iframe por meio de um proxy reverso
interno em:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Esse proxy:

- Encaminha a solicitação para `http://127.0.0.1:{port}/{path}` (somente loopback)
- Remove os cabeçalhos `cookie` e `authorization` recebidos (sem vazamento da sessão do OmniRoute)
- Injeta `Authorization: Bearer {apiKey}` para autenticação no 9Router
- Remove `set-cookie`, `content-security-policy`, `x-frame-options` e `cross-origin-*` da resposta
- Reescreve respostas HTML para injetar `<base href>` e normalizar caminhos absolutos (`/foo` → `/dashboard/.../embed/foo`)

Os upgrades de WebSocket para o painel incorporado são processados por um servidor auxiliar em uma
porta dedicada (consulte `src/lib/services/embedWsProxy.ts`).

**Segurança:** As rotas do proxy de incorporação são classificadas em `LOCAL_ONLY_API_PREFIXES`
e só podem ser acessadas pelo loopback. Um invasor que obtenha um JWT por meio de um
túnel do Cloudflare/Ngrok não pode usar o proxy para acessar os serviços incorporados.

---

## 5. Segurança

### Aplicação de LOCAL_ONLY (regra rígida nº 17)

Todas as rotas em `/api/services/` e `/dashboard/providers/services/*/embed/` são
classificadas como LOCAL_ONLY em `src/server/authz/routeGuard.ts`. A verificação de
loopback é executada incondicionalmente antes de qualquer ramificação de autenticação:

```
requisição chega
  → isLocalOnlyPath(path)?
      → não loopback → 403 LOCAL_ONLY (sempre, antes da verificação de autenticação)
      → loopback     → prossegue para a autenticação normal
```

Isso impede que um JWT vazado (por exemplo, por meio de um túnel) acione `npm install`
ou a criação de processos. Consulte `docs/security/ROUTE_GUARD_TIERS.md` para ver a
matriz completa de níveis.

### Injeção de chave de API

9Router e Mux exigem uma chave de API/token bearer para seus próprios endpoints HTTP.
O OmniRoute:

1. Gera uma chave por meio de `crypto.randomBytes(32).toString("base64url")` com um
   prefixo específico do serviço (`nr_` para 9Router, `mx_` para Mux).
2. Criptografa-a em repouso usando AES-256-GCM (a mesma cifra usada para as credenciais
   dos provedores).
3. Descriptografa-a e a injeta como uma variável de ambiente no momento da criação do
   processo — `NINEROUTER_API_KEY` para 9Router, `MUX_SERVER_AUTH_TOKEN` para Mux
   (nunca como uma opção de CLI, de modo que o token nunca apareça em `ps`/listagens
   de processos).
4. Nunca retorna a chave em texto simples em nenhuma resposta HTTP.

CLIProxyAPI recebe uma chave dedicada do plano de dados injetada na criação do processo
(`needsApiKey: true` — usada para a sincronização de modelos com o adaptador).

### Defesa contra SSRF

O proxy reverso HTTP (`/dashboard/.../embed/[...path]`) é configurado de forma fixa
para encaminhar somente para `http://127.0.0.1:{port}`. Ele nunca segue
redirecionamentos para destinos que não sejam de loopback. A biblioteca
`ssrf-req-filter` é usada para rejeitar qualquer URL upstream que seja resolvida fora
do intervalo de loopback.

### Segurança do shell (regra rígida nº 13)

`npm install` é invocado por meio de `execFile('npm', ['install', pkg, '--prefix', dir])`
— sem literais de template, sem shell e sem interpolação de caminhos externos na string
do comando. Os valores de tempo de execução (portas, chaves de API) são passados por
meio do objeto `env` do processo filho.

### Sanitização de erros (regra rígida nº 12)

Todas as respostas de erro de `/api/services/*` passam por `buildErrorBody()` ou
`sanitizeErrorMessage()`. `err.stack` e `err.message` brutos nunca são retornados
literalmente ao chamador.

---

## 6. Adição de um novo serviço incorporado

Siga estas 8 etapas. Consulte as implementações existentes em
`src/lib/services/installers/` e `src/app/api/services/` como referência canônica.

### Etapa 1 — Crie o instalador

Crie `src/lib/services/installers/{name}.ts` com base em `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // escolha uma porta livre

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Use `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` de `installers/utils.ts`
— nunca use `execSync` nem interpolação de shell.

### Etapa 2 — Registre no bootstrap

Adicione uma `ServiceEntry` ao array `SERVICES` em `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false se nenhuma chave de API for necessária
}
```

Estenda `buildSpawnArgsFactory()` para tratar `cfg.tool === "myservice"`.

#### Contrato de plugin de provedor extensível (Fase 1, nº 7333)

`src/lib/services/providerPlugins/` introduz um contrato `ServiceProviderPlugin` que
agrupa os campos `ServiceEntry` de `bootstrap.ts` de um backend e os campos do modelo
de manifesto de `serviceBackends.ts` em um único objeto, em vez de a estrutura do mesmo
backend ser expressa separadamente em dois arquivos não relacionados. No momento desta
redação, **somente `9router` foi migrado** — `bootstrap.ts` deriva sua entrada em
`SERVICES[]` de `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`), lançando um erro de inicialização se
o plugin estiver ausente. `cliproxy`, `mux` e `bifrost` permanecem inalterados nos
literais inline preexistentes de `SERVICES[]`.

`open-sse/config/providerPluginManifest.ts` também recebeu o helper aditivo
`createServiceBackendManifestEntry(pluginId, template)`, que cria uma
`ProviderPluginManifestEntry` bem formada a partir de uma entrada de
`SERVICE_BACKEND_MANIFEST_TEMPLATE` — ele **ainda não** está conectado a nenhum fluxo
de requisição ativo (nem `generateProviderPluginManifestFromRegistry()` nem
`/v1/providers/[provider]/models`); isso permanece como trabalho futuro assim que o
contrato for validado para um segundo backend.

Adiado para PRs posteriores, rastreados na issue nº 7333: migrar `cliproxyapi` por meio
do mesmo registro, generalizar `mux`/`bifrost` na união `ServiceBackendPluginId`,
incorporar os tratamentos especiais de roteamento de executores
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) ao
contrato do plugin e conectar `createServiceBackendManifestEntry()` a um fluxo de
código ativo de manifesto/modelos.

### Etapa 3 — Adicione a migração e os dados iniciais do banco de dados

Garanta que o serviço tenha uma linha em `version_manager` por meio de uma migração em
`src/lib/db/migrations/`. A linha deve conter:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Etapa 4 — Crie os 7 endpoints da API

Em `src/app/api/services/{name}/`:

```
_lib.ts            helper getOrInitSupervisor()
install/route.ts   POST — chama installer.install()
start/route.ts     POST — chama supervisor.start()
stop/route.ts      POST — chama supervisor.stop()
restart/route.ts   POST — chama supervisor.restart()
update/route.ts    POST — chama installer.update()
status/route.ts    GET  — combina o status em tempo real com o do banco de dados
auto-start/route.ts POST — alterna o sinalizador auto_start
```

A rota compartilhada `GET /api/services/[name]/logs` já está configurada — nenhuma alteração
é necessária nela.

Delegue todas as respostas de erro por meio de `createErrorResponse()` / `buildErrorBody()`.

### Etapa 5 — Adicionar a LOCAL_ONLY_API_PREFIXES

Em `src/server/authz/routeGuard.ts`, verifique se `/api/services/` já está listado.
Se você introduzir um novo prefixo (por exemplo, `/api/tools/`), adicione-o tanto a
`LOCAL_ONLY_API_PREFIXES` quanto, caso ele inicie processos, a `SPAWN_CAPABLE_PREFIXES`.
Adicione um teste em `tests/unit/authz/routeGuard.test.ts`.

### Etapa 6 — Adicionar a aba à interface

Crie `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Reutilize os componentes compartilhados:

- `ServiceStatusCard` — estado em tempo real + indicador de integridade
- `ServiceLifecycleButtons` — Iniciar / Parar / Reiniciar / Atualizar
- `ServiceLogsPanel` — acompanhamento de logs via SSE (conecta-se a `/api/services/{name}/logs`)
- `ApiKeyCard` — revelação + rotação da chave (se `needsApiKey: true`)

Registre a aba em `ServicesPageShell.tsx`.

### Etapa 7 — Adicionar a entrada do provedor (se o serviço for um destino de roteamento)

Se o serviço incorporado expuser um endpoint `/v1/chat/completions` compatível com a OpenAI:

1. Adicione uma entrada de provedor em `src/shared/constants/providers.ts` com `isEmbeddedService: true`.
2. Crie `open-sse/executors/{name}.ts` estendendo `BaseExecutor`. Consulte novamente a porta e
   a chave de API a cada requisição (nunca as armazene em cache no construtor). Retorne uma
   resposta `503 service_not_running` quando o estado do supervisor não for `"running"`.
3. Registre os modelos em `open-sse/config/providerRegistry.ts` com o prefixo do serviço
   (por exemplo, `myservice/sub/model`). `modelSync.ts` os manterá atualizados.

### Etapa 8 — Documentar e testar

1. Atualize `docs/frameworks/EMBEDDED-SERVICES.md` (este arquivo) — adicione o serviço à
   tabela da §1 e quaisquer novos endpoints à §4.
2. Adicione testes unitários em `tests/unit/services/` (ciclo de vida, instalador, formato da API).
3. Adicione um teste de integração em `tests/integration/services/` (condicionado a `RUN_SERVICES_INT=1`).
4. Atualize `docs/openapi.yaml` com os novos endpoints.

---

## 7. Solução de problemas

### O serviço não inicia

**Sintomas:** O botão de iniciar retorna 503, e o estado permanece como `"error"` ou `"starting"`.

**Lista de verificação:**

1. Verifique `GET /api/services/{name}/logs` (ou o painel Logs no dashboard). Procure
   por linhas como `Error: ENOENT`, `address already in use` ou `Cannot find module`.
2. Verifique se `npm` está no PATH: execute `which npm` usando a mesma conta de usuário que executa o OmniRoute.
3. Verifique se o serviço está instalado: consulte `GET /api/services/{name}/status` e confira
   `installedVersion`. Se for `null`, execute primeiro a instalação.
4. Verifique se `DATA_DIR/services/{name}/node_modules/` existe e não está vazio.
5. Verifique o campo `lastError` na resposta de status para consultar o motivo sanitizado do encerramento.

---

### A inicialização a frio está lenta (> 10 s para chegar a `running`)

**Sintomas:** O estado permanece como `"starting"` por muito tempo antes de mudar para `"running"` ou `"error"`.

**Explicação:** A inicialização a frio do 9Router inclui a importação de grandes árvores de dependências (módulos de DNS,
túnel e MITM). O intervalo padrão da verificação de integridade é de 2 s, com 3 tentativas antes que o
supervisor declare um tempo limite (mas continue verificando).

**Correção:** O `healthIntervalMs` e o tempo limite de `waitForHealthy`
(`healthIntervalMs * 3`) são configuráveis em `bootstrap.ts`. Para serviços com tempos de
inicialização mais longos, aumente `healthIntervalMs` para 5000 e `stopTimeoutMs` para 30 000.

---

### Conflito de porta (`EADDRINUSE`)

**Sintomas:** Os logs exibem `address already in use :::20130`.

**Causas:**

- Outro processo já está usando a porta 20130.
- Um processo anterior do 9Router não foi encerrado completamente (PID zumbi).

**Correção:**

1. Altere a porta padrão por meio da variável de ambiente `NINEROUTER_PORT` no arquivo `.env`.
2. Localize e encerre o processo conflitante: `lsof -ti :20130 | xargs kill -9`.
3. A porta pode ser configurada por serviço em `bootstrap.ts` por meio do campo `port`.

**Observação:** O 9Router usa a porta 20130 por padrão especificamente para evitar conflito com
a porta padrão 20128 do OmniRoute.

---

### Permissão negada (EACCES) durante a instalação

**Sintomas:** A instalação retorna 500, e os logs exibem `EACCES` ou `permission denied`.

**Causas:**

- `DATA_DIR` ou seu diretório pai não permite gravação pelo processo do OmniRoute.
- Execução em um contêiner Docker sem privilégios de root e sem acesso de gravação ao volume mapeado.

**Correção:**

1. Verifique `DATA_DIR` (padrão: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Certifique-se de que o usuário do processo do OmniRoute seja o proprietário do diretório: `chown -R $USER ~/.omniroute/`
3. No Docker, certifique-se de que a montagem do volume tenha as permissões corretas para o usuário do contêiner.

---

### Falha na atualização (tempo limite de `npm install` ou erro de rede)

**Sintomas:** A atualização retorna 500 com `InstallError`, e os logs exibem um tempo limite de rede.

**Lista de verificação:**

1. Confirme que o registro npm está acessível: `npm ping`.
2. Verifique se há um proxy corporativo: `npm config get proxy`, `npm config get https-proxy`.
3. Tente realizar a instalação manualmente: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Se estiver em uma rede isolada, baixe previamente o tarball e use `npm install /path/to/tarball.tgz`.

---

### O serviço exibe o estado `"error"` imediatamente após a inicialização (falha rápida)

**Sintomas:** O estado muda de `"starting"` para `"error"` em menos de 5 segundos.
`lastError` exibe `"Fast crash (exited with code 1)"`.

**Lista de verificação:**

1. Leia a parte final completa do log: `GET /api/services/{name}/logs?tail=500`.
2. Causa comum: ausência de variáveis de ambiente esperadas pelo serviço.
3. Para o 9Router: verifique se `NINEROUTER_DISABLE_MITM=true` e
   `NINEROUTER_DISABLE_TUNNEL=true` estão no ambiente fornecido ao iniciar o processo (consulte
   `resolveSpawnArgs` em `installers/ninerouter.ts`).

---

## 8. Perguntas frequentes

**P: Posso expor os endpoints dos serviços incorporados a clientes que não sejam de loopback?**

Não. O nível LOCAL_ONLY é intencional (regra rígida nº 17). As rotas que podem executar
`npm install` ou iniciar processos `node` não devem ser acessíveis por tráfego que não
seja de loopback, pois um JWT vazado por meio de um túnel (Cloudflare, Ngrok, Tailscale)
permitiria, de outra forma, a criação arbitrária de processos. Não há exceção para
`/api/services/` — diferentemente de `/api/mcp/`, ele está excluído da lista de
contorno do escopo de gerenciamento. Consulte `docs/security/ROUTE_GUARD_TIERS.md`.

---

**P: O 9Router e a CLIProxyAPI estarão disponíveis em implantações de produção/nuvem?**

Sim. Ambos os serviços seguem o mesmo modelo local-first do próprio OmniRoute. Eles são
executados na mesma máquina e se comunicam por loopback. “Produção”, neste contexto,
significa o VPS ou servidor local em que o OmniRoute está implantado, e não um provedor
de nuvem remoto.

---

**P: Como depuro o supervisor?**

1. Acompanhe o fluxo de logs SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Verifique os logs estruturados na saída do pino do OmniRoute, filtrados pelo
   namespace `service:supervisor`.
3. Inspecione a linha do banco de dados: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Use `GET /api/services/9router/status` para ver, em uma única chamada, o estado atual
   em tempo real, o PID, a integridade e `lastError`.

---

**P: O supervisor mostra `health: "degraded"` ou `health: "unknown"`, mas o estado é `"running"`. Isso é um problema?**

`"degraded"` significa que a sondagem de integridade retornou uma resposta diferente de 200. `"unknown"` significa que nenhuma sondagem foi concluída ainda (condição de corrida
com a primeira consulta). Ambos são transitórios durante a inicialização. Se a
integridade permanecer como `"degraded"` por mais de `healthIntervalMs * 3` ms após
`"running"`, o serviço incorporado está em execução, mas sua API HTTP não está
respondendo. Verifique se a porta está correta na resposta de status e se o serviço
está realmente escutando nessa porta.

---

**P: Posso alterar a chave de API do 9Router sem uma reinicialização completa?**

Não. A chave de API é transmitida ao 9Router por meio de uma variável de ambiente no
momento em que o processo é iniciado. Variáveis de ambiente não podem ser alteradas em
um processo em execução. `POST .../rotate-key` interrompe e reinicia automaticamente o
serviço para aplicar a nova chave. A rotação da chave entra em vigor dentro do
`stopTimeoutMs` do serviço (15 s por padrão), mais o tempo de inicialização.

---

**P: Qual é o limite do buffer circular e o que acontece quando ele fica cheio?**

Cada serviço tem um buffer circular dedicado de 5 MB. Quando o buffer fica cheio, as
linhas de log mais antigas são removidas para liberar espaço para as novas. O evento
SSE `snapshot` retorna as linhas mais recentes dentro do limite de `tail`. Os logs não
são persistidos no disco, a menos que `logsBufferPath` esteja definido na linha do
banco de dados.

---

## Veja também

- `docs/security/ROUTE_GUARD_TIERS.md` — detalhes do nível LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Mapeamento do módulo de Serviços Incorporados
- `docs/architecture/ARCHITECTURE.md` — contexto no nível do sistema
- `docs/openapi.yaml` — definições de endpoints legíveis por máquina
- `CLAUDE.md` §“Adding a New Embedded Service” — lista de verificação para consulta rápida
