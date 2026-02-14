# FASE 06 — Documentação e Governança

> **Prioridade:** 🟡 Moderado  
> **Estimativa de Complexidade:** Baixa-Média (2–4 dias)  
> **Dimensões do Relatório:** D4 (Documentação)  
> **Dependências:** FASE-03 (decisões arquiteturais para ADRs), FASE-05 (padrões de código para CONTRIBUTING)

---

## Objetivo

Completar a documentação do projeto com ADRs, guia de contribuição, política de segurança expandida, e padronização de comentários inline, garantindo que novos contribuidores tenham contexto suficiente para entender e contribuir com o projeto.

---

## Escopo Detalhado

### 6.1 — Architecture Decision Records (ADRs)

**Origem no relatório:** D4 — Ausência de ADRs (🟡 Moderado)

#### Especificação Técnica

- **Criar** diretório `docs/adr/` com template `docs/adr/000-template.md`.
- **Criar** ADRs iniciais:

| ADR # | Título                             | Decisão                                             |
| ----- | ---------------------------------- | --------------------------------------------------- |
| 001   | Escolha de SQLite como Database    | Justificar SQLite vs PostgreSQL para single-tenant  |
| 002   | Padrão de Fallback entre Providers | Documentar estratégias fill-first, round-robin, p2c |
| 003   | Estratégia de OAuth Multi-Provider | Documentar escolha de Strategy pattern (FASE-03)    |
| 004   | JavaScript + JSDoc vs TypeScript   | Documentar decisão de tipagem (FASE-05)             |
| 005   | Sistema Single-Tenant              | Documentar escopo sem multi-tenancy                 |
| 006   | Tradução de Formatos LLM           | Documentar pattern Registry do Translator           |

- **Formato ADR:** Status, Contexto, Decisão, Consequências (formato Nygard).

#### Critérios de Aceite

- [ ] Template ADR criado e documentado.
- [ ] ≥ 6 ADRs cobrindo decisões-chave do projeto.
- [ ] ADRs referenciados no README e ARCHITECTURE.md.

---

### 6.2 — CONTRIBUTING.md

**Origem no relatório:** D4 — CONTRIBUTING.md Ausente (🟡 Moderado)

#### Especificação Técnica

- **Criar** `CONTRIBUTING.md` na raiz com seções:
  1. **Getting Started** — Setup do ambiente, `npm install`, env vars obrigatórias.
  2. **Development Workflow** — Branch naming, commit convention (Conventional Commits).
  3. **Coding Standards** — JSDoc obrigatório, ESLint, Prettier.
  4. **Testing** — Como rodar testes unitários, e2e, e coverage.
  5. **PR Process** — Template de PR, reviewers, CI checks obrigatórios.
  6. **Architecture** — Link para ARCHITECTURE.md e ADRs.
- **Criar** `.github/PULL_REQUEST_TEMPLATE.md` com checklist padrão.

#### Critérios de Aceite

- [ ] `CONTRIBUTING.md` criado com todas as 6 seções.
- [ ] PR template criado e ativo no GitHub.
- [ ] README referencia CONTRIBUTING.md.

---

### 6.3 — Expansão do SECURITY.md

**Origem no relatório:** D4 — SECURITY.md Insuficiente (🟡 Moderado)

#### Especificação Técnica

- **Expandir** `SECURITY.md` de 619 bytes para ≥ 2KB com:
  1. **Responsible Disclosure Policy** — Como reportar vulnerabilidades.
  2. **Vulnerability Scope** — Tipos aceitos (RCE, XSS, SSRF, auth bypass, etc.).
  3. **Response SLA** — Prazo de resposta (48h ack, 7 dias para fix P0).
  4. **Security Contact** — Email ou canal dedicado.
  5. **Security Best Practices** — Instruções para configurar segredos fortes.
  6. **Known Limitations** — Documentar limitações de segurança do single-tenant.

#### Critérios de Aceite

- [ ] SECURITY.md ≥ 2KB com todas as 6 seções.
- [ ] Formato segue GitHub Security Advisories best practices.
- [ ] Link no README para SECURITY.md.

---

### 6.4 — Padronização de JSDoc em Funções Exportadas

**Origem no relatório:** D4 — Inline Comments inconsistentes (🟢 Menor)

#### Especificação Técnica

- **Definir** padrão: toda função exportada DEVE ter JSDoc com `@param`, `@returns`, `@throws`.
- **Priorizar** módulos públicos:
  1. `src/lib/db/*.js` — Funções de DB.
  2. `src/shared/utils/*.js` — Utilitários.
  3. `src/domain/*.js` — Domain services (módulos novos da FASE-03).
  4. `src/sse/services/*.js` — Services de streaming.
- **ESLint:** Ativar `jsdoc/require-jsdoc` como `warn` para `export` functions.

#### Critérios de Aceite

- [ ] ≥ 80% das funções exportadas em módulos priorizados têm JSDoc.
- [ ] ESLint rule `jsdoc/require-jsdoc` ativa.
- [ ] CONTRIBUTING.md documenta o padrão de JSDoc.

---

## Pré-Requisitos

- FASE-03 (decisões de refatoração para ADRs) e FASE-05 (padrões de código para CONTRIBUTING).

## Entregáveis

1. Diretório `docs/adr/` com ≥ 6 ADRs.
2. `CONTRIBUTING.md` completo.
3. `SECURITY.md` expandido.
4. JSDoc em funções exportadas.
5. PR template.

## Critérios de Conclusão da Fase

- [ ] Todos os documentos criados e revisados.
- [ ] README atualizado com links para novos docs.
- [ ] ESLint rule de JSDoc ativa.

## Riscos Identificados

| Risco                                              | Probabilidade | Impacto | Mitigação                       |
| -------------------------------------------------- | ------------- | ------- | ------------------------------- |
| ADRs ficam desatualizados rapidamente              | Média         | Baixo   | Revisão trimestral agendada     |
| JSDoc obrigatório reduz velocidade de contribuição | Baixa         | Baixo   | Começar com `warn`, não `error` |
| SECURITY.md cria expectativas de SLA não cumpridas | Baixa         | Médio   | SLA realista e comunicado       |
