# Security Policy (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Relato de Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança no OmniRoute, relate-a de maneira responsável:

1. **NÃO** abra uma issue pública no GitHub
2. Use os [Avisos de Segurança do GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inclua: descrição, etapas de reprodução e impacto potencial

## Prazo de Resposta

| Etapa                  | Meta                    |
| ---------------------- | ----------------------- |
| Confirmação            | 48 horas                |
| Triagem e Avaliação    | 5 dias úteis            |
| Lançamento da Correção | 14 dias úteis (crítico) |

## Versões Compatíveis

| Versão  | Status do Suporte |
| ------- | ----------------- |
| 3.8.x   | ✅ Ativo          |
| 3.7.x   | ✅ Segurança      |
| < 3.7.0 | ❌ Sem suporte    |

---

## Arquitetura de Segurança

O OmniRoute implementa um modelo de segurança em múltiplas camadas:

```
Requisição → CORS → Pipeline de autorização (classificar → políticas → aplicar)
           → Proteções (mascarador de PII, injeção de prompt, ponte de visão)
           → Limitador de Taxa → Disjuntor → Tempo de Espera → Bloqueio do Modelo → Provedor
```

### 🔐 Autenticação e Autorização

| Recurso                             | Implementação                                                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login no Painel**                 | Autenticação baseada em senha com tokens JWT (cookies HttpOnly)                                                                                                            |
| **Autenticação por Chave de API**   | Chaves assinadas com HMAC e validação CRC                                                                                                                                  |
| **OAuth 2.0 + PKCE**                | O OAuth específico do provedor via navegador/dispositivo usa PKCE quando compatível; credenciais Devin somente para importação são tratadas separadamente.                 |
| **Renovação de Token**              | Renovação automática do token OAuth antes da expiração                                                                                                                     |
| **Cookies Seguros**                 | `AUTH_COOKIE_SECURE=true` para ambientes HTTPS                                                                                                                             |
| **Pipeline de Autorização**         | Classificação de rotas (PUBLIC / CLIENT_API / MANAGEMENT) — consulte `docs/architecture/AUTHZ_GUIDE.md`                                                                    |
| **Níveis de Proteção de Rotas**     | Modelo de 3 níveis para rotas de gerenciamento (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — consulte `docs/security/ROUTE_GUARD_TIERS.md`                                |
| **MCP com Escopo de Gerenciamento** | O acesso remoto a `/api/mcp/*` é controlado por chaves de API com o escopo `manage`; `/api/cli-tools/runtime/*` permanece restrito ao loopback. Consulte ROUTE_GUARD_TIERS |
| **Escopos MCP**                     | 32 escopos granulares (read:health, write:combos, execute:completions etc.) — consulte `docs/frameworks/MCP-SERVER.md`                                                     |

### 🛡️ Criptografia em Repouso

Todos os dados confidenciais armazenados no SQLite são criptografados usando **AES-256-GCM** com derivação de chave scrypt:

- Chaves de API, tokens de acesso, tokens de atualização e tokens de ID
- Formato versionado: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Modo de passagem direta (texto simples) quando `STORAGE_ENCRYPTION_KEY` não está definida

```bash
# Gerar chave de criptografia:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Framework de Proteções

O OmniRoute inclui um **registro de proteções** com recarregamento dinâmico (`src/lib/guardrails/`), com 3 proteções integradas ordenadas por prioridade:

| Proteção           | Prioridade | Finalidade                                                                                                       |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5          | Conecta modelos sem recursos de visão a descrições cientes de imagens; proteção contra SSRF para URLs de imagens |
| `pii-masker`       | 10         | Ocultação de PII antes e depois da chamada (e-mails, telefone, CPF, CNPJ, cartões de crédito, SSN)               |
| `prompt-injection` | 20         | Detecta padrões de substituição de instruções/sequestro de função/jailbreak/vazamento                            |

Proteções personalizadas são registradas por meio de `registerGuardrail(new MyGuardrail())`. O modelo permite o tráfego em caso de falha (exceções nunca bloqueiam o tráfego). Desativação por requisição por meio do cabeçalho `x-omniroute-disabled-guardrails`. → Consulte [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Proteção contra Injeção de Prompt

Middleware heurístico de melhor esforço que detecta padrões de injeção de prompt em requisições a LLMs.
**Não é um firewall completo contra injeção de prompt** — pode produzir falsos positivos (prompts benignos
de persona/RPG) e falsos negativos (leetspeak, espaçamento, padrões em outros idiomas).

| Tipo de Padrão          | Gravidade | Exemplo                                                      |
| ----------------------- | --------- | ------------------------------------------------------------ |
| Substituição do Sistema | Alta      | "ignore todas as instruções anteriores"                      |
| Sequestro de Função     | Média     | "agora você é DAN, você pode fazer qualquer coisa"           |
| Injeção de Delimitador  | Alta      | Separadores codificados para romper os limites do contexto   |
| DAN/Jailbreak           | Média     | Padrões conhecidos de prompts de jailbreak                   |
| Vazamento de Instruções | Alta      | "mostre-me seu prompt do sistema"                            |
| Evasão por Codificação  | Média     | decodificação base64/rot13/hex + palavras-chave de instrução |

Somente detecções de gravidade **Alta** são bloqueadas no modo `block`. Famílias de gravidade
média são registradas, mas nunca bloqueadas por `sanitizeRequest`.

Configure pelo painel (Configurações → Segurança) ou pelo `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (política de injeção; o modo legado "redact" não remove texto de injeção)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (padrão) | medium | low — gravidades iguais ou superiores a esta são bloqueadas no modo block
```

### 🔒 Ocultação de PII

Detecção automática e ocultação opcional de informações de identificação pessoal:

| Tipo de PII       | Padrão                | Substituição       |
| ----------------- | --------------------- | ------------------ |
| E-mail            | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasil)      | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasil)     | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Cartão de crédito | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefone          | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (EUA)         | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # solicita a reescrita de PII; independente de INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # opcional: oculta PII nas respostas do provedor retornadas aos clientes
```

### 🌐 Segurança de rede

| Recurso                      | Descrição                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| **CORS**                     | Lista explícita de origens permitidas entre origens (`CORS_ALLOWED_ORIGINS`; legado `CORS_ORIGIN`) |
| **Filtragem de IP**          | Intervalos de IP permitidos/bloqueados no painel                                                   |
| **Limitação de taxa**        | Limites de taxa por provedor com recuo automático                                                  |
| **Anti-Thundering Herd**     | Mutex + bloqueio por conexão evitam erros 502 em cascata                                           |
| **Impressão digital TLS**    | Falsificação de impressão digital TLS semelhante à de navegadores para reduzir a detecção de bots  |
| **Impressão digital da CLI** | Ordenação de cabeçalhos/corpo por provedor para corresponder às assinaturas nativas da CLI         |

### 🔌 Resiliência e disponibilidade

| Recurso                         | Descrição                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------- |
| **Disjuntor**                   | 3 estados (Fechado → Aberto → Semiaberto) por provedor, persistido no SQLite |
| **Idempotência de requisições** | Janela de desduplicação de 5 segundos para requisições duplicadas            |
| **Recuo exponencial**           | Nova tentativa automática com atrasos crescentes                             |
| **Painel de integridade**       | Monitoramento da integridade dos provedores em tempo real                    |

### 📋 Conformidade

| Recurso                    | Descrição                                                                         |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Retenção de logs**       | Limpeza automática após `CALL_LOG_RETENTION_DAYS`                                 |
| **Opção de não registrar** | A flag `noLog` por chave de API desativa o registro de requisições                |
| **Log de auditoria**       | Ações administrativas rastreadas na tabela `audit_log`                            |
| **Auditoria MCP**          | Registro de auditoria baseado em SQLite para todas as chamadas de ferramentas MCP |
| **Validação com Zod**      | Todas as entradas da API são validadas com esquemas Zod v4 ao carregar o módulo   |

---

## Variáveis de ambiente obrigatórias

Todos os segredos devem ser definidos antes de iniciar o servidor. O servidor **falhará imediatamente** se eles estiverem ausentes ou forem fracos.

```bash
# OBRIGATÓRIO — o servidor não será iniciado sem estas variáveis:
JWT_SECRET=$(openssl rand -base64 48)     # mínimo de 32 caracteres
API_KEY_SECRET=$(openssl rand -hex 32)    # mínimo de 16 caracteres

# RECOMENDADO — habilita a criptografia de dados em repouso:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

O servidor rejeita ativamente valores reconhecidamente fracos, como `changeme`, `secret` ou `password`.

---

## Segurança do Docker

- Use um usuário não root em produção
- Monte os segredos como volumes somente leitura
- Nunca copie arquivos `.env` para imagens Docker
- Use `.dockerignore` para excluir arquivos confidenciais
- Defina `AUTH_COOKIE_SECURE=true` quando estiver atrás de HTTPS

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Dependências

- Execute `npm audit` regularmente (`npm run audit:deps` abrange o projeto principal + electron)
- Mantenha as dependências atualizadas
- O projeto usa `husky` + `lint-staged` para verificações de pré-commit (lint-staged + check-docs-sync + check:any-budget:t11)
- O pipeline de CI executa regras de segurança do ESLint a cada push (`no-eval`, `no-implied-eval`, `no-new-func` = erro)
- As constantes dos provedores são validadas no carregamento do módulo por meio do Zod (`src/shared/validation/schemas.ts`)
- Bibliotecas seguras por padrão utilizadas: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (sem risco de SQLi devido a consultas parametrizadas), `bcryptjs` (hash de senhas)

## Regras rígidas de segurança

Estas regras são aplicadas pelas ferramentas e pelos revisores:

1. **Nunca faça commit de segredos** — `.env` é ignorado pelo Git; `.env.example` é o modelo (sem literais, apenas comentários — consulte PUBLIC_CREDS.md abaixo)
2. **Nunca use `eval()`, `new Function()` ou avaliação implícita** — o ESLint garante o cumprimento dessa regra
3. **Nunca ignore os hooks do Husky** (`--no-verify`, `--no-gpg-sign`) sem a aprovação explícita do operador
4. **Nunca escreva SQL bruto nas rotas** — sempre use `src/lib/db/` (parametrizado)
5. **Sempre valide as entradas com o Zod** — `src/shared/validation/schemas.ts`
6. **Sempre sanitize os cabeçalhos upstream** — lista de bloqueio em `src/shared/constants/upstreamHeaders.ts`
7. **Criptografe as credenciais em repouso** — AES-256-GCM por meio de `src/lib/db/encryption.ts`
8. **Identificadores OAuth upstream públicos por meio de `resolvePublicCred()`** — nunca incorpore literais `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` no código-fonte. Consulte [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Respostas de erro por meio de `buildErrorBody()` / `sanitizeErrorMessage()`** — nunca inclua `err.stack` / `err.message` brutos nos corpos das respostas HTTP / SSE / executor / MCP. Consulte [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Valores de tempo de execução de `exec()` / `spawn()` por meio da opção `env`** — nunca interpole como string caminhos externos ou valores não confiáveis em scripts passados ao shell. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Prefira bibliotecas seguras por padrão** — consulte [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Recorra a elas antes de desenvolver sua própria solução.

## Achados de scanners da cadeia de suprimentos (Socket.dev / Snyk / similares)

O artefato npm publicado do `omniroute` inclui o build do Next.js com `output: "standalone"`,
o que significa que cada manipulador de rota — incluindo recursos privilegiados
documentados (MITM, importação do Zed, Cloud Sync, supervisor de serviço integrado) — acaba
em trechos minificados `.next/server/*.js`. Scanners heurísticos da cadeia de suprimentos
frequentemente comparam esses trechos a assinaturas de malware.

A configuração do scanner que usamos está em [`socket.yml`](socket.yml), na raiz do
repositório (formato v2 do aplicativo GitHub do Socket.dev — consulte
<https://docs.socket.dev/docs/socket-yml>). Ela exclui explicitamente
diretórios que não são distribuídos (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/` etc.), de modo que o scanner reporte apenas caminhos de código que
realmente chegam aos usuários da versão publicada — a própria varredura é conduzida pelo
aplicativo GitHub do Socket, que lê esse arquivo, e não por um fluxo de trabalho neste
repositório.

Para cada categoria de achado, mantemos uma declaração do mantenedor específica para cada achado:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mapa por achado: arquivo-fonte ↔ trecho sinalizado ↔ comportamento ↔ mitigação
  aplicada na v3.8.6.
- Blocos `SECURITY-AUDITOR-NOTE:` no código-fonte, em cada função sinalizada,
  apontam para o mesmo documento.

Para usuários cujo pipeline não permite flexibilizar o alerta: compile com
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Isso substitui os quatro
módulos sensíveis por stubs que retornam HTTP 503 `feature-disabled` em
tempo de execução, de modo que os caminhos de código privilegiados fiquem fisicamente ausentes do pacote.
Consulte [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
para ver o procedimento de publicação.

## Referências

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline de autorização
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — framework de proteções
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — log de auditoria e retenção
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — padrão **obrigatório** para credenciais públicas de serviços upstream
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — padrão **obrigatório** para respostas de erro
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — declaração do mantenedor sobre achados de scanners da cadeia de suprimentos
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — fingerprinting TLS (aviso legal/ético)
- [`CLAUDE.md`](CLAUDE.md) — regras rígidas para agentes de IA
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — bibliotecas selecionadas com configurações padrão seguras
