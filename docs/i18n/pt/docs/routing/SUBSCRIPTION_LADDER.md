# Subscription-first routing (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dois novos ids `auto/*` — `auto/subscription` e `auto/thrifty`. Ambos são ativados explicitamente ao serem
> solicitados: nada é encaminhado através deles, a menos que um chamador peça o id pelo nome, e nenhum
> pool, estratégia ou valor predefinido existente é alterado.

## Por que razão isto existe

O OmniRoute já responde a duas perguntas sobre custos, mas nenhuma delas é aquela que a maioria dos operadores coloca.

| Mecanismo existente                                      | Responde a                                       |
| -------------------------------------------------------- | ------------------------------------------------ |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "este modelo está catalogado como gratuito?"     |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "esta ligação poderá alguma vez ser-me cobrada?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "esta ligação está próxima do seu limite?"       |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "limitar a despesa, descer para o mais barato"   |

Todos os mecanismos exclusivamente gratuitos **falham de forma fechada** — um pool gratuito esgotado é um pool vazio, nunca uma
subida para uma opção paga — e todos os mecanismos do lado pago ignoram os níveis. Nenhum deles responde:

> "Utilizar a quota que já pago. Quando se esgotar, parar ou subir um nível de cada vez pelas
> opções pagas mais baratas — e regressar assim que a quota for reposta."

## A faturação é uma característica da ligação, não do modelo

`classifyTier()` (`open-sse/services/tierResolver.ts`) usa `(provider, model)` como chave e devolve
`free | cheap | premium` com base nos preços do catálogo. No entanto, o facto de um pedido ter um custo incremental
depende de **qual é a ligação que o serve**: o mesmo modelo está incluído no plano através de uma ligação OAuth do Claude Code
e é faturado por token através de uma ligação com chave de API.

`provider_connections.auth_type` não é um indicador seguro em nenhum dos sentidos — existem ligações OAuth
com faturação por utilização e ligações com chave de API incluídas num plano (um token de licença do Copilot não é uma
chave de API com faturação por utilização). Por isso, a classe de faturação provém de um **catálogo mantido manualmente**,
`open-sse/config/connectionBillingCatalog.ts`, definido manualmente com base nos termos publicados por cada fornecedor —
o mesmo padrão que `FreeModelBudget.hardStopGuaranteed` já estabeleceu para os modelos gratuitos.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ordem de resolução (`autoCombo/connectionBilling.ts`): o sentinela sintético sem autenticação →
`keyless`; uma entrada de catálogo que corresponda ao fornecedor **e** a `authType`; uma entrada aplicável a todo o fornecedor;
caso contrário, `unknown`. **Não catalogado não significa gratuito** — `unknown` é tratado como `metered`
em todo o lado, pelo que um fornecedor adicionado amanhã começa fora do nível de subscrição e tem de ser
deliberadamente incluído no catálogo.

## O modelo de níveis

Cinco níveis por ordem de escalada. Diferem em mais do que o preço — cada um tem o **seu próprio**
sinal de esgotamento, razão pela qual isto não é apenas uma ordenação.

| #   | Nível          | Inclusão                                          | Esgotado quando                           |
| --- | -------------- | ------------------------------------------------- | ----------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` mantido no catálogo     | janela de quota no limite ou abaixo dele  |
| 1   | `keyless`      | o caminho sintético sem autenticação              | suspensão temporária/disjuntor da ligação |
| 2   | `free`         | ligação `metered`, `classifyTier() === "free"`    | franquia gratuita esgotada                |
| 3   | `cheap`        | ligação `metered`, `classifyTier() === "cheap"`   | orçamento por nível consumido             |
| 4   | `premium`      | ligação `metered`, `classifyTier() === "premium"` | orçamento por nível consumido             |

Os níveis 0–2 esgotam-se com base na **quota**, que é observável e já é monitorizada. Os níveis 3–4 não têm
quota — uma ligação paga continua a servir indefinidamente — pelo que o único sinal de esgotamento sensato é um
**orçamento** por nível. Sem isso, "escalar quando o nível barato estiver esgotado" não tem qualquer condição de ativação.

## `auto/subscription` — falhar de forma fechada

Conjunto = apenas o degrau 0, restrito a ligações cuja utilização excedentária seja um
`hard-stop` documentado, cada uma verificada em tempo real quanto à existência de quota disponível.
Tudo o que for ambíguo é excluído: um fornecedor não validado, uma leitura de quota não verificável,
uma leitura desatualizada ou uma utilização excedentária que seja contabilizada como paga.

Um conjunto vazio é a resposta **pretendida**, não um defeito — o caminho existente do chamador
para conjuntos vazios transforma-o num erro claro, em vez de recorrer silenciosamente a uma
alternativa faturável. Essa é toda a garantia deste id.

`keyless` deliberadamente **não** se qualifica: este agrupamento significa «o plano pelo qual pago»,
pelo que um backend sem autenticação não pertence a este grupo. Utilize `auto/thrifty` (ou
`auto/best-free`) para esse efeito.

### Segurança das ligações

Um candidato nem sempre está associado a uma única ligação — um candidato lógico contém uma
lista de permissões `allowedConnectionIds`, e a conta efetivamente utilizada é escolhida mais
tarde, no momento do envio, por `open-sse/services/combo/autoStrategy.ts`. Por conseguinte, ambos
os agrupamentos verificam **cada ligação individualmente** e reescrevem `allowedConnectionIds`
para conter exatamente o subconjunto sobrevivente — nunca a lista original completa, nem um
membro escolhido arbitrariamente. Uma vez que `autoStrategy.ts` já aplica esse array como uma
lista de permissões estrita, reescrevê-lo aqui faz com que «verificado» e «efetivamente utilizado»
sejam, por construção, o mesmo conjunto. Esta é a mesma invariante, e o mesmo raciocínio, que em
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — subir um degrau de cada vez

Conjunto = todos os degraus, ordenados pelo índice do degrau, com os candidatos esgotados
excluídos. O motor `auto` continua a pontuar **dentro** do conjunto sobrevivente: a escada decide
que degraus entram em jogo e a pontuação decide que candidato vence dentro deles. A ordenação é
estável dentro de cada degrau, pelo que a classificação própria do mecanismo de pontuação nunca
é reorganizada por esta camada.

Esta é uma camada de ordenação + controlo de acesso, **não** um novo despachante: o ciclo
especulativo de `combo.ts` já percorre os destinos por ordem e avança em caso de falha, pelo que
um esgotamento em tempo de execução que a pré-verificação não tenha detetado continua a provocar
a subida para o degrau seguinte dentro do mesmo pedido.

Enquanto `auto/subscription` falha de forma **fechada**, `auto/thrifty` falha de forma **aberta**:
uma ligação incluída no plano sem uma leitura de quota utilizável continua a ser tentada primeiro.
Tentá-la não tem qualquer custo e, se afinal estiver esgotada, o mecanismo de avanço chega ao
degrau seguinte — ao passo que recusar tentá-la enviaria o pedido para um degrau pago devido à
ausência de telemetria, precisamente o resultado que este agrupamento existe para evitar.

## Regresso ao plano após uma reposição

Três elementos independentes têm de expirar antes de o encaminhamento regressar ao degrau 0.
Corrigir apenas um deles deixa a escada presa em degraus pagos muito depois de o plano ter sido
reabastecido.

1. **A cache do estado da quota** — `freeAccessQuota.ts` mantém uma cache por
   `(provider, connection)` com um TTL de 180s. Uma entrada em cache cujo próprio `resetAt` já
   tenha passado descreve uma janela que já não existe, pelo que passa a ser considerada
   desatualizada **independentemente da idade** e força uma atualização. Sem isto, um plano
   reabastecido à meia-noite continua a aparecer como esgotado até o TTL eventualmente expirar.
2. **O estado da própria escada** — por definição, não existe. A elegibilidade dos degraus é
   recalculada a partir do estado da quota em tempo real sempre que o conjunto é construído; não
   existe qualquer registo persistente de «atualmente no degrau 3» que possa sobreviver a uma
   reposição e bloquear o encaminhamento.
3. **O período de espera da ligação** — o erro 429 que indica o esgotamento define
   `rateLimitedUntil` a partir de um recuo exponencial que, no caso de uma ligação do plano, pode
   ultrapassar a reposição real. `clampCooldownToReset()` (`subscriptionLadder.ts`) limita um
   período de espera ao instante de reposição do próprio serviço upstream e nunca pode
   prolongá-lo. **Está implementado e testado, mas ainda não está integrado**: a cache de quota é
   invalidada em `src/sse/services/auth.ts` _antes_ de qualquer período de espera ser registado,
   pelo que `resetAt` tem de ser capturado mais cedo nessa função — uma alteração ao caminho
   crítico de resiliência que deve ser incluída no seu próprio PR sujeito a revisão. Até lá, a
   reentrada aguarda pelo fim do período de espera da ligação (que já dá preferência às
   indicações upstream de `Retry-After` quando o fornecedor as envia).

### Anti-oscilação

Um degrau que acabou de ser reposto só volta a ser admitido acima de
`reentryMinRemainingPercent` (predefinição de 5), enquanto uma ligação já em utilização apenas
tem de se manter acima de `exitCutoffPercent` (predefinição de 2, correspondente a
`quotaPreflight.defaultThresholdPercent`). O intervalo entre ambos constitui a banda de
histerese — sem ela, uma ligação que permaneça junto do limite oscila entre degraus em pedidos
consecutivos.

## Configuração

Apenas afinação. Deliberadamente, **não** existe nenhum sinalizador `enabled`: uma opção capaz de os desativar
deixaria `auto/subscription` a disponibilizar silenciosamente o conjunto completo — incluindo modelos pagos — sob um
nome que promete o contrário.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 desativa totalmente um patamar
  },
}
```

A restrição por orçamento permanece inativa até ser associado um mecanismo de resolução de despesas: sem contabilidade disponível, um
patamar pago é ordenado, mas nunca restringido. A partir da v3.8.51, a definição `rungBudgetUsd` é aceite pelo
esquema, mas ainda NÃO é aplicada — considere-a uma configuração reservada, não um limite de despesas ativo. A ordenação dos patamares, o esgotamento baseado na quota e a reentrada após a reposição
funcionam sem esta definição.

## Composição

`subscription` e `thrifty` são valores `AutoTier`, pelo que podem ser combinados com qualquer categoria:
`auto/coding:thrifty`, `auto/reasoning:subscription` e assim por diante. Os dois ids simples
(`auto/subscription`, `auto/thrifty`) são anunciados em `/v1/models` e no painel.

Nenhum dos ids pertence ao nível pago, pelo que `isPaidTierAutoId()` devolve `false` para ambos e
`auto/subscription` não é removido por `hidePaidModels`.

## Localização do código

| Aspeto                                       | Ficheiro                                            |
| -------------------------------------------- | --------------------------------------------------- |
| Dados de faturação selecionados              | `open-sse/config/connectionBillingCatalog.ts`       |
| Classificador                                | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Patamares, ambos os agrupamentos e reentrada | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integração no conjunto de candidatos         | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Obsolescência da cache sensível a reposições | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Superfície dos níveis                        | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ids anunciados                               | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testes                                       | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
