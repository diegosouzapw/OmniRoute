# Plano de Lançamento Reddit v2 — OmniRoute: AI Gateway Gratuito com Anti-Ban, Roteamento Inteligente & Orquestração de Agentes

> ⚠️ Este arquivo é intencionalmente ignorado pelo git. É um doc privado de planejamento para posts no Reddit.

---

## 🧠 Mensagem Central v2 (use em todo post)

> **"Pense no OmniRoute como um roteador Wi-Fi — só que para chamadas de IA. Todos os seus agentes se conectam a um único endereço, e o roteador decide qual assinatura/chave/tier gratuito usar. E o melhor: ele faz seu tráfego parecer nativo, para que os provedores não percebam que está vindo de um proxy."**
>
> OmniRoute é um **AI gateway gratuito e open-source** que fica entre suas ferramentas de código e os provedores de IA. Um endpoint, 36+ provedores, fallback inteligente em 4 tiers (Assinatura → Chave API → Barato → Gratuito). Empilhamento multi-conta, **proteção anti-ban** (spoofing de fingerprint TLS + matching de fingerprint CLI), servidor MCP, orquestração A2A, cache semântico, circuit breakers, e um dashboard completo em 30 idiomas. **Nunca mais bata em rate limit. Nunca mais tenha sua conta sinalizada. Nunca pare de codar.**

### A Analogia do "Roteador" v2 (comece com isso + gancho anti-ban)

> Imagine que você tem um "time" de agentes de IA programando — um pro frontend, outro pro backend, outro pros testes, outro pra code review.
>
> **Sem OmniRoute:** Todos usam a mesma assinatura do OpenAI. Em 1-2 horas: rate limit, fica caro, a API oscila e o trabalho para. Pior — o provedor detecta padrões de tráfego incomuns de um proxy e **sinaliza sua conta**.
>
> **Com OmniRoute:** Você configura múltiplas "fontes de IA" (OpenAI Conta A, OpenAI Conta B, Anthropic Conta C, Gemini Conta D...). Aponta todos os agentes pro OmniRoute como se ele fosse o "servidor de IA." Quando a Conta A bate o limite, o OmniRoute troca automático pra Conta B (ou pra outro provedor). Mesma pergunta repetida? Cache, custo zero. Provedor instável? Retry + fallback. **E aqui vem o diferencial: o OmniRoute reordena seus headers HTTP e campos do body pra combinar exatamente como a CLI nativa mandaria — então o provedor acha que você tá usando Claude Code ou Codex CLI normalmente. O IP do proxy continua, mas a "impressão digital" é indistinguível de tráfego legítimo.**

### Pitch Anti-Ban (use quando pessoas se preocupam com ban de conta)

> **"Você usa proxy pra rotear tráfego de IA, mas o provedor detecta que suas requests parecem diferentes do uso normal de CLI e sinaliza sua conta."**
>
> OmniRoute resolve isso com duas camadas de proteção anti-ban:
>
> 1. **Spoofing de Fingerprint TLS** — Faz seu handshake TLS parecer de um navegador ao invés de um script Node.js. Provedores usam fingerprinting TLS pra detectar bots — isso bypassa completamente.
>
> 2. **Matching de Fingerprint CLI** — Reordena headers HTTP e campos do body pra combinar a assinatura exata das ferramentas CLI nativas (Claude Code, Codex CLI, etc.). Toggle por provedor. **Seu IP de proxy é preservado** — só a "forma" da request muda.
>
> Resultado: provedores veem o que parece um usuário normal no Claude Code ou Codex CLI — não um proxy. Suas contas ficam seguras.

---

## 📋 Estratégia de Postagem v2

### Regras Atualizadas

- **Comece com anti-ban** — É a feature #1 que as pessoas não sabem que precisam até serem sinalizadas
- **A analogia do "roteador"** — Faz o produto fazer sentido imediatamente
- **Mostre o cenário multi-agente** — 4 agentes codando simultâneos ressoa muito
- **Empilhamento multi-conta + fingerprint** — Diferencial
- **Seja redditor primeiro** — Comente genuinamente antes/depois de postar
- **"Eu construí isso"** não "alguém fez isso" — Seja transparente
- **$0 combo** — Gratuito pra sempre é irresistível
- **v2.0.13** — Dashboard de agentes CLI, MCP, A2A, anti-ban é diferencial

### Timing

- **Melhores dias:** Terça–Quinta
- **Melhores horários:** 8–10 AM EST (13–15 UTC)
- Poste em 1–2 subreddits por dia, não todos de uma vez

---

## 🎯 Subreddits Alvo (por prioridade)

### Tier 1 — Alto Impacto (poste primeiro)

| #   | Subreddit       | Membros | Estratégia                                                  |
| --- | --------------- | ------- | ----------------------------------------------------------- |
| 1   | r/LocalLLaMA    | ~600K   | Lançamento principal — self-hosting + modelos free + anti-ban |
| 2   | r/ChatGPTCoding | ~200K   | Economia multi-agente + anti-ban + fallback                 |
| 3   | r/selfhosted    | ~400K   | Docker, npm, gateway self-hosted com proteção de fingerprint |
| 4   | r/opensource    | ~100K   | Comunidade, GPL-3.0, convite pra contribuir                |

### Tier 2 — Comunidades Dev

| #   | Subreddit     | Membros | Estratégia                                            |
| --- | ------------- | ------- | ----------------------------------------------------- |
| 5   | r/webdev      | ~2M     | Problema/solução — pare de pagar, pare de ser banido  |
| 6   | r/node        | ~200K   | Stack técnico — anti-ban, MCP, A2A, TS                |
| 7   | r/SideProject | ~200K   | História completa de indie maker                      |
| 8   | r/programming | ~6M     | Ângulo de arquitetura — protocolos, resiliência       |

### Tier 3 — Nicho / Produtividade

| #   | Subreddit   | Membros | Estratégia                                                    |
| --- | ----------- | ------- | ------------------------------------------------------------- |
| 9   | r/HustleGPT | ~98K    | Produtividade com IA + economia + segurança de conta          |
| 10  | r/CursorAI  | ~50K    | Integração direta — OmniRoute com Cursor, sem risco de ban    |
| 11  | r/ClaudeAI  | ~100K   | Maximizar sub Claude + multi-conta sem ser sinalizado         |
| 12  | r/AutoGPT   | ~200K   | Orquestração multi-agente + MCP + A2A + anti-ban              |
| 13  | r/MCP       | ~30K    | Servidor MCP com 16 tools + dashboard de agentes CLI          |

---

## 📅 Cronograma de Postagem

| Dia           | Subreddit       | Post # |
| ------------- | --------------- | ------ |
| Dia 1 (Ter)   | r/LocalLLaMA    | Post 1 |
| Dia 1 (Ter)   | r/ChatGPTCoding | Post 2 |
| Dia 2 (Qua)   | r/selfhosted    | Post 5 |
| Dia 2 (Qua)   | r/opensource    | Post 4 |
| Dia 3 (Qui)   | r/SideProject   | Post 1 |
| Dia 3 (Qui)   | r/node          | Post 3 |
| Dia 4 (Sex)   | r/webdev        | Post 6 |
| Dia 4 (Sex)   | r/HustleGPT     | Post 2 |
| Dia 5 (Seg)   | r/CursorAI      | Post 7 |
| Dia 5 (Seg)   | r/ClaudeAI      | Post 7 |
| Dia 6 (Ter)   | r/programming   | Post 3 |
| Dia 6 (Ter)   | r/AutoGPT       | Post 8 |
| Dia 7 (Qua)   | r/MCP           | Post 8 |

---

## 📝 Templates de Posts v2

### Notas de Formatação do Reddit

- Reddit usa Markdown próprio — **sem tags HTML**
- **Sem imagens embutidas em text posts** — link pro GitHub (imagens aparecem no README)
- Títulos com menos de **300 caracteres** (ideal: 60–100)
- Corpo do texto: **menos de 2000 caracteres** pra melhor engajamento
- Links: formato `[texto](url)`
- Código: indente com 4 espaços

---

## Post 1: r/LocalLLaMA / r/SideProject (Lançamento Principal — Foco Anti-Ban)

### Título:

```
I built a free "AI router" — 36+ providers, multi-account stacking, auto-fallback, and anti-ban protection so your accounts don't get flagged. Never hit a rate limit again.
```

### Corpo:

```
## Os Problemas que Todo Dev com Agentes de IA Enfrenta

1. **Rate limits destroem seu fluxo.** Você tem 4 agentes codando um projeto. Todos batem na mesma assinatura do Claude. Em 1-2 horas: rate limit. Trabalho para. $50 queimados.

2. **Sua conta é sinalizada.** Você roda tráfego por proxy ou reverse proxy. O provedor detecta padrões de request fora do padrão. Conta sinalizada, suspensa ou com rate limit ainda mais pesado.

3. **Você paga $50-200/mês** entre Claude, Codex, Copilot — e AINDA é interrompido.

**Tinha que ter um jeito melhor.**

## O Que Eu Construí

**OmniRoute** — um AI gateway gratuito e open-source. Pense como um **roteador Wi-Fi, só que pra chamadas de IA.** Todos os seus agentes se conectam a um endereço, OmniRoute distribui entre suas assinaturas com fallback automático.

**Como funciona o fallback em 4 tiers:**

    Seus Agentes/Ferramentas → OmniRoute (localhost:20128) →
      Tier 1: ASSINATURA (Claude Pro, Codex, Gemini CLI)
      ↓ quota esgotou?
      Tier 2: CHAVE API (DeepSeek, Groq, créditos gratuitos NVIDIA)
      ↓ limite de orçamento?
      Tier 3: BARATO (GLM $0.6/M, MiniMax $0.2/M)
      ↓ ainda rodando?
      Tier 4: GRATUITO (Qoder ilimitado, Qwen ilimitado, Kiro Claude grátis)

**Resultado:** Nunca pare de codar. Empilhe 10 contas em 5 provedores. Zero troca manual.

## 🔒 Anti-Ban: Por Que Suas Contas Ficam Seguras

Essa é a parte que ninguém mais faz:

**Spoofing de Fingerprint TLS** — Seu handshake TLS parece de um navegador comum, não de um script Node.js. Provedores usam fingerprinting TLS pra detectar bots — isso bypassa completamente.

**Matching de Fingerprint CLI** — OmniRoute reordena seus headers HTTP e campos do body pra combinar exatamente como Claude Code, Codex CLI, etc. mandam requests nativamente. Toggle por provedor. **Seu IP de proxy é preservado** — só a "forma" da request muda.

O provedor vê o que parece um usuário normal no Claude Code. Não um proxy. Não um bot. Suas contas ficam limpas.

## O Que Faz v2.0 Diferente

- 🔒 **Proteção Anti-Ban** — Spoofing de fingerprint TLS + matching de fingerprint CLI
- 🤖 **Dashboard de Agentes CLI** — 14 agentes built-in detectados + registry customizado
- 🎯 **Fallback Inteligente em 4 Tiers** — Assinatura → Chave API → Barato → Gratuito
- 👥 **Empilhamento Multi-Conta** — 10 contas por provedor, 6 estratégias
- 🔧 **Servidor MCP (16 tools)** — Controle o gateway direto da sua IDE
- 🤝 **Protocolo A2A** — Orquestração agente-a-agente
- 🧠 **Cache Semântico** — Mesma pergunta? Resposta em cache, custo zero
- 🖼️ **Multi-Modal** — Chat, imagens, embeddings, áudio, vídeo, música
- 📊 **Dashboard Completo** — Analytics, tracking de quota, logs, 30 idiomas
- 💰 **$0 Combo** — Gemini CLI (180K grátis/mês) + Qoder (ilimitado) = grátis pra sempre

## Instalar

    npm install -g omniroute && omniroute

Ou Docker:

    docker run -d -p 20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute

Dashboard em localhost:20128. Conecte via OAuth. Aponte sua ferramenta para `http://localhost:20128/v1`. Pronto.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**Website:** https://omniroute.online

Open source (GPL-3.0). **Nunca pare de codar.**
```

**Contagem de caracteres:** ~2.000 ✅

---

## Post 2: r/ChatGPTCoding / r/HustleGPT (Foco Custo + Anti-Ban)

### Título:

```
Stop paying $200/month for AI coding AND stop getting your accounts flagged — I built a free "router" with anti-ban protection, multi-account stacking, and auto-fallback
```

### Corpo:

```
## Dois problemas que ninguém discute juntos

**Problema 1: Custo.** Claude Pro $20 + Codex $20 + Copilot $10 + DeepSeek $5-15 = $50-200/mês. Você AINDA bate rate limits.

**Problema 2: Bans.** Você usa proxy ou setup multi-conta. O provedor detecta padrões de request incomuns. Conta sinalizada. Rate limits ficam piores. Ou pior — suspensa.

**E se você pudesse empilhar todas suas contas, fazer fallback automático pra modelos gratuitos, E parecer um usuário normal?**

## OmniRoute — Roteador de IA Grátis com Anti-Ban

Pense como um **roteador Wi-Fi pra IA.** Suas ferramentas se conectam a um endereço (`localhost:20128/v1`), OmniRoute distribui entre TODOS os seus provedores.

**Roteamento Inteligente em 4 Tiers:**

1. **ASSINATURA** — Claude Pro, Codex, Gemini CLI
2. **CHAVE API** — DeepSeek, Groq, xAI (créditos grátis)
3. **BARATO** — GLM ($0.6/M), MiniMax ($0.2/M)
4. **GRATUITO** — Qoder (8 modelos ilimitados), Qwen (3 ilimitados), Kiro (Claude grátis)

Quando Tier 1 acaba → troca automática pro Tier 2 → 3 → 4. **Zero downtime.**

## 🔒 O Segredo Anti-Ban

**Spoofing de Fingerprint TLS** — Seu handshake TLS parece de um navegador, não de um script. Bypassa detecção de bot.

**Matching de Fingerprint CLI** — Reordena headers HTTP/body pra combinar assinaturas nativas do Claude Code ou Codex CLI. Toggle por provedor. Seu IP de proxy continua — só o "fingerprint" da request muda.

**Resultado:** Provedor vê um usuário normal do Claude Code. Não um proxy. Contas ficam seguras.

## Empilhamento Multi-Conta + Proteção de Fingerprint

Tem 3 contas Claude? Empilha todas com anti-ban:

    Conta A bate limite → troca automática pra Conta B
    Conta B bate limite → cai pra provedor diferente
    Cada request parece nativa pro provedor

**6 estratégias:** round-robin, least-used, cost-optimized, fill-first, P2C, random.

## $0/mês Combo

    Gemini CLI (180K grátis/mês) → Qoder (ilimitado) → Qwen (ilimitado)

Três camadas de gratuito. Produção. Custo zero.

## Novo na v2.0

- 🔒 **Anti-Ban** — Fingerprint TLS + matching de fingerprint CLI
- 🤖 **14 Agentes CLI** — Detectados com registry customizado
- 🔧 **Servidor MCP (16 tools)** — Controle o gateway da sua IDE
- 🧠 **Cache semântico** — Prompts repetidos servidos instantaneamente
- 🔌 **Circuit breakers** — Provedor caiu? Troca automática
- 🖼️ **Multi-modal** — Imagens, áudio, vídeo, música, embeddings
- 🌍 **30 idiomas** — Dashboard no seu idioma

## Um comando

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source. Grátis pra sempre. **Nunca pare de codar. Nunca seja banido.**
```

**Contagem de caracteres:** ~1.900 ✅

---

## Post 3: r/node / r/programming (Deep Dive Técnico + Anti-Ban)

### Título:

```
Built an AI gateway in TypeScript — TLS fingerprint spoofing, CLI signature matching, circuit breakers, MCP server (16 tools), A2A protocol, 36+ providers
```

### Corpo:

```
## O que faz

OmniRoute v2.0 é um reverse proxy inteligente + plataforma operacional pra APIs de IA. Um endpoint (`localhost:20128/v1`), 36+ provedores, roteamento com fallback automático, proteção anti-ban, e **orquestração MCP + A2A**.

## Engenharia Anti-Ban (a parte difícil)

A maioria dos proxies de IA é sinalizada porque provedores analisam:
1. **Fingerprint TLS** — Node.js tem assinatura TLS única vs. navegadores
2. **Forma da request** — Ordem de headers, ordem de campos do body, headers específicos

OmniRoute resolve ambos:

**Spoofing de Fingerprint TLS** — Usa `wreq-js` pra apresentar fingerprints TLS tipo navegador durante handshake. Provedores usando JA3/JA4 veem assinatura Chrome, não Node.js.

**Matching de Fingerprint CLI** — Config em `open-sse/config/cliFingerprints.ts`:
- Ordenação de headers por provedor pra combinar CLI nativa
- Reordenação de campos do body pra combinar sequências do Claude Code / Codex CLI
- Toggle por provedor (codex, claude, github, antigravity)
- **IP de proxy preservado** — só estrutura da request muda

Isso é a diferença entre "proxy que funciona" e "proxy que funciona sem sinalizar suas contas."

## Destaques Técnicos

**Motor de Roteamento:**
- Fallback em 4 tiers: Assinatura → Chave API → Barato → Gratuito
- 6 estratégias de balanceamento: fill-first, round-robin, P2C, random, least-used, cost-optimized
- Seleção de conta awareness de quota com empilhamento multi-conta (10 por provedor)

**Camada de Agentes:**
- Servidor MCP: 16 tools, 3 transportes (stdio, SSE, Streamable HTTP), 9 scopes
- Servidor A2A: JSON-RPC + SSE com ciclo de vida de tasks
- Dashboard de Agentes CLI: 14 auto-detectados + registry customizado com cache de 60s

**Resiliência:**
- Circuit breaker por modelo (Closed/Open/Half-Open)
- Anti-thundering herd: mutex + semáforo
- Cache semântico em dois níveis (signature + matching semântico)
- Idempotência de request: janela de dedup de 5s

**Tradução de Formato:**
- OpenAI ↔ Claude ↔ Gemini ↔ Responses API ↔ Ollama
- Normalização de roles, extração de think tags, mapeamento de structured output

**Multi-Modal:** Chat, imagens, vídeo, música, áudio, embeddings, reranking, moderations, TTS.

## Stack

Next.js 16, TypeScript, SQLite (better-sqlite3), Express, OAuth 2.0 PKCE. Docker multi-platform (AMD64+ARM64). App Electron desktop.

## Instalar

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

~60K linhas de TypeScript. Anti-ban + resiliência + orquestração. **Nunca pare de codar.**
```

**Contagem de caracteres:** ~2.100 ✅

---

## Post 4: r/opensource (Comunidade + Anti-Ban)

### Título:

```
[Project] OmniRoute v2.0 — free AI gateway with anti-ban protection, multi-account stacking, MCP server, A2A protocol, 36+ providers
```

### Corpo:

```
Fala pessoal! Compartilhando um projeto que venho construindo.

**OmniRoute** é um AI gateway gratuito e open-source — um "roteador Wi-Fi pra chamadas de IA." Seus agentes de código se conectam a um endpoint, OmniRoute distribui requests entre 36+ provedores com fallback inteligente, empilhamento multi-conta, e **proteção anti-ban pra suas contas não serem sinalizadas**.

## Por que construí isso

Eu tava rodando 4 agentes de IA simultaneamente. Todos batiam na mesma sub do Claude. Em 1 hora: rate limit, $50 queimados. E quando tentei rodar por proxy — Claude detectou tráfego fora do padrão e sinalizou minha conta. Eu precisava de algo que "simplesmente funciona," não me deixa banido, e cai pra modelos grátis quando tudo acaba.

## O que faz (v2.0)

- 🔒 **Proteção Anti-Ban** — Spoofing de fingerprint TLS (TLS tipo navegador) + matching de fingerprint CLI (assinaturas nativas por provedor). **IP de proxy preservado.**
- 🎯 **Fallback em 4 Tiers** — Assinatura → Chave API → Barato → Gratuito, automático
- 👥 **Empilhamento Multi-Conta** — 10 contas por provedor, 6 estratégias
- 🤖 **Dashboard de Agentes CLI** — 14 agentes built-in detectados + registry customizado
- 🔧 **Servidor MCP (16 tools)** — Controle o gateway da sua IDE
- 🤝 **Protocolo A2A** — Orquestração agente-a-agente com JSON-RPC + SSE
- 🔄 **Tradução de Formato** — OpenAI ↔ Claude ↔ Gemini ↔ Responses API ↔ Ollama
- 🧠 **Cache Semântico** — Queries repetidas servidas do cache, custo zero
- 📊 **Dashboard Completo** — Analytics, tracking de quota, logs, 30 idiomas, suporte RTL
- 🖼️ **Multi-Modal** — Chat, imagens, embeddings, áudio, vídeo, música, reranking
- 🐳 **Docker** — Multi-platform, um comando
- 💰 **$0 combo** — Empilhe provedores gratuitos pra codificar ilimitado
- 🔐 **Segurança** — Criptografia AES-256, scoping de API key, filtro de IP
- 📋 **Trilha de Auditoria** — Log de execução de MCP tools com enforcement de scopes

## Procurando por

- Feedback de devs usando ferramentas de IA (especialmente setups com proxy)
- Contribuidores interessados em infraestrutura de AI gateway / anti-ban / MCP / A2A
- Bug reports e feature requests

## Instalar

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**Licença:** GPL-3.0

**Nunca pare de codar. Nunca seja banido.**
```

**Contagem de caracteres:** ~1.800 ✅

---

## Post 5: r/selfhosted (Docker + Anti-Ban)

### Título:

```
Self-hosted AI gateway with anti-ban protection — stack accounts across 36+ providers, TLS fingerprint spoofing, CLI signature matching. One Docker command.
```

### Corpo:

```
Construí um AI gateway self-hosted que funciona como "roteador" pra chamadas de IA — com proteção anti-ban embutida.

## O problema anti-ban

A maioria dos proxies de IA e reverse proxies é sinalizada porque provedores detectam:
- Fingerprints TLS fora do padrão (Node.js vs Chrome)
- Padrões de request não-padrão (ordem de headers, estrutura do body)

**OmniRoute resolve ambos:**
- **Spoofing de Fingerprint TLS** — Handshake TLS tipo navegador
- **Matching de Fingerprint CLI** — Reordena headers/body pra combinar ferramentas CLI nativas por provedor

Seu IP de proxy continua. Só a "forma" da request muda. Provedor acha que você é um usuário normal de CLI.

## Quick start (Docker)

    docker run -d \
      --name omniroute \
      --restart unless-stopped \
      -p 20128:20128 \
      -v omniroute-data:/app/data \
      diegosouzapw/omniroute:latest

Dashboard em `http://seu-ip:20128`.

## O que você recebe

- 🔒 **Anti-Ban** — Fingerprint TLS + fingerprint CLI por provedor
- 🎯 **Empilhamento Multi-Conta** — 10 contas por provedor, auto round-robin
- 🔄 **Fallback em 4 Tiers** — Assinatura → Chave API → Barato → Gratuito
- 🤖 **Agentes CLI** — 14 detectados + registry customizado
- 🔧 **Servidor MCP** — 16 tools via stdio/SSE/HTTP
- 🤝 **Protocolo A2A** — Orquestração agente-a-agente
- 🧠 **Cache Semântico** — Mesma pergunta = cache, custo zero
- 📊 **Dashboard Completo** — Analytics, quota, logs, health, 30 idiomas
- 🔑 **Gestão de API Keys** — Scope por modelo com padrões wildcard
- 💾 **Backups de DB** — Backup automático, restauração, export/import
- 🖼️ **Multi-Modal** — Imagens, embeddings, áudio, vídeo, música
- 🔐 **Criptografia AES-256** — Credenciais criptografadas em repouso

## Detalhes da imagem

| Imagem | Tag | Arch |
|---|---|---|
| `diegosouzapw/omniroute` | `latest` | AMD64 + ARM64 |

ARM64 nativo — roda em Apple Silicon, AWS Graviton, Raspberry Pi.

## $0/mês combo

    gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus

Três camadas de gratuito. Produção. Ilimitado. Com proteção anti-ban.

**Docker Hub:** https://hub.docker.com/r/diegosouzapw/omniroute
**GitHub:** https://github.com/diegosouzapw/OmniRoute

**Nunca pare de codar. Nunca seja banido** — por $0.
```

**Contagem de caracteres:** ~1.700 ✅

---

## Post 6: r/webdev (Problema/Solução + Anti-Ban)

### Título:

```
Your AI coding tools don't have to cost $200/month or stop when you hit limits — and they don't have to get your accounts flagged either
```

### Corpo:

```
## Problema 1: Custo + Rate Limits

Você tem 4 agentes de IA trabalhando num projeto. Todos batem na mesma assinatura do Claude. Em 1-2 horas: rate limit, trabalho para.

$20 Claude + $20 Codex + $10 Copilot = $50+/mês e você AINDA é interrompido.

## Problema 2: O Martelo do Ban

Você configura um proxy pra rotear tráfego. Provedor detecta padrões de request fora do padrão. Conta sinalizada. Rate limits ficam piores. Ou — conta suspensa.

## A Solução: OmniRoute

Um AI gateway gratuito e local. Funciona como um **roteador Wi-Fi pra chamadas de IA** — com proteção anti-ban embutida.

    npm install -g omniroute && omniroute

## Como o "roteador" funciona

1. Usa sua assinatura primeiro (Claude Pro, Codex, Gemini CLI)
2. Conta A bate limite? → Troca pra Conta B (empilhamento multi-conta)
3. Todas as contas esgotadas? → Cai pra chaves API (DeepSeek, Groq, créditos free)
4. Limite de orçamento? → Cai pra barato ($0.2/M tokens)
5. Ainda rodando? → Cai pra grátis (Qoder, Qwen — ilimitado)

**E o tempo todo:** OmniRoute faz suas requests parecerem que estão vindo da ferramenta CLI nativa — não de um proxy.

## 🔒 Como o Anti-Ban Funciona

**Spoofing de Fingerprint TLS** — Seu handshake TLS parece Chrome, não Node.js. Bypassa fingerprinting JA3/JA4.

**Matching de Fingerprint CLI** — Por provedor: reordena headers e campos do body pra combinar assinaturas nativas do Claude Code / Codex CLI. Seu IP de proxy continua.

Provedor vê: "usuário normal do Claude Code." Realidade: proxy distribuindo entre 10 contas e 5 provedores.

## Destaques v2.0

- 🔒 **Anti-Ban** — Fingerprint TLS + matching de fingerprint CLI
- 🤖 **14 Agentes CLI** — Detectados com status de instalação + registry customizado
- 🔧 **MCP (16 tools)** — Controle gateway da sua IDE
- 🧠 **Cache semântico** — Mesma pergunta = resposta instantânea em cache
- 📊 **Dashboard** — Analytics em tempo real, 30 idiomas
- 🖼️ **Multi-modal** — Imagens, áudio, vídeo, música, embeddings
- 🔌 **Circuit breakers** — Provedor caiu? Troca + recuperação automática
- 💰 **$0 combo** — Três camadas de provedores gratuitos. Ilimitado.

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source (GPL-3.0). **Nunca pare de codar. Nunca seja banido.**
```

**Contagem de caracteres:** ~1.700 ✅

---

## Post 7: r/CursorAI / r/ClaudeAI (Integração Direta + Anti-Ban)

### Título:

```
I built a free proxy for Cursor/Claude with anti-ban protection — stack multiple accounts, auto-fallback, and your traffic looks native to the provider
```

### Corpo:

```
## Duas coisas que matam seu workflow no Cursor/Claude

1. **"Rate limit exceeded"** — Você tá no meio do código, IA para de responder. Espere ou troque manualmente.
2. **Sinalização de conta** — Você roda por proxy. Provedor detecta. Limites mais duros. Ou pior.

**E se você pudesse empilhar contas, fallback automático, E parecer um usuário normal?**

## OmniRoute — Roteador de IA Grátis com Anti-Ban

Aponte Cursor/Claude Code pra `http://localhost:20128/v1` e OmniRoute cuida de tudo:

1. **Sua assinatura primeiro** (Claude Pro, Codex, Copilot)
2. **Múltiplas contas** — Empilhe 2-3 contas Claude, auto round-robin
3. **Chaves API depois** (DeepSeek, Groq, créditos xAI grátis)
4. **Fallback barato** (GLM $0.6/M)
5. **Grátis pra sempre** (Qoder ilimitado, Qwen ilimitado, Kiro Claude grátis)

Tradução de formato é transparente. Cursor manda formato OpenAI → OmniRoute converte → Claude recebe formato nativo.

## 🔒 A Camada Anti-Ban

**Spoofing de Fingerprint TLS** — Handshake TLS tipo navegador. Bypassa detecção de bot.

**Matching de Fingerprint CLI** — Combina assinaturas nativas do Claude Code / Codex CLI:
- Ordenação de headers combina CLI oficial
- Ordenação de campos do body combina CLI oficial
- Toggle por provedor no dashboard de Agentes
- **IP de proxy preservado** — só a "forma" da request muda

Provedor vê um usuário normal do Claude Code, não um proxy. **Contas ficam seguras.**

## Dashboard de Agentes CLI (novo na v2.0)

Dashboard em `localhost:20128/dashboard/agents`:
- **14 agentes built-in** detectados (Claude, Codex, Gemini, Aider, Cursor CLI, Warp...)
- Status de instalação + detecção de versão
- **Registry de agentes customizados** — Adicione qualquer ferramenta CLI
- **Toggles de Fingerprint CLI** direto na mesma página

## Setup (2 minutos)

    npm install -g omniroute && omniroute

Dashboard: `localhost:20128` → Conecte provedores → Copie API key

No Cursor/Claude Code:
- Endpoint: `http://localhost:20128/v1`
- API Key: [do dashboard]

## Extras

- 🧠 Cache semântico — Prompts repetidos servidos instantaneamente
- 🔌 Circuit breaker — Troca automática quando provedor falha
- 📊 Tracking de quota em tempo real com contagem regressiva de reset
- 🖼️ Imagens, embeddings, áudio — não só chat
- 🌍 Dashboard em 30 idiomas
- 🔐 Criptografia AES-256, scoping de API key, filtro de IP

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source. Grátis. **Nunca pare de codar. Nunca seja banido.**
```

**Contagem de caracteres:** ~1.800 ✅

---

## Post 8: r/AutoGPT / r/MCP (Multi-Agente + Anti-Ban)

### Título:

```
Free AI gateway with anti-ban, MCP server (16 tools), A2A protocol, CLI agents dashboard — route multi-agent teams across 36+ providers without getting flagged
```

### Corpo:

```
## O Problema Multi-Agente + Anti-Ban

Quando você roda múltiplos agentes de IA simultaneamente (frontend + backend + tests + review), você bate em DUAS paredes:

1. **Esgotamento de quota** — 4 agentes × Claude = rate limits em menos de uma hora
2. **Sinalização de conta** — Tráfego de proxy parece diferente de CLI nativa. Provedor sinaliza.

## OmniRoute v2.0 — Runtime Unificado com Anti-Ban

Não é só um proxy. É um **runtime unificado** pra proxy + ferramentas + orquestração de agentes — com proteção anti-ban.

**Como Proxy:**
- Fallback em 4 tiers: Assinatura → Chave API → Barato → Gratuito
- Empilhamento multi-conta: 10 contas por provedor, 6 estratégias
- Tradução de formato: OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama
- Circuit breakers, cache semântico, idempotência de request

**Camada Anti-Ban:**
- Spoofing de Fingerprint TLS — Handshake TLS tipo navegador
- Matching de Fingerprint CLI — Assinaturas nativas por provedor (header + body ordering)
- Toggle por provedor no dashboard de Agentes
- **IP de proxy preservado** — só estrutura da request muda

**Como Servidor MCP (16 tools):**
- 3 transportes: stdio, SSE, Streamable HTTP
- Troque combos, cheque health, gerencie keys — da sua IDE
- 9 scopes granulares + trilha de auditoria SQLite
- Heartbeat de runtime com PID, uptime, config de scopes

**Como Servidor A2A:**
- JSON-RPC com `message/send` e `message/stream`
- Streaming SSE + gestão de ciclo de vida de tasks
- Descoberta de Agent Card em `/.well-known/agent.json`

**Dashboard de Agentes CLI:**
- 14 agentes built-in detectados (Codex, Claude, Goose, Aider, Cline, Warp, Amazon Q...)
- Status de instalação + versão + badges de protocolo
- Registry de agentes customizados — adicione qualquer tool CLI
- Toggles de fingerprint CLI integrados

## Cenário Real

    Agente 1 (OpenClaw): frontend → Claude Conta A (fingerprint como Claude Code)
    Agente 2 (Codex CLI): backend → Claude Conta B (fingerprint como Codex)
    Agente 3 (Claude Code): testes → Gemini CLI (grátis)
    Agente 4 (Cliente MCP): monitora health, troca combo quando quota cai

    Resultado: 4 agentes, 3 provedores, anti-ban em todos, zero interrupção

## Instalar

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Um runtime pra proxy + anti-ban + ferramentas + agentes. **Nunca pare de codar. Nunca seja banido.**
```

**Contagem de caracteres:** ~1.900 ✅

---

## 🔗 Links Rápidos

- **GitHub:** `https://github.com/diegosouzapw/OmniRoute`
- **Website:** `https://omniroute.online`
- **npm:** `https://www.npmjs.com/package/omniroute`
- **Docker Hub:** `https://hub.docker.com/r/diegosouzapw/omniroute`
- **Comunidade WhatsApp:** `https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t`
- **Instalar:** `npm install -g omniroute && omniroute`

---

## 💡 Dicas de Postagem v2

1. **Comece com anti-ban** — "suas contas não são sinalizadas" é o gancho que ninguém mais oferece
2. **A analogia do "roteador"** — "é como um roteador Wi-Fi pra IA" faz sentido na hora
3. **Mostre o cenário multi-agente** — 4 agentes, 3 provedores, zero interrupção
4. **Empilhamento multi-conta + fingerprint** — diferencial
5. **Responda todo comentário** — engajamento impulsiona algoritmo do Reddit
6. **Seja humilde** — "Eu construí isso" > "confira essa ferramenta incrível"
7. **$0 combo** — Três camadas de gratuito é irresistível
8. **"Nunca pare de codar. Nunca seja banido."** — gancho duplo
9. **Mencione o dashboard de Agentes** — prova visual de maturidade
10. **30 idiomas** — mostra polimento e alcance global

---

## 🔥 Templates de Comentários v2

### Quando alguém pergunta "como é diferente do OpenRouter?"

```
Ótima pergunta! Diferenças principais:

1. **Self-hosted** — OpenRouter é cloud ($$ por token, dados nos servidores deles). OmniRoute roda local. Grátis.

2. **Proteção Anti-Ban** — Spoofing de fingerprint TLS + matching de fingerprint CLI. Suas contas não são sinalizadas. OpenRouter não precisa disso (usam keys próprias), mas se VOCÊ traz suas próprias keys/subs, precisa disso.

3. **Empilhamento multi-conta** — 10 contas por provedor, round-robin entre elas. OpenRouter usa uma conta.

4. **Fallback em 4 tiers** — Assinatura → Chave API → Barato → Gratuito. Não é só um marketplace de modelos.

5. **MCP + A2A + Agentes CLI** — Controle gateway da IDE, orquestração de agentes, 14 auto-detectados. OpenRouter não tem isso.

Pense como "OpenRouter mas self-hosted, gratuito, com anti-ban e uma plataforma operacional completa."
```

### Quando alguém pergunta "não vou ser banido?"

```
Esse é exatamente o problema que OmniRoute resolve com duas camadas:

1. **Spoofing de Fingerprint TLS** — Faz seu handshake TLS parecer Chrome, não Node.js. Provedores usam fingerprinting JA3/JA4 pra detectar bots — isso bypassa.

2. **Matching de Fingerprint CLI** — Reordena seus headers HTTP e campos do body pra combinar a assinatura exata do Claude Code ou Codex CLI. Toggle por provedor. Seu IP de proxy continua — só a "forma" da request muda.

O provedor vê o que parece um usuário normal no Claude Code. Não um proxy. Não um bot.

Obviamente nenhuma ferramenta pode garantir 100% de segurança — provedores podem sempre atualizar detecção. Mas OmniRoute te dá o mesmo padrão de tráfego que um usuário legítimo de CLI, que é a posição mais forte possível.
```

### Quando alguém pergunta "é realmente grátis?"

```
Sim! OmniRoute em si é 100% gratuito e open source (GPL-3.0). É um proxy local — roteia SUAS requests usando SUAS contas/keys.

Opções de provedores gratuitos:
- Qoder: 8 modelos ilimitados
- Qwen: 3 modelos ilimitados
- Gemini CLI: 180K tokens grátis/mês
- Kiro: acesso Claude gratuito

Empilhe: Gemini CLI → Qoder → Qwen = três camadas de fallback grátis. $0/mês, ilimitado, com proteção anti-ban por cima.
```

### Quando alguém pergunta sobre segurança

```
Dados vão direto da sua máquina pro provedor de IA. OmniRoute é um proxy LOCAL — nunca toca em servidor de terceiros.

Features de segurança:
- Criptografia AES-256-GCM pra credenciais em repouso
- Gestão de API key com scoping por modelo (padrões wildcard tipo `openai/*`)
- Filtro de IP (allowlist/blocklist)
- Spoofing de fingerprint TLS (anti-ban, não bypass de segurança)
- Matching de fingerprint CLI (contas ficam seguras)
- Enforcement de scopes MCP (9 permissões granulares)
- Guards de auth + proteção CSRF
- Rate limiting por IP
```

---

## 📊 Changelog v1 → v2 (pra edits de "O Que Há de Novo")

| Feature | v1 | v2 |
|---|---|---|
| Anti-Ban | ❌ | ✅ Fingerprint TLS + fingerprint CLI |
| Agentes CLI | ❌ | ✅ 14 detectados + customizados |
| Sidebar | Lista plana | ✅ Seções CLI / Debug / System |
| Model Playground | ❌ | ✅ Editor Monaco + streaming |
| Mídia | ❌ | ✅ Imagens, vídeo, música |
| Temas | Só padrão | ✅ 7 presets + hex customizado |
| Servidor MCP | ✅ 16 tools | ✅ Mesmo + auditoria + heartbeat |
| Protocolo A2A | ✅ | ✅ Mesmo |
| Idiomas | 30 | 30 (+ RTL) |
| Auto-Combo | ❌ | ✅ Motor de scoring 6 fatores |
