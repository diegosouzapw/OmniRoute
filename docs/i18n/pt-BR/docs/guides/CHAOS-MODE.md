# Chaos Mode (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Modo Chaos** (barra lateral) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessão do dashboard) · `POST /api/skills/collect/chaos` (chave de API)  
> **Código-fonte:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

O Modo Chaos envia **uma tarefa para vários provedores de uma só vez** — cada provedor participante
contribui com uma instância de modelo, e você recebe todas as respostas lado a lado (ou encadeadas). Ele é uma
superfície de execução multimodelo, não uma estratégia de roteamento: seu tráfego normal de `/v1/chat/completions`
nunca é afetado por ele.

**Esclarecimento — há três recursos diferentes com "chaos" no nome:**

| Recurso                     | O que é                                                                                                                                 | Onde está documentado                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modo Chaos**              | A página do dashboard + a API descrita aqui: distribui uma tarefa entre vários provedores (em paralelo ou de forma colaborativa).       | Este guia                                    |
| `auto/chaos`                | Um ID de modelo Auto-Combo com pesos de pontuação para injeção de falhas, destinado a testes de resiliência. Nada a configurar.         | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuração de combo Chaos | Um combo persistido com `config.chaos.enabled` que distribui a tarefa para um painel com um modelo julgador opcional (somente via API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configuração

1. Abra **Dashboard → Modo Chaos** (`/dashboard/chaos`).
2. **Ative-o** — o Modo Chaos vem **desativado por padrão** (`enabled: false` em
   `src/lib/chaos/chaosConfig.ts`). Enquanto estiver desativado, `POST /api/chaos/run` responde com
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Escolha os participantes e os valores padrão (persistidos por instância por meio do armazenamento de configurações):

   | Campo               | Significado                                                             | Padrão / limites                             |
   | ------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Chave geral                                                             | `false`                                      |
   | `defaultMode`       | `parallel` ou `collaborative` (veja abaixo)                             | `parallel`                                   |
   | `providerOverrides` | Participação por provedor (`providerId`, `modelId` opcional, `enabled`) | vazio = todos os provedores ativos, máx. 200 |
   | `systemPrompt`      | Substituição do prompt de sistema integrado do Chaos                    | opcional, máx. de 10.000 caracteres          |
   | `timeoutMs`         | Tempo máximo por chamada de modelo                                      | `120000` (5.000–600.000)                     |
   | `maxTokens`         | `max_tokens` por chamada de modelo                                      | `4096` (256–128.000)                         |

4. Execute um **teste na própria página** — o painel de resultados mostra a resposta,
   o status e a duração de cada provedor.

## Modos de execução

- **`parallel`** — todos os modelos recebem a mesma tarefa simultaneamente; você recebe todas as respostas
  de forma independente.
- **`collaborative`** — os modelos são executados **em cadeia**: cada um vê a saída do modelo anterior e
  é solicitado a refiná-la, ampliá-la, criticá-la ou oferecer uma alternativa. O campo `summary` da resposta
  concatena as saídas bem-sucedidas na ordem da cadeia (execuções paralelas não têm `summary`).

## API

### `POST /api/chaos/run` — sessão do dashboard

Autenticado por cookie (a sessão de gerenciamento — consulte
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); usado pela página do dashboard.

```jsonc
// corpo
{
  "task": "Compare approaches to X", // obrigatório
  "providers": ["glm", "kimi"], // filtro opcional
  "mode": "parallel", // opcional — substitui defaultMode
  "systemPrompt": "…", // substituição opcional
  "maxTokens": 4096, // substituição opcional
}
```

### `POST /api/skills/collect/chaos` — chave de API

Variante com token Bearer para clientes externos. A chave deve ter a **permissão do Modo Chaos**
(`chaosModeEnabled`), que fica **desativada por padrão** — ative-a para cada chave em
**Dashboard → Gerenciador de API → editar chave → permissões → Modo Chaos**. Usa o mesmo corpo acima.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ambos os endpoints retornam a mesma estrutura:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // somente no modo colaborativo
}
```

## Solução de problemas

- **`400 Chaos Mode is not enabled`** — consulte a etapa 2 acima: a chave geral está desativada.
- **A chave de API é rejeitada em `/api/skills/collect/chaos`** — a chave não tem a permissão
  `chaosModeEnabled` específica por chave (desativada por padrão; isso é uma configuração, não um erro).
- **Um provedor esperado não aparece nos resultados** — verifique `providerOverrides` na
  página do Modo Chaos (uma substituição desativada o exclui) e se a conexão com o provedor está
  ativa.
