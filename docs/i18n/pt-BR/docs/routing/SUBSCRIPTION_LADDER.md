# Subscription-first routing (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dois novos ids `auto/*` — `auto/subscription` e `auto/thrifty`. Ambos são opt-in por meio de
> solicitação: nada é roteado por eles, a menos que um chamador solicite o id pelo nome, e
> nenhum pool, estratégia ou padrão existente é alterado.

## Por que isso existe

O OmniRoute já responde a duas perguntas sobre custo, e nenhuma delas é a que a maioria dos operadores faz.

| Mecanismo existente                                      | Responde                                      |
| -------------------------------------------------------- | --------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "este modelo está catalogado como gratuito?"  |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "esta conexão pode gerar cobranças?"          |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "esta conexão está próxima do seu limite?"    |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "limitar gastos, degradar para o mais barato" |

Todo mecanismo exclusivo para opções gratuitas **falha de forma fechada** — um pool gratuito esgotado é um pool vazio, nunca
um avanço para uma opção paga — e todo mecanismo do lado pago é independente de nível. Nenhum deles responde:

> "Use a cota pela qual eu já pago. Quando ela acabar, pare ou suba um degrau por vez,
> passando pelas opções pagas mais baratas — e volte assim que ela for redefinida."

## A cobrança é uma característica da conexão, não do modelo

`classifyTier()` (`open-sse/services/tierResolver.ts`) usa `(provider, model)` como chave e retorna
`free | cheap | premium` com base nos preços do catálogo. Porém, o fato de uma solicitação gerar custo incremental
depende de **qual conexão a atende**: o mesmo modelo está incluído no plano por meio de uma conexão OAuth
do Claude Code e é cobrado por token por meio de uma conexão com chave de API.

`provider_connections.auth_type` não é um proxy seguro em nenhuma direção — existem conexões OAuth
tarifadas e conexões com chave de API incluídas em planos (um token de licença do Copilot não é uma
chave de API tarifada). Portanto, a classe de cobrança vem de um **catálogo selecionado**,
`open-sse/config/connectionBillingCatalog.ts`, configurado manualmente com base nos termos publicados de cada provedor —
o mesmo padrão que `FreeModelBudget.hardStopGuaranteed` já estabeleceu para modelos gratuitos.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ordem de resolução (`autoCombo/connectionBilling.ts`): o sentinela sintético sem autenticação →
`keyless`; uma entrada de catálogo correspondente ao provedor **e** ao `authType`; uma entrada aplicável
ao provedor inteiro; caso contrário, `unknown`. **Não catalogado não significa gratuito** — `unknown` é tratado como `metered`
em todos os lugares, portanto, um provedor adicionado amanhã começa fora do degrau de assinatura e precisa ser
deliberadamente incluído no catálogo.

## O modelo de degraus

Cinco degraus em ordem de escalonamento. Eles diferem em mais do que preço — cada um tem seu **próprio**
sinal de esgotamento, razão pela qual isso não é apenas uma ordenação.

| #   | Degrau         | Associação                                       | Esgotado quando                         |
| --- | -------------- | ------------------------------------------------ | --------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` selecionado            | janela de cota no limite ou abaixo dele |
| 1   | `keyless`      | o caminho sintético sem autenticação             | cooldown / disjuntor da conexão         |
| 2   | `free`         | conexão tarifada, `classifyTier() === "free"`    | franquia gratuita esgotada              |
| 3   | `cheap`        | conexão tarifada, `classifyTier() === "cheap"`   | orçamento por degrau consumido          |
| 4   | `premium`      | conexão tarifada, `classifyTier() === "premium"` | orçamento por degrau consumido          |

Os degraus 0-2 se esgotam com base na **cota**, que é observável e já é monitorada. Os degraus 3-4 não têm
cota — uma conexão paga atende indefinidamente — portanto, seu único sinal de esgotamento sensato é um
**orçamento** por degrau. Sem isso, "escalonar quando o nível barato estiver esgotado" não tem um gatilho.

## `auto/subscription` — falhar de forma fechada

Pool = apenas o degrau 0, restrito a conexões cujo excedente seja um `hard-stop` documentado, cada uma verificada em tempo real quanto à disponibilidade de cota. Tudo que for ambíguo é excluído: um provedor não curado, uma leitura de cota não verificável, uma leitura desatualizada ou um excedente que seja contabilizado como pago.

Um pool vazio é a resposta **esperada**, não um defeito — o fluxo existente de pool vazio do chamador o transforma em um erro claro, em vez de um fallback silencioso e faturável. Essa é toda a garantia do id.

`keyless` deliberadamente **não** se qualifica: esse agrupamento significa "o plano pelo qual eu pago", portanto um backend sem autenticação não pertence a ele. Use `auto/thrifty` (ou `auto/best-free`) para isso.

### Segurança das conexões

Um candidato nem sempre está vinculado a uma única conexão — um candidato lógico carrega uma allowlist `allowedConnectionIds`, e a conta realmente usada é escolhida posteriormente, no despacho, por `open-sse/services/combo/autoStrategy.ts`. Portanto, ambos os agrupamentos verificam **cada conexão individualmente** e reescrevem `allowedConnectionIds` para conter exatamente o subconjunto sobrevivente — nunca a lista original completa, nunca um membro escolhido arbitrariamente. Como `autoStrategy.ts` já aplica esse array como uma allowlist rígida, reescrevê-lo aqui faz com que "verificado" e "realmente usado" sejam o mesmo conjunto por construção. Essa é a mesma invariante, e o mesmo raciocínio, de [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — subir um degrau por vez

Pool = todos os degraus, ordenados pelo índice do degrau, com os candidatos esgotados excluídos. O mecanismo `auto` ainda pontua **dentro** do pool sobrevivente: a escada decide quais degraus participam, enquanto a pontuação decide qual candidato vence dentro deles. A ordenação é estável dentro de um degrau, portanto o ranking próprio do pontuador nunca é reorganizado por essa sobreposição.

Essa é uma sobreposição de ordenação + filtragem, **não** um novo dispatcher: o loop especulativo de `combo.ts` já percorre os destinos em ordem e avança para o próximo em caso de falha, portanto um esgotamento em tempo de execução que a pré-verificação não detectou ainda faz a escalada para o próximo degrau dentro da mesma requisição.

Enquanto `auto/subscription` falha de forma **fechada**, `auto/thrifty` falha de forma **aberta**: uma conexão incluída no plano sem uma leitura de cota utilizável ainda é tentada primeiro. Tentar usá-la não custa nada e, caso esteja esgotada, o avanço em caso de falha alcança o próximo degrau de qualquer maneira — ao passo que recusar-se a tentá-la enviaria a requisição para um degrau pago devido à ausência de telemetria, exatamente o resultado que o agrupamento existe para evitar.

## Retorno ao plano após uma redefinição

Três coisas independentes precisam expirar antes que o roteamento retorne ao degrau 0. Corrigir apenas uma delas deixa a escada presa em degraus pagos muito tempo depois de o plano ter sido reabastecido.

1. **O cache de estado da cota** — `freeAccessQuota.ts` armazena em cache por `(provider, connection)` com um TTL de 180s. Uma entrada em cache cujo próprio `resetAt` já passou descreve uma janela que não existe mais, portanto agora é tratada como desatualizada **independentemente da idade** e força uma atualização. Sem isso, um plano reabastecido à meia-noite continua aparecendo como esgotado até que o TTL finalmente expire.
2. **O estado da própria escada** — não há nenhum, por design. A elegibilidade dos degraus é recalculada com base no estado de cota em tempo real a cada construção do pool; não existe nenhum registro persistido de "atualmente no degrau 3" que possa sobreviver a uma redefinição e travar o roteamento.
3. **O cooldown da conexão** — o 429 causado pelo esgotamento define `rateLimitedUntil` com base no backoff exponencial, que, para uma conexão de plano, pode ultrapassar a redefinição real. `clampCooldownToReset()` (`subscriptionLadder.ts`) limita um cooldown ao instante de redefinição do upstream e nunca pode estendê-lo. **Ele está implementado e testado, mas ainda não está conectado**: o cache de cota é invalidado em `src/sse/services/auth.ts` _antes_ que qualquer cooldown seja gravado, portanto `resetAt` precisa ser capturado mais cedo nessa função — uma alteração no caminho crítico de resiliência que deve ficar em seu próprio PR revisado. Até lá, a reentrada aguarda o cooldown da conexão terminar (o qual já dá preferência às indicações `Retry-After` do upstream quando o provedor as envia).

### Anti-oscilação

Um degrau que acabou de ser redefinido só é readmitido acima de `reentryMinRemainingPercent` (padrão 5), enquanto uma conexão que já está em uso só precisa permanecer acima de `exitCutoffPercent` (padrão 2, correspondente a `quotaPreflight.defaultThresholdPercent`). A diferença é a faixa de histerese — sem ela, uma conexão próxima ao limite oscila entre degraus em requisições consecutivas.

## Configuração

Apenas ajustes. Deliberadamente, **não** há uma flag `enabled`: uma opção capaz de desativá-los
deixaria `auto/subscription` servindo silenciosamente o pool completo — incluindo modelos pagos — sob um
nome que promete o contrário.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 desativa completamente um degrau
  },
}
```

O bloqueio por orçamento permanece inerte até que um resolvedor de gastos seja conectado: sem contabilização disponível, um
degrau pago é ordenado, mas nunca bloqueado. A partir da v3.8.51, a configuração `rungBudgetUsd` é aceita pelo
schema, mas ainda NÃO é aplicada — trate-a como uma configuração reservada, não como um limite de gastos ativo. A ordenação dos degraus, o esgotamento baseado em cota e a reentrada após a redefinição
funcionam sem ela.

## Composição

`subscription` e `thrifty` são valores de `AutoTier`, portanto são combináveis com todas as categorias:
`auto/coding:thrifty`, `auto/reasoning:subscription` e assim por diante. Os dois ids simples
(`auto/subscription`, `auto/thrifty`) são anunciados em `/v1/models` e no painel.

Nenhum dos ids pertence à categoria paga, portanto `isPaidTierAutoId()` retorna `false` para ambos, e
`auto/subscription` permanece disponível com `hidePaidModels`.

## Onde o código está localizado

| Aspecto                                       | Arquivo                                             |
| --------------------------------------------- | --------------------------------------------------- |
| Dados selecionados de cobrança                | `open-sse/config/connectionBillingCatalog.ts`       |
| Classificador                                 | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Degraus, ambos os agrupamentos e reentrada    | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integração ao pool de candidatos              | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Obsolescência do cache sensível à redefinição | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Superfície de níveis                          | `open-sse/services/autoCombo/suffixComposition.ts`  |
| IDs anunciados                                | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testes                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
