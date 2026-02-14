# FASE 02 — CI/CD & Infraestrutura de Testes

> **Prioridade:** 🔴 Crítica  
> **Estimativa de Complexidade:** Média (3–5 dias)  
> **Dimensões do Relatório:** D7 (Testes, CI/CD)  
> **Dependências:** FASE-01 (segredos validados são necessários para CI funcional)

---

## Objetivo

Estabelecer pipeline de integração contínua com execução automática de testes, linting, e build em cada PR/push, e configurar infraestrutura de cobertura de testes para garantir qualidade mínima.

---

## Escopo Detalhado

### 2.1 — Criação do CI Pipeline

**Origem no relatório:** D7 — Ausência de CI Pipeline (🔴 Crítico)

#### Especificação Técnica

- **Criar** `.github/workflows/ci.yml` com jobs:
  1. **lint** — `npm run lint` com cache de `node_modules`.
  2. **build** — `npm run build` para verificar compilação.
  3. **test:unit** — Execução de testes unitários com `node --test`.
  4. **test:e2e** — Execução de `npx playwright test` (com Playwright instalado).
- **Triggers:** push para `main`, pull_request para qualquer branch.
- **Matrix:** Node.js 18 e 22.
- **Cache:** `node_modules` e `.next/cache`.

#### Critérios de Aceite

- [ ] Workflow `ci.yml` executa em PRs e pushes para `main`.
- [ ] Todos os 4 jobs (lint, build, test:unit, test:e2e) executam.
- [ ] PR não pode ser mergeado se CI falhar (branch protection rule).
- [ ] Tempo de execução total < 10 minutos.

---

### 2.2 — Correção do Script `test` no package.json

**Origem no relatório:** D7 — `"test": "npm run build"` (🔴 Crítico)

#### Especificação Técnica

- **Alterar** `"test"` para executar testes reais:
  ```json
  "test": "node --test tests/unit/*.test.mjs",
  "test:unit": "node --test tests/unit/*.test.mjs",
  "test:e2e": "npx playwright test",
  "test:all": "npm run test:unit && npm run test:e2e"
  ```
- **Manter** `"check"` como agregador: `"npm run lint && npm run test:unit"`.

#### Critérios de Aceite

- [ ] `npm test` executa testes unitários reais.
- [ ] `npm run test:all` executa unit + e2e.
- [ ] CI usa os mesmos scripts definidos no `package.json`.

---

### 2.3 — Configuração de Cobertura de Testes

**Origem no relatório:** D7 — Cobertura de Testes Incerta (🔴 Crítico)

#### Especificação Técnica

- **Configurar** `c8` como ferramenta de cobertura:
  ```json
  "test:coverage": "c8 --reporter=text --reporter=lcov node --test tests/unit/*.test.mjs"
  ```
- **Definir** target mínimo: 40% de cobertura (baseline realista).
- **Gerar** relatório lcov para upload em CI (Codecov ou similar).
- **Adicionar** badge de cobertura no README.

#### Critérios de Aceite

- [ ] `npm run test:coverage` gera relatório de cobertura.
- [ ] Relatório inclui todas as subpastas de `src/`.
- [ ] CI faz upload do relatório de cobertura.

---

### 2.4 — Melhoria da Configuração ESLint

**Origem no relatório:** D7 — Sem Análise Estática de Código (🟠 Importante)

#### Especificação Técnica

- **Adicionar** plugins ao ESLint:
  - `eslint-plugin-security` — regras de segurança.
  - `eslint-plugin-react-hooks` — regras de hooks React.
- **Configurar** no `eslint.config.mjs` com severidade `warn` inicialmente.
- **Executar** lint e resolver erros/warnings existentes antes de ativar em CI.

#### Critérios de Aceite

- [ ] Plugins instalados e configurados.
- [ ] `npm run lint` executa sem erros bloqueantes.
- [ ] CI executa lint como parte do pipeline.

---

### 2.5 — Conversão de Testes de Segurança

**Origem no relatório:** D7 — Testes shell manuais (🟠 Importante)

#### Especificação Técnica

- **Converter** os 4 scripts de `tests/security/` em testes programáticos:
  - `test-cli-runtime.sh` → `tests/integration/cli-runtime.test.mjs`
  - `test-cloud-openai-compatible.sh` → `tests/integration/cloud-openai.test.mjs`
  - `test-cloud-sync-and-call.sh` → `tests/integration/cloud-sync.test.mjs`
  - `test-docker-hardening.sh` → `tests/integration/docker-hardening.test.mjs`
- **Usar** Node.js test runner com `child_process.exec` para testes que dependem de shell.
- **Marcar** testes que dependem de infra externa como `skip` por default em CI.

#### Critérios de Aceite

- [ ] Scripts shell convertidos em arquivos `.test.mjs`.
- [ ] Testes executáveis via `node --test tests/integration/*.test.mjs`.
- [ ] Testes que dependem de Docker/Cloud marcados como conditional skip.

---

## Pré-Requisitos

- FASE-01 completa (segredos configurados para ambiente de CI).
- Acesso a GitHub Actions (secrets configurados).
- Node.js 18+ no runner de CI.

## Entregáveis

1. Workflow `ci.yml` funcional.
2. Scripts de test corrigidos no `package.json`.
3. Configuração de cobertura com `c8`.
4. ESLint com plugins de segurança e React hooks.
5. Testes de segurança convertidos.

## Critérios de Conclusão da Fase

- [ ] CI pipeline verde em PR de teste.
- [ ] Cobertura de testes mensurada e reportada.
- [ ] ESLint passa no CI sem erros.

## Riscos Identificados

| Risco                                  | Probabilidade | Impacto | Mitigação                            |
| -------------------------------------- | ------------- | ------- | ------------------------------------ |
| Testes e2e flaky em CI                 | Alta          | Médio   | Retry strategy no Playwright config  |
| ESLint com muitos warnings bloqueantes | Média         | Baixo   | Começar com `warn`, não `error`      |
| Testes de segurança dependem de Docker | Alta          | Baixo   | Skip condicional com check de Docker |
