# PLAN: Migrate timing-sensitive tests to serial and increase audit shutdown timeout

## Baseline

- Issue: #6803
- Testes flaky: quota-share, priority, breaker HALF_OPEN, audit shutdown
- Todos falham sob carga do runner com --test-concurrency=4

## Tasks (TDD)

Task-01: Criar testes serial para quota-share, priority, breaker HALF_OPEN

- Criar diretorio tests/serial/
- Mover/adaptar os 3 testes de timing-sensitive
- Garantir que rodam com --test-concurrency=1

Task-02: Corrigir teste de shutdown do audit

- Aumentar timeout de 5s para 30s OU tornar asserção event-based
- Verificar se o teste ja existe ou precisa ser criado

Task-03: Rodar lint e typecheck

- npm run lint
- npm run typecheck:core

Task-04: Rodar testes serial

- npm run test:vitest -- tests/serial/

Task-05: Commit e PR

- git checkout -b fix/6803-timing-sensitive-tests
- git add testes e SPEC/PLAN
- git commit -m "fix(6803): move timing-sensitive tests to serial and increase audit shutdown timeout"
- Criar PR via fork

## Quality Gates (Project Excellence)

- Lint: ✓
- Typecheck: ✓
- Testes: ✓ (todos serial devem passar)
- Cobertura: >= 95%
- PR workflow: draft → review → merge
