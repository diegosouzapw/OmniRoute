# OmniRoute A2A Server Documentation (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocolo Agent-to-Agent v0.3 — OmniRoute como um agente de roteamento inteligente

A superfície A2A tem duas interfaces:

- **JSON-RPC 2.0** em `POST /a2a` (ponto de entrada canônico, definido em `src/app/a2a/route.ts`).
- **REST** em `/api/a2a/*` para painéis e ferramentas (status, lista de tarefas, cancelamento).

As tarefas são rastreadas pelo `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL padrão de 5 minutos). As habilidades são despachadas por meio de `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`.

## Descoberta do agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Retorna o Agent Card que descreve os recursos, as habilidades e os requisitos de autenticação do OmniRoute.

O campo `version` do Agent Card é obtido de `process.env.npm_package_version` (consulte `src/app/.well-known/agent.json/route.ts:13`), portanto, ele permanece sincronizado automaticamente com o `package.json` a cada versão lançada.

---

## Autenticação

Todas as solicitações para `/a2a` exigem uma chave de API por meio do cabeçalho `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Se nenhuma chave de API estiver configurada no servidor, a autenticação será ignorada.

## Habilitação

O A2A é controlado pela opção **Endpoints → A2A** e fica desabilitado por padrão. Quando desabilitado,
`GET /api/a2a/status` informa `status: "disabled"` e `online: false`; as chamadas JSON-RPC para
`POST /a2a` retornam HTTP 503 com o código de erro JSON-RPC `-32000`.

---

## Métodos JSON-RPC 2.0

### `message/send` — Execução síncrona

Envia uma mensagem para uma habilidade e aguarda a resposta completa.

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

**Resposta:**

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

### `message/stream` — Streaming via SSE

Funciona da mesma forma que `message/send`, mas retorna Server-Sent Events para streaming em tempo real.

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

**Eventos SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Consultar o status da tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancelar uma tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Habilidades disponíveis

O OmniRoute expõe 6 habilidades A2A conectadas em `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cada módulo de habilidade está localizado em `src/lib/a2a/skills/`.

| Habilidade               | ID                   | Descrição                                                                                                                                                                                     | Tags                              | Exemplos                                        |
| :----------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- | :---------------------------------------------- |
| Roteamento inteligente   | `smart-routing`      | Encaminha um prompt pelo provedor/combo ideal usando o mecanismo de combos e a pontuação do OmniRoute                                                                                         | roteamento, provedores            | "Encaminhe este prompt pelo melhor modelo"      |
| Gerenciamento de cotas   | `quota-management`   | Informa o estado da cota por provedor e ajuda os clientes a decidir quando limitar ou trocar                                                                                                  | cota, provedores                  | "Verifique a cota da anthropic"                 |
| Descoberta de provedores | `provider-discovery` | Lista os provedores instalados com funcionalidades, indicadores de camada gratuita e status do OAuth                                                                                          | provedores, descoberta            | "Quais provedores estão disponíveis?"           |
| Análise de custos        | `cost-analysis`      | Estima o custo de uma solicitação/conversa com base no catálogo e no uso recente                                                                                                              | custo, uso                        | "Estime o custo desta conversa"                 |
| Relatório de integridade | `health-report`      | Agrega o estado do disjuntor, do período de espera e do bloqueio por provedor                                                                                                                 | integridade, resiliência          | "Mostre o status de integridade dos provedores" |
| Listar funcionalidades   | `list-capabilities`  | Retorna o catálogo completo de 45 entradas de Habilidades do Agente (23 de API + 21 de CLI + 1 de configuração) como uma tabela markdown com URLs brutas de SKILL.md para injeção de contexto | catálogo, descoberta, habilidades | "Liste todas as funcionalidades do OmniRoute"   |

> O Cartão do Agente deve ser mantido alinhado ao catálogo ativo de 352 provedores; as contagens de provedores e os metadados de gratuidade/ausência de autenticação são obtidos do registro em tempo de execução.

### Detalhes da habilidade `list-capabilities`

A habilidade `list-capabilities` é particularmente útil para agentes externos que precisam descobrir o que o OmniRoute expõe antes de enviar chamadas de API. Ela retorna um artefato de tabela markdown estruturada:

```
| ID | Nome | Categoria | Área | Endpoints/Comandos | URL bruta |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autenticação e sessões | api | autenticação | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cada linha inclui a coluna `rawUrl` para que os agentes possam buscar imediatamente o SKILL.md completo. O campo `metadata.totalSkills` reflete o tamanho do catálogo (45 atualmente). Implementação: `src/lib/a2a/skills/listCapabilities.ts`. Consulte também [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (auxiliar)

O endpoint JSON-RPC `/a2a` é o ponto de entrada A2A canônico. Os endpoints REST abaixo fornecem acesso auxiliar para painéis e ferramentas externas:

| Endpoint                     | Método | Descrição                                                           | Autenticação                                           |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :----------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status do servidor, skills registradas                              | (público)                                              |
| `/api/a2a/tasks`             | GET    | Lista tarefas com filtros                                           | gerenciamento                                          |
| `/api/a2a/tasks/[id]`        | GET    | Obtém uma tarefa por ID                                             | gerenciamento                                          |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancela uma tarefa em execução                                      | gerenciamento                                          |
| `/.well-known/agent.json`    | GET    | Agent Card (descoberta A2A)                                         | (público, armazenado em cache por 3600s)               |
| `/api/a2a/tasks`             | POST   | Delegação de entrada para a frota OmniConductor (Conductor PRD RF5) | Bearer em relação a `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delegação de entrada do Conductor (`POST /api/a2a/tasks`):** agentes A2A externos delegam trabalhos de programação à frota OmniConductor por meio do OmniRoute. Corpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — somente as skills da frota Conductor (aquelas anunciadas no Agent Card) podem receber delegações; `metadata.conductor.repo.url` é obrigatório (a frota trabalha em repositórios git). A rota é convertida em `POST /v1/tasks` do hub usando o `CONDUCTOR_ORCHESTRATOR_TOKEN` do servidor (com fallback para `CONDUCTOR_HUB_TOKEN`) e retorna `201 { conductor_task_id, state: "submitted" }`; os estados das tarefas retornam pelo espelho SSE→A2A (RF1) e ficam visíveis por meio de `GET /api/a2a/tasks?skill=conductor`.

---

## Adicionando uma nova skill

1. **Crie o arquivo da skill:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporte uma função assíncrona `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Siga a estrutura das skills existentes, como `smartRouting.ts`.

2. **Registre o handler:** em `src/lib/a2a/taskExecution.ts`, adicione uma entrada a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...skills existentes
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Exponha no Agent Card:** em `src/app/.well-known/agent.json/route.ts`, acrescente ao array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Escreva testes:** `tests/unit/a2a-<your-skill>.test.ts`. Cubra o caminho de sucesso e o caminho de erro.

5. **Documente** a nova skill na tabela `Available Skills` deste arquivo.

---

## TTL da tarefa

As tarefas expiram após `ttlMinutes` (5 min por padrão) — configurado no construtor `A2ATaskManager` em `src/lib/a2a/taskManager.ts:82`. Para personalizar, faça um fork da instanciação de `A2ATaskManager` e passe um valor diferente (por exemplo, `new A2ATaskManager(15)` para um TTL de 15 minutos). Um intervalo em segundo plano remove as tarefas expiradas a cada 60 segundos.

---

## Ciclo de vida da tarefa

```
submitted → working → completed
                    → failed
                    → cancelled
```

- As tarefas expiram após 5 minutos por padrão (consulte [TTL da tarefa](#task-ttl))
- Estados terminais: `completed`, `failed`, `cancelled`
- O log de eventos registra cada transição de estado

---

## Códigos de erro

| Código | Significado                           |
| :----- | :------------------------------------ |
| -32700 | Erro de análise (JSON inválido)       |
| -32600 | Solicitação inválida / Não autorizado |
| -32601 | Método ou skill não encontrado        |
| -32602 | Parâmetros inválidos                  |
| -32603 | Erro interno                          |
| -32000 | O endpoint A2A está desabilitado      |

---

## Exemplos de integração

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
