# AgentRouter Setup Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

O [AgentRouter](https://agentrouter.org) é um relay compatível com a Anthropic que revende
o Claude e outros modelos, muitas vezes por preços mais baixos que os da API direta da Anthropic. Ele foi
projetado como uma substituição direta de `ANTHROPIC_BASE_URL` para o cliente oficial
Claude Code e, portanto, aceita apenas tráfego que corresponda ao perfil de requisição do Claude Code (User-Agent
específico, sinalizadores `anthropic-beta`, cabeçalhos do SDK Stainless etc.).

## Início rápido — use o provedor nativo `agentrouter` (recomendado)

Para a maioria dos usuários, **nenhuma configuração especial é necessária**. O OmniRoute inclui um provedor
`agentrouter` integrado, com o perfil completo de requisição do Claude Code já incorporado (consulte
`open-sse/config/providerRegistry.ts` → `agentrouter`). Para usá-lo:

1. Abra **Painel → Provedores → Adicionar provedor**.
2. Selecione **AgentRouter** na lista.
3. Cole sua chave de API `sk-...` e salve.

É só isso — sem variáveis de ambiente nem tipo de provedor personalizado. Os modelos integrados
incluem `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` e
`deepseek-v3.2`.

O restante deste guia aborda o **procedimento avançado**: usar o tipo de provedor
`anthropic-compatible-cc-*`. Use-o quando precisar de mais controle
sobre o perfil de requisição — por exemplo, ao se conectar a outros relays no estilo do AgentRouter
que ainda não estejam no registro nativo de provedores ou ao substituir a
URL base, o caminho de chat ou o conjunto de cabeçalhos.

---

## Avançado: conexão por meio do tipo de provedor compatível com o Claude Code

O OmniRoute também oferece suporte ao AgentRouter (e a relays semelhantes) por meio do tipo de provedor
**compatível com o Claude Code** (`anthropic-compatible-cc-*`), que utiliza a
API Anthropic Messages com o perfil de requisição correto. Um provedor genérico
`openai-compatible-chat` apontando para `https://agentrouter.org`
**não** funcionará — o WAF upstream rejeita solicitações que não se parecem com as do Claude
Code.

---

## Pré-requisitos

- Uma conta e uma chave de API do AgentRouter. Novos cadastros recebem créditos gratuitos por meio do link de afiliado
  no [README](../README.md) do projeto.
- O OmniRoute em execução com o sinalizador de recurso `ENABLE_CC_COMPATIBLE_PROVIDER` habilitado
  (veja abaixo).

## 1. Habilite o tipo de provedor compatível com o CC

O tipo de provedor compatível com o Claude Code é controlado por um sinalizador de recurso, pois
envia tráfego que reproduz fielmente o cliente oficial do Claude Code. Habilite-o
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

Após a reinicialização, o painel exibirá uma opção **Adicionar compatível com o Claude Code**, além
dos fluxos existentes compatíveis com OpenAI e Anthropic.

## 2. Crie o provedor no painel

1. Abra **Painel → Provedores → Adicionar provedor**.
2. Escolha **Adicionar compatível com o Claude Code** (visível somente quando o sinalizador acima estiver definido).
3. Preencha os campos:

| Campo           | Valor                                                       |
| --------------- | ----------------------------------------------------------- |
| Nome            | `AgentRouter` (ou qualquer rótulo)                          |
| Prefixo         | `agentrouter` (alias amigável exibido nos logs e no painel) |
| URL base        | `https://agentrouter.org`                                   |
| Caminho do chat | `/v1/messages?beta=true` (padrão — deixe como está)         |

> O identificador canônico do modelo ainda usa o ID completo do nó do provedor
> (`anthropic-compatible-cc-{uuid}/{model}`). O **Prefixo** é apenas um alias de exibição
> resolvido por `src/lib/usage/callLogs.ts` para tornar a saída dos logs mais amigável.

4. (Opcional) Cole sua chave de API no campo **Validar** e clique em **Verificar** para
   confirmar a conectividade antes de salvar.
5. Clique em **Adicionar**.

Após a criação, abra o provedor e adicione uma **Conexão** com sua chave de API do AgentRouter
(`sk-...`). O `test_status` da conexão deve mudar para `active`.

## 3. Use-o por meio de um combo ou diretamente

Referencie o modelo usando o prefixo do seu provedor como namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

O ID de modelo canônico `anthropic-compatible-cc-{uuid}/claude-opus-4-6` também funciona
e é o que aparece no banco de dados e na configuração do combo.

Ou adicione-o a um combo para roteamento, fallback e gerenciamento de cotas, como qualquer
outro provedor.

---

## Detalhes da imagem de comunicação

Como referência, a ponte compatível com cc envia o seguinte em cada solicitação
upstream (consulte `open-sse/services/claudeCodeCompatible.ts`):

| Cabeçalho                                       | Valor                                                                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                 | `Bearer <api-key>`                                                                                                          |
| `User-Agent`                                    | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                    |
| `anthropic-version`                             | `2023-06-01`                                                                                                                |
| `anthropic-beta`                                | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                    |
| Alternância beta de redact-thinking por conexão | Adiciona `redact-thinking-2026-02-12` para upstreams que exigem especificamente streams de raciocínio com conteúdo ocultado |
| Alternância de raciocínio resumido por conexão  | Adiciona `display: "summarized"` às solicitações de raciocínio CC Compatible que ainda não definiram um modo de exibição    |
| `anthropic-dangerous-direct-browser-access`     | `true`                                                                                                                      |
| `x-app`                                         | `cli`                                                                                                                       |
| `X-Stainless-*`                                 | Vários cabeçalhos do SDK Stainless (linguagem, versão do pacote, SO, arquitetura etc.)                                      |

É isso que permite que as solicitações passem pelo WAF / pela lista de clientes permitidos
do upstream.

---

## Solução de problemas

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Sua solicitação não
correspondeu à imagem de comunicação do Claude Code. Isso acontece quando o provedor está configurado
como `openai-compatible-chat` em vez de `anthropic-compatible-cc`, ou quando a
flag `ENABLE_CC_COMPATIBLE_PROVIDER=true` não foi definida na inicialização.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token inválido". A imagem de comunicação está correta, mas a chave de API foi rejeitada. Gere uma
nova chave no painel do AgentRouter e atualize a conexão.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — O mecanismo de moderação do AgentRouter rejeitou o conteúdo da solicitação, ou o
plano da chave não permite o modelo solicitado. Tente outro prompt ou modelo;
entre em contato com o suporte do AgentRouter se um prompt inofensivo for bloqueado de forma consistente.

**`[400]: content-blocked` apenas em modelos específicos** — A maioria dos planos do AgentRouter permite
apenas um subconjunto de modelos (por exemplo, `claude-opus-4-6`). Outros IDs de modelo retornam
`unauthorized_client_error`, mesmo que a chave seja válida. Verifique quais modelos o seu
plano abrange no painel do AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` nos logs do omniroute** —
O upstream retornou um corpo que não é JSON (normalmente uma página de erro HTML do WAF).
Isso geralmente significa que a solicitação nunca chegou ao backend do AgentRouter — verifique novamente se
o ID do provedor começa com `anthropic-compatible-cc-` (observe o hífen no final —
consulte `CLAUDE_CODE_COMPATIBLE_PREFIX` em `open-sse/services/claudeCodeCompatible.ts`)
e se a flag de recurso está habilitada.

**`unauthorized client detected` / página de erro HTML mesmo que um provedor
AgentRouter já exista** — você provavelmente tem **mais de um** provedor AgentRouter
e sua solicitação está chegando ao provedor errado. Se um provedor criado manualmente e remanescente
`anthropic-compatible-*` (não `cc`) ou `openai-compatible-chat-*` tiver sido
criado com o prefixo `agentrouter`, ele poderá ser o proprietário dos IDs de modelo
`agentrouter/<model>` (e os combos poderão referenciá-lo pelo ID do nó), fazendo com que o tráfego seja roteado para esse provedor —
que envia um User-Agent genérico e é rejeitado — em vez de ser roteado para o provedor
`agentrouter` integrado, que já inclui a imagem de comunicação correta. Verifique para onde o
modelo realmente é resolvido nos logs do omniroute (a tag `ROUTING` mostra
`agentrouter/<model> → <providerId>/<model>`); se `<providerId>` não for
`agentrouter`, consolide tudo no provedor nativo: direcione os combos para
`agentrouter/<model>` (providerId `agentrouter`) e exclua os provedores compatíveis
duplicados. O provedor nativo não precisa de configuração da imagem de comunicação nem de
`customUserAgent`.

---

## Veja também

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Notas de integração do provedor Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catálogo de provedores
  com nível gratuito
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementação da transmissão de imagens
