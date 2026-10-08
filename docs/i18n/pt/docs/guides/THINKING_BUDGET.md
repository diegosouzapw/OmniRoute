# Thinking Budget (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Painel:** Definições → **IA** → Orçamento de Raciocínio  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Origem:** `open-sse/services/thinkingBudget.ts`

O Orçamento de Raciocínio controla se o OmniRoute **reescreve os parâmetros de pensamento/raciocínio do cliente** antes de os enviar aos fornecedores. **Não** ativa nem desativa a compressão, o encaminhamento ou a cache de prompts.

## Modos

| Modo                             | O que o OmniRoute faz                                                                                                               | Quando utilizar                                                                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (predefinição) | Mantém inalterados os campos do cliente (`reasoning`, `reasoning_effort`, `thinking` do Claude, `thinking_config` do Gemini, etc.). | **Codex / Desktop / qualquer cliente que deva controlar o esforço e os resumos de raciocínio.** Necessário para apresentar painéis de pensamento quando o cliente solicita `reasoning.summary`.                 |
| **`auto`**                       | **Remove todos** os campos de pensamento/raciocínio do corpo do pedido antes de o enviar ao serviço a montante.                     | Apenas quando pretende deliberadamente que o **fornecedor** defina os valores predefinidos e **não** necessita de pensamento controlado pelo cliente. **Não** significa «mostrar o pensamento automaticamente». |
| **`custom`**                     | Substitui todos os pedidos por um orçamento fixo de tokens de pensamento.                                                           | Limite rígido de tokens de pensamento para todo o tráfego.                                                                                                                                                      |
| **`adaptive`**                   | Ajusta o orçamento a partir de um esforço base, utilizando a contagem de mensagens, as ferramentas e o comprimento do prompt.       | Controlo flexível de tokens sem remover por completo a intenção do cliente.                                                                                                                                     |

### O que `auto` remove

Quando o modo é `auto`, `stripThinkingConfig()` elimina (entre outros):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` e `output_config.effort`, quando presente
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Se um cliente (por exemplo, o Codex Desktop) tiver enviado `reasoning: { effort: "ultra", summary: "detailed" }`, o modo **auto elimina esse objeto**. O serviço a montante poderá continuar a faturar alguns tokens de raciocínio, mas frequentemente devolve itens de raciocínio **vazios ou apenas encriptados** — pelo que a interface não apresenta qualquer fluxo de pensamento útil.

## O que isto **não é**

| Funcionalidade                                                | Relação                                                                                                                                         |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compressão** (Caveman, RTK, stacked, …)                     | Pipeline separado. Funciona em todos os modos de orçamento de raciocínio.                                                                       |
| **Cache de prompts / semântica**                              | Separada. Não é afetada pelo modo de orçamento de raciocínio.                                                                                   |
| **Encaminhamento combinado / alternativas**                   | Separado. Não é afetado.                                                                                                                        |
| **Limites de tokens de chaves de API / orçamentos de custos** | Separados. Não são afetados.                                                                                                                    |
| **Cache de repetição de raciocínio**                          | Reinjeção em vários turnos para fornecedores restritos (DeepSeek, Kimi, Qwen-thinking, …). Não é o mesmo que «mostrar o pensamento» no Desktop. |
| **Desencriptação de `encrypted_content`**                     | **Impossível.** Os blocos privados de raciocínio do OpenAI/Codex são opacos. O OmniRoute nunca os desencripta (#7095 / #7176 / #7304).          |

## Pensamento visível (clientes Codex / Responses)

Para um cliente apresentar texto de raciocínio, é necessário cumprir **todos** os seguintes requisitos:

1. Modo Thinking Budget = **`passthrough`** (ou custom/adaptive, desde que preserve os pedidos de resumo necessários para o caminho utilizado).
2. O cliente solicita um resumo, por exemplo, Codex `model_reasoning_summary = "detailed"` / `auto` (não `none`).
3. O serviço a montante transmite efetivamente `response.reasoning_summary_text.*` (ou um `reasoning.summary` não vazio no item).

Se apenas obtiver “raciocínio privado encriptado”, então:

- o modo era **`auto`** (o pedido do cliente foi removido), ou
- o serviço a montante devolveu `encrypted_content` sem texto de resumo (limitação do fornecedor; o OmniRoute apenas pode apresentar um marcador de posição, não texto simples).

## Exemplos da API

```bash
# Ler
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recomendado para a visibilidade do raciocínio no Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Esquema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget` e `complexityMultiplier` opcionais.

### Persistência / reinício

O valor é armazenado na chave de definições `thinkingBudget` e carregado no arranque do processo (`hydrateThinkingBudgetConfig`). Após uma alteração através da base de dados ou de alguns métodos não relacionados com a API, **reinicie o processo do OmniRoute** para que o singleton em memória corresponda ao conteúdo do disco.

## Lista de verificação do operador

- [ ] Utilizadores do Codex / Desktop: modo = **passthrough**
- [ ] Mantenha a compressão ativada se pretender poupar tokens nas **mensagens**, não através da remoção do raciocínio
- [ ] Não espere que `auto` “mostre mais raciocínio”
- [ ] Os resumos apenas encriptados são um comportamento do **fornecedor**; o modo passthrough não os consegue desencriptar

## Documentação relacionada

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache `reasoning_content` em vários turnos
- [USER_GUIDE.md](./USER_GUIDE.md) — separadores do painel de definições
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoints de definições
