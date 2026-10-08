# Cursor Image Generation (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

O OmniRoute disponibiliza a **geração de imagens** do plano Cursor em `POST /v1/images/generations` por meio do mesmo id de provedor usado no chat: `cursor` (alias `cu`).

| Campo                   | Valor                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| id de `IMAGE_PROVIDERS` | `cursor`                                                                                    |
| Formato                 | `cursor-agent-image`                                                                        |
| Autenticação            | Mesma conexão OAuth / por chave de API do chat (`provider_connections.provider = "cursor"`) |
| Modelos                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Por que usar a Agent CLI

O chat do Cursor no OmniRoute usa `agent.v1.AgentService/Run` (protobuf). Esse caminho **rejeita** ferramentas integradas do cliente (shell, gravação, …). A geração de imagens é uma ferramenta nativa do Cursor executada pela **CLI `agent`** usando a licença. Portanto, o handler de imagens inicia o `agent` com um prompt bloqueado e um workspace temporário por solicitação (no mesmo formato das bridges de licenças da comunidade) e, em seguida, retorna `b64_json` compatível com a OpenAI.

## Restrição de acesso (Regras rígidas nº 15 + nº 17)

Este é o único formato de `IMAGE_PROVIDERS` que inicia um processo filho (o binário
`agent`). Como `POST /v1/images/generations` é compartilhado por cerca de 40 outros
provedores de imagens que não iniciam processos e que chamadores remotos usam
legitimamente, a rota inteira **não** é classificada como `LOCAL_ONLY` — em vez disso,
`handleCursorAgentImageGeneration` aplica sua própria restrição usando o veredito
confiável de `AUTHZ_HEADER_PEER_LOCALITY`, que o pipeline de autorização atribui a
cada solicitação (com base no peer TCP real, nunca no cabeçalho `Host`, que pode ser
forjado): somente chamadores `loopback` e `lan` podem iniciar o processo; todos os
demais (inclusive uma chave de API vazada reutilizada por meio de um túnel público)
recebem `403` antes que qualquer busca de credenciais ou inicialização de processo
ocorra. Consulte `src/server/authz/policies/management.ts` para ver a mesma política
aplicada ao restante do nível `LOCAL_ONLY`.

## O controle de concorrência está no nível do módulo (limitação de instância única)

`CURSOR_IMG_MAX_CONCURRENT` é aplicado por um contador/fila em memória cujo escopo é a
instância do módulo Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Ele limita corretamente as execuções simultâneas de `agent` dentro de um processo do
OmniRoute, mas **não** coordena múltiplos processos/instâncias que compartilham a mesma
licença do Cursor (por exemplo, uma implantação com várias réplicas) — cada instância
aplica seu próprio limite independente. Para uma implantação de instância única (o
padrão), isso é exato; implantações escaladas horizontalmente devem manter
`CURSOR_IMG_MAX_CONCURRENT` conservador por instância ou encaminhar o tráfego de
imagens do Cursor para uma única instância.

## Requisitos

1. Uma conta do Cursor conectada no painel (OAuth ou chave de API `crsr_…`).
2. O binário Cursor Agent disponível para o processo do OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, ou
   - `~/.local/bin/agent`, ou
   - `providerSpecificData.agentBin` na conexão do Cursor.

Ajustes opcionais:

| Env                         | Padrão                           | Significado                                       |
| --------------------------- | -------------------------------- | ------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                         | Tempo total por imagem                            |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                              | Controle de concorrência da licença compartilhada |
| `CURSOR_IMG_MODEL`          | (modelo da solicitação / `auto`) | Substitui o `--model` da CLI                      |

## Exemplo

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

A geração normalmente leva de 1 a 2 minutos. Prefira um caminho de rede interno; proxies de borda com timeouts de cerca de 100 segundos falharão.

## LiteLLM

Registre um modelo de imagem com `mode: image_generation`, `api_base: http://omniroute:20128/v1` e `model: openai/cursor/auto` (ou apenas `cursor/auto`, dependendo da sua versão do LiteLLM).
