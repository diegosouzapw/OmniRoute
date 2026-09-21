# Thinking Budget (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Configurações → **IA** → Orçamento de Raciocínio  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Código-fonte:** `open-sse/services/thinkingBudget.ts`

O Orçamento de Raciocínio controla se o OmniRoute **reescreve os parâmetros de pensamento/raciocínio do cliente** no caminho até os provedores. Ele **não** ativa nem desativa a compressão, o roteamento ou o cache de prompts.

## Modos

| Modo                       | O que o OmniRoute faz                                                                                                              | Quando usar                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`** (padrão) | Mantém os campos do cliente inalterados (`reasoning`, `reasoning_effort`, `thinking` do Claude, `thinking_config` do Gemini etc.). | **Codex / Desktop / qualquer cliente que deva controlar o esforço e os resumos de raciocínio.** Necessário para painéis de pensamento visíveis quando o cliente solicita `reasoning.summary`.    |
| **`auto`**                 | **Remove todos** os campos de pensamento/raciocínio do corpo da solicitação antes de enviá-la ao upstream.                         | Somente quando você deseja deliberadamente que o **provedor** defina os padrões e **não** precisa de pensamento controlado pelo cliente. **Não** significa “mostrar pensamento automaticamente”. |
| **`custom`**               | Sobrescreve todas as solicitações com um orçamento fixo de tokens de pensamento.                                                   | Limite rígido de tokens de pensamento para todo o tráfego.                                                                                                                                       |
| **`adaptive`**             | Ajusta o orçamento com base em um esforço inicial, usando a quantidade de mensagens, as ferramentas e o tamanho do prompt.         | Controle flexível de tokens sem remover completamente a intenção do cliente.                                                                                                                     |

### O que `auto` remove

Quando o modo é `auto`, `stripThinkingConfig()` exclui, entre outros:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` e `output_config.effort`, quando presente
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Se um cliente (por exemplo, o Codex Desktop) enviar `reasoning: { effort: "ultra", summary: "detailed" }`, o modo **auto remove esse objeto**. O upstream ainda pode cobrar por alguns tokens de raciocínio, mas frequentemente retorna itens de raciocínio **vazios ou apenas criptografados** — portanto, a interface não exibe um fluxo de pensamento útil.

## O que isto **não é**

| Recurso                                                      | Relação                                                                                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compressão** (Caveman, RTK, stacked, …)                    | Pipeline separado. Funciona em todos os modos de orçamento de raciocínio.                                                                    |
| **Cache de prompts / semântico**                             | Separado. Não é afetado pelo modo de orçamento de raciocínio.                                                                                |
| **Roteamento combinado / fallbacks**                         | Separado. Não é afetado.                                                                                                                     |
| **Limites de tokens por chave de API / orçamentos de custo** | Separados. Não são afetados.                                                                                                                 |
| **Cache de reprodução de raciocínio**                        | Reinjeção em múltiplos turnos para provedores rígidos (DeepSeek, Kimi, Qwen-thinking, …). Não é o mesmo que “mostrar pensamento” no Desktop. |
| **Descriptografia de `encrypted_content`**                   | **Impossível.** Os blobs de raciocínio privados do OpenAI/Codex são opacos. O OmniRoute nunca os descriptografa (#7095 / #7176 / #7304).     |

## Pensamento visível (clientes Codex / Responses)

Para que um cliente exiba o texto do pensamento, você precisa de **todos** os itens a seguir:

1. Modo Thinking Budget = **`passthrough`** (ou custom/adaptive que ainda preserve as solicitações de resumo suficientemente intactas para o fluxo usado).
2. O cliente solicita um resumo, por exemplo, no Codex: `model_reasoning_summary = "detailed"` / `auto` (não `none`).
3. O provedor upstream realmente transmite `response.reasoning_summary_text.*` (ou um `reasoning.summary` não vazio no item).

Se você receber apenas “raciocínio privado criptografado”, então:

- o modo era **`auto`** (a solicitação do cliente foi removida), ou
- o provedor upstream retornou `encrypted_content` sem texto de resumo (limitação do provedor; o OmniRoute só pode exibir um marcador de posição, não o texto simples).

## Exemplos de API

```bash
# Consultar
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recomendado para a visibilidade do pensamento no Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Esquema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget` e `complexityMultiplier` opcionais.

### Persistência / reinicialização

O valor é armazenado na chave de configuração `thinkingBudget` e carregado na inicialização do processo (`hydrateThinkingBudgetConfig`). Após alterá-lo via banco de dados ou por alguns fluxos que não usam a API, **reinicie o processo do OmniRoute** para que o singleton em memória corresponda ao valor em disco.

## Lista de verificação do operador

- [ ] Usuários do Codex / Desktop: modo = **passthrough**
- [ ] Mantenha a compactação ativada se quiser economizar tokens nas **mensagens**, não removendo o pensamento
- [ ] Não espere que `auto` “mostre mais pensamento”
- [ ] Resumos exclusivamente criptografados são um comportamento do **provedor**; passthrough não consegue descriptografá-los

## Documentação relacionada

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache de `reasoning_content` em múltiplos turnos
- [USER_GUIDE.md](./USER_GUIDE.md) — abas do painel de configurações
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoints de configurações
