# Feature OQueElaFaz 02 — Matriz de Suporte de Endpoints por Provider

**Origem:** Gap com LiteLLM (`provider_endpoints_support.json`)  
**Prioridade:** P0 (compatibilidade de API)  
**Impacto esperado:** Evitar chamadas inválidas e guiar fallback por endpoint

---

## O que ela faz

Define uma matriz formal de capacidades por provider e endpoint. Exemplo:

- `openai -> chat_completions: true`
- `openai -> responses: true`
- `provider_x -> rerank: false`

Essa matriz vira pré-condição de roteamento e validação.

---

## Motivação

Atualmente, parte da validação depende de registrar endpoint por arquivo (embedding, audio, image etc.). Falta uma visão unificada para:

1. bloquear rota inválida cedo
2. escolher fallback com capacidade equivalente
3. reportar erro consistente para cliente

---

## O que ganhamos

1. Menos falha tardia após chamada externa
2. Fallback inteligente entre providers compatíveis
3. Documentação viva de compatibilidade
4. Base para testes de contrato multi-endpoint

---

## Antes e Depois

## Antes

- validação endpoint/provider fragmentada
- fallback pode escolher provider sem suporte real
- erros variam por handler

## Depois

- validação unificada `provider + endpoint`
- fallback filtrado por capacidade
- erro padrão `unsupported_endpoint_for_provider`

---

## Como fazer (passo a passo)

1. Criar `src/shared/providerCapabilities/provider_endpoints_support.json`.
2. Criar helper `supportsEndpoint(provider, endpoint)`.
3. Integrar helper nos handlers de chat, embeddings, rerank, image e audio.
4. Integrar helper no `comboResolver` para filtrar candidatos.
5. Adicionar resposta de erro padronizada com código e sugestão de providers válidos.

---

## Arquivos-alvo sugeridos

- `src/shared/providerCapabilities/provider_endpoints_support.json`
- `src/shared/providerCapabilities/index.js`
- `open-sse/handlers/chatCore.js`
- `open-sse/handlers/embeddings.js`
- `open-sse/handlers/rerank.js`
- `open-sse/handlers/imageGeneration.js`
- `open-sse/handlers/audioTranscription.js`
- `open-sse/handlers/audioSpeech.js`

---

## Critérios de aceite

- Toda chamada valida endpoint antes do executor.
- Fallback ignora providers sem suporte.
- Erro de endpoint incompatível é consistente em todos os handlers.

---

## Riscos e mitigação

| Risco                        | Mitigação                                         |
| ---------------------------- | ------------------------------------------------- |
| Matriz desatualizada         | job de atualização + versão no arquivo            |
| Provider com suporte parcial | permitir flags por modo/versão (`beta`, `stable`) |

---

## Métricas de sucesso

- Redução de chamadas externas descartadas por incompatibilidade
- Redução de erro 404/405/400 originado por endpoint errado
