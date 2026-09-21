# AgentRouter Setup Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

O [AgentRouter](https://agentrouter.org) é um relay compatível com a Anthropic que revende
o Claude e outros modelos, frequentemente a preços inferiores aos da API direta da Anthropic. Foi
concebido como um substituto direto de `ANTHROPIC_BASE_URL` para o cliente oficial Claude Code,
pelo que apenas aceita tráfego que corresponda à assinatura de comunicação do Claude Code (User-Agent
específico, sinalizadores `anthropic-beta`, cabeçalhos do SDK Stainless, etc.).

## Início rápido — utilizar o fornecedor nativo `agentrouter` (recomendado)

Para a maioria dos utilizadores, **não é necessária qualquer configuração especial**. O OmniRoute inclui um
fornecedor `agentrouter` integrado, com a assinatura de comunicação completa do Claude Code já incorporada (consulte
`open-sse/config/providerRegistry.ts` → `agentrouter`). Para o utilizar:

1. Abra **Painel → Fornecedores → Adicionar fornecedor**.
2. Selecione **AgentRouter** na lista.
3. Cole a sua chave de API `sk-...` e guarde.

É tudo — não são necessárias variáveis de ambiente nem um tipo de fornecedor personalizado. Os modelos integrados
incluem `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` e
`deepseek-v3.2`.

O resto deste guia aborda o **método avançado**: utilizar o tipo de fornecedor
`anthropic-compatible-cc-*`. Utilize-o quando precisar de maior controlo
sobre a assinatura de comunicação — por exemplo, ao ligar-se a outros relays semelhantes ao AgentRouter
que ainda não estejam no registo nativo de fornecedores, ou ao substituir o
URL base, o caminho de chat ou o conjunto de cabeçalhos.

---

## Avançado: estabelecer ligação através do tipo de fornecedor compatível com o Claude Code

O OmniRoute também suporta o AgentRouter (e relays semelhantes) através do tipo de fornecedor **compatível
com o Claude Code** (`anthropic-compatible-cc-*`), que comunica com a
API Messages da Anthropic utilizando a assinatura de comunicação correta. Um fornecedor
`openai-compatible-chat` genérico que aponte para `https://agentrouter.org`
**não** funcionará — a WAF do serviço a montante rejeita pedidos que não se assemelhem aos do Claude
Code.

---

## Pré-requisitos

- Uma conta e uma chave de API do AgentRouter. Os novos registos recebem créditos gratuitos através da hiperligação
  de afiliado no [README](../README.md) do projeto.
- O OmniRoute em execução com o sinalizador de funcionalidade `ENABLE_CC_COMPATIBLE_PROVIDER` ativado
  (consulte abaixo).

## 1. Ativar o tipo de fornecedor compatível com CC

O tipo de fornecedor compatível com o Claude Code está protegido por um sinalizador de funcionalidade, porque
envia tráfego que replica de perto o cliente oficial Claude Code. Ative-o
definindo uma variável de ambiente antes de iniciar o OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Exemplo com Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Após reiniciar, o painel apresenta uma opção **Adicionar compatível com Claude Code**, além
dos fluxos existentes compatíveis com OpenAI e Anthropic.

## 2. Criar o fornecedor no painel

1. Abra **Painel → Fornecedores → Adicionar fornecedor**.
2. Escolha **Adicionar compatível com Claude Code** (apenas visível quando o sinalizador acima estiver definido).
3. Preencha os campos:

| Campo           | Valor                                                                           |
| --------------- | ------------------------------------------------------------------------------- |
| Nome            | `AgentRouter` (ou qualquer outra designação)                                    |
| Prefixo         | `agentrouter` (nome alternativo intuitivo apresentado nos registos e no painel) |
| URL base        | `https://agentrouter.org`                                                       |
| Caminho de chat | `/v1/messages?beta=true` (predefinição — não altere)                            |

> O identificador canónico do modelo continua a utilizar o ID completo do nó do fornecedor
> (`anthropic-compatible-cc-{uuid}/{model}`). O **Prefixo** é apenas um nome
> alternativo de apresentação resolvido por `src/lib/usage/callLogs.ts` para tornar a saída dos registos mais legível.

4. (Opcional) Cole a sua chave de API no campo **Validar** e clique em **Verificar** para
   confirmar a conectividade antes de guardar.
5. Clique em **Adicionar**.

Depois de criado, abra o fornecedor e adicione uma **Ligação** com a sua chave de API do AgentRouter
(`sk-...`). O `test_status` da ligação deverá passar para `active`.

## 3. Utilize-o através de um combo ou diretamente

Referencie o modelo utilizando o prefixo do seu fornecedor como namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

O ID de modelo canónico `anthropic-compatible-cc-{uuid}/claude-opus-4-6` também funciona
e é o que aparece na base de dados e na configuração do combo.

Em alternativa, adicione-o a um combo para encaminhamento, contingência e gestão de quotas, tal como qualquer outro
fornecedor.

---

## Detalhes da imagem de comunicação

Para referência, a ponte compatível com cc envia o seguinte em cada pedido a montante
(consulte `open-sse/services/claudeCodeCompatible.ts`):

| Cabeçalho                                            | Valor                                                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Authorization`                                      | `Bearer <api-key>`                                                                                                             |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                       |
| `anthropic-version`                                  | `2023-06-01`                                                                                                                   |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                       |
| Ativação beta de ocultação do raciocínio por ligação | Adiciona `redact-thinking-2026-02-12` para serviços a montante que exijam especificamente fluxos de raciocínio ocultados       |
| Ativação de raciocínio resumido por ligação          | Adiciona `display: "summarized"` aos pedidos de raciocínio CC Compatible que ainda não tenham definido um modo de apresentação |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                                         |
| `x-app`                                              | `cli`                                                                                                                          |
| `X-Stainless-*`                                      | Vários cabeçalhos do SDK Stainless (linguagem, versão do pacote, SO, arquitetura, etc.)                                        |

É isto que permite que os pedidos passem pela WAF / lista de clientes autorizados do serviço a montante.

---

## Resolução de problemas

**`{"error":{"message":"unauthorized client detected, ..."}}`** — O seu pedido não
correspondeu à imagem de comunicação do Claude Code. Isto acontece quando o fornecedor está configurado
como `openai-compatible-chat` em vez de `anthropic-compatible-cc`, ou quando o
sinalizador `ENABLE_CC_COMPATIBLE_PROVIDER=true` não foi definido no arranque.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Token inválido». A imagem de comunicação está correta, mas a chave da API foi rejeitada. Gere uma
nova chave no painel do AgentRouter e atualize a ligação.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — O mecanismo de moderação do AgentRouter rejeitou o conteúdo do pedido, ou o
plano da chave não permite o modelo solicitado. Experimente outro pedido ou modelo;
contacte o suporte do AgentRouter se um pedido inofensivo for bloqueado de forma consistente.

**`[400]: content-blocked` apenas em modelos específicos** — A maioria dos planos do AgentRouter apenas
permite um subconjunto de modelos (por exemplo, `claude-opus-4-6`). Outros IDs de modelo devolvem
`unauthorized_client_error`, apesar de a chave ser válida. Verifique no painel do AgentRouter quais os
modelos abrangidos pelo seu plano.

**`Invalid JSON response from provider (reset after Ns)` nos registos do omniroute** —
O serviço a montante devolveu um corpo que não está em JSON (normalmente, uma página de erro HTML da WAF).
Isto geralmente significa que o pedido nunca chegou ao backend do AgentRouter — volte a verificar se
o ID do fornecedor começa por `anthropic-compatible-cc-` (tenha em atenção o hífen final —
consulte `CLAUDE_CODE_COMPATIBLE_PREFIX` em `open-sse/services/claudeCodeCompatible.ts`)
e se o sinalizador da funcionalidade está ativado.

**`unauthorized client detected` / página de erro HTML, apesar de já existir um
fornecedor AgentRouter** — provavelmente tem **mais do que um** fornecedor AgentRouter
e o seu pedido está a chegar ao fornecedor errado. Se tiver sido criado anteriormente um fornecedor
`anthropic-compatible-*` (não `cc`) ou `openai-compatible-chat-*` manual
com o prefixo `agentrouter`, este pode assumir os IDs de modelo `agentrouter/<model>`
(e os combos podem referenciá-lo através do ID do nó), pelo que o tráfego é encaminhado para esse fornecedor —
que envia um User-Agent genérico e é rejeitado — em vez do fornecedor
`agentrouter` integrado, que já inclui a imagem de comunicação correta. Verifique para onde o
modelo é efetivamente resolvido nos registos do omniroute (a etiqueta `ROUTING` mostra
`agentrouter/<model> → <providerId>/<model>`); se `<providerId>` não for
`agentrouter`, consolide tudo no fornecedor nativo: aponte os combos para
`agentrouter/<model>` (providerId `agentrouter`) e elimine os fornecedores
compatíveis duplicados. O fornecedor nativo não necessita de configuração da imagem de comunicação nem de
`customUserAgent`.

---

## Ver também

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Notas sobre a integração do fornecedor Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catálogo de fornecedores com
  nível gratuito
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementação da imagem na transmissão
