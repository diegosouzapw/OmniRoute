<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — O gateway de IA gratuito

### Nunca pare de codificar. Roteamento inteligente para **modelos de IA GRATUITOS e de baixo custo** com fallback automático.

_Seu proxy de API universal — um endpoint, mais de 36 provedores, tempo de inatividade zero._

**Conclusões de bate-papo • Incorporações • Geração de imagem • Áudio • Reclassificação • 100% TypeScript**

---

### 🆕 Novidades na v2.7.0

- **RouterStrategy extensível** — estratégias de regras, custo e latência
- **Deteção de intenção multilíngue** — scoring de encaminhamento em 30+ idiomas
- **Deduplicação de pedidos** — evita chamadas duplicadas por hash de conteúdo
- **Novos fornecedores:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
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

### 🤖 Provedor de IA gratuito para seus agentes de codificação favoritos

_Conecte qualquer ferramenta IDE ou CLI com tecnologia de IA por meio do OmniRoute - gateway de API gratuito para codificação ilimitada._

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

<sub>📡 Todos os agentes se conectam via <code>http://localhost:20128/v1</code> ou <code>http://cloud.omniroute.online/v1</code> — uma configuração, modelos ilimitados e cota</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

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

**Pare de desperdiçar dinheiro e atingir limites:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> A cota de assinatura expira sem ser utilizada todos os meses
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Os limites de taxa impedem você no meio da codificação
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> APIs caras (US$ 20-50/mês por provedor)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Troca manual entre provedores

**OmniRoute resolve isso:**

- ✅ **Maximize as assinaturas** - Rastreie a cota, use cada bit antes de redefinir
- ✅ **Fullback automático** - Assinatura → Chave de API → Barato → Gratuito, tempo de inatividade zero
- ✅ **Múltiplas contas** - Round-robin entre contas por provedor
- ✅ **Universal** - Funciona com Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, qualquer ferramenta CLI

---

## 📧 Suporte

> 💬 **Junte-se à nossa comunidade!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Obtenha ajuda, compartilhe dicas e fique atualizado.

- **Site**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Projeto Original**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Como funciona

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 O que o OmniRoute resolve — 30 pontos reais de dor e casos de uso

> **Todo desenvolvedor que usa ferramentas de IA enfrenta esses problemas diariamente.** O OmniRoute foi criado para resolver todos eles, desde custos excessivos até bloqueios regionais, desde fluxos quebrados de OAuth até operações de protocolo e observabilidade empresarial.

<details>
<summary><b>💸 1. "Eu pago por uma assinatura cara, mas ainda sou interrompido pelos limites"</b></summary>

Os desenvolvedores pagam US$ 20–200/mês pelo Claude Pro, Codex Pro ou GitHub Copilot. Mesmo pagando, a cota tem um limite máximo – 5h de uso, limites semanais ou limites de taxa por minuto. No meio da sessão de codificação, o provedor para de responder e o desenvolvedor perde fluxo e produtividade.

**Como o OmniRoute resolve isso:**

- **Smart 4-Tier Fallback** — Se a cota de assinatura acabar, redireciona automaticamente para API Key → Barato → Gratuito sem intervenção manual
- **Rastreamento de cota em tempo real** — Mostra o consumo de tokens em tempo real com contagem regressiva redefinida (5h, diariamente, semanalmente)
- **Suporte para múltiplas contas** — Várias contas por provedor com round-robin automático — quando uma acabar, muda para a próxima
- **Combos personalizados** — Cadeias alternativas personalizáveis com 6 estratégias de balanceamento (preencher primeiro, round-robin, P2C, aleatório, menos usado, com custo otimizado)
- **Codex Business Quotas** — Monitoramento de cotas de espaço de trabalho de negócios/equipe diretamente no painel

</details>

<details>
<summary><b>🔌 2. "Preciso usar vários provedores, mas cada um tem uma API diferente"</b></summary>

OpenAI usa um formato, Claude (Anthropic) usa outro, Gemini ainda outro. Se um desenvolvedor quiser testar modelos de diferentes provedores ou fazer fallback entre eles, ele precisará reconfigurar SDKs, alterar endpoints e lidar com formatos incompatíveis. Provedores personalizados (FriendLI, NIM) possuem endpoints de modelo não padrão.

**Como o OmniRoute resolve isso:**

- **Endpoint unificado** — Um único `http://localhost:20128/v1` serve como proxy para todos os mais de 36 provedores
- **Tradução de formato** — Automática e transparente: OpenAI ↔ Claude ↔ Gemini ↔ API de respostas
- **Response Sanitization** — Remove campos não padrão (`x_groq`, `usage_breakdown`, `service_tier`) que quebram o OpenAI SDK v1.83+
- **Normalização de função** — Converte `developer` → `system` para provedores não-OpenAI; `system` → `user` para GLM/ERNIE
- **Think Tag Extraction** — Extrai blocos `<think>` de modelos como DeepSeek R1 em `reasoning_content` padronizado
- **Saída estruturada para Gemini** — `json_schema` → conversão automática `responseMimeType`/`responseSchema`
- **`stream` é padronizado como `false`** — Alinha-se com as especificações OpenAI, evitando SSE inesperado em SDKs Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Meu provedor de IA bloqueia minha região/país"</b></summary>

Provedores como OpenAI/Codex bloqueiam o acesso de determinadas regiões geográficas. Os usuários recebem erros como `unsupported_country_region_territory` durante conexões OAuth e API. Isto é especialmente frustrante para desenvolvedores de países em desenvolvimento.

**Como o OmniRoute resolve isso:**

- **Configuração de proxy de 3 níveis** — Proxy configurável em 3 níveis: global (todo o tráfego), por provedor (apenas um provedor) e por conexão/chave
- **Selos de proxy codificados por cores** — Indicadores visuais: 🟢 proxy global, 🟡 proxy do provedor, 🔵 proxy de conexão, sempre mostrando o IP
- **Troca de token OAuth por meio de proxy** — O fluxo OAuth também passa pelo proxy, resolvendo `unsupported_country_region_territory`
- **Testes de conexão via proxy** — Os testes de conexão usam o proxy configurado (não há mais bypass direto)
- **Suporte SOCKS5** — Suporte completo ao proxy SOCKS5 para roteamento de saída
- **TLS Fingerprint Spoofing** — Impressão digital TLS semelhante a um navegador via `wreq-js` para ignorar a detecção de bot

</details>

<details>
<summary><b>🆓 4. "Quero usar IA para codificação, mas não tenho dinheiro"</b></summary>

Nem todos podem pagar US$ 20–200/mês por assinaturas de IA. Estudantes, desenvolvedores de países emergentes, amadores e freelancers precisam de acesso a modelos de qualidade a custo zero.

**Como o OmniRoute resolve isso:**

- **Provedores de nível gratuito integrados** — Suporte nativo para provedores 100% gratuitos: iFlow (8 modelos ilimitados), Qwen (3 modelos ilimitados), Kiro (Claude grátis), Gemini CLI (180 mil/mês grátis)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combos somente gratuitos** — Cadeia `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = US$ 0/mês com tempo de inatividade zero
- **Créditos gratuitos NVIDIA NIM** — 1.000 créditos gratuitos integrados
- **Estratégia de Custo Otimizado** — Estratégia de roteamento que escolhe automaticamente o provedor mais barato disponível

</details>

<details>
<summary><b>🔒 5. "Preciso proteger meu gateway de IA contra acesso não autorizado"</b></summary>

Ao expor um gateway de IA à rede (LAN, VPS, Docker), qualquer pessoa com o endereço pode consumir os tokens/cota do desenvolvedor. Sem proteção, as APIs ficam vulneráveis ​​ao uso indevido, injeção imediata e abuso.

**Como o OmniRoute resolve isso:**

- **Gerenciamento de chaves de API** — Geração, rotação e escopo por provedor com uma página `/dashboard/api-manager` dedicada
- **Permissões em nível de modelo** — Restringir chaves de API a modelos específicos (`openai/*`, padrões curinga), com alternância Permitir tudo/Restringir
- **API Endpoint Protection** — Exija uma chave para `/v1/models` e bloqueie provedores específicos da listagem
- **Auth Guard + Proteção CSRF** — Todas as rotas do painel protegidas com middleware `withAuth` + tokens CSRF
- **Rate Limiter** — Limitação de taxa por IP com janelas configuráveis
- **Filtragem de IP** — Lista de permissões/lista de bloqueio para controle de acesso
- **Prompt Injection Guard** — Sanitização contra padrões de prompt maliciosos
- **Criptografia AES-256-GCM** — Credenciais criptografadas em repouso

</details>

<details>
<summary><b>🛑 6. "Meu provedor caiu e perdi meu fluxo de codificação"</b></summary>

Os provedores de IA podem ficar instáveis, retornar erros 5xx ou atingir limites de taxa temporários. Se um desenvolvedor depender de um único provedor, ele será interrompido. Sem disjuntores, tentativas repetidas podem travar o aplicativo.

**Como o OmniRoute resolve isso:**

- **Disjuntor por provedor** — Abertura/fechamento automático com limites e resfriamento configuráveis (Fechado/Aberto/Meio-aberto)
- **Retirada exponencial** — Atrasos progressivos em novas tentativas
- **Rebanho Anti-Trovão** — Proteção Mutex + semáforo contra tempestades de novas tentativas simultâneas
- **Combo Fallback Chains** — Se o provedor primário falhar, ele cairá automaticamente na cadeia sem intervenção
- **Combo Circuit Breaker** — Desativa automaticamente provedores com falha em uma cadeia de combinação
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Health Dashboard** — Monitoramento de tempo de atividade, estados de disjuntores, bloqueios, estatísticas de cache, latência p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Configurar cada ferramenta de IA é tedioso e repetitivo"</b></summary>

Os desenvolvedores usam Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Cada ferramenta precisa de uma configuração diferente (endpoint da API, chave, modelo). Reconfigurar ao trocar de provedor ou modelo é uma perda de tempo.

**Como o OmniRoute resolve isso:**

- **CLI Tools Dashboard** — Página dedicada com configuração de um clique para Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Gera `chatLanguageModels.json` para VS Code com seleção de modelo em massa
- **Assistente de integração** — Configuração guiada em 4 etapas para usuários iniciantes
- **Um endpoint, todos os modelos** — Configure `http://localhost:20128/v1` uma vez, acesse mais de 36 provedores

</details>

<details>
<summary><b>🔑 8. "Gerenciar tokens OAuth de vários provedores é um inferno"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — todos usam OAuth 2.0 com tokens expirados. Os desenvolvedores precisam se autenticar novamente constantemente, lidar com `client_secret is missing`, `redirect_uri_mismatch` e falhas em servidores remotos. OAuth em LAN/VPS é particularmente problemático.

**Como o OmniRoute resolve isso:**

- **Atualização automática de token** — Os tokens OAuth são atualizados em segundo plano antes da expiração
- **OAuth 2.0 (PKCE) integrado ** — Fluxo automático para Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth de várias contas** — Várias contas por provedor por meio de extração de token JWT/ID
- **OAuth LAN/Remote Fix** — Detecção de IP privado para `redirect_uri` + modo URL manual para servidores remotos
- **OAuth Behind Nginx** — Usa `window.location.origin` para compatibilidade de proxy reverso
- **Guia OAuth remoto** — Guia passo a passo para credenciais do Google Cloud em VPS/Docker

</details>

<details>
<summary><b>📊 9. "Não sei quanto estou gastando ou onde"</b></summary>

Os desenvolvedores usam vários provedores pagos, mas não têm uma visão unificada dos gastos. Cada provedor possui seu próprio painel de faturamento, mas não há visão consolidada. Custos inesperados podem se acumular.

**Como o OmniRoute resolve isso:**

- **Painel de análise de custos** — Acompanhamento de custos por token e gerenciamento de orçamento por provedor
- **Limites de orçamento por nível** — Teto de gastos por nível que aciona substituto automático
- **Configuração de preços por modelo** — Preços configuráveis por modelo
- **Estatísticas de uso por chave de API** — Contagem de solicitações e carimbo de data/hora do último uso por chave
- **Painel de análise** — Cartões de estatísticas, gráfico de uso do modelo, tabela de provedores com taxas de sucesso e latência

</details>

<details>
<summary><b>🐛 10. "Não consigo diagnosticar erros e problemas em chamadas de IA"</b></summary>

Quando uma chamada falha, o desenvolvedor não sabe se foi um limite de taxa, um token expirado, um formato errado ou um erro do provedor. Logs fragmentados em diferentes terminais. Sem observabilidade, a depuração é uma tentativa e erro.

**Como o OmniRoute resolve isso:**

- **Painel de registros unificados** — 4 guias: registros de solicitação, registros de proxy, registros de auditoria, console
- **Console Log Viewer** — Visualizador em estilo terminal em tempo real com níveis codificados por cores, rolagem automática, pesquisa, filtro
- **SQLite Proxy Logs** — Logs persistentes que sobrevivem às reinicializações do servidor
- **Translator Playground** — 4 modos de depuração: Playground (tradução de formato), Chat Tester (ida e volta), Test Bench (lote), Live Monitor (tempo real)
- **Solicitar telemetria** — latência p50/p95/p99 + rastreamento X-Request-Id
- **Registro baseado em arquivo com rotação** — O interceptador do console captura tudo no log JSON com rotação baseada em tamanho

</details>

<details>
<summary><b>🏗️ 11. "Implantar e manter o gateway é complexo"</b></summary>

Instalar, configurar e manter um proxy de IA em diferentes ambientes (local, VPS, Docker, nuvem) exige muito trabalho. Problemas como caminhos codificados, `EACCES` em diretórios, conflitos de porta e compilações entre plataformas aumentam o atrito.

**Como o OmniRoute resolve isso:**

- **instalação global npm** — `npm install -g omniroute && omniroute` — concluído
- **Docker Multiplataforma** — AMD64 + ARM64 nativo (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Perfis Docker Compose** — `base` (sem ferramentas CLI) e `cli` (com Claude Code, Codex, OpenClaw)
- **Aplicativo Electron Desktop** — Aplicativo nativo para Windows/macOS/Linux com bandeja do sistema, inicialização automática e modo offline
- **Modo Split-Port** — API e Dashboard em portas separadas para cenários avançados (proxy reverso, rede de contêineres)
- **Cloud Sync** — Sincronização de configuração entre dispositivos via Cloudflare Workers
- **Backups de banco de dados** — Backup, restauração, exportação e importação automática de todas as configurações

</details>

<details>
<summary><b>🌍 12. "A interface é somente em inglês e minha equipe não fala inglês"</b></summary>

Equipes em países que não falam inglês, especialmente na América Latina, Ásia e Europa, enfrentam dificuldades com interfaces somente em inglês. As barreiras linguísticas reduzem a adoção e aumentam os erros de configuração.

**Como o OmniRoute resolve isso:**

- **Painel i18n — 30 idiomas** — Todas as mais de 500 teclas traduzidas, incluindo árabe, búlgaro, dinamarquês, alemão, espanhol, finlandês, francês, hebraico, hindi, húngaro, indonésio, italiano, japonês, coreano, malaio, holandês, norueguês, polonês, português (PT/BR), romeno, russo, eslovaco, sueco, tailandês, ucraniano, vietnamita, chinês, filipino, inglês
- **Suporte RTL** — Suporte da direita para a esquerda para árabe e hebraico
- **READMEs multilíngues** — 30 traduções completas de documentação
- **Seletor de idioma** — Ícone de globo no cabeçalho para troca em tempo real

</details>

<details>
<summary><b>🔄 13. "Preciso de mais do que bate-papo - preciso de incorporações, imagens, áudio"</b></summary>

IA não é apenas conclusão de bate-papo. Os desenvolvedores precisam gerar imagens, transcrever áudio, criar embeddings para RAG, reclassificar documentos e moderar conteúdo. Cada API possui um endpoint e formato diferente.

**Como o OmniRoute resolve isso:**

- **Embeddings** — `/v1/embeddings` com 6 provedores e mais de 9 modelos
- **Geração de imagem** — `/v1/images/generations` com 10 provedores e mais de 20 modelos (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Texto para vídeo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) e SD WebUI
- **Texto para música** — `/v1/music/generations` — ComfyUI (áudio estável aberto, MusicGen)
- **Transcrição de áudio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Conversão de texto em fala** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + provedores existentes
- **Moderações** — `/v1/moderations` — Verificações de segurança de conteúdo
- **Reclassificação** — `/v1/rerank` — Reclassificação da relevância do documento
- **API de respostas ** — Suporte completo a `/v1/responses` para Codex

</details>

<details>
<summary><b>🧪 14. "Não tenho como testar e comparar a qualidade entre modelos"</b></summary>

Os desenvolvedores querem saber qual modelo é melhor para seu caso de uso – código, tradução, raciocínio – mas comparar manualmente é lento. Não existem ferramentas de avaliação integradas.

**Como o OmniRoute resolve isso:**

- **Avaliações LLM** — Teste Golden Set com 10 casos pré-carregados cobrindo saudações, matemática, geografia, geração de código, conformidade com JSON, tradução, remarcação, recusa de segurança
- **4 estratégias de correspondência** — `exact`, `contains`, `regex`, `custom` (função JS)
- **Translator Playground Test Bench** — Teste em lote com múltiplas entradas e saídas esperadas, comparação entre fornecedores
- **Testador de bate-papo** — Ida e volta completa com renderização de resposta visual
- **Monitoramento ao vivo** — Transmissão em tempo real de todas as solicitações que passam pelo proxy

</details>

<details>
<summary><b>📈 15. "Preciso escalar sem perder desempenho"</b></summary>

À medida que o volume de solicitações aumenta, sem armazenar em cache as mesmas perguntas geram custos duplicados. Sem idempotência, solicitações duplicadas desperdiçam processamento. Os limites de tarifas por provedor devem ser respeitados.

**Como o OmniRoute resolve isso:**

- **Cache Semântico** — Cache de duas camadas (assinatura + semântica) reduz custo e latência
- **Idempotência de solicitação** — janela de desduplicação de 5s para solicitações idênticas
- **Detecção de limite de taxa** — RPM por provedor, intervalo mínimo e rastreamento simultâneo máximo
- **Limites de taxa editáveis** — Padrões configuráveis em Configurações → Resiliência com persistência
- **Cache de validação de chave de API** — cache de três camadas para desempenho de produção
- **Health Dashboard com telemetria** — latência p50/p95/p99, estatísticas de cache, tempo de atividade

</details>

<details>
<summary><b>🤖 16. "Quero controlar o comportamento do modelo globalmente"</b></summary>

Desenvolvedores que desejam todas as respostas em um idioma específico, com um tom específico ou que desejam limitar os tokens de raciocínio. Configurar isso em cada ferramenta/solicitação é impraticável.

**Como o OmniRoute resolve isso:**

- **Injeção de Prompt do Sistema** — Prompt global aplicado a todas as solicitações
- **Thinking Budget Validation** — Controle de alocação de token de raciocínio por solicitação (passthrough, automático, personalizado, adaptativo)
- **6 Estratégias de Roteamento** — Estratégias globais que determinam como as solicitações são distribuídas
- **Wildcard Router** — Os padrões `provider/*` roteiam dinamicamente para qualquer provedor
- **Combo Habilitar/Desabilitar Alternar** — Alternar combos diretamente do painel
- **Alternância de provedor** — Habilite/desabilite todas as conexões de um provedor com um clique
- **Provedores bloqueados** — Excluir provedores específicos da listagem `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Preciso de ferramentas MCP como recursos de produto de primeira classe"</b></summary>

Muitos gateways de IA expõem o MCP apenas como um detalhe de implementação oculto. As equipes precisam de uma camada operacional visível e gerenciável.

**Como o OmniRoute resolve isso:**

- MCP aparece na navegação do painel e na guia protocolo de endpoint
- Página dedicada de gerenciamento de MCP com processos, ferramentas, escopos e auditoria
- Início rápido integrado para `omniroute --mcp` e integração de cliente

</details>

<details>
<summary><b>🧠 18. "Preciso de orquestração A2A com caminhos de tarefa de sincronização + fluxo"</b></summary>

Os fluxos de trabalho do agente precisam de respostas diretas e execução em streaming de longa duração com controle do ciclo de vida.

**Como o OmniRoute resolve isso:**

- Endpoint A2A JSON-RPC (`POST /a2a`) com `message/send` e `message/stream`
- Streaming SSE com propagação de estado terminal
- APIs de ciclo de vida de tarefas para `tasks/get` e `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Preciso de integridade real do processo MCP, não de status adivinhado"</b></summary>

As equipes operacionais precisam saber se o MCP está realmente ativo, e não apenas se uma API está acessível.

**Como o OmniRoute resolve isso:**

- Arquivo de pulsação em tempo de execução com PID, carimbos de data/hora, transporte, contagem de ferramentas e modo de escopo
- API de status MCP combinando pulsação + atividade recente
- Cartões de status da interface do usuário para atualização de processo/tempo de atividade/pulsação

</details>

<details>
<summary><b>📋 20. "Preciso de execução auditável da ferramenta MCP"</b></summary>

Quando as ferramentas alteram a configuração ou acionam ações operacionais, as equipes precisam de rastreabilidade forense.

**Como o OmniRoute resolve isso:**

- Registro de auditoria apoiado por SQLite para chamadas de ferramentas MCP
- Filtros por ferramenta, sucesso/falha, chave de API e paginação
- Tabela de auditoria do painel + endpoints de estatísticas para automação

</details>

<details>
<summary><b>🔐 21. "Preciso de permissões MCP com escopo definido por integração"</b></summary>

Clientes diferentes devem ter acesso com privilégios mínimos às categorias de ferramentas.

**Como o OmniRoute resolve isso:**

- 9 escopos MCP granulares para acesso controlado à ferramenta
- Aplicação do escopo e visibilidade na UI de gerenciamento do MCP
- Postura padrão segura para ferramentas operacionais

</details>

<details>
<summary><b>⚙️ 22. "Preciso de controles operacionais sem reimplantar"</b></summary>

As equipes precisam de mudanças rápidas no tempo de execução durante incidentes ou eventos de custo.

**Como o OmniRoute resolve isso:**

- Alternar ativação combinada diretamente do painel MCP
- Aplicar perfis de resiliência de pacotes de políticas predefinidos
- Redefinir o estado do disjuntor no mesmo painel de operações

</details>

<details>
<summary><b>🔄 23. "Preciso de visibilidade e cancelamento do ciclo de vida da tarefa A2A ao vivo"</b></summary>

Sem visibilidade do ciclo de vida, os incidentes de tarefas tornam-se difíceis de triagem.

**Como o OmniRoute resolve isso:**

- Listagem/filtragem de tarefas por estado/habilidade com paginação
- Detalhamento de metadados de tarefas, eventos e artefatos
- Terminal de cancelamento de tarefa e ação de UI com confirmação

</details>

<details>
<summary><b>🌊 24. "Preciso de métricas de fluxo ativo para carga A2A"</b></summary>

Os fluxos de trabalho de streaming exigem insights operacionais sobre simultaneidade e conexões em tempo real.

**Como o OmniRoute resolve isso:**

- Contadores de fluxo ativos integrados ao status A2A
- Carimbo de data/hora da última tarefa e contagens por estado
- Cartões de painel A2A para monitoramento de operações em tempo real

</details>

<details>
<summary><b>🪪 25. "Preciso de descoberta de agente padrão para clientes"</b></summary>

Clientes e orquestradores externos precisam de metadados legíveis por máquina para integração.

**Como o OmniRoute resolve isso:**

- Cartão de agente exposto em `/.well-known/agent.json`
- Capacidades e habilidades mostradas na UI de gerenciamento
- A API de status A2A inclui metadados de descoberta para automação

</details>

<details>
<summary><b>🧭 26. "Preciso de descoberta de protocolo na UX do produto"</b></summary>

Se os usuários não conseguirem descobrir superfícies de protocolo, a adoção e a qualidade do suporte cairão.

**Como o OmniRoute resolve isso:**

- Entradas da barra lateral para MCP e A2A
- Guia Protocolos da página Endpoint com início rápido e status
- Links da visão geral para painéis de gerenciamento dedicados

</details>

<details>
<summary><b>🧪 27. "Preciso de validação de protocolo ponta a ponta com clientes reais"</b></summary>

Os testes simulados não são suficientes para validar a compatibilidade do protocolo antes do lançamento.

**Como o OmniRoute resolve isso:**

- Suíte E2E que inicializa o aplicativo e usa transporte de cliente SDK MCP real
- Testes de cliente A2A para fluxos de descoberta, envio, streaming, obtenção e cancelamento
- Verificação cruzada de afirmações com APIs de auditoria MCP e tarefas A2A

</details>

<details>
<summary><b>📡 28. "Preciso de observabilidade unificada em todas as interfaces"</b></summary>

A divisão da observabilidade por protocolo cria pontos cegos e MTTR mais longo.

**Como o OmniRoute resolve isso:**

- Painéis/logs/análises unificados em um produto
- Saúde + auditoria + solicitação de telemetria nas camadas OpenAI, MCP e A2A
- APIs operacionais para status e automação

</details>

<details>
<summary><b>💼 29. "Preciso de um tempo de execução para proxy + ferramentas + orquestração de agente"</b></summary>

A execução de muitos serviços separados aumenta o custo operacional e os modos de falha.

**Como o OmniRoute resolve isso:**

- Proxy compatível com OpenAI, servidor MCP e servidor A2A em uma pilha
- Autenticação compartilhada, resiliência, armazenamento de dados e observabilidade
- Modelo de política consistente em todas as superfícies de interação

</details>

<details>
<summary><b>🚀 30. "Preciso enviar fluxos de trabalho de agente sem expansão de códigos colados"</b></summary>

As equipes perdem velocidade ao unir vários serviços e scripts ad hoc.

**Como o OmniRoute resolve isso:**

- Estratégia unificada de endpoint para clientes e agentes
- UIs de gerenciamento de protocolo integradas e caminhos de validação de fumaça
- Fundações prontas para produção (segurança, registro, resiliência, backup)

</details>

### Exemplos de manuais (casos de uso integrados)

**Manual A: Maximize a assinatura paga + backup barato**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Manual B: Pilha de codificação de custo zero**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Manual C: cadeia de fallback sempre ativa 24 horas por dia, 7 dias por semana**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Manual D: Operações de agente com MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Início rápido

**1. Instale globalmente:**

```bash
npm install -g omniroute
omniroute
```

🎉 O painel abre às `http://localhost:20128`

| Comando                 | Descrição                             |
| ----------------------- | ------------------------------------- |
| `omniroute`             | Iniciar servidor (porta padrão 20128) |
| `omniroute --port 3000` | Usar porta personalizada              |
| `omniroute --no-open`   | Não abra o navegador automaticamente  |
| `omniroute --help`      | Mostrar ajuda                         |

**2. Conecte um provedor GRATUITO:**

Painel → Provedores → Conectar **Claude Code** ou **Antigravidade** → Login OAuth → Concluído!

**3. Use em sua ferramenta CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**É isso aí!** Comece a codificar com modelos de IA GRATUITOS.

**Alternativa – execute a partir da fonte:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute está disponível como uma imagem pública do Docker em [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

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
# Copy and edit .env first
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
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Imagem                   | Etiqueta | Tamanho | Descrição             |
| ------------------------ | -------- | ------- | --------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB | Última versão estável |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Versão atual          |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Visão geral dos preços

| Nível               | Provedor            | Custo                      | Redefinição de cota      | Melhor para             |
| ------------------- | ------------------- | -------------------------- | ------------------------ | ----------------------- |
| **💳 ASSINATURA**   | Código Claude (Pro) | $ 20/mês                   | 5h + semanalmente        | Já inscrito             |
|                     | Códice (Plus/Pro)   | US$ 20-200/mês             | 5h + semanalmente        | Usuários OpenAI         |
|                     | Gêmeos CLI          | **GRÁTIS**                 | 180 mil/mês + 1 mil/dia  | Todos!                  |
|                     | Copiloto GitHub     | US$ 10-19/mês              | Mensalmente              | Usuários do GitHub      |
| **🔑 CHAVE DE API** | NVIDIA NIM          | **GRÁTIS** (1000 créditos) | Único                    | Teste de nível gratuito |
|                     | DeepSeek            | Pagamento conforme uso     | Nenhum                   | Melhor preço/qualidade  |
|                     | Groq                | Nível gratuito + pago      | Taxa limitada            | Inferência ultrarrápida |
|                     | xAI (Groque)        | Pagamento conforme uso     | Nenhum                   | Modelos Grok            |
|                     | Mistral             | Nível gratuito + pago      | Taxa limitada            | IA Europeia             |
|                     | OpenRouter          | Pagamento conforme uso     | Nenhum                   | Mais de 100 modelos     |
| **💰 BARATO**       | GLM-4.7             | US$ 0,6/1 milhão           | Diariamente 10h          | Backup de orçamento     |
|                     | MiniMax M2.1        | US$ 0,2/1 milhão           | Rolamento de 5 horas     | Opção mais barata       |
|                     | Kimi K2             | $ 9 / mês fixo             | 10 milhões de tokens/mês | Custo previsível        |
| **🆓 GRÁTIS**       | iFlow               | $0                         | Ilimitado                | 8 modelos grátis        |
|                     | Qwen                | $0                         | Ilimitado                | 3 modelos grátis        |
|                     | Kiro                | $0                         | Ilimitado                | Cláudio grátis          |

**💡 Dica profissional:** Comece com Gemini CLI (180 mil grátis/mês) + combo iFlow (gratuito ilimitado) = custo de $ 0!

---

## 💡 Principais recursos

### 🧠 Roteamento e inteligência central

| Recurso                                      | O que faz                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 🎯 **Fullback inteligente de 4 camadas**     | Roteamento automático: Assinatura → Chave de API → Barato → Grátis                                 |
| 📊 **Acompanhamento de cotas em tempo real** | Contagem de tokens ativos + contagem regressiva redefinida por provedor                            |
| 🔄 **Tradução de formato**                   | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro sem costura + higienização de resposta                    |
| 👥 **Suporte para múltiplas contas**         | Múltiplas contas por provedor com seleção inteligente                                              |
| 🔄 **Atualização automática de token**       | Os tokens OAuth são atualizados automaticamente com nova tentativa                                 |
| 🎨 **Combos Personalizados**                 | 6 estratégias: preencher primeiro, round-robin, p2c, aleatório, menos usado, otimizado para custos |
| 🧩 **Modelos Personalizados**                | Adicione qualquer ID de modelo a qualquer provedor                                                 |
| 🌐 **Roteador curinga**                      | Rotear padrões `provider/*` para qualquer provedor dinamicamente                                   |
| 🧠 **Pensando no Orçamento**                 | Modos de passagem, automático, personalizado e adaptativo para modelos de raciocínio               |
| 🔀 **Model Aliases**                         | Auto-forward deprecated model IDs to current replacements (built-in + custom)                      |
| ⚡ **Background Degradation**                | Auto-route background tasks (titles, summaries) to cheaper models                                  |
| 💬 **Injeção imediata do sistema**           | Prompt de sistema global aplicado em todas as solicitações                                         |
| 📄 **API de respostas**                      | Suporte completo à API de respostas OpenAI (`/v1/responses`) para Codex                            |

### 🎵 APIs multimodais

| Recurso                           | O que faz                                                                                                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Geração de imagens**         | `/v1/images/generations` — 4 provedores, mais de 9 modelos                                                                                                                 |
| 📐 **Incorporações**              | `/v1/embeddings` — 6 provedores, mais de 9 modelos                                                                                                                         |
| 🎤 **Transcrição de áudio**       | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Conversão de texto em fala** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderações**                 | `/v1/moderations` — Verificações de segurança de conteúdo                                                                                                                  |
| 🔀 **Reclassificação**            | `/v1/rerank` — Reclassificação da relevância dos documentos                                                                                                                |

### 🛡️ Resiliência e segurança

| Recurso                                      | O que faz                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| 🔌 **Disjuntor**                             | Abertura/fechamento automático por provedor com limites configuráveis ​​             |
| 🛡️ **Rebanho Anti-Trovão**                   | Mutex + limite de taxa de semáforo para provedores de chaves de API                  |
| 🧠 **Cache Semântico**                       | Cache de duas camadas (assinatura + semântica) reduz custo e latência                |
| ⚡ **Solicitar Idempotência**                | Janela de desduplicação 5s para solicitações duplicadas                              |
| 🔒 **Falsificação de impressão digital TLS** | Ignore a detecção de bot baseada em TLS via wreq-js                                  |
| 🌐 **Filtragem de IP**                       | Lista de permissões/lista de bloqueio para controle de acesso à API                  |
| 📊 **Limites de taxas editáveis**            | RPM configurável, intervalo mínimo e simultâneo máximo no nível do sistema           |
| 💾 **Rate Limit Persistence**                | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness         |
| 🔄 **Token Refresh Resilience**              | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt               |
| 🛡 **Proteção de endpoint de API**           | Autenticação + bloqueio de provedor para o endpoint `/models`                        |
| 🔒 **Visibilidade do proxy**                 | Crachás codificados por cores: 🟢 global, 🟡 provedor, 🔵 por conexão com display IP |
| 🌐 **Configuração de proxy de 3 níveis**     | Configurar proxies em nível global, por provedor ou por conexão                      |

### 📊 Observabilidade e análise

| Recurso                                     | O que faz                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 📝 **Solicitar registro**                   | Modo de depuração com logs completos de solicitação/resposta                                     |
| 💾 **Logs de proxy SQLite**                 | Logs de proxy persistentes sobrevivem às reinicializações do servidor                            |
| 📊 **Painel de análise**                    | Alimentado por recargas: cartões de estatísticas, gráfico de uso de modelo, tabela de provedores |
| 📈 **Acompanhamento do progresso**          | Eventos de progresso SSE opcionais para streaming                                                |
| 🧪 **Avaliações LLM**                       | Teste de Golden Set com 4 estratégias de jogo                                                    |
| 🔍 **Solicitar Telemetria**                 | Agregação de latência p50/p95/p99 + rastreamento X-Request-Id                                    |
| 📋 **Painel de registros**                  | Página unificada de 4 guias: Logs de solicitação, Logs de proxy, Logs de auditoria, Console      |
| 🖥️ **Visualizador de registros do console** | Visualizador em estilo terminal em tempo real com filtro de nível, pesquisa, rolagem automática  |
| 📑 **Registro baseado em arquivo**          | O interceptor do console captura toda a saída para o arquivo de log JSON com rotação             |
| 🏥 **Painel de saúde**                      | Tempo de atividade do sistema, estados de disjuntores, bloqueios, estatísticas de cache          |
| 💰 **Acompanhamento de custos**             | Gestão orçamentária + configuração de preços por modelo                                          |

### ☁️ Implantação e sincronização

| Recurso                                 | O que faz                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| 💾 **Sincronização na nuvem**           | Sincronize a configuração entre dispositivos por meio do Cloudflare Workers          |
| 🌐 **Implante em qualquer lugar**       | Localhost, VPS, Docker, Cloudflare Workers                                           |
| 🔑 **Gerenciamento de chaves de API**   | Gerar, alternar e definir o escopo de chaves de API por provedor                     |
| 🧙 **Assistente de integração**         | Configuração guiada em 4 etapas para usuários iniciantes                             |
| 🔧 **Painel de Ferramentas CLI**        | Configurar com um clique Claude, Codex, Cline, OpenClaw, Kilo, Antigravity           |
| 🔄 **Backups de banco de dados**        | Backup, restauração, exportação e importação automáticos para todas as configurações |
| 🌐 **Internacionalização**              | i18n completo com next-intl — Suporte Inglês + Português (Brasil)                    |
| 🌍 **Seletor de idioma**                | Ícone de globo no cabeçalho para troca de idioma em tempo real (🇺🇸/🇧🇷)               |
| 📂 **Diretório de dados personalizado** | `DATA_DIR` env var para substituir o caminho de armazenamento padrão `~/.omniroute`  |

<details>
<summary><b>📖 Detalhes do recurso</b></summary>

### 🎯 Fallback inteligente de 4 camadas

Crie combos com fallback automático:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Rastreamento de cotas em tempo real

- Consumo de token por provedor
- Redefinir contagem regressiva (5 horas, diariamente, semanalmente)
- Estimativa de custos para níveis pagos
- Relatórios mensais de gastos

### 🔄 Tradução de formato

Tradução perfeita entre formatos:

- **OpenAI** ↔ **Claude** ↔ **Gêmeos** ↔ **Respostas OpenAI**
- Sua ferramenta CLI envia o formato OpenAI → OmniRoute traduz → O provedor recebe o formato nativo
- Funciona com qualquer ferramenta que suporte endpoints OpenAI personalizados
- **Higienização de resposta** — Remove campos não padrão para compatibilidade estrita com o OpenAI SDK
- **Normalização de funções** — `developer` → `system` para não-OpenAI; `system` → `user` para modelos GLM/ERNIE
- ** Extração de tags Think ** — `<think>` blocos → `reasoning_content` para modelos de pensamento
- **Saída estruturada** — `json_schema` → `responseMimeType`/`responseSchema` de Gêmeos

### 👥 Suporte para múltiplas contas

- Adicione várias contas por provedor
- Round-robin automático ou roteamento baseado em prioridade
- Fallback para a próxima conta quando alguém atingir a cota

### 🔄 Atualização automática de token

- Os tokens OAuth são atualizados automaticamente antes da expiração
- Não é necessária reautenticação manual
- Experiência perfeita em todos os provedores

### 🎨 Combos Personalizados

- Crie combinações ilimitadas de modelos
- 6 estratégias: preencher primeiro, round-robin, poder de duas escolhas, aleatório, menos usado, otimizado para custos
- Compartilhe combos entre dispositivos com Cloud Sync

### 🏥 Painel de saúde

- Status do sistema (tempo de atividade, versão, uso de memória)
- Estados do disjuntor por provedor (Fechado/Aberto/Meio-Aberto)
- Status do limite de taxa e bloqueios ativos
- Estatísticas de cache de assinatura
- Telemetria de latência (p50/p95/p99) + cache de prompt
- Redefinir o status de saúde com um clique

### 🔧 Parque do Tradutor

OmniRoute inclui um poderoso Translator Playground integrado com **4 modos** para depuração, teste e monitoramento de traduções de API:

| Modo                         | Descrição                                                                                                                                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Parque Infantil**       | Tradução direta de formato — cole qualquer corpo de solicitação de API e veja instantaneamente como o OmniRoute o traduz entre formatos de provedor (OpenAI ↔ Claude ↔ Gemini ↔ API de respostas). Inclui modelos de exemplo e detecção automática de formato. |
| **💬 Testador de bate-papo** | Envie solicitações de chat reais por meio do OmniRoute e veja o percurso completo: sua entrada, a solicitação traduzida, a resposta do provedor e a resposta traduzida de volta. Inestimável para validar o roteamento combinado.                              |
| **🧪 Bancada de testes**     | Modo de teste em lote — defina vários casos de teste com diferentes entradas e resultados esperados, execute-os todos de uma vez e compare os resultados entre provedores e modelos.                                                                           |
| **📱Monitoramento ao vivo**  | Monitoramento de solicitações em tempo real: observe as solicitações recebidas conforme elas fluem pelo OmniRoute, veja as traduções de formato acontecendo ao vivo e identifique problemas instantaneamente.                                                  |

**Acesso:** Painel → Tradutor (barra lateral)

### 💾 Sincronização na nuvem

- Sincronize provedores, combos e configurações entre dispositivos
- Sincronização automática em segundo plano
- Armazenamento criptografado seguro

</details>

## 🧪 Avaliações (Evals)

OmniRoute inclui uma estrutura de avaliação integrada para testar a qualidade da resposta do LLM em relação a um conjunto dourado. Acesse-o em **Analytics → Evals** no painel.

### Conjunto Dourado Integrado

O "OmniRoute Golden Set" pré-carregado contém 10 casos de teste cobrindo:

- Saudações, matemática, geografia, geração de código
- Conformidade com o formato JSON, tradução, remarcação
- Recusa de segurança (conteúdo prejudicial), contagem, lógica booleana

### Estratégias de Avaliação

| Estratégia | Descrição                                                                   | Exemplo                          |
| ---------- | --------------------------------------------------------------------------- | -------------------------------- |
| `exact`    | A saída deve corresponder exatamente                                        | `"4"`                            |
| `contains` | A saída deve conter substring (sem distinção entre maiúsculas e minúsculas) | `"Paris"`                        |
| `regex`    | A saída deve corresponder ao padrão regex                                   | `"1.*2.*3"`                      |
| `custom`   | Função JS personalizada retorna verdadeiro/falso                            | `(output) => output.length > 10` |

---

## 📖 Guia de configuração

<details>
<summary><b>💳 Provedores de assinatura</b></summary>

### Código Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Dica profissional:** Use o Opus para tarefas complexas e o Sonnet para velocidade. OmniRoute rastreia cota por modelo!

### Codex OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (GRÁTIS 180K/mês!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Melhor valor:** Grande nível gratuito! Use isso antes dos níveis pagos.

### GitHub Copiloto

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Provedores de chave de API</b></summary>

### NVIDIA NIM (1000 créditos GRÁTIS!)

1. Inscreva-se: [build.nvidia.com](https://build.nvidia.com)
2. Obtenha uma chave de API gratuita (1.000 créditos de inferência incluídos)
3. Painel → Adicionar Provedor → NVIDIA NIM:
   - Chave API: `nvapi-your-key`

**Modelos:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` e mais de 50

**Dica profissional:** API compatível com OpenAI — funciona perfeitamente com a tradução de formato do OmniRoute!

### DeepSeek

1. Inscreva-se: [platform.deepseek.com](https://platform.deepseek.com)
2. Obtenha a chave API
3. Painel → Adicionar provedor → DeepSeek

**Modelos:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (nível gratuito disponível!)

1. Inscreva-se: [console.groq.com](https://console.groq.com)
2. Obtenha a chave API (nível gratuito incluído)
3. Painel → Adicionar Provedor → Groq

**Modelos:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Dica profissional:** Inferência ultrarrápida — melhor para codificação em tempo real!

### OpenRouter (mais de 100 modelos)

1. Inscreva-se: [openrouter.ai](https://openrouter.ai)
2. Obtenha a chave API
3. Painel → Adicionar Provedor → OpenRouter

**Modelos:** acesse mais de 100 modelos de todos os principais fornecedores por meio de uma única chave de API.

</details>

<details>
<summary><b>💰 Provedores baratos (backup)</b></summary>

### GLM-4.7 (redefinição diária, US$ 0,6/1 milhão)

1. Inscreva-se: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenha a chave API do plano de codificação
3. Painel → Adicionar chave API:
   - Provedor: `glm`
   - Chave API: `your-key`

**Usar:** `glm/glm-4.7`

**Dica profissional:** O plano de codificação oferece cota 3× com custo de 1/7! Redefinir diariamente às 10h.

### MiniMax M2.1 (redefinição de 5h, US$ 0,20/1 milhão)

1. Inscreva-se: [MiniMax](https://www.minimax.io/)
2. Obtenha a chave API
3. Painel → Adicionar chave API

**Usar:** `minimax/MiniMax-M2.1`

**Dica profissional:** Opção mais barata para contexto longo (1 milhão de tokens)!

### Kimi K2 (US$ 9/mês fixo)

1. Inscreva-se: [Moonshot AI](https://platform.moonshot.ai/)
2. Obtenha a chave API
3. Painel → Adicionar chave API

**Usar:** `kimi/kimi-latest`

**Dica profissional:** $9 fixos/mês para 10 milhões de tokens = $0,90/custo efetivo de 1 milhão!

</details>

<details>
<summary><b>🆓 Provedores GRATUITOS (backup de emergência)</b></summary>

### iFlow (8 modelos GRATUITOS)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modelos GRATUITOS)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRÁTIS)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Criar Combos</b></summary>

### Exemplo 1: Maximize a assinatura → Backup barato

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exemplo 2: somente gratuito (custo zero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 Integração CLI</b></summary>

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Código Cláudio

Use a página **Ferramentas CLI** no painel para configuração com um clique ou edite `~/.claude/settings.json` manualmente.

### CLI do Codex

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

###OpenClaw

**Opção 1 — Painel (recomendado):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Opção 2 — Manual:** Editar `~/.openclaw/openclaw.json`:

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

> **Observação:** OpenClaw só funciona com OmniRoute local. Use `127.0.0.1` em vez de `localhost` para evitar problemas de resolução de IPv6.

### Cline / Continuar / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Solução de problemas

<details>
<summary><b>Clique para expandir o guia de solução de problemas</b></summary>

**"O modelo de linguagem não forneceu mensagens"**

- Cota do provedor esgotada → Verifique o rastreador de cota do painel
- Solução: use o combo substituto ou mude para um nível mais barato

** Limitação de taxa **

- Cota de assinatura esgotada → Fallback para GLM/MiniMax
- Adicionar combinação: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**O token OAuth expirou**

- Atualizado automaticamente pelo OmniRoute
- Se os problemas persistirem: Painel → Provedor → Reconectar

**Custos elevados**

- Verifique as estatísticas de uso em Painel → Custos
- Mude o modelo primário para GLM/MiniMax
- Use o nível gratuito (Gemini CLI, iFlow) para tarefas não críticas

**Painel abre na porta errada**

- Definir `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Erros de sincronização na nuvem**

- Verifique `BASE_URL` aponta para sua instância em execução
- Verifique os pontos `CLOUD_URL` para o endpoint de nuvem esperado
- Mantenha os valores `NEXT_PUBLIC_*` alinhados com os valores do lado do servidor

**Primeiro login não funciona**

- Verifique `INITIAL_PASSWORD` em `.env`
- Se não definida, a senha substituta é `123456`

**Sem registros de solicitação**

- Definir `ENABLE_REQUEST_LOGS=true` em `.env`

**O teste de conexão mostra "Inválido" para provedores compatíveis com OpenAI**

- Muitos provedores não expõem um endpoint `/models`
- OmniRoute v1.0.6+ inclui validação de fallback por meio de conclusões de chat
- Certifique-se de que o URL base inclua o sufixo `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ IMPORTANTE para usuários com OmniRoute em VPS/Docker/servidor remoto**

#### OAuth

Os provedores **Antigravity** e **Gemini CLI** usam **Google OAuth 2.0** para autenticação. O Google exige que um `redirect_uri` usado no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth incorporadas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (ex: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Solução: Configure suas próprias credenciais OAuth

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com o URI do seu servidor.

####Passo a passo

**1. Acesse o Console do Google Cloud**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo ID de cliente OAuth 2.0**

- Clique em **"+ Criar credenciais"** → **"ID do cliente OAuth"**
- Tipo de aplicativo: **"Aplicativo Web"**
- Nome: escolha qualquer nome (ex: `OmniRoute Remote`)

**3. Adicionar como URIs de redirecionamento autorizados**

No campo **"URIs de redirecionamento autorizados"**, adicionado:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Salve e copie as credenciais**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Configurar como variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Painel → Provedores → Antigravidade (ou Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a autenticação funcionará.

---

#### Solução alternativa temporária (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá uma URL de autorização do Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Copie a URL completa** da barra de endereço do seu navegador (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Clique em **"Conectar"**

> Esta solução alternativa funciona porque o código de autorização na URL é válido, independentemente do redirecionamento ter sido carregado ou não.

</details>

---

## 🛠️

- **Tempo de execução**: Node.js 18–22 LTS (⚠️ Node.js 24+ **não é compatível** — `better-sqlite3` binários nativos são incompatíveis)
- **Idioma**: TypeScript 5.9 — **100% TypeScript** em `src/` e `open-sse/` (v1.0.6)
- **Estrutura**: Next.js 16 + React 19 + Tailwind CSS 4
- **Banco de dados**: LowDB (JSON) + SQLite (estado do domínio + logs de proxy)
- **Streaming**: eventos enviados pelo servidor (SSE)
- **Autenticação**: OAuth 2.0 (PKCE) + JWT + chaves de API
- **Testes**: executor de testes Node.js (mais de 368 testes de unidade)
- **CI/CD**: GitHub Actions (publicação automática de npm + Docker Hub no lançamento)
- **Site**: [omniroute.online](https://omniroute.online)
- **Pacote**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliência**: Disjuntor, espera exponencial, rebanho anti-trovão, falsificação de TLS

---

## 📖 Documentação

| Documento                                    | Descrição                                              |
| -------------------------------------------- | ------------------------------------------------------ |
| [User Guide](docs/USER_GUIDE.md)             | Provedores, combos, integração CLI, implantação        |
| [API Reference](docs/API_REFERENCE.md)       | Todos os endpoints com exemplos                        |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Problemas e soluções comuns                            |
| [Architecture](docs/ARCHITECTURE.md)         | Arquitetura do sistema e componentes internos          |
| [Contributing](CONTRIBUTING.md)              | Configuração e diretrizes de desenvolvimento           |
| [OpenAPI Spec](docs/openapi.yaml)            | Especificação OpenAPI 3.0                              |
| [Security Policy](SECURITY.md)               | Relatórios de vulnerabilidades e práticas de segurança |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Guia completo: configuração de VM + nginx + Cloudflare |
| [Features Gallery](docs/FEATURES.md)         | Tour visual do painel com capturas de tela             |

### 📸 Visualização do painel

<details>
<summary><b>Clique para ver as capturas de tela do painel</b></summary>

| Página               | Captura de tela                                   |
| -------------------- | ------------------------------------------------- |
| **Fornecedores**     | ![Providers](docs/screenshots/01-providers.png)   |
| **Combos**           | ![Combos](docs/screenshots/02-combos.png)         |
| **Análise**          | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Saúde**            | ![Health](docs/screenshots/04-health.png)         |
| **Tradutor**         | ![Translator](docs/screenshots/05-translator.png) |
| **Configurações**    | ![Settings](docs/screenshots/06-settings.png)     |
| **Ferramentas CLI**  | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Registros de uso** | ![Usage](docs/screenshots/08-usage.png)           |
| **Ponto final**      | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute tem **210+ recursos planejados** em diversas fases de desenvolvimento. Aqui estão as principais áreas:

| Categoria                         | Recursos planejados | Destaques                                                                                                    |
| --------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🧠 **Roteamento e Inteligência**  | 25+                 | Roteamento de menor latência, roteamento baseado em tags, simulação de cota, seleção de conta P2C            |
| 🔒 **Segurança e Conformidade**   | 20+                 | Proteção SSRF, camuflagem de credenciais, limite de taxa por endpoint, escopo de chave de gerenciamento      |
| 📊 **Observabilidade**            | 15+                 | Integração OpenTelemetry, monitoramento de cotas em tempo real, rastreamento de custos por modelo            |
| 🔄 **Integrações com Provedores** | 20+                 | Registro de modelo dinâmico, resfriamento de provedor, Codex multicontas, análise de cotas do Copilot        |
| ⚡ **Desempenho**                 | 15+                 | Camada de cache dupla, cache de prompt, cache de resposta, manutenção de atividade de streaming, API em lote |
| 🌐 **Ecossistema**                | 10+                 | API WebSocket, configuração hot-reload, armazenamento de configuração distribuído, modo comercial            |

### 🔜 Em breve

- 🔗 **Integração OpenCode** — Suporte de provedor nativo para o IDE de codificação OpenCode AI
- 🔗 **Integração TRAE** — Suporte total para a estrutura de desenvolvimento TRAE AI
- 📦 **API Batch** — Processamento assíncrono em lote para solicitações em massa
- 🎯 **Roteamento baseado em tags** — Roteie solicitações com base em tags personalizadas e metadados
- 💰 **Estratégia de custo mais baixo** — Selecione automaticamente o provedor mais barato disponível

> 📝 Especificações completas de recursos disponíveis em [link](docs/new-features/) (217 especificações detalhadas)

---

## 👥 Colaboradores

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Como contribuir

1. Bifurque o repositório
2. Crie sua ramificação de recursos (`git checkout -b feature/amazing-feature`)
3. Confirme suas alterações (`git commit -m 'Add amazing feature'`)
4. Envie para a ramificação (`git push origin feature/amazing-feature`)
5. Abra uma solicitação pull

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para obter diretrizes detalhadas.

### Lançando uma nova versão

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 História das Estrelas

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Agradecimentos

Agradecimentos especiais a **[9router](https://github.com/decolua/9router)** de **[decolua](https://github.com/decolua)** — o projeto original que inspirou este fork. OmniRoute se baseia nessa base incrível com recursos adicionais, APIs multimodais e uma reescrita completa do TypeScript.

Agradecimentos especiais a **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — a implementação Go original que inspirou esta versão JavaScript.

---

## 📄 Licença

Licença MIT - consulte [LICENSE](LICENSE) para obter detalhes.

---

<div align="center">
  <sub>Construído com ❤️ para desenvolvedores que codificam 24 horas por dia, 7 dias por semana</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
