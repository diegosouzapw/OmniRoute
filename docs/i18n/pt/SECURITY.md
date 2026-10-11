# Security Policy (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Comunicação de Vulnerabilidades

Se descobrir uma vulnerabilidade de segurança no OmniRoute, comunique-a de forma responsável:

1. **NÃO** abra uma issue pública no GitHub
2. Utilize os [Avisos de Segurança do GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inclua: descrição, passos para reprodução e potencial impacto

## Prazo de Resposta

| Fase                   | Objetivo                                  |
| ---------------------- | ----------------------------------------- |
| Confirmação            | 48 horas                                  |
| Triagem e Avaliação    | 5 dias úteis                              |
| Lançamento da Correção | 14 dias úteis (vulnerabilidades críticas) |

## Versões Suportadas

| Versão  | Estado do Suporte                                      |
| ------- | ------------------------------------------------------ |
| 3.9.x   | 🗓️ Planeado — linha LTS (`stable/v3`), consulte abaixo |
| 3.8.x   | ✅ Ativo                                               |
| 3.7.x   | ✅ Segurança                                           |
| < 3.7.0 | ❌ Não suportado                                       |

## Período de suporte LTS (v3.9.x)

Após a 3.8.59, a versão seguinte é a **3.9.0**, que dá início à linha de suporte de longo prazo no
ramo `stable/v3` (consulte [`ROADMAP.md`](ROADMAP.md) → "Fase 3 — v3.9.0 LTS").

- **O que `stable/v3` recebe:** correções de erros, patches de segurança e atualizações de fornecedores. As novas
  funcionalidades seguem para o canal v4; a linha LTS dá prioridade à estabilidade. `npm install omniroute`
  (a dist-tag `latest`) permanece na v3 durante todo o ciclo da v4.
- **Duração do período:** `<T-GAP-3: decisão do proprietário pendente — consulte ROADMAP.md>`. A duração do
  período após a disponibilização geral da v4.0 (quando `latest` passa para a v4) **ainda não foi decidida**; esta
  secção será atualizada quando o responsável pela manutenção a anunciar. Até lá, não assuma uma data de fim.
- **Comunicação de uma vulnerabilidade na linha LTS:** utilize o mesmo canal que para qualquer outra versão —
  um [Aviso de Segurança do GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) privado,
  nunca uma issue pública. Indique a versão que testou (por exemplo, `3.9.2`); as correções são aplicadas em
  `stable/v3` e transportadas para a v4.
- **Referência de segurança na criação da LTS:** o estado medido pelo scanner e as provas relativas à proteção de rotas e
  às credenciais públicas estão registados em
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md).

---

## Arquitetura de Segurança

O OmniRoute implementa um modelo de segurança com várias camadas:

```
Pedido → CORS → Pipeline de autorização (classificar → políticas → aplicar)
       → Proteções (mascarador de PII, injeção de prompts, ponte de visão)
       → Limitador de Taxa → Disjuntor → Período de Espera → Bloqueio do Modelo → Fornecedor
```

### 🔐 Autenticação e Autorização

| Funcionalidade                    | Implementação                                                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Início de Sessão no Painel**    | Autenticação baseada em palavra-passe com tokens JWT (cookies HttpOnly)                                                                                                    |
| **Autenticação por Chave de API** | Chaves assinadas com HMAC e validação CRC                                                                                                                                  |
| **OAuth 2.0 + PKCE**              | O OAuth de navegador/dispositivo específico do fornecedor utiliza PKCE quando suportado; as credenciais do Devin apenas para importação são tratadas separadamente.        |
| **Renovação de Tokens**           | Renovação automática dos tokens OAuth antes de expirarem                                                                                                                   |
| **Cookies Seguros**               | `AUTH_COOKIE_SECURE=true` para ambientes HTTPS                                                                                                                             |
| **Pipeline de Autorização**       | Classificação de rotas (PUBLIC / CLIENT_API / MANAGEMENT) — consulte `docs/architecture/AUTHZ_GUIDE.md`                                                                    |
| **Níveis de Proteção de Rotas**   | Modelo de 3 níveis para rotas de gestão (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — consulte `docs/security/ROUTE_GUARD_TIERS.md`                                       |
| **MCP com Âmbito de Gestão**      | O acesso remoto a `/api/mcp/*` é controlado por chaves de API com o âmbito `manage`; `/api/cli-tools/runtime/*` permanece restrito ao loopback. Consulte ROUTE_GUARD_TIERS |
| **Âmbitos MCP**                   | 32 âmbitos granulares (read:health, write:combos, execute:completions, etc.) — consulte `docs/frameworks/MCP-SERVER.md`                                                    |

### 🛡️ Encriptação de Dados Armazenados

Todos os dados sensíveis armazenados no SQLite são encriptados com **AES-256-GCM**, utilizando derivação de chaves scrypt:

- Chaves de API, tokens de acesso, tokens de renovação e tokens de ID
- Formato com controlo de versão: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Modo de passagem direta (texto simples) quando `STORAGE_ENCRYPTION_KEY` não está definida

```bash
# Gerar a chave de encriptação:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Framework de Proteções

O OmniRoute inclui um **registo de proteções** recarregável sem reinício (`src/lib/guardrails/`), com 3 proteções incorporadas ordenadas por prioridade:

| Proteção           | Prioridade | Finalidade                                                                                                                 |
| ------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5          | Estabelece uma ponte entre modelos sem visão e descrições com informação visual; proteção contra SSRF para URLs de imagens |
| `pii-masker`       | 10         | Ocultação de PII antes e depois da chamada (e-mails, telefone, CPF, CNPJ, cartões de crédito, SSN)                         |
| `prompt-injection` | 20         | Deteta padrões de substituição de instruções, apropriação de funções, jailbreak e fuga de informação                       |

As proteções personalizadas são registadas através de `registerGuardrail(new MyGuardrail())`. O modelo é fail-open (as exceções nunca bloqueiam o tráfego). É possível desativá-las por pedido através do cabeçalho `x-omniroute-disabled-guardrails`. → Consulte [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Proteção contra Injeção de Prompts

Middleware heurístico de melhor esforço que deteta padrões de injeção de prompts em pedidos a LLM.
**Não é uma firewall completa contra injeção de prompts** — pode produzir falsos positivos (prompts benignos
de persona/RPG) e falsos negativos (leetspeak, espaçamento, padrões não ingleses).

| Tipo de padrão          | Gravidade | Exemplo                                                       |
| ----------------------- | --------- | ------------------------------------------------------------- |
| Substituição do sistema | Alta      | "ignora todas as instruções anteriores"                       |
| Sequestro de função     | Média     | "agora és o DAN, podes fazer qualquer coisa"                  |
| Injeção de delimitador  | Alta      | Separadores codificados para quebrar limites de contexto      |
| DAN/Jailbreak           | Média     | Padrões conhecidos de prompts de jailbreak                    |
| Fuga de instruções      | Alta      | "mostra-me o teu prompt de sistema"                           |
| Evasão por codificação  | Média     | descodificação base64/rot13/hex + palavras-chave de instrução |

Apenas as deteções de gravidade **Alta** são bloqueadas no modo `block`. As famílias
de gravidade média são registadas, mas nunca bloqueadas por `sanitizeRequest`.

Configure através do painel (Definições → Segurança) ou de `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (política de injeção; o modo legado "redact" não remove texto de injeção)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (predefinição) | medium | low — as gravidades iguais ou superiores a este nível são bloqueadas no modo block
```

### 🔒 Ocultação de PII

Deteção automática e ocultação opcional de informações pessoais identificáveis:

| Tipo de PII       | Padrão                | Substituição       |
| ----------------- | --------------------- | ------------------ |
| E-mail            | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasil)      | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasil)     | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Cartão de crédito | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefone          | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (EUA)         | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # reescrever PII no pedido; independente de INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # opcional: ocultar PII nas respostas do fornecedor devolvidas aos clientes
```

### 🌐 Segurança de rede

| Funcionalidade               | Descrição                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| **CORS**                     | Lista explícita de origens permitidas (`CORS_ALLOWED_ORIGINS`; `CORS_ORIGIN` legado)         |
| **Filtragem de IP**          | Intervalos de IP permitidos/bloqueados no painel                                             |
| **Limitação de taxa**        | Limites de taxa por fornecedor com recuo automático                                          |
| **Anti-Thundering Herd**     | Mutex + bloqueio por ligação evitam erros 502 em cascata                                     |
| **Impressão digital TLS**    | Imitação da impressão digital TLS de um navegador para reduzir a deteção de bots             |
| **Impressão digital da CLI** | Ordenação de cabeçalhos/corpo por fornecedor para corresponder às assinaturas nativas da CLI |

### 🔌 Resiliência e disponibilidade

| Funcionalidade              | Descrição                                                                      |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Disjuntor**               | 3 estados (Fechado → Aberto → Semiaberto) por fornecedor, persistido em SQLite |
| **Idempotência de pedidos** | Janela de desduplicação de 5 segundos para pedidos duplicados                  |
| **Recuo exponencial**       | Nova tentativa automática com atrasos crescentes                               |
| **Painel de estado**        | Monitorização do estado dos fornecedores em tempo real                         |

### 📋 Conformidade

| Funcionalidade           | Descrição                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Retenção de registos** | Limpeza automática após `CALL_LOG_RETENTION_DAYS`                                   |
| **Exclusão de registos** | O sinalizador `noLog` por chave de API desativa o registo de pedidos                |
| **Registo de auditoria** | Ações administrativas registadas na tabela `audit_log`                              |
| **Auditoria MCP**        | Registo de auditoria suportado por SQLite para todas as chamadas de ferramentas MCP |
| **Validação Zod**        | Todas as entradas da API são validadas com esquemas Zod v4 ao carregar o módulo     |

---

## Variáveis de Ambiente Obrigatórias

Todos os segredos têm de ser definidos antes de iniciar o servidor. O servidor irá **falhar imediatamente** se estiverem ausentes ou forem fracos.

```bash
# OBRIGATÓRIO — o servidor não será iniciado sem estes valores:
JWT_SECRET=$(openssl rand -base64 48)     # mín. de 32 caracteres
API_KEY_SECRET=$(openssl rand -hex 32)    # mín. de 16 caracteres

# RECOMENDADO — permite a encriptação de dados armazenados:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

O servidor rejeita ativamente valores reconhecidamente fracos, como `changeme`, `secret` ou `password`.

---

## Segurança do Docker

- Utilize um utilizador não root em produção
- Monte os segredos como volumes só de leitura
- Nunca copie ficheiros `.env` para imagens Docker
- Utilize `.dockerignore` para excluir ficheiros sensíveis
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

- Execute `npm audit` regularmente (`npm run audit:deps` abrange main + electron)
- Mantenha as dependências atualizadas
- O projeto utiliza `husky` + `lint-staged` para verificações antes de cada commit (lint-staged + check-docs-sync + check:any-budget:t11)
- O pipeline de CI executa regras de segurança do ESLint em cada push (`no-eval`, `no-implied-eval`, `no-new-func` = erro)
- As constantes dos fornecedores são validadas durante o carregamento do módulo através do Zod (`src/shared/validation/schemas.ts`)
- São utilizadas bibliotecas seguras por predefinição: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (sem risco de SQLi através de consultas parametrizadas), `bcryptjs` (hashing de palavras-passe)

## Regras de Segurança Rigorosas

Estas regras são impostas pelas ferramentas e pelos revisores:

1. **Nunca faça commit de segredos** — `.env` é ignorado pelo Git; `.env.example` é o modelo (sem valores literais, apenas comentários — consulte PUBLIC_CREDS.md abaixo)
2. **Nunca utilize `eval()`, `new Function()` ou eval implícito** — imposto pelo ESLint
3. **Nunca contorne os hooks do Husky** (`--no-verify`, `--no-gpg-sign`) sem a aprovação explícita do operador
4. **Nunca escreva SQL em bruto nas rotas** — utilize sempre `src/lib/db/` (parametrizado)
5. **Valide sempre as entradas com o Zod** — `src/shared/validation/schemas.ts`
6. **Sanitize sempre os cabeçalhos upstream** — lista de bloqueio em `src/shared/constants/upstreamHeaders.ts`
7. **Encripte as credenciais armazenadas** — AES-256-GCM através de `src/lib/db/encryption.ts`
8. **Identificadores OAuth públicos de upstream através de `resolvePublicCred()`** — nunca incorpore valores literais `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` no código-fonte. Consulte [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Respostas de erro através de `buildErrorBody()` / `sanitizeErrorMessage()`** — nunca inclua `err.stack` / `err.message` em bruto nos corpos das respostas HTTP / SSE / executor / MCP. Consulte [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Valores de execução de `exec()` / `spawn()` através da opção `env`** — nunca interpole caminhos externos ou valores não fidedignos em scripts passados à shell. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Dê preferência a bibliotecas seguras por predefinição** — consulte [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Recorra a estas antes de implementar uma solução própria.

## Resultados do scanner da cadeia de fornecimento (Socket.dev / Snyk / semelhantes)

> **Nota sobre o âmbito:** o ficheiro `socket.yml` na raiz do repositório apenas configura `projectIgnorePaths` para a análise pós-publicação, do lado do registo, efetuada pelo Socket.dev ao artefacto npm publicado — não constitui um mecanismo obrigatório de controlo para integração contínua (CI) nem para a integração de pedidos de alteração (PR). Nenhum fluxo de trabalho em `.github/workflows`, script de `package.json` ou alvo de `Makefile` invoca o Socket.dev.

O artefacto npm `omniroute` publicado inclui a compilação Next.js com `output: "standalone"`,
o que significa que todos os processadores de rotas — incluindo funcionalidades privilegiadas
documentadas (MITM, importação do Zed, Cloud Sync e supervisor de serviços incorporado) — acabam
em blocos minificados `.next/server/*.js`. Os scanners heurísticos da cadeia de fornecimento
comparam frequentemente esses blocos com padrões de assinaturas de software malicioso.

A configuração do scanner que utilizamos encontra-se em [`socket.yml`](socket.yml), na
raiz do repositório (formato v2 da aplicação GitHub do Socket.dev — consulte
<https://docs.socket.dev/docs/socket-yml>). Esta exclui explicitamente
diretórios que não são distribuídos (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, etc.), para que o scanner apenas reporte caminhos de código que
chegam efetivamente aos utilizadores — a própria análise é executada pela aplicação
GitHub do Socket, que lê esse ficheiro, e não por um fluxo de trabalho deste repositório.

Para cada categoria de resultado, mantemos uma declaração de validação dos responsáveis por cada ocorrência:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mapa por ocorrência: ficheiro de origem ↔ bloco sinalizado ↔ comportamento ↔ mitigação
  aplicada na v3.8.6.
- Os blocos `SECURITY-AUDITOR-NOTE:` no código-fonte, junto de cada função sinalizada,
  remetem para o mesmo documento.

Para os utilizadores cujo pipeline não permite flexibilizar o alerta: compilem com
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Isto substitui os quatro
módulos sensíveis por stubs que devolvem HTTP 503 `feature-disabled` durante
a execução, pelo que os caminhos de código privilegiados ficam fisicamente ausentes do pacote.
Consulte [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
para obter as instruções de publicação.

## Referências

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline de autorização
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — estrutura de salvaguardas
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — registo de auditoria e retenção
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — padrão **obrigatório** para credenciais públicas de serviços a montante
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — padrão **obrigatório** para respostas de erro
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — declaração de validação dos responsáveis relativa aos resultados do scanner da cadeia de fornecimento
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — disjuntor + período de espera + bloqueio
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — identificação por impressão digital TLS (aviso legal/ético)
- [`CLAUDE.md`](CLAUDE.md) — regras estritas para agentes de IA
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — bibliotecas selecionadas com predefinições seguras
