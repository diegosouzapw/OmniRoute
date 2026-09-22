# Cursor Image Generation (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute disponibiliza a **geração de imagens** do plano Cursor em `POST /v1/images/generations` através do mesmo id de fornecedor utilizado pelo chat: `cursor` (alias `cu`).

| Campo                   | Valor                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| id de `IMAGE_PROVIDERS` | `cursor`                                                                                            |
| Formato                 | `cursor-agent-image`                                                                                |
| Autenticação            | A mesma ligação OAuth/chave de API utilizada pelo chat (`provider_connections.provider = "cursor"`) |
| Modelos                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                           |

## Porquê a CLI Agent

O chat do Cursor no OmniRoute utiliza `agent.v1.AgentService/Run` (protobuf). Esse caminho **rejeita** ferramentas de cliente incorporadas (shell, escrita, …). A geração de imagens é uma ferramenta nativa do Cursor executada pela CLI **`agent`** através da licença. Por isso, o processador de imagens inicia o `agent` com uma instrução bloqueada e um espaço de trabalho temporário por pedido (com a mesma estrutura das pontes de licenças da comunidade), devolvendo depois `b64_json` compatível com OpenAI.

## Restrição de acesso (Regras Rígidas #15 + #17)

Este é o único formato de `IMAGE_PROVIDERS` que inicia um processo filho (o binário
`agent`). Uma vez que `POST /v1/images/generations` é partilhado por cerca de 40 outros
fornecedores de imagens que não iniciam processos e que são legitimamente utilizados
por clientes remotos, a rota completa **não** é classificada como `LOCAL_ONLY` — em vez
disso, `handleCursorAgentImageGeneration` aplica o seu próprio controlo através do
veredito fidedigno `AUTHZ_HEADER_PEER_LOCALITY`, que o pipeline de autorização marca
em cada pedido (com base no par TCP real, nunca no cabeçalho `Host` falsificável):
apenas clientes `loopback` e `lan` podem iniciar o processo; todos os restantes
(incluindo uma chave de API exposta e reutilizada através de um túnel público) recebem
`403` antes de ocorrer qualquer consulta de credenciais ou início de processo. Consulte
`src/server/authz/policies/management.ts` para ver a mesma política aplicada ao resto
do nível `LOCAL_ONLY`.

## O controlo de concorrência é ao nível do módulo (limitação de instância única)

`CURSOR_IMG_MAX_CONCURRENT` é aplicado através de um contador/fila em memória, limitado
à instância do módulo Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Limita corretamente os processos `agent` simultâneos numa única instância do OmniRoute,
mas **não** coordena vários processos/instâncias que partilhem a mesma licença Cursor
(por exemplo, uma implementação com várias réplicas) — cada instância aplica o seu
próprio limite independente. Numa implementação de instância única (a predefinição),
este limite é exato; as implementações com escalamento horizontal devem manter
`CURSOR_IMG_MAX_CONCURRENT` num valor conservador por instância ou encaminhar o tráfego
de imagens do Cursor para uma única instância.

## Requisitos

1. Uma conta Cursor ligada no painel de controlo (OAuth ou chave de API `crsr_…`).
2. O binário Cursor Agent disponível para o processo do OmniRoute:
   - variável de ambiente `CURSOR_AGENT_BIN=/path/to/agent`, ou
   - `~/.local/bin/agent`, ou
   - `providerSpecificData.agentBin` na ligação do Cursor.

Ajustes opcionais:

| Variável de ambiente        | Predefinição                | Significado                                    |
| --------------------------- | --------------------------- | ---------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Tempo máximo por imagem                        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Controlo de concorrência da licença partilhada |
| `CURSOR_IMG_MODEL`          | (modelo do pedido / `auto`) | Substituir `--model` da CLI                    |

## Exemplo

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

A geração demora normalmente 1–2 minutos. Prefira um caminho de rede interno; proxies periféricos com tempos limite de cerca de 100 segundos irão falhar.

## LiteLLM

Registe um modelo de imagem com `mode: image_generation`, `api_base: http://omniroute:20128/v1` e `model: openai/cursor/auto` (ou apenas `cursor/auto`, consoante a sua versão do LiteLLM).
