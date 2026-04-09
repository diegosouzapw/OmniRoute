# 1. Título da Feature

Feature 15 — Monitoramento de Quota em Sessão Ativa

## 2. Objetivo

Monitorar quota de contas durante sessões ativas para antecipar exaustão e preparar fallback de próxima sessão com menor impacto operacional.

## 3. Motivação

Mesmo com preflight, sessões longas podem consumir quota rapidamente. Sem monitor contínuo, a próxima chamada pode cair em conta já degradada.

## 4. Problema Atual (Antes)

- Quota é observada principalmente por chamadas sob demanda.
- Não há monitor adaptativo por sessão com intervalos baseados em risco.
- Ausência de alerta interno consistente para mudança de conta em ciclo seguinte.

### Antes vs Depois

| Dimensão                | Antes        | Depois                              |
| ----------------------- | ------------ | ----------------------------------- |
| Observação em runtime   | Pontual      | Contínua e adaptativa               |
| Antecipação de exaustão | Baixa        | Alta                                |
| Spam de alertas         | Sem política | Controle por supressão de repetição |
| Governança de sessão    | Reativa      | Proativa                            |

## 5. Estado Futuro (Depois)

Criar um monitor de quota por sessão com polling adaptativo (normal/crítico), alerta único por janela e ação de marcação preventiva para próximas execuções.

## 6. O que Ganhamos

- Menos incidentes por “surpresa de quota”.
- Melhor continuidade em workloads longos.
- Sinal operacional mais claro para fallback de conta.

## 7. Escopo

- Serviço novo: `open-sse/services/quotaMonitor.js`.
- Integração no lifecycle de request em `src/sse/handlers/chat.js`.
- Reuso de fetchers em `open-sse/services/usage.js`.
- Emissão de eventos para `src/app/api/telemetry/summary/route.js`.

## 8. Fora de Escopo

- Troca de conta no meio de stream já em andamento.
- Persistência analítica histórica avançada.
- Alertas externos (Slack, e-mail, pager).

## 9. Arquitetura Proposta

```text
Session Start
  -> startQuotaMonitor(provider, accountId)
      -> poll(normal)
      -> if quota <= warnThreshold: poll(critical)
      -> if quota <= exhaustionThreshold: mark cooldown + emit event
Session End
  -> stopQuotaMonitor(sessionId)
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `src/sse/handlers/chat.js`
- `open-sse/services/usage.js`
- `open-sse/services/accountFallback.js`
- `src/lib/db/domainState.js`
- `src/shared/utils/requestTelemetry.js`

Snippet de scheduler:

```js
scheduleNextPoll(intervalMs) {
  timer = setTimeout(async () => {
    const quota = await getQuota(provider, accountId);
    if (quota <= EXHAUSTION_THRESHOLD) emitExhaustedEvent();
    else if (quota <= WARN_THRESHOLD) scheduleNextPoll(CRITICAL_INTERVAL);
    else scheduleNextPoll(NORMAL_INTERVAL);
  }, intervalMs);
  timer.unref?.();
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas (opcional): endpoint interno de status de monitor.
- APIs alteradas: nenhuma obrigatória.
- Tipos/interfaces: novo `QuotaMonitorState` interno.
- Compatibilidade: **non-breaking**.
- Estratégia de transição: rollout gradual por feature flag e fallback para comportamento anterior quando aplicável.
- Registro explícito: “Sem impacto em API pública; impacto interno apenas.”

## 12. Passo a Passo de Implementação Futura

1. Criar `quotaMonitor` com start/stop por `sessionId`.
2. Definir thresholds e intervalos em settings.
3. Integrar start no início do fluxo e stop no finalize.
4. Adicionar supressão de alerta repetido por sessão.
5. Persistir estado mínimo em domínio para debugging.
6. Expor métricas de monitoramento no endpoint de telemetria.

## 13. Plano de Testes

Cenários positivos:

1. Dado sessão ativa com quota saudável, quando monitor roda, então mantém intervalo normal.
2. Dado quota abaixo de warn threshold, quando monitor roda, então troca para intervalo crítico.
3. Dado quota exaurida, quando monitor detecta, então marca conta em cooldown para próxima sessão.

Cenários de erro:

4. Dado timeout no fetch de quota, quando monitor executa, então reagenda sem derrubar sessão.
5. Dado erro intermitente da API de quota, quando monitor executa, então não gera alertas duplicados em loop.

Regressão:

6. Dado sessão sem monitor habilitado, quando request executa, então comportamento atual permanece.

Compatibilidade retroativa:

7. Dado configuração antiga sem campos de monitor, quando sistema sobe, então usa defaults seguros.

## 14. Critérios de Aceite

- [ ] Given sessão ativa, When monitor habilitado, Then polling ocorre sem bloquear requisições.
- [ ] Given baixa quota, When threshold atingido, Then status crítico é registrado.
- [ ] Given exaustão, When detectada, Then conta fica marcada para fallback futuro.
- [ ] Given endpoint interno de telemetria consultado, When o monitor está ativo, Then estado e métricas da sessão ficam observáveis sem duplicidade de alertas.

## 15. Riscos e Mitigações

- Risco: excesso de polling.
- Mitigação: intervalos adaptativos + TTL cache + `unref`.

- Risco: ruído operacional por alertas repetidos.
- Mitigação: deduplicação por sessão e janela temporal.

## 16. Plano de Rollout

1. Lançar monitor desligado por default.
2. Habilitar em ambientes de teste com contas múltiplas.
3. Ativar gradualmente por provider com quota API madura.

## 17. Métricas de Sucesso

- Taxa de detecção antecipada de exaustão.
- Redução de falhas de primeira tentativa por quota em sessões subsequentes.
- Overhead de latência < limite acordado.

## 18. Dependências entre Features

- Complementa `feature-quota-preflight-e-troca-proativa-02.md`.
- Alimenta `feature-observabilidade-proativa-de-quota-e-circuit-breaker-12.md`.

## 19. Checklist Final da Feature

- [ ] Serviço de monitor criado com lifecycle completo.
- [ ] Thresholds/intervalos configuráveis.
- [ ] Alertas com deduplicação.
- [ ] Testes cobrindo estabilidade sob erro.
- [ ] Sem impacto breaking em APIs públicas.
