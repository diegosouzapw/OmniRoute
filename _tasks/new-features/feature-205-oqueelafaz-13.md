# Feature OQueElaFaz 13 — Suporte Enterprise: Bedrock, Azure OpenAI e Vertex AI

**Origem:** grande gap de cobertura de provedores enterprise  
**Prioridade:** P1  
**Impacto esperado:** ampliar mercado enterprise e redundância operacional

---

## O que ela faz

Adiciona provedores de nuvem enterprise com autenticação e endpoints próprios:

- AWS Bedrock
- Azure OpenAI
- Google Vertex AI

---

## Motivação

Muitos clientes corporativos padronizam segurança e faturamento nesses provedores. Sem suporte nativo, o OmniRoute perde oportunidades de adoção.

---

## O que ganhamos

1. Cobertura enterprise real
2. Redundância multi-cloud
3. Melhor adequação a compliance corporativo

---

## Antes e Depois

## Antes

- cobertura focada em provedores API-first
- lacuna para clientes com contratos cloud nativos

## Depois

- integração multi-cloud enterprise
- fallback entre nuvens em cenário de incidente

---

## Como fazer (passo a passo)

1. Registrar providers em `open-sse/config/providerRegistry.js`.
2. Implementar executors para cada provider com auth específica.
3. Adicionar tradução de payload/response quando necessário.
4. Integrar gestão segura de credenciais (chave, região, deployment).
5. Adicionar testes de contrato e smoke por provider.

---

## Arquivos-alvo sugeridos

- `open-sse/config/providerRegistry.js`
- `open-sse/executors/bedrock.js`
- `open-sse/executors/azureOpenai.js`
- `open-sse/executors/vertexAi.js`
- `open-sse/translator/*`
- `src/lib/db/providers.js`

---

## Critérios de aceite

- cada provider novo consegue responder em `/v1/chat/completions`.
- autenticação e headers específicos validados por testes.
- fallback entre providers enterprise possível por combo.

---

## Riscos e mitigação

| Risco                            | Mitigação                                        |
| -------------------------------- | ------------------------------------------------ |
| complexidade de auth por cloud   | separar executor por provider com contrato comum |
| custos de teste em ambiente real | suíte mista com mock + smoke controlado          |

---

## Métricas de sucesso

- número de requests por novos providers
- taxa de sucesso e latência por nuvem
- adoção por clientes enterprise
