<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — O Gateway de IA Gratuito

### Nunca pare de programar. Roteamento inteligente para **modelos de IA GRATUITOS e baratos** com fallback automático.

_Seu proxy de API universal — um endpoint, 36+ provedores, zero tempo de inatividade._

**Chat Completions • Embeddings • Geração de Imagem • Vídeo • Música • Áudio • Reranking • 100% TypeScript**

---

### 🆕 Novidades na v2.7.0

- **RouterStrategy plugável** — estratégias de regras, custo e latência
- **Detecção de intenção multilíngue** — scoring de roteamento em 30+ idiomas
- **Deduplicação de requisições** — evita chamadas duplicadas por hash de conteúdo
- **Novos provedores:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Preços atualizados:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Provedor de IA Gratuito para seus agentes de programação favoritos

_Conecte qualquer IDE ou ferramenta CLI com IA através do OmniRoute — gateway de API gratuito para programação ilimitada._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Todos os agentes se conectam via <code>http://localhost:20128/v1</code> ou <code>http://cloud.omniroute.online/v1</code> — uma configuração, modelos e cota ilimitados</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Início Rápido](#-início-rápido) • [💡 Funcionalidades](#-funcionalidades-principais) • [📖 Docs](#-documentação) • [💰 Preços](#-preços-resumidos)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Por que OmniRoute?

**Pare de desperdiçar dinheiro e bater em limites:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Cota de assinatura expira sem uso todo mês
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Limites de taxa param você no meio da programação
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> APIs caras ($20-50/mês por provedor)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Trocar manualmente entre provedores

**OmniRoute resolve isso:**

- ✅ **Maximize assinaturas** - Rastreie cotas, use tudo antes do reset
- ✅ **Fallback automático** - Assinatura → API Key → Barato → Gratuito, zero tempo de inatividade
- ✅ **Multi-conta** - Round-robin entre contas por provedor
- ✅ **Universal** - Funciona com Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, qualquer ferramenta CLI

---

## 📧 Suporte

> 💬 **Participe da comunidade!** [Grupo WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Tire dúvidas, compartilhe dicas e fique atualizado.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Grupo da Comunidade](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Projeto Original**: [9router por decolua](https://github.com/decolua/9router)

---

## 🔄 Como Funciona

```
┌─────────────┐
│  Sua CLI    │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Roteador Inteligente) │
│  • Tradução de formato (OpenAI ↔ Claude) │
│  • Rastreamento de cota + Embeddings + Imagens │
│  • Renovação automática de tokens        │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: ASSINATURA] Claude Code, Codex, Gemini CLI
       │   ↓ cota esgotada
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ limite de orçamento
       ├─→ [Tier 3: BARATO] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ limite de orçamento
       └─→ [Tier 4: GRATUITO] iFlow, Qwen, Kiro (ilimitado)

Resultado: Nunca pare de programar, custo mínimo
```

---

## 🎯 O que o OmniRoute resolve — 30 dores reais e casos de uso

> **Todo desenvolvedor que usa ferramentas de IA enfrenta esses problemas diariamente.** O OmniRoute foi criado para resolver todos eles, desde estouro de custos e bloqueios regionais até operações de protocolo e observabilidade de nível produção.

<details>
<summary><b>💸 1. "Pago uma assinatura cara e ainda sou interrompido por limites"</b></summary>

Desenvolvedores pagam de $20 a $200/mês por Claude Pro, Codex Pro ou GitHub Copilot. Mesmo pagando, há teto de cota, limite de 5h, limites semanais ou por minuto. No meio da sessão de coding, o provedor para de responder e o desenvolvedor perde fluxo e produtividade.

**Como o OmniRoute resolve isso:**

- **Fallback Inteligente em 4 Tiers** — Se a cota de assinatura acabar, redireciona automaticamente para API Key → Barato → Gratuito sem intervenção manual
- **Rastreamento de Cota em Tempo Real** — Exibe consumo de tokens ao vivo com contagem regressiva de reset (5h, diário, semanal)
- **Suporte Multi-Conta** — Várias contas por provedor com round-robin automático; quando uma esgota, passa para a próxima
- **Combos Personalizados** — Cadeias de fallback customizáveis com 6 estratégias (fill-first, round-robin, P2C, aleatório, least-used, cost-optimized)
- **Cotas Business do Codex** — Monitoramento de cota de workspace Business/Team direto no dashboard

</details>

<details>
<summary><b>🔌 2. "Preciso usar múltiplos provedores, mas cada um tem uma API diferente"</b></summary>

OpenAI usa um formato, Claude (Anthropic) usa outro, Gemini usa outro. Se o dev quer testar modelos de provedores diferentes ou fazer fallback entre eles, precisa reconfigurar SDKs, trocar endpoints e lidar com formatos incompatíveis. Provedores customizados (FriendLI, NIM) também têm endpoints não padronizados.

**Como o OmniRoute resolve isso:**

- **Endpoint Unificado** — Um único `http://localhost:20128/v1` serve como proxy para 36+ provedores
- **Tradução de Formato** — Conversão automática e transparente: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Sanitização de Resposta** — Remove campos fora do padrão (`x_groq`, `usage_breakdown`, `service_tier`) que quebram OpenAI SDK v1.83+
- **Normalização de Roles** — Converte `developer` → `system` para provedores não-OpenAI; `system` → `user` para GLM/ERNIE
- **Extração de Tags Think** — Extrai blocos `<think>` de modelos como DeepSeek R1 para `reasoning_content` padronizado
- **Saída Estruturada no Gemini** — Conversão automática de `json_schema` → `responseMimeType`/`responseSchema`
- **`stream` padrão `false`** — Alinha com a especificação OpenAI e evita SSE inesperado em SDKs Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Meu provedor de IA bloqueia minha região/país"</b></summary>

Provedores como OpenAI/Codex bloqueiam acesso em determinadas regiões. Usuários recebem erros como `unsupported_country_region_territory` durante OAuth e conexões de API. Isso é especialmente frustrante para desenvolvedores de países emergentes.

**Como o OmniRoute resolve isso:**

- **Config de Proxy em 3 Níveis** — Proxy configurável em nível global (todo tráfego), por provedor e por conexão/chave
- **Badges de Proxy por Cor** — Indicadores visuais: 🟢 proxy global, 🟡 proxy do provedor, 🔵 proxy da conexão, sempre mostrando o IP
- **Troca de Token OAuth via Proxy** — O fluxo OAuth também passa pelo proxy, resolvendo `unsupported_country_region_territory`
- **Teste de Conexão via Proxy** — Testes usam o proxy configurado (sem bypass direto)
- **Suporte SOCKS5** — Suporte completo a proxy SOCKS5 para roteamento de saída
- **Spoofing de Impressão TLS** — Fingerprint TLS estilo navegador via `wreq-js` para contornar detecção de bot

</details>

<details>
<summary><b>🆓 4. "Quero usar IA para programar, mas não tenho dinheiro"</b></summary>

Nem todo mundo pode pagar $20–200/mês em assinaturas de IA. Estudantes, devs de países emergentes, hobistas e freelancers precisam de acesso a modelos de qualidade com custo zero.

**Como o OmniRoute resolve isso:**

- **Provedores Gratuitos nativos** — Suporte nativo a provedores 100% free: iFlow (8 modelos ilimitados), Qwen (3 ilimitados), Kiro (Claude grátis), Gemini CLI (180K/mês grátis)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combos Apenas Gratuitos** — Cadeia `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/mês com zero downtime
- **Créditos Gratuitos NVIDIA NIM** — 1000 créditos free integrados
- **Estratégia Cost Optimized** — Estratégia que escolhe automaticamente o provedor mais barato disponível

</details>

<details>
<summary><b>🔒 5. "Preciso proteger meu gateway de IA contra acesso não autorizado"</b></summary>

Ao expor um gateway de IA na rede (LAN, VPS, Docker), qualquer pessoa com o endereço pode consumir tokens/cota do desenvolvedor. Sem proteção, as APIs ficam vulneráveis a uso indevido, prompt injection e abuso.

**Como o OmniRoute resolve isso:**

- **Gestão de API Keys** — Geração, rotação e escopo por provedor com página dedicada em `/dashboard/api-manager`
- **Permissões por Modelo** — Restringe chaves a modelos específicos (`openai/*`, padrões wildcard), com toggle Allow All/Restrict
- **Proteção de Endpoint de API** — Exige chave para `/v1/models` e bloqueia provedores específicos da listagem
- **Auth Guard + CSRF Protection** — Todas as rotas do dashboard protegidas com middleware `withAuth` + tokens CSRF
- **Rate Limiter** — Limite por IP com janelas configuráveis
- **Filtragem por IP** — Allowlist/blocklist para controle de acesso
- **Proteção contra Prompt Injection** — Sanitização contra padrões maliciosos
- **Criptografia AES-256-GCM** — Credenciais criptografadas em repouso

</details>

<details>
<summary><b>🛑 6. "Meu provedor caiu e eu perdi meu fluxo de programação"</b></summary>

Provedores de IA podem ficar instáveis, retornar erro 5xx ou atingir limites temporários de taxa. Se o dev depende de um único provedor, ele é interrompido. Sem circuit breaker, retries repetidos podem derrubar a aplicação.

**Como o OmniRoute resolve isso:**

- **Circuit Breaker por modelo** — Abre/fecha automaticamente com limiares e cooldown configuráveis (Closed/Open/Half-Open)
- **Exponential Backoff** — Atrasos progressivos de retry
- **Anti-Thundering Herd** — Proteção com mutex + semáforo contra tempestade de retries concorrentes
- **Cadeias de Fallback em Combo** — Se o primário falhar, avança automaticamente na cadeia sem intervenção
- **Circuit Breaker de Combo** — Desativa automaticamente provedores com falha dentro da cadeia
- **Health Dashboard** — Monitoramento de uptime, estados de breaker, lockouts, estatísticas de cache e latência p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Configurar cada ferramenta de IA é tedioso e repetitivo"</b></summary>

Desenvolvedores usam Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Cada ferramenta pede configuração diferente (endpoint, chave, modelo). Reconfigurar ao trocar de provedor ou modelo é perda de tempo.

**Como o OmniRoute resolve isso:**

- **Dashboard de Ferramentas CLI** — Página dedicada com setup em 1 clique para Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity e Cline
- **Gerador de Config do GitHub Copilot** — Gera `chatLanguageModels.json` para VS Code com seleção em lote de modelos
- **Onboarding Wizard** — Fluxo guiado de 4 etapas para novos usuários
- **Um endpoint para todos os modelos** — Configure `http://localhost:20128/v1` uma vez e acesse 36+ provedores

</details>

<details>
<summary><b>🔑 8. "Gerenciar tokens OAuth de múltiplos provedores é um caos"</b></summary>

Claude Code, Codex, Gemini CLI e Copilot usam OAuth 2.0 com tokens que expiram. Devs precisam reautenticar o tempo todo e lidar com erros como `client_secret is missing`, `redirect_uri_mismatch` e falhas em servidores remotos. OAuth em LAN/VPS é especialmente problemático.

**Como o OmniRoute resolve isso:**

- **Auto Token Refresh** — Tokens OAuth renovados em background antes da expiração
- **OAuth 2.0 (PKCE) nativo** — Fluxo automático para Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen e iFlow
- **OAuth Multi-Conta** — Múltiplas contas por provedor via extração de JWT/ID token
- **Correções OAuth LAN/Remoto** — Detecção de IP privado para `redirect_uri` + modo manual de URL para servidores remotos
- **OAuth atrás de Nginx** — Usa `window.location.origin` para compatibilidade com reverse proxy
- **Guia de OAuth Remoto** — Passo a passo para credenciais Google Cloud em VPS/Docker

</details>

<details>
<summary><b>📊 9. "Não sei quanto estou gastando nem onde"</b></summary>

Desenvolvedores usam vários provedores pagos, mas não têm visão unificada de gastos. Cada provedor tem seu dashboard de billing, sem consolidação. Custos inesperados podem se acumular.

**Como o OmniRoute resolve isso:**

- **Dashboard de Analytics de Custo** — Rastreamento de custo por token e gestão de orçamento por provedor
- **Limites de Orçamento por Tier** — Teto de gasto por tier que aciona fallback automático
- **Configuração de Preço por Modelo** — Preços configuráveis por modelo
- **Estatísticas de Uso por API Key** — Contagem de requests e timestamp de último uso por chave
- **Analytics Dashboard** — Cards, gráfico de uso por modelo e tabela de provedores com taxa de sucesso e latência

</details>

<details>
<summary><b>🐛 10. "Não consigo diagnosticar erros e problemas nas chamadas de IA"</b></summary>

Quando uma chamada falha, o dev não sabe se foi rate limit, token expirado, formato incorreto ou erro do provedor. Logs ficam fragmentados em terminais diferentes. Sem observabilidade, debug vira tentativa e erro.

**Como o OmniRoute resolve isso:**

- **Dashboard de Logs Unificado** — 4 abas: Request Logs, Proxy Logs, Audit Logs e Console
- **Visualizador de Console** — Viewer em tempo real estilo terminal com níveis por cor, auto-scroll, busca e filtros
- **Proxy Logs em SQLite** — Logs persistentes que sobrevivem a reinícios do servidor
- **Playground do Tradutor** — 4 modos de debug: Playground (tradução), Chat Tester (round-trip), Test Bench (lote), Live Monitor (tempo real)
- **Telemetria de Request** — Latência p50/p95/p99 + rastreamento por X-Request-Id
- **Logging em Arquivo com Rotação** — Interceptador de console grava tudo em JSON com rotação por tamanho

</details>

<details>
<summary><b>🏗️ 11. "Implantar e manter o gateway é complexo"</b></summary>

Instalar, configurar e manter um proxy de IA em ambientes diferentes (local, VPS, Docker, cloud) exige muito trabalho. Problemas como caminhos hardcoded, `EACCES` em diretórios, conflito de portas e build cross-platform aumentam a fricção.

**Como o OmniRoute resolve isso:**

- **Instalação global via npm** — `npm install -g omniroute && omniroute` e pronto
- **Docker Multi-Platform** — AMD64 + ARM64 nativo (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Perfis Docker Compose** — `base` (sem ferramentas CLI) e `cli` (com Claude Code, Codex, OpenClaw)
- **App Desktop Electron** — App nativo para Windows/macOS/Linux com bandeja, auto-start e modo offline
- **Modo de Porta Separada** — API e Dashboard em portas distintas para cenários avançados (reverse proxy, rede de containers)
- **Cloud Sync** — Sincronização de configuração entre dispositivos via Cloudflare Workers
- **Backups de DB** — Backup automático, restauração, export e import de todas as configurações

</details>

<details>
<summary><b>🌍 12. "A interface é só em inglês e meu time não fala inglês"</b></summary>

Times em países não anglófonos, especialmente na América Latina, Ásia e Europa, sofrem com interfaces só em inglês. A barreira de idioma reduz adoção e aumenta erros de configuração.

**Como o OmniRoute resolve isso:**

- **i18n do Dashboard — 30 idiomas** — Mais de 500 chaves traduzidas, incluindo árabe, búlgaro, dinamarquês, alemão, espanhol, finlandês, francês, hebraico, hindi, húngaro, indonésio, italiano, japonês, coreano, malaio, holandês, norueguês, polonês, português (PT/BR), romeno, russo, eslovaco, sueco, tailandês, ucraniano, vietnamita, chinês, filipino e inglês
- **Suporte RTL** — Suporte right-to-left para árabe e hebraico
- **READMEs multilíngues** — 30 traduções completas de documentação
- **Seletor de Idioma** — Ícone de globo no header para troca em tempo real

</details>

<details>
<summary><b>🔄 13. "Preciso de mais do que chat: embeddings, imagens, áudio"</b></summary>

IA não é só chat completion. Devs precisam gerar imagens, transcrever áudio, criar embeddings para RAG, reranquear documentos e moderar conteúdo. Cada API tem endpoint e formato diferentes.

**Como o OmniRoute resolve isso:**

- **Embeddings** — `/v1/embeddings` com 6 provedores e 9+ modelos
- **Geração de Imagem** — `/v1/images/generations` com 10 provedores e 20+ modelos (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Texto para Vídeo** — `/v1/videos/generations` com ComfyUI (AnimateDiff, SVD) e SD WebUI
- **Texto para Música** — `/v1/music/generations` com ComfyUI (Stable Audio Open, MusicGen)
- **Transcrição de Áudio** — `/v1/audio/transcriptions` com Whisper + Nvidia NIM, HuggingFace e Qwen3
- **Texto para Fala (TTS)** — `/v1/audio/speech` com ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise e Qwen3
- **Moderações** — `/v1/moderations` para checagens de segurança de conteúdo
- **Reranking** — `/v1/rerank` para relevância de documentos
- **Responses API** — Suporte completo a `/v1/responses` para Codex

</details>

<details>
<summary><b>🧪 14. "Não tenho como testar e comparar qualidade entre modelos"</b></summary>

Desenvolvedores querem saber qual modelo é melhor para cada caso de uso (código, tradução, raciocínio), mas comparar manualmente é lento. Não existem ferramentas integradas de avaliação na maioria das stacks.

**Como o OmniRoute resolve isso:**

- **Avaliações de LLM** — Golden set com 10 casos pré-carregados cobrindo saudação, matemática, geografia, geração de código, conformidade JSON, tradução, markdown e recusa de conteúdo inseguro
- **4 Estratégias de Match** — `exact`, `contains`, `regex`, `custom` (função JS)
- **Test Bench do Playground do Tradutor** — Testes em lote com múltiplas entradas/saídas esperadas e comparação entre provedores
- **Chat Tester** — Round-trip completo com renderização visual da resposta
- **Live Monitor** — Stream em tempo real de todas as requisições que passam pelo proxy

</details>

<details>
<summary><b>📈 15. "Preciso escalar sem perder performance"</b></summary>

À medida que o volume cresce, sem cache as mesmas perguntas geram custos duplicados. Sem idempotência, requisições duplicadas desperdiçam processamento. Também é necessário respeitar rate limits por provedor.

**Como o OmniRoute resolve isso:**

- **Cache Semântico** — Cache em duas camadas (assinatura + semântico) para reduzir custo e latência
- **Idempotência de Request** — Janela de deduplicação de 5s para requisições idênticas
- **Detecção de Rate Limit** — Rastreamento por provedor de RPM, intervalo mínimo e concorrência máxima
- **Rate Limits Editáveis** — Padrões configuráveis em Settings → Resilience com persistência
- **Cache de Validação de API Key** — Cache em 3 camadas para performance em produção
- **Health Dashboard com Telemetria** — Latência p50/p95/p99, estatísticas de cache e uptime

</details>

<details>
<summary><b>🤖 16. "Quero controlar o comportamento dos modelos globalmente"</b></summary>

Desenvolvedores podem querer todas as respostas em um idioma específico, com tom específico ou com limite de tokens de raciocínio. Configurar isso em cada ferramenta/requisição é impraticável.

**Como o OmniRoute resolve isso:**

- **Injeção de System Prompt** — Prompt global aplicado a todas as requisições
- **Validação de Thinking Budget** — Controle de alocação de tokens de raciocínio por requisição (passthrough, auto, custom, adaptive)
- **6 Estratégias de Roteamento** — Estratégias globais que definem como as requisições são distribuídas
- **Wildcard Router** — Padrões `provider/*` roteiam dinamicamente para qualquer provedor
- **Toggle de Combo** — Ativa/desativa combos diretamente no dashboard
- **Toggle de Provedor** — Ativa/desativa todas as conexões de um provedor com um clique
- **Provedores Bloqueados** — Exclui provedores específicos da listagem de `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Preciso de ferramentas MCP como capacidades de primeira classe do produto"</b></summary>

Muitos gateways de IA expõem MCP apenas como detalhe de implementação oculto. Times precisam de uma camada operacional visível e gerenciável.

**Como o OmniRoute resolve isso:**

- MCP aparece no menu do dashboard e na aba de protocolos em Endpoint
- Página dedicada de gestão MCP com processo, ferramentas, escopos e auditoria
- Quick-start embutido para `omniroute --mcp` e onboarding de clientes

</details>

<details>
<summary><b>🧠 18. "Preciso de orquestração A2A com caminhos síncronos + streaming"</b></summary>

Fluxos de agentes precisam de respostas diretas e também de execuções longas com streaming e controle de ciclo de vida.

**Como o OmniRoute resolve isso:**

- Endpoint A2A JSON-RPC (`POST /a2a`) com `message/send` e `message/stream`
- Streaming SSE com propagação de estado terminal
- APIs de ciclo de vida de tarefas para `tasks/get` e `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Preciso de saúde real do processo MCP, não status estimado"</b></summary>

Times operacionais precisam saber se o MCP está realmente ativo, não apenas se uma API está respondendo.

**Como o OmniRoute resolve isso:**

- Arquivo de heartbeat em runtime com PID, timestamps, transporte, quantidade de ferramentas e modo de escopo
- API de status MCP combinando heartbeat + atividade recente
- Cards de status na UI para processo/uptime/frescor do heartbeat

</details>

<details>
<summary><b>📋 20. "Preciso de execução auditável das ferramentas MCP"</b></summary>

Quando ferramentas alteram configuração ou disparam ações operacionais, os times precisam de rastreabilidade forense.

**Como o OmniRoute resolve isso:**

- Auditoria de chamadas MCP baseada em SQLite
- Filtros por ferramenta, sucesso/falha, chave de API e paginação
- Tabela de auditoria no dashboard + endpoints de métricas para automação

</details>

<details>
<summary><b>🔐 21. "Preciso de permissões MCP por escopo para cada integração"</b></summary>

Clientes diferentes devem operar com privilégio mínimo por categoria de ferramenta.

**Como o OmniRoute resolve isso:**

- 9 escopos MCP granulares para controle de acesso às ferramentas
- Aplicação de escopo e visibilidade na UI de gestão MCP
- Postura segura por padrão para operações sensíveis

</details>

<details>
<summary><b>⚙️ 22. "Preciso de controles operacionais sem redeploy"</b></summary>

Times precisam de mudanças rápidas em runtime durante incidentes e picos de custo.

**Como o OmniRoute resolve isso:**

- Troca de ativação de combo direto no dashboard de MCP
- Aplicação de perfis de resiliência via pacotes de política prontos
- Reset de circuit breaker no mesmo painel operacional

</details>

<details>
<summary><b>🔄 23. "Preciso de visibilidade ao vivo do ciclo de vida A2A e cancelamento"</b></summary>

Sem visibilidade de lifecycle, incidentes de tarefas ficam difíceis de investigar e corrigir.

**Como o OmniRoute resolve isso:**

- Listagem/filtragem de tarefas por estado/skill com paginação
- Drill-down de metadados, eventos e artefatos da tarefa
- Endpoint de cancelamento + ação de UI com confirmação

</details>

<details>
<summary><b>🌊 24. "Preciso de métricas de streams ativos para carga A2A"</b></summary>

Fluxos em streaming exigem visão operacional de concorrência e conexões ativas.

**Como o OmniRoute resolve isso:**

- Contadores de streams ativos integrados ao status A2A
- Timestamp da última tarefa e contagens por estado
- Cards no dashboard A2A para monitoramento operacional em tempo real

</details>

<details>
<summary><b>🪪 25. "Preciso de descoberta padrão de agente para clientes"</b></summary>

Clientes externos e orquestradores precisam de metadados legíveis por máquina para onboarding automático.

**Como o OmniRoute resolve isso:**

- Agent Card exposto em `/.well-known/agent.json`
- Capacidades e skills exibidas na UI de gestão
- API de status A2A inclui metadados de descoberta para automação

</details>

<details>
<summary><b>🧭 26. "Preciso de descobribilidade de protocolos na experiência do produto"</b></summary>

Se os usuários não encontram superfícies de protocolo, adoção e qualidade de suporte caem.

**Como o OmniRoute resolve isso:**

- Entradas MCP e A2A na sidebar
- Aba Protocolos em Endpoint com quick-start e status
- Links do overview para dashboards dedicados de gestão

</details>

<details>
<summary><b>🧪 27. "Preciso de validação end-to-end de protocolo com clientes reais"</b></summary>

Testes mockados não bastam para validar compatibilidade de protocolo antes do release.

**Como o OmniRoute resolve isso:**

- Suíte E2E que sobe a aplicação e usa transporte real do SDK MCP
- Testes de cliente A2A para discovery, send, stream, get e cancel
- Cross-check das validações com APIs de auditoria MCP e tarefas A2A

</details>

<details>
<summary><b>📡 28. "Preciso de observabilidade unificada em todas as interfaces"</b></summary>

Separar observabilidade por protocolo cria pontos cegos e aumenta o MTTR.

**Como o OmniRoute resolve isso:**

- Dashboards/logs/analytics unificados no mesmo produto
- Saúde + auditoria + telemetria de requisição em OpenAI, MCP e A2A
- APIs operacionais de status para automação

</details>

<details>
<summary><b>💼 29. "Preciso de um runtime único para proxy + tools + orquestração de agentes"</b></summary>

Manter vários serviços separados aumenta custo operacional e modos de falha.

**Como o OmniRoute resolve isso:**

- Proxy OpenAI-compatible, servidor MCP e servidor A2A na mesma stack
- Autenticação, resiliência, armazenamento e observabilidade compartilhados
- Modelo de políticas consistente em todas as superfícies de interação

</details>

<details>
<summary><b>🚀 30. "Preciso entregar workflows agênticos sem sprawl de glue code"</b></summary>

Times perdem velocidade quando precisam costurar múltiplos serviços e scripts ad hoc.

**Como o OmniRoute resolve isso:**

- Estratégia de endpoint unificada para clientes e agentes
- UIs de gestão de protocolo e fluxos de validação/smoke embutidos
- Base pronta para produção (segurança, logging, resiliência e backup)

</details>

### Exemplos de Playbooks (Casos de Uso Integrados)

**Playbook A: Maximizar assinatura paga + backup barato**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Custo mensal: $20 + pequeno gasto de backup
Resultado: qualidade maior, interrupção quase zero
```

**Playbook B: Stack de programação com custo zero**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Custo mensal: $0
Resultado: fluxo de coding gratuito e estável
```

## ⚡ Início Rápido

**1. Instale globalmente:**

```bash
npm install -g omniroute
omniroute
```

🎉 Dashboard abre em `http://localhost:20128`

| Comando                 | Descrição                             |
| ----------------------- | ------------------------------------- |
| `omniroute`             | Iniciar servidor (porta padrão 20128) |
| `omniroute --port 3000` | Usar porta personalizada              |
| `omniroute --no-open`   | Não abrir navegador automaticamente   |
| `omniroute --help`      | Mostrar ajuda                         |

**2. Conecte um provedor GRATUITO:**

Dashboard → Provedores → Conectar **Claude Code** ou **Antigravity** → Login OAuth → Pronto!

**3. Use na sua ferramenta CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Configurações:
  Endpoint: http://localhost:20128/v1
  API Key: [copie do dashboard]
  Model: if/kimi-k2-thinking
```

**Pronto!** Comece a programar com modelos de IA GRATUITOS.

**Alternativa — rodar a partir do código-fonte:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute está disponível como imagem Docker pública no [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Execução rápida:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Com arquivo de ambiente:**

```bash
# Copie e edite o .env primeiro
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Usando Docker Compose:**

```bash
# Perfil base (sem ferramentas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex, OpenClaw integrados)
docker compose --profile cli up -d
```

| Imagem                   | Tag      | Tamanho | Descrição             |
| ------------------------ | -------- | ------- | --------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Última versão estável |
| `diegosouzapw/omniroute` | `1.0.6`  | ~250MB  | Versão atual          |

---

---

## 🖥️

> 🆕 **NOVO!** O OmniRoute agora está disponível como **aplicativo desktop nativo** para Windows, macOS e Linux.

Execute o OmniRoute como um aplicativo desktop autônomo — sem terminal, sem navegador, sem internet necessária para modelos locais. O app baseado em Electron inclui:

- 🖥️ **Janela Nativa** — Janela dedicada com integração à bandeja do sistema
- 🔄 **Iniciar Automaticamente** — Inicie o OmniRoute ao fazer login no sistema
- 🔔 **Notificações Nativas** — Receba alertas sobre esgotamento de cota ou problemas
- ⚡ **Instalação com Um Clique** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Modo Offline** — Funciona totalmente offline com servidor embarcado

### Início Rápido

```bash
# Modo desenvolvimento
npm run electron:dev

# Compilar para sua plataforma
npm run electron:build         # Plataforma atual
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Bandeja do Sistema

Quando minimizado, o OmniRoute fica na bandeja do sistema com ações rápidas:

- Abrir dashboard
- Alterar porta do servidor
- Sair do aplicativo

📖 Documentação completa: [`electron/README.md`](electron/README.md)

---

## 💰 Preços Resumidos

| Tier              | Provedor          | Custo                        | Reset de Cota     | Melhor Para                    |
| ----------------- | ----------------- | ---------------------------- | ----------------- | ------------------------------ |
| **💳 ASSINATURA** | Claude Code (Pro) | $20/mês                      | 5h + semanal      | Já é assinante                 |
|                   | Codex (Plus/Pro)  | $20-200/mês                  | 5h + semanal      | Usuários OpenAI                |
|                   | Gemini CLI        | **GRATUITO**                 | 180K/mês + 1K/dia | Todos!                         |
|                   | GitHub Copilot    | $10-19/mês                   | Mensal            | Usuários GitHub                |
| **🔑 API KEY**    | NVIDIA NIM        | **GRATUITO** (1000 créditos) | Único             | Testes gratuitos               |
|                   | DeepSeek          | Por uso                      | Nenhum            | Melhor preço/qualidade         |
|                   | Groq              | Tier gratuito + pago         | Limitado          | Inferência ultra-rápida        |
|                   | xAI (Grok)        | Por uso                      | Nenhum            | Modelos Grok                   |
|                   | Mistral           | Tier gratuito + pago         | Limitado          | IA Europeia                    |
|                   | OpenRouter        | Por uso                      | Nenhum            | 100+ modelos                   |
| **💰 BARATO**     | GLM-4.7           | $0.6/1M                      | Diário 10h        | Backup econômico               |
|                   | MiniMax M2.1      | $0.2/1M                      | Rotativo 5h       | Opção mais barata              |
|                   | Kimi K2           | $9/mês fixo                  | 10M tokens/mês    | Custo previsível               |
| **🆓 GRATUITO**   | iFlow             | $0                           | Ilimitado         | 8 modelos gratuitos            |
|                   | Qwen              | $0                           | Ilimitado         | 3 modelos gratuitos            |
|                   | Kiro              | $0                           | Ilimitado         | Claude gratuito                |
|                   | LongCat 🆕        | **$0** (50M tok/dia 🔥)      | 1 req/s           | Maior cota grátis do mundo     |
|                   | Pollinations 🆕   | **$0** (sem chave API)       | 1 req/15s         | GPT-5, Claude, DeepSeek, Llama |
|                   | Cloudflare AI 🆕  | **$0** (10K Neurons/dia)     | ~150 resp/dia     | 50+ modelos, edge global       |
|                   | Scaleway AI 🆕    | **$0** (1M tokens total)     | Limitado por taxa | EU/GDPR, Qwen3 235B, Llama 70B |

**💡 Dica Pro:** Comece com Gemini CLI (180K grátis/mês) + iFlow (ilimitado grátis) = $0 de custo!

---

## 💡 Funcionalidades Principais

### 🧭 Gestão MCP + A2A (Camada Operacional)

A maioria dos gateways de IA expõe MCP/A2A apenas como endpoints “escondidos”. O OmniRoute traz operação de primeira classe para os dois protocolos:

- **Descoberta na interface** — Entradas `MCP` e `A2A` na sidebar e aba `Protocolos` na página de Endpoint com quick-start e cartões de status.
- **Painel operacional MCP** (`/dashboard/mcp`) — Status real do processo por heartbeat, inventário de ferramentas/scopes, auditoria com filtros e controles operacionais (trocar combo, aplicar perfil de resiliência, resetar breakers).
- **Painel operacional A2A** (`/dashboard/a2a`) — Visão do agent card, ciclo de vida de tarefas por estado, contagem de streams ativos, drill-down/cancelamento de tasks e smoke tests de `message/send` e `message/stream`.
- **APIs de monitoramento** — Endpoints `/api/mcp/*` e `/api/a2a/*` para status, tasks, auditoria e automações externas.

Por que isso é relevante:

- **Um runtime, três papéis**: router/proxy OpenAI-compatible + servidor de ferramentas MCP + servidor agente A2A.
- **Governança unificada**: autenticação, auditoria e controles de resiliência compartilhados.
- **Operação confiável**: times conseguem validar, monitorar e depurar comportamento dos protocolos sem sair do produto.

### 🧠 Roteamento e Inteligência

| Funcionalidade                            | O que Faz                                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------- |
| 🎯 **Fallback Inteligente 4 Tiers**       | Auto-roteamento: Assinatura → API Key → Barato → Gratuito                          |
| 📊 **Rastreamento de Cota em Tempo Real** | Contagem de tokens ao vivo + countdown de reset por provedor                       |
| 🔄 **Tradução de Formato**                | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro transparente                              |
| 👥 **Suporte Multi-Conta**                | Múltiplas contas por provedor com seleção inteligente                              |
| 🔄 **Renovação Automática de Token**      | Tokens OAuth renovam automaticamente com retry                                     |
| 🎨 **Combos Personalizados**              | 6 estratégias: fill-first, round-robin, p2c, random, least-used, cost-optimized    |
| 🧩 **Modelos Personalizados**             | Adicione qualquer ID de modelo a qualquer provedor                                 |
| 🌐 **Roteador Wildcard**                  | Roteie padrões `provider/*` para qualquer provedor dinamicamente                   |
| 🧠 **Budget de Raciocínio**               | Modos passthrough, auto, custom e adaptativo para modelos de raciocínio            |
| � **Aliases de Modelo**                   | Redireciona IDs de modelos depreciados para substitutos atuais (built-in + custom) |
| ⚡ **Degradação em Background**           | Redireciona tarefas em background (títulos, resumos) para modelos mais baratos     |
| �💬 **Injeção de System Prompt**          | System prompt global aplicado em todas as requisições                              |
| 📄 **API Responses**                      | Suporte completo à API Responses da OpenAI (`/v1/responses`) para Codex            |

### 🎵 APIs Multi-Modal

| Funcionalidade              | O que Faz                                                                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Geração de Imagem**    | `/v1/images/generations` — 10 provedores, 20+ modelos (cloud + local)                                                                                                      |
| 📐 **Embeddings**           | `/v1/embeddings` — 6 provedores, 9+ modelos                                                                                                                                |
| 🎤 **Transcrição de Áudio** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Texto para Fala**      | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🎬 **Geração de Vídeo**     | `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD), SD WebUI                                                                                                            |
| 🎵 **Geração de Música**    | `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)                                                                                                            |
| 🛡️ **Moderações**           | `/v1/moderations` — Verificações de segurança                                                                                                                              |
| 🔀 **Reranking**            | `/v1/rerank` — Reranking de relevância de documentos                                                                                                                       |

### 🛡️ Resiliência e Segurança

| Funcionalidade                      | O que Faz                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| 🔌 **Circuit Breaker**              | Trip/recover por modelo com limites configuráveis                             |
| 🎯 **Endpoint-Aware Models**        | Custom models declare supported endpoints + API format                        |
| 🛡️ **Anti-Thundering Herd**         | Mutex + semáforo rate-limit para provedores com API key                       |
| 🧠 **Cache Semântico**              | Cache de duas camadas (assinatura + semântico) reduz custo e latência         |
| ⚡ **Idempotência de Requisição**   | Janela de dedup de 5s para requisições duplicadas                             |
| 🔒 **Spoofing de Fingerprint TLS**  | Bypass de detecção de bot via TLS com wreq-js                                 |
| 🌐 **Filtragem de IP**              | Allowlist/blocklist para controle de acesso à API                             |
| 📊 **Rate Limits Editáveis**        | RPM, gap mínimo e concorrência máxima configuráveis                           |
| 💾 **Persistência de Rate Limits**  | Limites aprendidos persistem via SQLite com debounce de 60s + 24h de validade |
| 🔄 **Resiliência de Token Refresh** | Circuit breaker por provedor (5 falhas→30min) + timeout de 30s por tentativa  |
| 🛡 **Proteção de Endpoint API**     | Gateway de Auth + bloqueio de provedores para o endpoint `/models`            |
| 🔒 **Visibilidade de Proxy**        | Badges coloridos: 🟢 global, 🟡 provedor, 🔵 por-conexão com exibição de IP   |
| 🌐 **Proxy em 3 Níveis**            | Configure proxies em nível global, por provedor ou por conexão                |

### 📊 Observabilidade e Analytics

| Funcionalidade                   | O que Faz                                                             |
| -------------------------------- | --------------------------------------------------------------------- |
| 📝 **Logs de Requisição**        | Modo debug com logs completos de request/response                     |
| 💾 **Logs SQLite**               | Logs de proxy persistentes sobrevivem a reinicializações              |
| 📊 **Dashboard de Analytics**    | Recharts: cards de estatísticas, gráfico de uso, tabela de provedores |
| 📈 **Rastreamento de Progresso** | Eventos de progresso SSE opt-in para streaming                        |
| 🧪 **Avaliações de LLM**         | Testes com conjunto golden e 4 estratégias de match                   |
| 🔍 **Telemetria de Requisição**  | Agregação de latência p50/p95/p99 + rastreamento X-Request-Id         |
| 📋 **Logs + Cotas**              | Páginas dedicadas para navegação de logs e rastreamento de cotas      |
| 🏥 **Dashboard de Saúde**        | Uptime, estados de circuit breaker, lockouts, stats de cache          |
| 💰 **Rastreamento de Custo**     | Gestão de orçamento + configuração de preços por modelo               |

### ☁️ Deploy e Sincronização

| Funcionalidade                    | O que Faz                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                 | Sincronize configurações entre dispositivos via Cloudflare Workers                |
| 🌐 **Deploy em Qualquer Lugar**   | Localhost, VPS, Docker, Cloudflare Workers                                        |
| 🔑 **Gestão de API Keys**         | Gere, rotacione e defina escopo de API keys por provedor                          |
| 🧙 **Assistente de Configuração** | Setup guiado em 4 etapas para novos usuários                                      |
| 🔧 **Dashboard CLI Tools**        | Configuração em um clique para Claude, Codex, Cline, OpenClaw, Kilo, Antigravity  |
| 🔄 **Backups de DB**              | Backup, restauração, exportação e importação automática de todas as configurações |
| 🌐 **Internacionalização**        | i18n completo com next-intl — suporte a 30 idiomas com RTL                        |
| 🌍 **Seletor de Idioma**          | Ícone de globo no cabeçalho para troca entre 30 idiomas em tempo real             |
| 📂 **Diretório de Dados Custom**  | Variável `DATA_DIR` para sobrescrever o caminho padrão `~/.omniroute`             |

<details>
<summary><b>📖 Detalhes das Funcionalidades</b></summary>

### 🎯 Fallback Inteligente 4 Tiers

Crie combos com fallback automático:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (sua assinatura)
  2. nvidia/llama-3.3-70b      (API NVIDIA gratuita)
  3. glm/glm-4.7               (backup barato, $0.6/1M)
  4. if/kimi-k2-thinking       (fallback gratuito)

→ Troca automaticamente quando a cota acaba ou erros ocorrem
```

### 📊 Rastreamento de Cota em Tempo Real

- Consumo de tokens por provedor
- Countdown de reset (5 horas, diário, semanal)
- Estimativa de custo para tiers pagos
- Relatórios de gastos mensais

### 🔄 Tradução de Formato

Tradução transparente entre formatos:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Sua ferramenta CLI envia formato OpenAI → OmniRoute traduz → Provedor recebe formato nativo
- Funciona com qualquer ferramenta que suporte endpoints OpenAI customizados

### 👥 Suporte Multi-Conta

- Adicione múltiplas contas por provedor
- Round-robin automático ou roteamento por prioridade
- Fallback para próxima conta quando uma atinge a cota

### 🔄 Renovação Automática de Token

- Tokens OAuth renovam automaticamente antes de expirar
- Sem necessidade de re-autenticação manual
- Experiência transparente em todos os provedores

### 🎨 Combos Personalizados

- Crie combinações ilimitadas de modelos
- 6 estratégias: fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized
- Compartilhe combos entre dispositivos com Cloud Sync

### 🏥 Dashboard de Saúde

- Status do sistema (uptime, versão, uso de memória)
- Estados de circuit breaker por provedor (Closed/Open/Half-Open)
- Status de rate limit e lockouts ativos
- Estatísticas de cache de assinatura
- Telemetria de latência (p50/p95/p99) + cache de prompt
- Reset de saúde com um clique

### 🔧 Playground do Tradutor

O OmniRoute inclui um poderoso Playground de Tradução integrado com **4 modos** para debug, teste e monitoramento de traduções de API:

| Modo                | Descrição                                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Playground**   | Tradução direta entre formatos — cole qualquer corpo de requisição e veja instantaneamente como o OmniRoute traduz entre formatos (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Inclui templates de exemplo e auto-detecção de formato. |
| **💬 Chat Tester**  | Envie requisições reais pelo OmniRoute e veja a viagem completa: sua entrada, a requisição traduzida, a resposta do provedor, e a resposta traduzida de volta. Inestimável para validar roteamento de combos.                         |
| **🧪 Test Bench**   | Modo de teste em lote — defina múltiplos casos de teste com diferentes entradas e saídas esperadas, execute todos de uma vez, e compare resultados entre provedores e modelos.                                                        |
| **📱 Live Monitor** | Monitoramento de requisições em tempo real — acompanhe requisições entrando conforme fluem pelo OmniRoute, veja traduções de formato acontecendo ao vivo, e identifique problemas instantaneamente.                                   |

**Acesso:** Dashboard → Translator (barra lateral)

### 💾 Cloud Sync

- Sincronize provedores, combos e configurações entre dispositivos
- Sincronização automática em background
- Armazenamento criptografado seguro

</details>

---

## 🧪 Avaliações (Evals)

OmniRoute inclui um framework de avaliação integrado para testar a qualidade de respostas de LLM contra um conjunto golden. Acesse via **Analytics → Evals** no dashboard.

### Conjunto Golden Integrado

O "OmniRoute Golden Set" pré-carregado contém 10 casos de teste cobrindo:

- Saudações, matemática, geografia, geração de código
- Conformidade de formato JSON, tradução, markdown
- Recusa de segurança (conteúdo prejudicial), contagem, lógica booleana

### Estratégias de Avaliação

| Estratégia | Descrição                                      | Exemplo                          |
| ---------- | ---------------------------------------------- | -------------------------------- |
| `exact`    | Saída deve corresponder exatamente             | `"4"`                            |
| `contains` | Saída deve conter substring (case-insensitive) | `"Paris"`                        |
| `regex`    | Saída deve corresponder ao padrão regex        | `"1.*2.*3"`                      |
| `custom`   | Função JS customizada retorna true/false       | `(output) => output.length > 10` |

---

## 📖 Guia de Configuração

<details>
<summary><b>💳 Provedores por Assinatura</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Provedores → Conectar Claude Code
→ Login OAuth → Renovação automática de token
→ Rastreamento de cota 5h + semanal

Modelos:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Dica Pro:** Use Opus para tarefas complexas, Sonnet para velocidade. OmniRoute rastreia cota por modelo!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Provedores → Conectar Codex
→ Login OAuth (porta 1455)
→ Reset 5h + semanal

Modelos:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (GRATUITO 180K/mês!)

```bash
Dashboard → Provedores → Conectar Gemini CLI
→ Google OAuth
→ 180K completions/mês + 1K/dia

Modelos:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Melhor Valor:** Tier gratuito enorme! Use antes dos tiers pagos.

### GitHub Copilot

```bash
Dashboard → Provedores → Conectar GitHub
→ OAuth via GitHub
→ Reset mensal (1º do mês)

Modelos:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Provedores por API Key</b></summary>

### NVIDIA NIM (GRATUITO 1000 créditos!)

1. Cadastre-se: [build.nvidia.com](https://build.nvidia.com)
2. Obtenha API key gratuita (1000 créditos de inferência incluídos)
3. Dashboard → Adicionar Provedor → NVIDIA NIM:
   - API Key: `nvapi-your-key`

**Modelos:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct`, e 50+ mais

**Dica Pro:** API compatível com OpenAI — funciona perfeitamente com a tradução de formato do OmniRoute!

### DeepSeek

1. Cadastre-se: [platform.deepseek.com](https://platform.deepseek.com)
2. Obtenha API key
3. Dashboard → Adicionar Provedor → DeepSeek

**Modelos:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Tier Gratuito Disponível!)

1. Cadastre-se: [console.groq.com](https://console.groq.com)
2. Obtenha API key (tier gratuito incluído)
3. Dashboard → Adicionar Provedor → Groq

**Modelos:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Dica Pro:** Inferência ultra-rápida — melhor para programação em tempo real!

### OpenRouter (100+ Modelos)

1. Cadastre-se: [openrouter.ai](https://openrouter.ai)
2. Obtenha API key
3. Dashboard → Adicionar Provedor → OpenRouter

**Modelos:** Acesse 100+ modelos de todos os principais provedores através de uma única API key.

</details>

<details>
<summary><b>💰 Provedores Baratos (Backup)</b></summary>

### GLM-4.7 (Reset diário, $0.6/1M)

1. Cadastre-se: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenha API key do Plano Coding
3. Dashboard → Adicionar API Key:
   - Provedor: `glm`
   - API Key: `your-key`

**Use:** `glm/glm-4.7`

**Dica Pro:** Plano Coding oferece 3× cota a 1/7 do custo! Reset diário 10:00 AM.

### MiniMax M2.1 (Reset 5h, $0.20/1M)

1. Cadastre-se: [MiniMax](https://www.minimax.io/)
2. Obtenha API key
3. Dashboard → Adicionar API Key

**Use:** `minimax/MiniMax-M2.1`

**Dica Pro:** Opção mais barata para contexto longo (1M tokens)!

### Kimi K2 ($9/mês fixo)

1. Assine: [Moonshot AI](https://platform.moonshot.ai/)
2. Obtenha API key
3. Dashboard → Adicionar API Key

**Use:** `kimi/kimi-latest`

**Dica Pro:** $9/mês fixo por 10M tokens = $0.90/1M de custo efetivo!

</details>

<details>
<summary><b>🆓 Provedores GRATUITOS (Backup de Emergência)</b></summary>

### iFlow (8 modelos GRATUITOS)

```bash
Dashboard → Conectar iFlow
→ Login OAuth iFlow
→ Uso ilimitado

Modelos:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modelos GRATUITOS)

```bash
Dashboard → Conectar Qwen
→ Autorização por código de dispositivo
→ Uso ilimitado

Modelos:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATUITO)

```bash
Dashboard → Conectar Kiro
→ AWS Builder ID ou Google/GitHub
→ Uso ilimitado

Modelos:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

### LongCat AI (GRATUITO 50M tokens/dia!) 🆕

1. Cadastre-se: [longcat.chat](https://longcat.chat) com e-mail ou telefone
2. Gere uma chave de API gratuita
3. Dashboard → Adicionar Provedor → LongCat

**Modelos:**

- `lc/LongCat-Flash-Lite` — **50M tokens/dia** 💥 (maior cota gratuita do mundo!)
- `lc/LongCat-Flash-Chat` — 500K tokens/dia
- `lc/LongCat-Flash-Thinking` — 500K tokens/dia (raciocínio)

> 100% gratuito durante o beta público. Reset diário à meia-noite UTC.

### Pollinations AI (SEM CHAVE NECESSÁRIA!) 🆕

1. Adicione o provedor Pollinations no Dashboard
2. Deixe o campo de chave API vazio (ou coloque qualquer string)
3. Comece a usar imediatamente!

**Modelos via `pol/`:** `openai` (GPT-5), `claude`, `gemini`, `deepseek`, `llama` (Llama 4)

> Sem cadastro, sem chave, sem cartão de crédito. 1 req/15s ilimitado.

### Cloudflare Workers AI (GRATUITO 10K Neurons/dia!) 🆕

1. Cadastre-se: [dash.cloudflare.com](https://dash.cloudflare.com)
2. Gere um API Token em Profile → API Tokens
3. Copie seu Account ID (coluna direita do dashboard)
4. Dashboard → Adicionar Provedor → Cloudflare AI
   - API Key: seu token
   - Account ID: seu account ID

**Modelos via `cf/`:** `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, 50+ mais

> 10K Neurons/dia ≈ 150 respostas de LLM ou 500s de transcrição Whisper gratuita!

### Scaleway AI (1M tokens gratuitos!) 🆕

1. Cadastre-se: [console.scaleway.com](https://console.scaleway.com)
2. Gere uma chave de API IAM
3. Dashboard → Adicionar Provedor → Scaleway

**Modelos via `scw/`:** `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`

> 1M tokens gratuitos para novas contas. Dados processados na 🇫🇷 França (EU/GDPR).

</details>

<details>
<summary><b>🎨 Criar Combos</b></summary>

### Exemplo 1: Maximizar Assinatura → Backup Barato

```
Dashboard → Combos → Criar Novo

Nome: premium-coding
Modelos:
  1. cc/claude-opus-4-6 (Assinatura primária)
  2. glm/glm-4.7 (Backup barato, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Fallback mais barato, $0.20/1M)

Use na CLI: premium-coding
```

### Exemplo 2: Somente Gratuito (Custo Zero)

```
Nome: free-combo
Modelos:
  1. gc/gemini-3-flash-preview (180K grátis/mês)
  2. if/kimi-k2-thinking (ilimitado)
  3. qw/qwen3-coder-plus (ilimitado)

Custo: $0 para sempre!
```

</details>

<details>
<summary><b>🔧 Integração CLI</b></summary>

### Cursor IDE

```
Configurações → Modelos → Avançado:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [do dashboard OmniRoute]
  Model: cc/claude-opus-4-6
```

### Claude Code

Use a página **CLI Tools** no dashboard para configuração em um clique, ou edite `~/.claude/settings.json` manualmente.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Opção 1 — Dashboard (recomendado):**

```
Dashboard → CLI Tools → OpenClaw → Selecionar Modelo → Aplicar
```

**Opção 2 — Manual:** Edite `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Nota:** OpenClaw funciona apenas com OmniRoute local. Use `127.0.0.1` em vez de `localhost` para evitar problemas de resolução IPv6.

### Cline / Continue / RooCode

```
Configurações → Configuração de API:
  Provedor: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [do dashboard OmniRoute]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Solução de Problemas

<details>
<summary><b>Clique para expandir o guia de solução de problemas</b></summary>

**"Language model did not provide messages"**

- Cota do provedor esgotada → Verifique o rastreador de cota no dashboard
- Solução: Use combo com fallback ou mude para tier mais barato

**Rate limiting**

- Cota de assinatura esgotada → Fallback para GLM/MiniMax
- Adicione combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth expirado**

- Renovado automaticamente pelo OmniRoute
- Se persistir: Dashboard → Provedor → Reconectar

**Custos altos**

- Verifique estatísticas de uso em Dashboard → Custos
- Mude modelo primário para GLM/MiniMax
- Use tier gratuito (Gemini CLI, iFlow) para tarefas não-críticas

**Dashboard abre na porta errada**

- Defina `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Erros de cloud sync**

- Verifique se `BASE_URL` aponta para sua instância em execução
- Verifique se `CLOUD_URL` aponta para seu endpoint cloud esperado
- Mantenha valores `NEXT_PUBLIC_*` alinhados com valores do servidor

**Primeiro login não funciona**

- Verifique `INITIAL_PASSWORD` no `.env`
- Se não definido, senha padrão é `123456`

**Sem logs de requisição**

- Defina `ENABLE_REQUEST_LOGS=true` no `.env`

**Teste de conexão mostra "Invalid" para provedores compatíveis com OpenAI**

- Muitos provedores não expõem endpoint `/models`
- OmniRoute v1.0.6+ inclui validação via chat completions como fallback
- Certifique-se de que a base URL inclui sufixo `/v1`

</details>

---

## 🛠️

- **Runtime**: Node.js 20+
- **Linguagem**: TypeScript 5.9 — **100% TypeScript** em `src/` e `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Banco de Dados**: LowDB (JSON) + SQLite (estado do domínio + logs de proxy)
- **Streaming**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Testes**: Node.js test runner (368+ testes unitários)
- **CI/CD**: GitHub Actions (publicação automática npm + Docker Hub no release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Pacote**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliência**: Circuit breaker, backoff exponencial, anti-thundering herd, spoofing TLS

---

## 📖 Documentação

| Documento                                       | Descrição                                         |
| ----------------------------------------------- | ------------------------------------------------- |
| [Guia do Usuário](docs/USER_GUIDE.md)           | Provedores, combos, integração CLI, deploy        |
| [Referência da API](docs/API_REFERENCE.md)      | Todos os endpoints com exemplos                   |
| [Solução de Problemas](docs/TROUBLESHOOTING.md) | Problemas comuns e soluções                       |
| [Arquitetura](docs/ARCHITECTURE.md)             | Arquitetura do sistema e internos                 |
| [Contribuindo](CONTRIBUTING.md)                 | Setup de desenvolvimento e diretrizes             |
| [Spec OpenAPI](docs/openapi.yaml)               | Especificação OpenAPI 3.0                         |
| [Política de Segurança](SECURITY.md)            | Reportar vulnerabilidades e práticas de segurança |
| [Deploy em VM](docs/VM_DEPLOYMENT_GUIDE.md)     | Guia completo: VM + nginx + Cloudflare            |
| [Galeria de Features](docs/FEATURES.md)         | Tour visual do dashboard com screenshots          |

### 📸 Preview do Dashboard

<details>
<summary><b>Clique para ver screenshots do dashboard</b></summary>

| Página            | Screenshot                                        |
| ----------------- | ------------------------------------------------- |
| **Provedores**    | ![Providers](docs/screenshots/01-providers.png)   |
| **Combos**        | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**     | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Saúde**         | ![Health](docs/screenshots/04-health.png)         |
| **Tradutor**      | ![Translator](docs/screenshots/05-translator.png) |
| **Configurações** | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI Tools**     | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Logs de Uso**   | ![Usage](docs/screenshots/08-usage.png)           |
| **Endpoint**      | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

O OmniRoute tem **210+ funcionalidades planejadas** em múltiplas fases de desenvolvimento. Áreas principais:

| Categoria                        | Features Planejadas | Destaques                                                                   |
| -------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| 🧠 **Roteamento e Inteligência** | 25+                 | Roteamento por menor latência, roteamento por tags, pré-verificação de cota |
| 🔒 **Segurança e Compliance**    | 20+                 | Hardening SSRF, cloaking de credenciais, rate-limit por endpoint            |
| 📊 **Observabilidade**           | 15+                 | Integração OpenTelemetry, monitoramento de cota em tempo real               |
| 🔄 **Integrações**               | 20+                 | Registro dinâmico de modelos, cooldowns de provedor                         |
| ⚡ **Performance**               | 15+                 | Cache dupla camada, prompt cache, response cache, batch API                 |
| 🌐 **Ecossistema**               | 10+                 | WebSocket API, config hot-reload, modo comercial                            |

### 🔜 Em Breve

- 🔗 **Integração com OpenCode** — Suporte nativo como provider para a IDE OpenCode
- 🔗 **Integração com TRAE** — Suporte completo ao framework de desenvolvimento TRAE
- 📦 **Batch API** — Processamento assíncrono em lote para requisições em massa
- 🎯 **Roteamento por Tags** — Roteamento de requisições baseado em tags personalizadas
- 💰 **Estratégia de Menor Custo** — Seleção automática do provedor mais barato

> 📝 Especificações completas de features disponíveis em [`docs/new-features/`](docs/new-features/) (217 specs detalhadas)

---

## 👥 Contribuidores

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Como Contribuir

1. Faça fork do repositório
2. Crie sua branch de funcionalidade (`git checkout -b feature/amazing-feature`)
3. Faça commit das suas alterações (`git commit -m 'Add amazing feature'`)
4. Faça push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes detalhadas.

### Lançando uma Nova Versão

```bash
# Crie um release — publicação no npm acontece automaticamente
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Histórico de Stars

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Agradecimentos

Agradecimento especial a **[9router](https://github.com/decolua/9router)** por **[decolua](https://github.com/decolua)** — o projeto original que inspirou este fork. OmniRoute se baseia nessa fundação incrível com funcionalidades adicionais, APIs multi-modal e uma reescrita completa em TypeScript.

Agradecimento especial a **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — a implementação original em Go que inspirou esta adaptação em JavaScript.

---

## 📄 Licença

Licença MIT - veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <sub>Feito com ❤️ para desenvolvedores que programam 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
