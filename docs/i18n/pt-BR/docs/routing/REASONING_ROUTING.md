# Reasoning Routing (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

As regras de roteamento de raciocínio ampliam o roteamento existente de modelos e combos. Quando nenhuma regra ativa corresponde,
os comportamentos existentes de raciocínio, sufixo, padrão de conexão e tradução de provedor permanecem
inalterados.

## Gerenciamento

O gerenciamento de regras está disponível em **Configurações → Roteamento global**. O editor de chaves de API oferece a
mesma interface de gerenciamento filtrada pela chave selecionada.

A API de gerenciamento é disponibilizada por estas rotas:

- `GET` e `POST` em `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` e `DELETE` em `/api/settings/reasoning-routing-rules/[id]`
- `POST` em `/api/settings/reasoning-routing-rules/simulate`

Todas as rotas usam `requireManagementAuth`. As entradas são validadas com os esquemas em
`src/shared/validation/schemas/reasoningRouting.ts`. O simulador nunca faz uma chamada upstream.

## Resolução de regras

A avaliação antecipada seleciona exatamente uma regra. Os escopos são verificados nesta ordem:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Dentro de um escopo, a maior `priority` vence primeiro, seguida por uma correspondência exata de modelo em vez de um padrão glob
e, depois, pela ordenação estável de `createdAt` e `id`. As `requestTags` são lidas exclusivamente de `metadata.tags`
e permitem correspondência por `any` ou `all`.

Uma regra de `connection` é avaliada somente quando nenhuma regra antecipada venceu e uma conexão concreta com o provedor já
foi selecionada. Ela pode alterar apenas o esforço e o orçamento.

## Esforço e orçamento

`sourceEffort` aceita `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` e
`ultra`. `missing` significa que a solicitação não contém esforço discreto, alternância de raciocínio
nem orçamento de raciocínio. Portanto, um sinal somente de orçamento corresponde apenas a `any`.

`effortMode` tem três variantes:

- `inherit` mantém o esforço do cliente e ainda permite que o modelo ou combo seja alterado.
- `default` define `targetEffort` somente quando nenhum sinal explícito de raciocínio está presente.
- `force` substitui o esforço discreto por `targetEffort`.

Independentemente disso, `budgetAction` pode ser `preserve`, `remove` ou `set`. `force` com `none` remove
todos os campos reconhecidos de esforço e orçamento. `none` junto com `set` é inválido.

As solicitações direcionadas a modelos conhecidos como incompatíveis são rejeitadas antes da chamada upstream. Para destinos de
combo, as entradas incompatíveis são removidas; se nenhuma permanecer, a solicitação retornará o status `400`.
Dados de capacidade desconhecidos geram um aviso e mantêm a regra ativa.

## Segurança e transportes

O modelo de origem e de destino, ou o combo de origem e de destino, continuam sujeitos à política existente da chave de API.
Uma regra de raciocínio nunca amplia as permissões de modelo, combo ou cota.

O mecanismo está integrado a Chat Completions, Responses, Anthropic Messages e ao caminho interno
do Codex via WebSocket. O caminho via WebSocket aceita apenas modelos Codex como destino; destinos de combo não podem ser
executados por ele. A decisão da regra é armazenada no rastreamento de rota existente sem informações secretas.

## Persistência

A migração `src/lib/db/migrations/126_reasoning_routing_rules.sql` cria a tabela
`reasoning_routing_rules`. As regras fazem referência a chaves de API, combos e conexões de provedor armazenados.
As exclusões removem as regras relacionadas. A camada de acesso ao banco de dados em
`src/lib/db/reasoningRoutingRules.ts` mantém um cache invalidável para o caminho da solicitação.

As regras são incluídas nos backups do SQLite, na exportação completa do banco de dados e no pacote de sincronização de configurações.
`reconcileReasoningRulesForSync` desabilita regras importadas com referências ausentes e relata esses
conflitos.
