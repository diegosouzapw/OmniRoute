# Cost & Spend Tracking (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Como o OmniRoute estima, regista e comunica o custo de cada pedido — e por que motivo o
valor apresentado no painel é um **registo de poupanças**, não uma fatura.

Consulte também: [Guia do Utilizador](./USER_GUIDE.md) · [Galeria de Funcionalidades](./FEATURES.md)

---

## O que é (e o que não é)

O OmniRoute atribui um custo em USD por pedido a cada conclusão, multiplicando as contagens
de tokens pelas tarifas do modelo. Estes valores alimentam o painel de **Custos**, os
comandos da CLI `omniroute cost` / `omniroute usage`, as exportações CSV/JSON e os orçamentos
por chave de API.

> **O "custo" apresentado no painel é um registo de poupanças, não uma fatura.** O OmniRoute nunca lhe cobra
> — encaminha os seus pedidos para fornecedores que já tenha associado (as suas próprias
> subscrições, níveis gratuitos e chaves de API). Um "custo total de $290" acumulado inteiramente em modelos
> gratuitos significa que, aproximadamente, **não pagou _$290_** a uma API paga. O valor é uma _estimativa_
> de quanto o mesmo tráfego teria custado aos preços de tabela padrão, para que possa ver onde
> a sua utilização está concentrada e quanto está a poupar ao encaminhar para fornecedores mais baratos/gratuitos.

Este enquadramento é indicado diretamente no [README](../../README.md) do projeto ("o 'custo'
apresentado no painel é um registo de poupanças, não uma fatura").

Como o valor é uma estimativa:

- Depende da tabela de preços que o OmniRoute tem para cada modelo. Um modelo sem uma entrada
  de preço contribui com um custo de `0` (é apresentado como uma linha "Legado / Gratuito" no explorador).
- O tráfego de níveis gratuitos e de subscrições continua a acumular um custo _estimado_ — esse é o
  montante que está a poupar, não um montante em dívida.

---

## Como os custos são estimados

### A origem dos preços

Os custos provêm de uma tabela de preços determinada pela seguinte ordem de precedência
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Substituições do utilizador** — preços que define no painel / através de `PATCH /api/pricing`.
2. **Preços externos sincronizados** — obtidos a partir do ficheiro público
   `model_prices_and_context_window.json` do LiteLLM quando a sincronização está ativada (armazenados num espaço de nomes
   `pricing_synced` separado, para que nunca substituam as suas definições).
3. **Predefinições incorporadas** — incluídas com o OmniRoute.

A sincronização de preços externos é **opcional** e está desativada por predefinição. Variáveis de ambiente relevantes
(consulte [`.env.example`](../../.env.example)):

| Variável de ambiente    | Predefinição | Finalidade                                                                          |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`      | Ativar a sincronização de preços do LiteLLM em segundo plano no arranque.           |
| `PRICING_SYNC_INTERVAL` | `86400`      | Intervalo de sincronização em **segundos** (diário por predefinição).               |
| `PRICING_SYNC_SOURCES`  | `litellm`    | Lista de origens separadas por vírgulas (atualmente, apenas `litellm` é suportado). |

### A fórmula de custo

O custo é calculado por pedido a partir das contagens de tokens e das tarifas por milhão de tokens em
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Tokens de entrada** (excluindo leituras da cache e tokens de criação da cache) × tarifa `input`.
- **Tokens de leitura da cache** × tarifa `cached` (recorre à tarifa de entrada quando não está definida).
- **Tokens de criação da cache** × tarifa `cache_creation` (recorre à tarifa de entrada quando não está definida).
- **Tokens de saída** × tarifa `output`.
- **Tokens de raciocínio** × tarifa `reasoning` (recorre à tarifa de saída quando não está definida).

Todas as tarifas são interpretadas como USD por 1 000 000 de tokens. Um nível de serviço
"fast"/"priority" ou "flex" do Codex aplica um multiplicador de custo (`getCodexFastCostMultiplier`) — por exemplo, o nível flex
é faturado com um desconto de 50% nos tokens, apresentado como **poupanças flex** no painel.

Os nomes dos modelos são primeiro normalizados (os prefixos de caminhos dos fornecedores, como `openai/` ou
`accounts/fireworks/models/`, são removidos), para que os registos históricos continuem a corresponder a um preço.

### Como as despesas são registadas

- O custo por pedido é calculado após a resposta e registado de forma assíncrona, sem esperar pelo resultado, para que
  nunca acrescente latência ao cliente. O consumo da quota partilhada é agendado para o ciclo seguinte
  do event loop através de [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- As despesas das chaves de API são armazenadas temporariamente e descarregadas em lotes pelo
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalo de descarga predefinido de 60 s,
  buffer de 1 000 entradas). Configurável através de:

  | Variável de ambiente                | Predefinição | Finalidade                                        |
  | ----------------------------------- | ------------ | ------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`      | Intervalo de descarga em milissegundos.           |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`       | Máximo de entradas armazenadas antes da descarga. |

Os valores de custo do painel **não** são lidos a partir de um montante monetário armazenado por linha — são
recalculados dinamicamente com base nas contagens de tokens e na tabela de preços atual sempre que o
endpoint de análise é executado. Isto significa que a correção de um preço incorreto (e uma nova sincronização) atualiza
retroativamente as estimativas de custos históricos.

---

## Painel: a página de Custos

A página **Custos** encontra-se em `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
A sua vista principal é o separador **Visão geral dos custos**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
que carrega todos os dados a partir de `GET /api/usage/analytics`.

O que apresenta:

- **Blocos de despesas** — despesas estimadas para _Hoje (1d)_, _7d_, _30d_ e o intervalo
  selecionado. Seletor de intervalo: `7d`, `30d`, `90d`, `all`.
- **Métricas de destaque** — pedidos no intervalo, fornecedores ativos, modelos ativos e
  custo médio por pedido.
- **Explorador de custos** — uma tabela ordenável/filtrável, agrupada por **fornecedor**, **modelo**,
  **chave de API**, **conta** ou **nível de serviço**, com custos, pedidos, tokens, custo
  médio/pedido e percentagem do total.
- **Utilização de tokens** — total de tokens / tokens de entrada / tokens de saída e proporção entre entrada e saída.
- **Eficiência do encaminhamento** — número de fallbacks, taxa de fallback e cobertura do modelo pedido.
- **Previsão mensal** — projeta as despesas até ao final do mês com base na média diária recente.
- **Comparação de períodos** — variação percentual entre a primeira e a segunda metade do intervalo.
- **Gráficos** — tendência diária de custos, quota por fornecedor (circular), principais fornecedores, principais modelos, custo
  por chave de API, custo por conta, padrão de utilização semanal e um mapa de calor da atividade.
- **Exportação** — transfira o intervalo atual como **CSV** ou **JSON** (os botões aparecem
  assim que existam dados de custos diferentes de zero).

Quando não existe tráfego com preço definido, as linhas apresentam a etiqueta "Legacy / Gratuito" em vez de `$0`,
refletindo o modelo do monitorizador de poupanças.

### Subpáginas relacionadas com Custos

A área de Custos também inclui (todas em `/dashboard/costs/`):

- **Preços** (`/dashboard/costs/pricing`) — consulte e substitua os preços por modelo (apresenta
  o separador partilhado de Preços).
- **Orçamento** (`/dashboard/costs/budget`) — defina limites de despesas por âmbito (apresenta o separador
  partilhado de Orçamento).
- **Partilha de quota** (`/dashboard/costs/quota-share`) — conjuntos de quotas partilhadas e vistas da taxa
  de consumo.

---

## Endpoints da API

Todos estes endpoints requerem autenticação de gestão (loopback/JWT, através de `requireManagementAuth`), salvo
indicação em contrário.

### Análise de utilização e custos

| Método | Endpoint                 | Finalidade                                                                                                                                                                          |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Análise completa de custos/utilização: resumo, tendência diária, por fornecedor/modelo/chave de API/conta/nível. Consulta: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Utilização da quota por fornecedor ao longo do tempo. Consulta: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                        |
| `GET`  | `/api/usage/history`     | Linhas do histórico de utilização em bruto.                                                                                                                                         |
| `GET`  | `/api/usage/call-logs`   | Registos de chamadas por pedido (modelo, tokens, custo, latência, estado).                                                                                                          |
| `GET`  | `/api/usage/quota`       | Estado da quota do fornecedor.                                                                                                                                                      |
| `GET`  | `/api/usage/proxy-logs`  | Registos de pedidos do proxy.                                                                                                                                                       |

### Orçamentos

| Método | Endpoint                 | Finalidade                                                                                                        |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Resumo de custos + verificação do orçamento para uma chave de API (parâmetro de consulta `apiKeyId` obrigatório). |
| `POST` | `/api/usage/budget`      | Defina limites diários/semanais/mensais em USD + limiar de aviso para uma chave de API.                           |
| `GET`  | `/api/usage/budget/bulk` | Resumos de orçamentos em massa para várias chaves de API.                                                         |

> A API de orçamento é limitada por **chave de API** (`apiKeyId`). Os limites devolvidos por
> `GET /api/usage/budget` incluem `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> um `warningThreshold` e os totais acumulados (`totalCostToday`, `totalCostMonth`, …).

### Preços

| Método   | Endpoint                | Finalidade                                                                                                                    |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Preços combinados atuais (utilizador + sincronizados + predefinições). `?includeSources=1` para ver a origem de cada entrada. |
| `PATCH`  | `/api/pricing`          | Substitua os preços de `{ provider: { model: { input, output, cached, … } } }`.                                               |
| `DELETE` | `/api/pricing`          | Reponha os preços predefinidos (opcionalmente limitado por `?provider=&model=`).                                              |
| `GET`    | `/api/pricing/defaults` | Apresente as tarifas alternativas predefinidas por 1 milhão.                                                                  |
| `GET`    | `/api/pricing/models`   | Preços indexados por modelo.                                                                                                  |
| `POST`   | `/api/pricing/sync`     | Acione uma sincronização manual a partir de fontes externas (LiteLLM).                                                        |
| `GET`    | `/api/pricing/sync`     | Estado atual da sincronização.                                                                                                |
| `DELETE` | `/api/pricing/sync`     | Limpe todos os dados de preços sincronizados.                                                                                 |

### Outros endpoints relevantes para os custos

| Método | Endpoint                      | Finalidade                                                                             |
| ------ | ----------------------------- | -------------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Totais de tokens de modelos gratuitos, utilização deste mês e saldo gratuito restante. |
| `GET`  | `/api/quota/pools/[id]/usage` | Utilização de um conjunto de quota partilhada.                                         |

---

## CLI

A CLI do OmniRoute disponibiliza comandos de custos, utilização e preços (registados em
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Um relatório de custos agregado a partir de `/api/usage/analytics`.

```bash
omniroute cost                          # últimos 30 dias, agrupados por fornecedor
omniroute cost --period 7d              # últimos 7 dias
omniroute cost --group-by model         # agrupar por provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Colunas: grupo, pedidos, tokens de entrada/saída, custo (USD) e % do total. No final, é apresentada
uma linha com o total geral (suprimida com `--quiet` ou `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # resumo de custos por fornecedor
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

> `pricing defaults show` lê `GET /api/pricing/defaults`. Para editar os preços de modelos
> individuais, utilize a página **Preços** do painel ou `PATCH /api/pricing`.

---

## Resolução de problemas

- **Todos os custos apresentam $0 / "Legacy / Free".** Os modelos utilizados não têm uma entrada de preços.
  Ative a sincronização externa (`PRICING_SYNC_ENABLED=true`) e execute `omniroute pricing sync`, ou
  defina os preços manualmente através da página Preços / `PATCH /api/pricing`.
- **O preço de um modelo histórico está incorreto.** Corrija o preço (substitua-o ou volte a sincronizar) — o custo é
  recalculado a partir das contagens de tokens em cada leitura analítica, pelo que as estimativas são atualizadas retroativamente.
- **Os gastos apresentam um atraso em relação ao tempo real.** Os gastos por chave são processados em lote; reduza
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` se precisar de valores mais atualizados.

---

Para saber como esta funcionalidade se enquadra no painel mais abrangente, consulte o [Guia do Utilizador](./USER_GUIDE.md) e
a [Galeria de Funcionalidades](./FEATURES.md).
