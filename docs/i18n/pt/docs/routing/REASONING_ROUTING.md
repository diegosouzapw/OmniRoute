# Reasoning Routing (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

As regras de encaminhamento de raciocínio alargam o encaminhamento existente de modelos e combos. Quando nenhuma regra ativa corresponde,
o comportamento existente de pensamento, sufixo, predefinição da ligação e tradução do fornecedor permanece
inalterado.

## Gestão

A gestão de regras está disponível em **Definições → Encaminhamento global**. O editor de chaves de API disponibiliza a
mesma interface de gestão, filtrada para a chave selecionada.

A API de gestão é exposta por estas rotas:

- `GET` e `POST` em `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` e `DELETE` em `/api/settings/reasoning-routing-rules/[id]`
- `POST` em `/api/settings/reasoning-routing-rules/simulate`

Todas as rotas utilizam `requireManagementAuth`. As entradas são validadas com os esquemas em
`src/shared/validation/schemas/reasoningRouting.ts`. O simulador nunca efetua uma chamada a montante.

## Resolução de regras

A avaliação inicial seleciona exatamente uma regra. Os âmbitos são verificados por esta ordem:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Dentro de um âmbito, a `priority` mais elevada prevalece primeiro, seguida de uma correspondência exata do modelo em detrimento de um padrão glob,
e depois de uma ordenação estável por `createdAt` e `id`. As `requestTags` são lidas exclusivamente de `metadata.tags`
e suportam correspondência `any` ou `all`.

Uma regra de `connection` só é avaliada quando nenhuma regra inicial prevaleceu e já tiver sido
selecionada uma ligação concreta ao fornecedor. Só pode alterar o esforço e o orçamento.

## Esforço e orçamento

`sourceEffort` aceita `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` e
`ultra`. `missing` significa que o pedido não contém um esforço discreto, uma opção de pensamento
nem um orçamento de pensamento. Por conseguinte, um sinal apenas de orçamento só corresponde a `any`.

`effortMode` tem três variantes:

- `inherit` mantém o esforço do cliente, permitindo ainda que o modelo ou combo seja alterado.
- `default` define `targetEffort` apenas quando não está presente nenhum sinal explícito de raciocínio.
- `force` substitui o esforço discreto por `targetEffort`.

Independentemente, `budgetAction` pode ser `preserve`, `remove` ou `set`. `force` com `none` remove
todos os campos reconhecidos de esforço e orçamento. `none` em conjunto com `set` é inválido.

Os pedidos destinados a modelos conhecidos como incompatíveis são rejeitados antes da chamada a montante. Para alvos de combo,
as entradas incompatíveis são removidas; se nenhuma permanecer, o pedido devolve o estado `400`.
Dados de capacidades desconhecidos geram um aviso e mantêm a regra ativa.

## Segurança e transportes

O modelo de origem e de destino, ou o combo de origem e de destino, continuam sujeitos à política existente da chave de API.
Uma regra de raciocínio nunca alarga as permissões de modelo, combo ou quota.

O motor está integrado em Chat Completions, Responses, Anthropic Messages e no percurso interno
do WebSocket do Codex. O percurso do WebSocket aceita apenas modelos de destino do Codex; os alvos de combo não podem ser
executados nesse percurso. A decisão da regra é armazenada no rastreio de rota existente sem segredos.

## Persistência

A migração `src/lib/db/migrations/126_reasoning_routing_rules.sql` cria a tabela
`reasoning_routing_rules`. As regras referenciam chaves de API, combos e ligações a fornecedores armazenados.
As eliminações removem as regras relacionadas. A camada de acesso à base de dados em
`src/lib/db/reasoningRoutingRules.ts` mantém uma cache invalidável para o percurso do pedido.

As regras são incluídas nas cópias de segurança do SQLite, na exportação completa da base de dados e no pacote de sincronização da configuração.
`reconcileReasoningRulesForSync` desativa as regras importadas com referências em falta e comunica esses
conflitos.
