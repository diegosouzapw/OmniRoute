# OmniRoute Tiers — User Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

O OmniRoute organiza os 352 provedores compatíveis em 3 níveis econômicos. Cada
solicitação passa por eles em ordem até que um retorne com sucesso — você
obtém a resposta viável mais barata sem precisar escrever código de fallback.

## Nível 1 — Assinatura

**Provedores pelos quais você já paga.** O OmniRoute utiliza toda a cota antes
que ela expire.

| Provedor                          | Por que está no Nível 1                                       |
| --------------------------------- | ------------------------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — preço fixo, frequentemente não utilizado |
| OpenAI Codex (assinatura ChatGPT) | Plus/Team inclui cota do Codex                                |
| GitHub Copilot                    | Por usuário — a cota é redefinida mensalmente                 |
| Cursor IDE                        | Cota do plano Pro                                             |
| Antigravity / Devin Desktop       | Cotas integradas                                              |

**Estratégia**: roteie primeiro para este nível todas as solicitações compatíveis
com os pontos fortes do modelo. O rastreador de cotas monitora as próximas
redefinições, e a estratégia combinada `reset-aware` prioriza de acordo com elas.
Para rotear primeiro ao Nível 1 e só recorrer aos níveis pagos quando a cota
acabar, use o ID `auto/thrifty` — ou `auto/subscription` para permanecer na
capacidade incluída no plano e falhar sem recorrer a outros níveis. Consulte
[Roteamento priorizando assinaturas](../routing/SUBSCRIPTION_LADDER.md).

## Nível 2 — Econômico

**Provedores com pagamento por token abaixo de US$ 1 por 1 milhão de tokens.**
Reservado para trabalhos de alto volume ou para quando as cotas do Nível 1
atingirem seus limites.

| Provedor                         | Preço (entrada/saída)            | Pontos fortes                 |
| -------------------------------- | -------------------------------- | ----------------------------- |
| DeepSeek V4 Pro                  | US$ 0,27 / US$ 1,10 por 1 milhão | Código, raciocínio            |
| GLM-4.5                          | US$ 0,60 / US$ 2,20 por 1 milhão | Contexto longo                |
| MiniMax M1                       | US$ 0,20 / US$ 1,10 por 1 milhão | Velocidade                    |
| Qwen Coder                       | US$ 0,30 / US$ 1,20 por 1 milhão | Código                        |
| OpenRouter (otimizado por preço) | varia                            | Mais de 100 modelos, dinâmico |

**Estratégia**: a combinação `cost-optimized` escolhe o modelo com o menor
custo por token que atenda ao filtro de recursos da tarefa (visão, modo JSON,
ferramentas, contexto máximo).

## Nível 3 — Gratuito

**Provedores sem custo** — níveis gratuitos, programas de créditos e cotas
diárias via OAuth.

| Provedor         | Cota gratuita / créditos                           |
| ---------------- | -------------------------------------------------- |
| Kiro AI          | Nível gratuito do Claude (uso justo generoso)      |
| OpenCode Free    | Sem autenticação, limites de requisições generosos |
| Qoder            | OAuth gratuito                                     |
| Google Vertex AI | US$ 300 em créditos para novas contas              |
| Amazon Q         | Nível gratuito para usuários da AWS                |
| Pollinations     | API pública aberta                                 |
| Cloudflare AI    | Nível gratuito do Workers AI                       |

**Estratégia**: a combinação `auto` com limite de orçamento roteia para este
nível quando os Níveis 1 e 2 falham ou quando `useFreeOnly=true` está definido.
Provedores gratuitos geralmente têm limites de requisições mais restritos — o
circuit breaker os recupera após o período de espera.

## Configuração dos níveis

Painel → **Níveis** → atribua seus provedores. Os padrões (de `tierDefaults.json`) são
adequados; edite-os quando tiver assinaturas específicas para priorizar ou
provedores para excluir.

A pontuação de 16 fatores do Auto-Combo também considera o nível. Consulte
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetria

Painel → **Uso** mostra os tokens consumidos por nível a cada dia. Use isso para:

- Confirmar que o Nível 1 é totalmente utilizado (caso contrário, você está desperdiçando o valor da assinatura)
- Identificar quais modelos do Nível 2 são mais escolhidos (consolide em 1 ou 2)
- Verificar se o Nível 3 economiza dinheiro em cargas de trabalho de teste/exploração

## Padrões comuns

### Carga de trabalho totalmente gratuita

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Direciona fortemente para o Nível 3; só usa o Nível 2 se o Nível 3 estiver indisponível.

### Assinatura primeiro, com fallback econômico

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
