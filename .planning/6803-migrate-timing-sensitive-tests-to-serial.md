# SPEC: Migrate timing-sensitive tests to serial and increase audit shutdown timeout

## Contexto

Issue #6803 reporta 4 testes flaky sob carga do runner (quota-share 403/429, breaker HALF_OPEN, MCP audit shutdown). Todos os defeitos são timing-sensitive e falham quando o runner esta sobrecarregado com --test-concurrency=4.

## Proposta

- Mover os 3 testes de resiliencia (quota-share, priority, breaker HALF_OPEN) para `tests/serial/` — esse diretorio ja roda com --test-concurrency=1 no shard command
- Aumentar timeout do teste de shutdown do audit de 5s para 30s OU tornar a asserção event-based

## Arquivos afetados

- tests/serial/quota-share.test.ts (novo)
- tests/serial/priority.test.ts (novo)
- tests/serial/breaker-hal...[truncated]
