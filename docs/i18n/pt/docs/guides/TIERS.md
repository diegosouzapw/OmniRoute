# OmniRoute Tiers — User Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

O OmniRoute organiza os 352 fornecedores suportados em 3 níveis económicos. Cada
pedido passa por eles sequencialmente até que um responda com sucesso — obtém
a resposta viável mais barata sem nunca ter de escrever código de fallback.

## Nível 1 — Subscrição

**Fornecedores que já paga.** O OmniRoute utiliza toda a quota disponível antes
de esta expirar.

| Fornecedor                        | Porquê o Nível 1                                            |
| --------------------------------- | ----------------------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — preço fixo, muitas vezes não utilizado |
| OpenAI Codex (subscrição ChatGPT) | Plus/Team inclui quota do Codex                             |
| GitHub Copilot                    | Por utilizador — a quota é reposta mensalmente              |
| Cursor IDE                        | Quota do plano Pro                                          |
| Antigravity / Devin Desktop       | Quotas integradas                                           |

**Estratégia**: encaminhe primeiro para este nível todos os pedidos adequados aos
pontos fortes do modelo. O monitor de quotas acompanha as reposições iminentes,
e a estratégia de combinação `reset-aware` define as prioridades em conformidade.
Para encaminhar primeiro para o Nível 1 e só recorrer a níveis pagos à medida que
a quota se esgota, utilize o identificador `auto/thrifty` — ou `auto/subscription`
para permanecer dentro da capacidade incluída no plano e falhar sem recorrer a
outros níveis. Consulte
[Encaminhamento com prioridade à subscrição](../routing/SUBSCRIPTION_LADDER.md).

## Nível 2 — Económico

**Fornecedores pagos por token abaixo de $1/1M tokens.** Reservados para trabalho
de grande volume ou para quando as quotas do Nível 1 atingem os respetivos limites.

| Fornecedor                       | Preço (entrada/saída) | Pontos fortes                 |
| -------------------------------- | --------------------- | ----------------------------- |
| DeepSeek V4 Pro                  | $0.27 / $1.10 por 1M  | Código, raciocínio            |
| GLM-4.5                          | $0.60 / $2.20 por 1M  | Contexto longo                |
| MiniMax M1                       | $0.20 / $1.10 por 1M  | Velocidade                    |
| Qwen Coder                       | $0.30 / $1.20 por 1M  | Código                        |
| OpenRouter (otimizado por preço) | variável              | Mais de 100 modelos, dinâmico |

**Estratégia**: a combinação `cost-optimized` seleciona o modelo com o menor
custo por token que cumpre o filtro de capacidades da tarefa (visão, modo JSON,
ferramentas, contexto máximo).

## Nível 3 — Gratuito

**Fornecedores sem custos** — planos gratuitos, programas de créditos, quotas
diárias OAuth.

| Fornecedor       | Quota gratuita / créditos                            |
| ---------------- | ---------------------------------------------------- |
| Kiro AI          | Plano Claude gratuito (utilização razoável generosa) |
| OpenCode Free    | Sem autenticação, limites de utilização generosos    |
| Qoder            | OAuth gratuito                                       |
| Google Vertex AI | $300 em créditos para novas contas                   |
| Amazon Q         | Plano gratuito para utilizadores da AWS              |
| Pollinations     | API pública aberta                                   |
| Cloudflare AI    | Plano gratuito do Workers AI                         |

**Estratégia**: a combinação `auto` com limite de orçamento encaminha para este
nível quando os Níveis 1 e 2 falham ou quando `useFreeOnly=true` está definido.
Os fornecedores gratuitos têm frequentemente limites de utilização mais
restritivos — o disjuntor recupera-os após o período de espera.

## Configurar os níveis

Painel → **Níveis** → atribua os seus fornecedores. As predefinições (de
`tierDefaults.json`) são adequadas; edite-as quando tiver subscrições específicas
que pretenda priorizar ou fornecedores que queira excluir.

A pontuação de 16 fatores do Auto-Combo também tem em conta o nível. Consulte
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetria

Painel → **Utilização** mostra os tokens gastos por nível e por dia. Utilize esta
informação para:

- Confirmar que o Nível 1 é totalmente utilizado (caso contrário, está a desperdiçar o valor da subscrição)
- Identificar os modelos do Nível 2 mais selecionados (consolidar para 1 ou 2)
- Verificar se o Nível 3 permite poupar dinheiro em cargas de trabalho de teste/exploração

## Padrões comuns

### Carga de trabalho totalmente gratuita

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Favorece fortemente o Nível 3; só utiliza o Nível 2 se o Nível 3 não estiver
disponível.

### Subscrição primeiro, com fallback económico

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Lista ordenada explícita correspondente a Nível 1 → Nível 2 → Nível 3.
