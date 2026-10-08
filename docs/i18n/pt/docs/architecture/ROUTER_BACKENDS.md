# Router Backends & Embedded Services — architecture contract (ADR) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Estado:** Aceite · **Contexto:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contrato:** `domain/routing/routerBackends.ts`
> (registo tipado — o código será integrado com [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Este ADR define como os motores `ts` (nativo), `bifrost`, `cliproxy`, `9router` e
os motores compatíveis com VibeProxy se relacionam entre si, para que os contribuidores deixem de
confundir duas coisas que são arquiteturalmente distintas. Documenta o registo tipado
introduzido pelo trabalho do registo de backends de encaminhamento como a única fonte de
verdade para esse modelo.

## A distinção fundamental — dois eixos ortogonais

A função de um motor é descrita por **dois eixos independentes**, codificados em conjunto na
definição `RouterBackendDefinition` do registo:

1. **Ciclo de vida** (`RouterBackendLifecycle`) — _como o motor é executado_:
   - `in-process` — é executado dentro do processo Node do OmniRoute (o pipeline TS nativo).
   - `supervised` — um processo-filho local que o OmniRoute instala/inicia/para/verifica
     através de `ServiceSupervisor` e que depois utiliza como uma ligação de fornecedor.
   - `external` — um endpoint HTTP para o qual o OmniRoute encaminha pedidos, mas que **não** gere
     (configurado através de um URL base numa variável de ambiente).
   - `disabled` — registado, mas não selecionável.
2. **Eixo de seleção** (backend de encaminhamento do relay) — _se o relay encaminha pedidos para o motor_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` em
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

O erro a evitar: tratar «serviço incorporado» e «backend de encaminhamento» como uma única
lista. Não são a mesma coisa. Um motor `supervised` (9router/cliproxy) é uma **ligação de
fornecedor utilizada pelo pipeline nativo**, não um backend alternativo de encaminhamento
do relay. O `bifrost` é o inverso — um backend de encaminhamento do relay que (historicamente)
era apenas `external`.

## O registo — única fonte de verdade

O contrato `domain/routing/routerBackends.ts` (o código será integrado com
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) declara cada motor uma única vez, com o respetivo
ciclo de vida, capacidades, identidade do serviço, porta predefinida, configuração de
estado e suporte de telemetria. Os consumidores consultam os motores através de `getRouterBackend(id)`,
`listRouterBackends()` e `listRouterBackendsByCapability(cap)`, em vez de
tratarem cada sidecar como um caso especial.

| Backend     | Ciclo de vida | Serviço (eixo A) | Backend do relay (eixo B)   | Estado        | Porta predefinida |
| ----------- | ------------- | ---------------- | --------------------------- | ------------- | ----------------- |
| `ts`        | `in-process`  | —                | `ts` (nativo)               | —             | —                 |
| `bifrost`   | `external`¹   | —¹               | `bifrost` / `auto`          | `/health`     | —                 |
| `cliproxy`  | `supervised`  | `cliproxy`       | — (fornecedor)              | `/v1/models`  | 8317              |
| `9router`   | `supervised`  | `9router`        | — (fornecedor)              | `/api/health` | 20130             |
| `vibeproxy` | `external`    | —                | — (adaptador de fornecedor) | `/v1/models`  | —                 |

¹ A promoção do Bifrost a um serviço incorporado `supervised` (instalável/iniciável
a partir de `/api/services/bifrost/`) está a ser acompanhada em
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); até ser integrada,
o Bifrost é apenas `external` (acessível exclusivamente através de `BIFROST_BASE_URL`).

As `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) permitem aos chamadores
filtrar pelo que um motor consegue realmente fazer, em vez de codificarem diretamente ramificações específicas por ID.

## Eixo A — serviços incorporados (lado do processo supervisionado)

- **Registo de processos supervisionados:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (atualmente: `9router`, `cliproxy`).
- **Responsável pelo ciclo de vida:** `src/lib/services/ServiceSupervisor.ts` — `start()` inicia o
  processo filho, aguarda `waitForHealthy()`, encaminha stdout/stderr para um buffer circular;
  `stop()` SIGTERM→SIGKILL; tudo serializado através de um bloqueio.
- **União de estados** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, além de um
  `HealthState = healthy | unhealthy | unknown` ortogonal.
- **Porquê um processo separado (em vez de um SDK no processo)?** O isolamento de processos é o que permite
  controlar de forma independente a instalação/inicialização/paragem/saúde/registos de cada sidecar e permite aplicar a
  proteção contra criação de processos via loopback. A modelação de um adaptador no processo é trabalho futuro — a
  flag de capacidade `native-hot-path` é onde isso seria expresso.

### Contrato das rotas de ciclo de vida (`/api/services/<tool>/…`)

Os códigos de estado são **específicos do estado/verbo/caminho por definição** — este é o contrato, não
uma inconsistência:

| Chamada                        | Condição                                      | Estado                               |
| ------------------------------ | --------------------------------------------- | ------------------------------------ |
| `POST .../start`               | serviço `not_installed`                       | **409** (pré-condição)               |
| `POST .../stop`                | já parado                                     | **200** (operação nula idempotente)  |
| `GET .../status`               | OK                                            | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | falha ao iniciar o processo                   | **503** (transitório)                |
| `GET .../status`, `.../stop`   | erro não capturado                            | **500**                              |
| `GET /api/services/<x>/logs`   | ferramenta `<x>` desconhecida                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` ausente               | **403** (apenas 9router)             |
| **qualquer** `/api/services/*` | autor da chamada fora de loopback/LAN privada | **403 LOCAL_ONLY**                   |

Todos os corpos de erro são estruturados por `createErrorResponse()` →
`{ error: { message, type }, requestId }`, em que `type` é derivado do estado
(`500→server_error`, `404→not_found`, `409→conflict`, caso contrário `invalid_request`) e é
o discriminador acionável por máquina. As mensagens são previamente sanitizadas
(`sanitizeErrorMessage()`, Regra Rígida n.º 12).

**A proteção de loopback** é a origem mais comum de um `403`: `/api/services/` está em
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) e
`src/server/authz/policies/management.ts` rejeita qualquer autor da chamada que não esteja em loopback / numa LAN privada
**antes da autenticação**, porque estas rotas iniciam processos filhos (Regras Rígidas 15
e 17). Aceder-lhes através de um túnel público resulta num `403` por definição.

## Eixo B — backend de encaminhamento do relay (lado do despacho)

Apenas o caminho do proxy de relay `/api/v1/relay/chat/completions` seleciona um backend
de despacho; a superfície principal `/api/v1/chat/completions` nunca consulta
`routingBackend.ts`.

- **Seleção** (`resolveRelayRoutingBackend`): uma única opção global de ambiente —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Se não estiver definida, será `auto` quando o Bifrost estiver configurado+ativado; caso contrário, `ts`.
- **Comportamento:**
  - `bifrost` (forçado): falha do Bifrost → `502` definitivo, sem fallback.
  - `auto`: tenta o Bifrost e, em caso de falha/período de suspensão, recorre silenciosamente ao nativo.
  - `ts` / após fallback: o pipeline nativo de tradução/execução `open-sse`.
- **Período de suspensão:** período de suspensão após falha por `baseUrl` em `bifrostCooldown.ts`.

Atualmente, a seleção é **tudo ou nada ao nível do relay** — não existe troca de
motor por fornecedor ou por pedido em `release/v3.8.43`. A condição por pedido está a ser adicionada
pelo trabalho do manifesto de sidecars
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifesto +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
o que permite que `auto` encaminhe através do Bifrost apenas os fornecedores elegíveis segundo o manifesto.

## Integração no dashboard

O dashboard de serviços consulta `GET /api/services/<tool>/status` a cada 5s através de
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
devolvendo `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Não existe um fornecedor partilhado de contexto de disponibilidade —
cada componente chama o hook para cada ferramenta. Quando `!res.ok`, atualmente o hook apresenta apenas
`HTTP <status>`; mapear o campo `error.type` para uma explicação compreensível é uma
melhoria de UX registada, não uma alteração ao contrato.

## Consequências

- Os novos motores são registados uma única vez em `ROUTER_BACKENDS`; os consumidores passam a dispor deles através de consultas
  de capacidades, sem novas ramificações específicas por id.
- "Isto é um serviço ou um backend de encaminhamento?" é determinado pelo campo `lifecycle`, não
  pela lista em que um id aparece.
- A supervisão do Bifrost (#5817) e a migração do caminho crítico nativo (#5670) baseiam-se neste
  contrato partilhado, em vez de tratarem cada sidecar como um caso especial.
