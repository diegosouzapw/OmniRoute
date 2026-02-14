# FASE 01 — Security Hardening

> **Prioridade:** 🔴 Crítica  
> **Estimativa de Complexidade:** Média (3–5 dias)  
> **Dimensões do Relatório:** D3 (Qualidade do Código), D8 (LLM Proxy/Gateway)  
> **Dependências:** Nenhuma — esta fase é pré-requisito para todas as demais.

---

## Objetivo

Eliminar todas as vulnerabilidades de segurança críticas identificadas no relatório de análise, garantindo que o sistema não opere com segredos previsíveis, que erros nunca sejam silenciados, e que exista proteção básica contra ataques direcionados a LLM proxies.

---

## Escopo Detalhado

### 1.1 — Remoção de Fallbacks Hardcoded de Segredos

**Origem no relatório:** D3 — Segredos Hardcoded com Fallbacks Inseguros (🔴 Crítico)

#### Arquivos afetados

| Arquivo                        | Segredo          | Fallback Atual                         |
| ------------------------------ | ---------------- | -------------------------------------- |
| `src/proxy.js:4-6`             | `JWT_SECRET`     | `"omniroute-default-secret-change-me"` |
| `src/shared/utils/apiKey.js:3` | `API_KEY_SECRET` | `"endpoint-proxy-api-key-secret"`      |

#### Especificação Técnica

- **Remover** os fallbacks `|| "..."` de todos os segredos.
- **Implementar** validação na inicialização (`server-init.js` ou `next.config.mjs`) que:
  - Verifica se `JWT_SECRET` está definido e tem comprimento ≥ 32 caracteres.
  - Verifica se `API_KEY_SECRET` está definido e tem comprimento ≥ 16 caracteres.
  - Lança erro fatal com mensagem clara se não configurados (fail-fast).
- **Atualizar** `.env.example` e README com instruções explícitas de configuração.
- **Adicionar** warning no onboarding se os segredos parecerem ser os defaults do `.env.example`.

#### Critérios de Aceite

- [ ] Aplicação NÃO inicia sem `JWT_SECRET` definido.
- [ ] Aplicação NÃO inicia sem `API_KEY_SECRET` definido.
- [ ] Mensagem de erro indica exatamente qual variável está faltando.
- [ ] `.env.example` documentado com instruções para gerar segredos fortes.
- [ ] Testes unitários cobrem cenário de inicialização sem segredos.

---

### 1.2 — Eliminação de Erros Silenciosos no Middleware

**Origem no relatório:** D3 — Erro Silencioso em Middleware (🔴 Crítico)

#### Arquivos afetados

| Arquivo              | Linha                      | Problema                 |
| -------------------- | -------------------------- | ------------------------ |
| `src/proxy.js:42-43` | `catch (err) { }`          | Exceção engolida sem log |
| `src/proxy.js:24`    | `catch (err) { redirect }` | JWT inválido sem log     |

#### Especificação Técnica

- **Adicionar** logging estruturado em todos os `catch` blocks do middleware:
  ```javascript
  catch (err) {
    console.error("[Middleware] Settings fetch failed:", err.message);
    // On error, require login
  }
  ```
- **Utilizar** `pino` (já nas dependências) para logging estruturado.
- **Incluir** categorização do erro: `auth_error`, `settings_error`, `unknown_error`.
- **Garantir** que nenhum stacktrace seja exposto ao cliente — apenas logging server-side.

#### Critérios de Aceite

- [ ] Todos os `catch` blocks em `proxy.js` logam o erro.
- [ ] Logs incluem contexto suficiente para debug (path, tipo de erro).
- [ ] Nenhuma informação sensível exposta nos logs (sem tokens, sem senhas).
- [ ] Revisão manual confirma zero `catch` vazio em todo `src/`.

---

### 1.3 — Proteção contra Prompt Injection

**Origem no relatório:** D8 — Sem Proteção contra Prompt Injection (🔴 Crítico)

#### Especificação Técnica

- **Criar** módulo `src/shared/utils/inputSanitizer.js` com:
  - Detecção de padrões conhecidos de prompt injection.
  - Opção de sanitização ou rejeição.
  - Configuração via settings (habilitado/desabilitado, nível: `warn`, `block`, `redact`).
- **Integrar** no pipeline de request em `src/sse/handlers/chat.js`:
  - Antes de `translateRequest()`, chamar o sanitizador.
  - Logar tentativas detectadas com severity `warn` ou `error`.
- **Implementar** PII Redaction básica:
  - Detecção de padrões de email, CPF/CNPJ, cartões de crédito.
  - Modo `audit` (detecta e loga) vs `redact` (substitui por `[REDACTED]`).

#### Critérios de Aceite

- [ ] Módulo `inputSanitizer.js` criado com testes unitários.
- [ ] Pipeline de request integra o sanitizador.
- [ ] Configuração via `.env` ou dashboard settings.
- [ ] Testes cobrem padrões conhecidos de prompt injection.
- [ ] Documentação indica os padrões detectados e como configurar.

---

### 1.4 — Remoção de `.passthrough()` em Zod Schemas

**Origem no relatório:** D3 — `.passthrough()` em Zod Schema (🟡 Moderado)

#### Arquivos afetados

| Arquivo                               | Linha            | Problema                  |
| ------------------------------------- | ---------------- | ------------------------- |
| `src/shared/validation/schemas.js:63` | `.passthrough()` | Aceita campos arbitrários |

#### Especificação Técnica

- **Remover** `.passthrough()` do `updateSettingsSchema`.
- **Substituir** por `.strict()` ou listar explicitamente todos os campos aceitos.
- **Verificar** todos os call sites que enviam dados para o endpoint de settings.
- **Testar** que campos desconhecidos são rejeitados com erro 400.

#### Critérios de Aceite

- [ ] `.passthrough()` removido de todos os schemas.
- [ ] Campos extras são rejeitados com mensagem de erro clara.
- [ ] Nenhum endpoint quebra após a mudança.

---

### 1.5 — Limpeza de Dependências Inseguras

**Origem no relatório:** D3 — `fs` como dependência NPM (🟢 Menor)

#### Especificação Técnica

- **Remover** `"fs": "^0.0.1-security"` do `package.json`.
- **Verificar** que nenhum `import` usa o pacote npm `fs` (todos devem usar `node:fs`).
- **Rodar** `npm audit` e documentar resultados.

#### Critérios de Aceite

- [ ] Pacote `fs` removido do `package.json`.
- [ ] `npm install` executa sem erros.
- [ ] Build (`npm run build`) executa sem erros.

---

## Pré-Requisitos

- Acesso ao repositório OmniRoute com permissão de push.
- Ambiente de desenvolvimento funcional (Node.js ≥ 18, npm).

## Entregáveis

1. Código-fonte alterado com todos os itens desta fase implementados.
2. Testes unitários para validação de segredos e sanitizador de inputs.
3. `.env.example` atualizado com instruções de segredos.
4. Branch de feature com PR para review.

## Critérios de Conclusão da Fase

- [ ] Todos os critérios de aceite dos 5 itens cumpridos.
- [ ] Build passa sem erros.
- [ ] Testes unitários passam.
- [ ] PR aprovado e mergeado.

## Riscos Identificados

| Risco                                                    | Probabilidade | Impacto | Mitigação                                            |
| -------------------------------------------------------- | ------------- | ------- | ---------------------------------------------------- |
| Remoção de fallbacks quebra ambientes existentes         | Alta          | Alto    | Comunicação via CHANGELOG; migration guide no README |
| Sanitizador gera falsos positivos                        | Média         | Médio   | Modo `warn` como default; allowlist de padrões       |
| Remoção de `.passthrough()` quebra features não mapeadas | Baixa         | Médio   | Listar todos os call sites antes da mudança          |
