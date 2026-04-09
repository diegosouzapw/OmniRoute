# Feature OQueElaFaz 09 — Headers de Observabilidade de Retry, Fallback e Custo

**Origem:** prática de transparência operacional observada no LiteLLM  
**Prioridade:** P1  
**Impacto esperado:** debugging mais rápido para clientes e operação

---

## O que ela faz

Padroniza headers de saída para expor o caminho executado pelo proxy, sem vazar segredo:

- `x-omniroute-attempt-count`
- `x-omniroute-fallback-used`
- `x-omniroute-final-provider`
- `x-omniroute-final-model`
- `x-omniroute-response-cost`
- `x-omniroute-cache-hit`

---

## Motivação

Hoje, entender por que uma requisição demorou ou trocou de provider exige inspeção de logs internos.

---

## O que ganhamos

1. Troubleshooting simples para usuário integrador
2. Menos tempo de suporte
3. Telemetria cliente-servidor alinhada

---

## Antes e Depois

## Antes

- cliente recebe resposta sem contexto de rota/retry
- análise depende de logs internos

## Depois

- cliente enxerga resumo técnico no response header
- observabilidade distribuída sem abrir log sensível

---

## Como fazer (passo a passo)

1. Definir contrato de headers em módulo compartilhado.
2. Popular metadados durante execução (attempt, fallback, cache, custo).
3. Injetar headers no final de resposta stream e não-stream.
4. Criar flag de configuração para habilitar nível detalhado.
5. Garantir sanitização para não expor IDs sensíveis de credencial.

---

## Arquivos-alvo sugeridos

- `open-sse/handlers/chatCore.js`
- `open-sse/handlers/responsesHandler.js`
- `open-sse/handlers/embeddings.js`
- `open-sse/services/provider.js`
- `src/shared/constants/*`

---

## Critérios de aceite

- Headers presentes em sucesso e erro controlado.
- Sem exposição de token, email, account id bruto.
- Contrato documentado em `docs/API_REFERENCE.md`.

---

## Riscos e mitigação

| Risco                               | Mitigação                          |
| ----------------------------------- | ---------------------------------- |
| Header excessivo aumenta payload    | modo resumido por padrão           |
| Vazamento de identificação sensível | mascaramento e allowlist de campos |

---

## Métricas de sucesso

- redução do tempo médio de diagnóstico
- redução de tickets sem contexto técnico
