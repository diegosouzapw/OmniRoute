# Cost & Spend Tracking (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Como o OmniRoute estima, registra e relata o custo de cada solicitação — e por que o
número no painel é um **indicador de economia**, não uma cobrança.

Veja também: [Guia do Usuário](./USER_GUIDE.md) · [Galeria de Recursos](./FEATURES.md)

---

## O que é (e o que não é)

O OmniRoute atribui um custo em USD por solicitação a cada conclusão, multiplicando as
contagens de tokens pelas tarifas do modelo. Esses números alimentam o painel de
**Custos**, a CLI `omniroute cost` / `omniroute usage`, as exportações CSV/JSON e os
orçamentos por chave de API.

> **O "custo" do painel é um indicador de economia, não uma cobrança.** O OmniRoute nunca
> cobra de você — ele encaminha suas solicitações para provedores que você já conectou
> (suas próprias assinaturas, camadas gratuitas e chaves de API). Um "custo total de
> US$ 290" acumulado inteiramente em modelos gratuitos significa aproximadamente
> **US$ 290 que você _não_ pagou** a uma API paga. O valor é uma _estimativa_ de quanto
> o mesmo tráfego teria custado pelos preços de tabela padrão, permitindo que você veja
> onde seu uso está concentrado e quanto o encaminhamento para provedores mais
> baratos/gratuitos está economizando.

Essa interpretação é declarada diretamente no [README](../../README.md) do projeto
("o 'custo' do painel é um indicador de economia, não uma cobrança").

Como o número é uma estimativa:

- Ele depende da tabela de preços que o OmniRoute possui para cada modelo. Um modelo sem
  uma entrada de preço contribui com custo `0` (ele aparece como uma linha
  "Legado / Gratuito" no explorador).
- O tráfego de camadas gratuitas e assinaturas ainda acumula um custo _estimado_ — esse
  é o valor que você está economizando, não um valor devido.

---

## Como os custos são estimados

### A fonte dos preços

Os custos vêm de uma tabela de preços resolvida nesta ordem de precedência
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Substituições do usuário** — preços que você define no painel / por meio de
   `PATCH /api/pricing`.
2. **Preços externos sincronizados** — obtidos do arquivo público
   `model_prices_and_context_window.json` do LiteLLM quando a sincronização está ativada
   (armazenados em um namespace `pricing_synced` separado, para nunca sobrescrever suas
   substituições).
3. **Padrões codificados** — fornecidos com o OmniRoute.

A sincronização externa de preços é **opcional** e vem desativada por padrão. Variáveis
de ambiente relevantes (consulte [`.env.example`](../../.env.example)):

| Variável de ambiente    | Padrão    | Finalidade                                                                          |
| ----------------------- | --------- | ----------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Ativar a sincronização de preços do LiteLLM em segundo plano na inicialização.      |
| `PRICING_SYNC_INTERVAL` | `86400`   | Intervalo de sincronização em **segundos** (diário por padrão).                     |
| `PRICING_SYNC_SOURCES`  | `litellm` | Lista de fontes separadas por vírgulas (atualmente, apenas `litellm` é compatível). |

### A fórmula de custo

O custo é calculado por solicitação com base nas contagens de tokens e nas tarifas por
milhão de tokens em
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Tokens de entrada** (menos leituras de cache e tokens de criação de cache) × tarifa
  `input`.
- **Tokens de leitura de cache** × tarifa `cached` (usa a tarifa de entrada como
  alternativa).
- **Tokens de criação de cache** × tarifa `cache_creation` (usa a tarifa de entrada como
  alternativa).
- **Tokens de saída** × tarifa `output`.
- **Tokens de raciocínio** × tarifa `reasoning` (usa a tarifa de saída como alternativa).

Todas as tarifas são interpretadas como USD por 1.000.000 de tokens. Uma camada de
serviço "fast"/"priority" ou "flex" do Codex aplica um multiplicador de custo
(`getCodexFastCostMultiplier`) — por exemplo, flex é cobrado com um desconto de 50% nos
tokens, exibido como **economia flex** no painel.

Os nomes dos modelos são normalizados primeiro (prefixos de caminho do provedor, como
`openai/` ou `accounts/fireworks/models/`, são removidos) para que os registros históricos
ainda correspondam a um preço.

### Como os gastos são registrados

- O custo por solicitação é calculado após a resposta e registrado de forma assíncrona,
  sem aguardar a conclusão, para nunca adicionar latência ao cliente. O consumo da cota
  compartilhada é agendado para o próximo ciclo do loop de eventos por meio de
  [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Os gastos por chave de API são armazenados em buffer e gravados em lotes pelo
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalo padrão de gravação
  de 60s, buffer de 1.000 entradas). Configurável por meio de:

  | Variável de ambiente                | Padrão  | Finalidade                                      |
  | ----------------------------------- | ------- | ----------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Intervalo de gravação em milissegundos.         |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Máximo de entradas em buffer antes da gravação. |

Os valores de custo do painel **não** são lidos de um valor monetário armazenado por
linha — eles são recalculados dinamicamente com base nas contagens de tokens e na tabela
de preços atual sempre que o endpoint de análise é executado. Isso significa que a
correção de um preço incorreto (e uma nova sincronização) atualiza retroativamente as
estimativas históricas de custo.

---

## Dashboard: a página de Custos

A página **Custos** fica em `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Sua visualização principal é a aba **Visão geral de custos**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
que carrega todos os dados de `GET /api/usage/analytics`.

O que ela mostra:

- **Blocos de gastos** — gastos estimados para _Hoje (1d)_, _7d_, _30d_ e o período
  selecionado. Seletor de intervalo: `7d`, `30d`, `90d`, `all`.
- **Métricas de destaque** — solicitações no período, provedores ativos, modelos ativos e
  custo médio por solicitação.
- **Explorador de custos** — uma tabela ordenável e filtrável agrupada por **provedor**, **modelo**,
  **chave de API**, **conta** ou **nível de serviço**, com custo, solicitações, tokens, custo
  médio por solicitação e percentual do total.
- **Uso de tokens** — total de tokens / tokens de entrada / tokens de saída e proporção entre entrada e saída.
- **Eficiência do roteamento** — quantidade de fallbacks, taxa de fallback e cobertura do modelo solicitado.
- **Previsão mensal** — projeta os gastos até o fim do mês com base na média diária recente.
- **Comparação de períodos** — variação percentual entre a primeira e a segunda metade do período.
- **Gráficos** — tendência diária de custos, participação por provedor (pizza), principais provedores, principais modelos, custo
  por chave de API, custo por conta, padrão de uso semanal e um mapa de calor de atividade.
- **Exportação** — baixe o período atual como **CSV** ou **JSON** (os botões aparecem
  quando há dados de custo diferentes de zero).

Quando não há tráfego com preço definido, as linhas exibem o rótulo "Legado / Gratuito" em vez de `$0`,
refletindo o modelo de acompanhamento de economia.

### Subpáginas relacionadas a Custos

A área de Custos também inclui (todas em `/dashboard/costs/`):

- **Preços** (`/dashboard/costs/pricing`) — visualize e substitua os preços por modelo (renderiza
  a aba compartilhada de Preços).
- **Orçamento** (`/dashboard/costs/budget`) — defina limites de gastos por escopo (renderiza a aba
  compartilhada de Orçamento).
- **Compartilhamento de cota** (`/dashboard/costs/quota-share`) — pools de cotas compartilhadas e visualizações
  da taxa de consumo.

---

## Endpoints da API

Todos exigem autenticação de gerenciamento (loopback/JWT, via `requireManagementAuth`), salvo
indicação em contrário.

### Análises de uso e custos

| Método | Endpoint                 | Finalidade                                                                                                                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Análises completas de custos/uso: resumo, tendência diária, por provedor/modelo/chave de API/conta/nível. Consulta: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Utilização da cota por provedor ao longo do tempo. Consulta: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                    |
| `GET`  | `/api/usage/history`     | Linhas brutas do histórico de uso.                                                                                                                                           |
| `GET`  | `/api/usage/call-logs`   | Logs por solicitação (modelo, tokens, custo, latência, status).                                                                                                              |
| `GET`  | `/api/usage/quota`       | Status da cota do provedor.                                                                                                                                                  |
| `GET`  | `/api/usage/proxy-logs`  | Logs de solicitações do proxy.                                                                                                                                               |

### Orçamentos

| Método | Endpoint                 | Finalidade                                                                                                             |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Resumo de custos + verificação de orçamento para uma chave de API (`apiKeyId` é um parâmetro de consulta obrigatório). |
| `POST` | `/api/usage/budget`      | Define limites diários/semanais/mensais em USD + limite de alerta para uma chave de API.                               |
| `GET`  | `/api/usage/budget/bulk` | Resumos de orçamento em massa para várias chaves de API.                                                               |

> A API de orçamento tem o escopo definido por **chave de API** (`apiKeyId`). Os limites retornados por
> `GET /api/usage/budget` incluem `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> um `warningThreshold` e os totais acumulados (`totalCostToday`, `totalCostMonth`, …).

### Preços

| Método   | Endpoint                | Finalidade                                                                                                               |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/pricing`          | Preços combinados atuais (usuário + sincronizados + padrões). Use `?includeSources=1` para ver a origem de cada entrada. |
| `PATCH`  | `/api/pricing`          | Substitui os preços para `{ provider: { model: { input, output, cached, … } } }`.                                        |
| `DELETE` | `/api/pricing`          | Redefine os preços para os padrões (opcionalmente limitado por `?provider=&model=`).                                     |
| `GET`    | `/api/pricing/defaults` | Exibe as tarifas padrão de fallback por 1 milhão.                                                                        |
| `GET`    | `/api/pricing/models`   | Preços indexados por modelo.                                                                                             |
| `POST`   | `/api/pricing/sync`     | Aciona uma sincronização manual a partir de fontes externas (LiteLLM).                                                   |
| `GET`    | `/api/pricing/sync`     | Status atual da sincronização.                                                                                           |
| `DELETE` | `/api/pricing/sync`     | Limpa todos os dados de preços sincronizados.                                                                            |

### Outros endpoints relevantes para custos

| Método | Endpoint                      | Finalidade                                                                     |
| ------ | ----------------------------- | ------------------------------------------------------------------------------ |
| `GET`  | `/api/free-tier/summary`      | Totais de tokens de modelos gratuitos, uso neste mês e cota gratuita restante. |
| `GET`  | `/api/quota/pools/[id]/usage` | Uso de um pool de cota compartilhada.                                          |

---

## CLI

A CLI do OmniRoute disponibiliza comandos de custo, uso e preços (registrados em
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Um relatório de custos agregado a partir de `/api/usage/analytics`.

```bash
omniroute cost                          # últimos 30d, agrupados por provedor
omniroute cost --period 7d              # últimos 7 dias
omniroute cost --group-by model         # agrupar por provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Colunas: grupo, requisições, tokens de entrada/saída, custo (USD) e % do total. Uma linha com o total geral
é exibida ao final (suprimida com `--quiet` ou `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # resumo de custos por provedor
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Orçamentos
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` lê `GET /api/pricing/defaults`. Para editar os preços de modelos individuais,
> use a página **Preços** do painel ou `PATCH /api/pricing`.

---

## Solução de problemas

- **Todos os custos mostram $0 / "Legacy / Free".** Os modelos em uso não têm uma entrada de preços.
  Ative a sincronização externa (`PRICING_SYNC_ENABLED=true`) e execute `omniroute pricing sync`, ou
  defina os preços manualmente pela página Preços / `PATCH /api/pricing`.
- **Um modelo histórico está com o preço incorreto.** Corrija o preço (substitua-o ou sincronize novamente) — o custo é
  recalculado a partir das contagens de tokens em cada leitura analítica, portanto as estimativas são atualizadas retroativamente.
- **Os gastos estão atrasados em relação ao tempo real.** Os gastos por chave são processados em lotes; reduza
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` caso precise de números mais atualizados.

---

Para saber como isso se integra ao painel mais amplo, consulte o [Guia do Usuário](./USER_GUIDE.md) e
a [Galeria de Recursos](./FEATURES.md).
