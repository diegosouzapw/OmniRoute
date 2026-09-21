# Router Backends & Embedded Services — architecture contract (ADR) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Aceito · **Contexto:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contrato:** `domain/routing/routerBackends.ts`
> (registro tipado — o código será incorporado com [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Este ADR define como os mecanismos `ts` (nativo), `bifrost`, `cliproxy`, `9router` e
compatíveis com VibeProxy se relacionam entre si, para que os colaboradores parem
de confundir duas coisas que são arquiteturalmente distintas. Ele documenta o registro
tipado introduzido pelo trabalho de registro de backends de roteador como a única fonte
da verdade para esse modelo.

## A distinção principal — dois eixos ortogonais

A função de um mecanismo é descrita por **dois eixos independentes**, codificados em conjunto no
`RouterBackendDefinition` do registro:

1. **Ciclo de vida** (`RouterBackendLifecycle`) — _como o mecanismo é executado_:
   - `in-process` — é executado dentro do processo Node do OmniRoute (o pipeline TS nativo).
   - `supervised` — um processo filho local que o OmniRoute instala/inicia/interrompe/verifica
     por meio do `ServiceSupervisor` e depois consome como uma conexão de provedor.
   - `external` — um endpoint HTTP para o qual o OmniRoute encaminha solicitações, mas que **não** gerencia
     (configurado por uma URL-base em uma variável de ambiente).
   - `disabled` — registrado, mas não selecionável.
2. **Eixo de seleção** (backend de roteamento do relay) — _se o relay encaminha solicitações para ele_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` em
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

O erro a evitar: tratar "serviço incorporado" e "backend de roteamento" como uma única
lista. Eles não são a mesma coisa. Um mecanismo `supervised` (9router/cliproxy) é uma **conexão de
provedor consumida pelo pipeline nativo**, e não um backend alternativo de encaminhamento
do relay. O `bifrost` é o inverso — um backend de encaminhamento do relay que (historicamente)
era apenas `external`.

## O registro — única fonte da verdade

O contrato `domain/routing/routerBackends.ts` (o código será incorporado com
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) declara cada mecanismo uma única vez, com seu
ciclo de vida, recursos, identidade de serviço, porta padrão, configuração de integridade e
suporte a telemetria. Os consumidores consultam os mecanismos por meio de `getRouterBackend(id)`,
`listRouterBackends()` e `listRouterBackendsByCapability(cap)`, em vez de
tratar cada processo auxiliar como um caso especial.

| Backend     | Ciclo de vida | Serviço (eixo A) | Backend do relay (eixo B) | Integridade   | Porta padrão |
| ----------- | ------------- | ---------------- | ------------------------- | ------------- | ------------ |
| `ts`        | `in-process`  | —                | `ts` (nativo)             | —             | —            |
| `bifrost`   | `external`¹   | —¹               | `bifrost` / `auto`        | `/health`     | —            |
| `cliproxy`  | `supervised`  | `cliproxy`       | — (provedor)              | `/v1/models`  | 8317         |
| `9router`   | `supervised`  | `9router`        | — (provedor)              | `/api/health` | 20130        |
| `vibeproxy` | `external`    | —                | — (adaptador de provedor) | `/v1/models`  | —            |

¹ A promoção do Bifrost a um serviço incorporado `supervised` (instalável/inicializável
por meio de `/api/services/bifrost/`) está sendo acompanhada em
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); até que ela seja incorporada,
o Bifrost é apenas `external` (acessível exclusivamente por meio de `BIFROST_BASE_URL`).

As `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) permitem que os chamadores
filtrem pelo que um mecanismo realmente pode fazer, em vez de codificar ramificações específicas por ID.

## Eixo A — serviços incorporados (lado do processo supervisionado)

- **Registro de processos supervisionados:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (atualmente: `9router`, `cliproxy`).
- **Responsável pelo ciclo de vida:** `src/lib/services/ServiceSupervisor.ts` — `start()` inicia o
  processo filho, aguarda a liberação por `waitForHealthy()`, captura stdout/stderr em um buffer circular;
  `stop()` usa SIGTERM→SIGKILL; tudo é serializado sob um lock.
- **União de estados** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, além de um
  `HealthState = healthy | unhealthy | unknown` ortogonal.
- **Por que um processo separado (e não um SDK no mesmo processo)?** O isolamento de processos é o que torna
  instalação/inicialização/parada/saúde/logs controláveis de forma independente por sidecar e permite a
  aplicação da proteção de inicialização via loopback. A modelagem de um adaptador no mesmo processo é trabalho futuro — a
  flag de capacidade `native-hot-path` é onde isso seria expresso.

### Contrato das rotas de ciclo de vida (`/api/services/<tool>/…`)

Os códigos de status são **específicos por estado/verbo/caminho intencionalmente** — este é o contrato, não
uma inconsistência:

| Chamada                        | Condição                            | Status                                |
| ------------------------------ | ----------------------------------- | ------------------------------------- |
| `POST .../start`               | serviço `not_installed`             | **409** (pré-condição)                |
| `POST .../stop`                | já está parado                      | **200** (operação inócua idempotente) |
| `GET .../status`               | OK                                  | **200** (`live ?? row ?? "unknown"`)  |
| `POST .../start`               | falha ao iniciar o processo         | **503** (transitório)                 |
| `GET .../status`, `.../stop`   | erro não capturado                  | **500**                               |
| `GET /api/services/<x>/logs`   | ferramenta `<x>` desconhecida       | **404** `Service '<x>' not found`     |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` ausente     | **403** (somente 9router)             |
| **qualquer** `/api/services/*` | chamador não é loopback/LAN privada | **403 LOCAL_ONLY**                    |

Todos os corpos de erro são formatados por `createErrorResponse()` →
`{ error: { message, type }, requestId }`, em que `type` é derivado do status
(`500→server_error`, `404→not_found`, `409→conflict`; caso contrário, `invalid_request`) e é
o discriminador acionável por máquina. As mensagens são previamente sanitizadas
(`sanitizeErrorMessage()`, Regra Rígida nº 12).

**A proteção de loopback** é a origem mais comum de um `403`: `/api/services/` está em
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) e
`src/server/authz/policies/management.ts` rejeita qualquer chamador que não seja de loopback/LAN privada
**antes da autenticação**, porque essas rotas iniciam processos filhos (Regras Rígidas 15
e 17). Acessá-las por meio de um túnel público resulta em `403` intencionalmente.

## Eixo B — backend de roteamento do relay (lado do despacho)

Somente o caminho do proxy de relay `/api/v1/relay/chat/completions` seleciona um backend
de despacho; a superfície principal `/api/v1/chat/completions` nunca consulta
`routingBackend.ts`.

- **Seleção** (`resolveRelayRoutingBackend`): uma única variável de ambiente global —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Se não estiver definida, será `auto` quando o Bifrost estiver configurado+habilitado; caso contrário, `ts`.
- **Comportamento:**
  - `bifrost` (forçado): falha do Bifrost → erro definitivo `502`, sem fallback.
  - `auto`: tenta o Bifrost e, em caso de falha/período de cooldown, prossegue silenciosamente para o nativo.
  - `ts` / após fallback: o pipeline nativo de tradução/execução `open-sse`.
- **Cooldown:** cooldown por falha de `baseUrl` em `bifrostCooldown.ts`.

Atualmente, a seleção é **tudo ou nada no nível do relay** — não há troca de mecanismo por provedor
ou por solicitação em `release/v3.8.43`. A verificação por solicitação está sendo adicionada
pelo trabalho do manifesto de sidecars
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifesto +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
o que permite que `auto` encaminhe pelo Bifrost somente os provedores elegíveis de acordo com o manifesto.

## Integração com o dashboard

O dashboard de serviços consulta `GET /api/services/<tool>/status` a cada 5s por meio de
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
retornando `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Não há um provedor compartilhado de contexto de disponibilidade —
cada componente chama o hook para cada ferramenta. Quando `!res.ok`, atualmente o hook apresenta
apenas `HTTP <status>`; mapear o campo `error.type` para uma explicação compreensível
é uma melhoria de UX já registrada, não uma alteração de contrato.

## Consequências

- Novos mecanismos são registrados uma única vez em `ROUTER_BACKENDS`; os consumidores passam a acessá-los por meio de consultas
  de recursos, sem novas ramificações específicas por id.
- "Isto é um serviço ou um backend de roteamento?" é respondido pelo campo `lifecycle`, e não
  pela lista em que um id aparece.
- A supervisão do Bifrost (#5817) e a migração do caminho crítico nativo (#5670) utilizam este
  contrato compartilhado em vez de tratar cada sidecar como um caso especial.
