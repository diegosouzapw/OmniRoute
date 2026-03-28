# 🚀 OmniRoute — O gateway de IA gratuito

### Nunca pare de codificar. Roteamento inteligente para **modelos de IA GRATUITOS e de baixo custo** com fallback automático.

_Seu proxy de API universal — um endpoint, mais de 67 provedores, zero tempo de inatividade. Agora com orquestração de agentes **MCP e A2A**._

**Conclusões de bate-papo • Incorporações • Geração de imagens • Vídeo • Música • Áudio • Reclassificação • **Pesquisa na Web** • Servidor MCP • Protocolo A2A • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Disponível em:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 O que há de novo na v3.0.0

> **Atualizando da v2.9.5?** — Consulte [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) para todas as alterações.

| Área                                      | Alterar                                                                                                                                                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **Segurança CodeQL**                   | Corrigidos mais de 10 alertas CodeQL: redos polinomiais, aleatoriedade insegura, remediação de injeção de shell                                                                                          |
| ✅ **Validação de Rota**                  | Todas as 176 rotas de API agora validadas com esquemas Zod + `validateBody()` — CI `check:route-validation:t06` passa                                                                                    |
| 🐛 ** Vazamento de tag omniModel **       | Tags internas `<omniModel>` não vazam mais para clientes em respostas de streaming SSE (#585)                                                                                                            |
| 🔑 **API de chaves registradas**          | Provisionamento automático de chaves de API via `POST /api/v1/registered-keys` com aplicação de cota por provedor/conta, idempotência, armazenamento SHA-256 e relatório opcional de problemas do GitHub |
| 🎨 **Ícones de provedor**                 | Mais de 130 logotipos de provedores via `@lobehub/icons` (SVG) com PNG → cadeia de fallback genérica                                                                                                     |
| 🔄 **Sincronização automática do modelo** | Agendador 24h e alternância manual da interface do usuário para sincronizar listas de modelos para provedores integrados e personalizados compatíveis com OpenAI                                         |
| 🌐 **OpenCode Zen/Go**                    | Dois novos provedores de @kang-heewon via PR #530: nível gratuito + nível de assinatura via `OpencodeExecutor`                                                                                           |
| 🐛 **Gemini CLI OAuth**                   | Erro acionável quando `GEMINI_OAUTH_CLIENT_SECRET` está faltando no Docker (foi um erro enigmático do Google)                                                                                            |
| 🐛 **Configuração OpenCode**              | `saveOpenCodeConfig()` agora grava TOML corretamente em `XDG_CONFIG_HOME`                                                                                                                                |
| 🐛 **Substituição de modelo fixado**      | `body.model` definido corretamente como `pinnedModel` na proteção de cache de contexto                                                                                                                   |
| 🐛 **Loop Codex/Claude**                  | `tool_result` blocos agora convertidos em texto para interromper loops infinitos                                                                                                                         |
| 🐛 **Redirecionamento de login**          | O login não congela mais após pular a configuração da senha                                                                                                                                              |
| 🐛 **Caminhos do Windows**                | Caminhos MSYS2/Git-Bash (`/c/...`) normalizados para `C:\...` automaticamente                                                                                                                            |

---

## 🖼️ Painel principal

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Visualização do painel

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
| **Pontos finais**    | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Provedor de IA gratuito para seus agentes de codificação favoritos

_Conecte qualquer ferramenta IDE ou CLI com tecnologia de IA por meio do OmniRoute - gateway de API gratuito para codificação ilimitada._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
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

## 🤔 Por que OmniRoute?

**Pare de desperdiçar dinheiro e atingir limites:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> A cota de assinatura expira sem ser utilizada todos os meses
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Os limites de taxa impedem você de codificar no meio
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
- **Contribuindo**: Consulte [CONTRIBUTING.md](CONTRIBUTING.md), abra um PR ou escolha um `good first issue`
- **Projeto Original**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Relatando um bug?

Ao abrir um problema, execute o comando system-info e anexe o arquivo gerado:

```bash
npm run system-info
```

Isso gera um `system-info.txt` com sua versão do Node.js, versão do OmniRoute, detalhes do sistema operacional, ferramentas CLI instaladas (iflow, gemini, claude, codex, antigravity, droid, etc.), status do Docker/PM2 e pacotes do sistema — tudo o que precisamos para reproduzir seu problema rapidamente. Anexe o arquivo diretamente ao seu problema do GitHub.

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

- **Endpoint unificado** — Um único `http://localhost:20128/v1` serve como proxy para todos os mais de 67 provedores
- **Tradução de formato** — Automática e transparente: OpenAI ↔ Claude ↔ Gemini ↔ API de respostas
- **Response Sanitization** — Remove campos não padrão (`x_groq`, `usage_breakdown`, `service_tier`) que quebram o OpenAI SDK v1.83+
- **Normalização de funções** — Converte `developer` → `system` para provedores não-OpenAI; `system` → `user` para GLM/ERNIE
- **Think Tag Extraction** — Extrai blocos `<think>` de modelos como DeepSeek R1 para `reasoning_content` padronizado
- **Saída estruturada para Gemini** — `json_schema` → `responseMimeType`/`responseSchema` conversão automática
- **`stream` o padrão é `false`** — Alinha-se com a especificação OpenAI, evitando SSE inesperado em SDKs Python/Rust/Go

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
- **🔏 CLI Fingerprint Matching** — Reordena cabeçalhos e campos de corpo para corresponder às assinaturas binárias CLI nativas, reduzindo drasticamente o risco de sinalização de conta. O IP do proxy é preservado – você obtém mascaramento de IP furtivo ** e ** simultaneamente

</details>

<details>
<summary><b>🆓 4. "Quero usar IA para codificação, mas não tenho dinheiro"</b></summary>

Nem todos podem pagar US$ 20–200/mês por assinaturas de IA. Estudantes, desenvolvedores de países emergentes, amadores e freelancers precisam de acesso a modelos de qualidade a custo zero.

**Como o OmniRoute resolve isso:**

- **Provedores de nível gratuito integrados** — Suporte nativo para provedores 100% gratuitos: iFlow (5 modelos ilimitados via OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 modelos ilimitados: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratuitamente), Gemini CLI (180 mil tokens/mês grátis)
- **Ollama Cloud** — Modelos Ollama hospedados na nuvem em `api.ollama.com` com nível gratuito de "uso leve"; use o prefixo `ollamacloud/<model>`
- **Combos somente gratuitos** — Cadeia `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = US$ 0/mês com tempo de inatividade zero
- **NVIDIA NIM Free Access** — ~40 RPM de acesso gratuito para desenvolvedores para sempre a mais de 70 modelos em build.nvidia.com (transição de créditos para limites de taxa pura)
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

- **Disjuntor por modelo** — Abertura/fechamento automático com limites configuráveis e resfriamento (Fechado/Aberto/Meio-aberto), com escopo definido por modelo para evitar bloqueios em cascata
- **Retirada exponencial** — Atrasos progressivos em novas tentativas
- **Rebanho Anti-Trovão** — Proteção Mutex + semáforo contra tempestades de novas tentativas simultâneas
- **Combo Fallback Chains** — Se o provedor primário falhar, ele cairá automaticamente na cadeia sem intervenção
- **Combo Circuit Breaker** — Desativa automaticamente provedores com falha em uma cadeia de combinação
- **Health Dashboard** — Monitoramento de tempo de atividade, estados de disjuntores, bloqueios, estatísticas de cache, latência p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Configurar cada ferramenta de IA é tedioso e repetitivo"</b></summary>

Os desenvolvedores usam Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Cada ferramenta precisa de uma configuração diferente (endpoint da API, chave, modelo). Reconfigurar ao trocar de provedor ou modelo é uma perda de tempo.

**Como o OmniRoute resolve isso:**

- **CLI Tools Dashboard** — Página dedicada com configuração de um clique para Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Gera `chatLanguageModels.json` para código VS com seleção de modelo em massa
- **Assistente de integração** — Configuração guiada em 4 etapas para usuários iniciantes
- **Um endpoint, todos os modelos** — Configure `http://localhost:20128/v1` uma vez, acesse mais de 67 provedores

</details>

<details>
<summary><b>🔑 8. "Gerenciar tokens OAuth de vários provedores é um inferno"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — todos usam OAuth 2.0 com tokens expirados. Os desenvolvedores precisam se autenticar novamente constantemente, lidar com `client_secret is missing`, `redirect_uri_mismatch` e falhas em servidores remotos. OAuth em LAN/VPS é particularmente problemático.

**Como o OmniRoute resolve isso:**

- **Atualização automática de token** — Os tokens OAuth são atualizados em segundo plano antes da expiração
- **OAuth 2.0 (PKCE) integrado ** — Fluxo automático para Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth de várias contas** — Várias contas por provedor por meio de extração de token JWT/ID
- **OAuth LAN/Remote Fix** — Detecção de IP privado para `redirect_uri` + modo URL manual para servidores remotos
- **OAuth por trás do Nginx** — Usa `window.location.origin` para compatibilidade de proxy reverso
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
- **Relatório de informações do sistema** — `npm run system-info` gera `system-info.txt` com seu ambiente completo (versão do nó, versão do OmniRoute, sistema operacional, ferramentas CLI, status do Docker/PM2). Anexe-o ao relatar problemas para triagem instantânea.

</details>

<details>
<summary><b>🏗️ 11. "Implantar e manter o gateway é complexo"</b></summary>

Instalar, configurar e manter um proxy de IA em diferentes ambientes (local, VPS, Docker, nuvem) exige muito trabalho. Problemas como caminhos codificados, `EACCES` em diretórios, conflitos de porta e compilações de plataforma cruzada adicionam atrito.

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
- **Geração de imagens** — `/v1/images/generations` com 10 provedores e mais de 20 modelos (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Texto para vídeo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) e SD WebUI
- **Texto para música** — `/v1/music/generations` — ComfyUI (áudio estável aberto, MusicGen)
- **Transcrição de áudio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Conversão de texto em fala** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + provedores existentes
- **Moderações** — `/v1/moderations` — Verificações de segurança de conteúdo
- **Reclassificação** — `/v1/rerank` — Reclassificação da relevância do documento
- **API de respostas** — Suporte completo a `/v1/responses` para Codex

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
- **Wildcard Router** — `provider/*` padrões roteiam dinamicamente para qualquer provedor
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

- Cartão do Agente exposto em `/.well-known/agent.json`
- Capacidades e habilidades mostradas na UI de gerenciamento
- A API de status A2A inclui metadados de descoberta para automação

</details>

<details>
<summary><b>🧭 26. "Preciso de descoberta de protocolo na UX do produto"</b></summary>

Se os usuários não conseguirem descobrir superfícies de protocolo, a adoção e a qualidade do suporte cairão.

**Como o OmniRoute resolve isso:**

- Página **Endpoints** consolidada com guias para Proxy, MCP, A2A e API Endpoints
- Alterna o status do serviço inline (Online/Offline) para MCP e A2A
- Links da visão geral para guias de gerenciamento dedicadas

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
<summary><b>🚀 30. "Preciso enviar fluxos de trabalho de agente sem expansão de código cola"</b></summary>

As equipes perdem velocidade ao unir vários serviços e scripts ad-hoc.

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Comece de Graça — Custo Zero de Configuração

> Configure a codificação de IA em minutos por **$0/mês**. Conecte essas contas gratuitas e use o combo **Free Stack** integrado.

| Etapa | Ação                                               | Provedores desbloqueados                                           |
| ----- | -------------------------------------------------- | ------------------------------------------------------------------ |
| 1     | Conectar **Kiro** (ID do AWS Builder OAuth)        | Claude Soneto 4.5, Haiku 4.5 — **ilimitado**                       |
| 2     | Conecte **iFlow** (Google OAuth)                   | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **ilimitado** |
| 3     | Conecte **Qwen** (código do dispositivo)           | qwen3-coder-plus, qwen3-coder-flash... — **ilimitado**             |
| 4     | Conecte **Gemini CLI** (Google OAuth)              | gemini-3-flash, gemini-2.5-pro — **180K/mês grátis**               |
| 5     | `/dashboard/combos` → **Pilha grátis ($0)** modelo | Round-robin todos os provedores gratuitos automaticamente          |

**Aponte qualquer IDE/CLI para:** `http://localhost:20128/v1` · Chave API: `any-string` · Concluído.

> **Cobertura extra opcional (também gratuita):** Chave de API Groq (30 RPM grátis), NVIDIA NIM (40 RPM grátis, modelos com mais de 70), Cerebras (1 milhão de tok/dia), chave de API LongCat (50 milhões de tokens/dia!), Cloudflare Workers AI (10 mil neurônios/dia, mais de 50 modelos).

## ⚡ Início rápido

### 1) Instale e execute

```bash
npm install -g omniroute
omniroute
```

> **usuários pnpm:** Execute `pnpm approve-builds -g` após a instalação para ativar scripts de construção nativos exigidos por `better-sqlite3` e `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

O painel abre em `http://localhost:20128` e o URL base da API é `http://localhost:20128/v1`.

| Comando                 | Descrição                                                       |
| ----------------------- | --------------------------------------------------------------- |
| `omniroute`             | Iniciar servidor (`PORT=20128`, API e dashboard na mesma porta) |
| `omniroute --port 3000` | Defina a porta canônica/API como 3000                           |
| `omniroute --mcp`       | Inicie o servidor MCP (transporte stdio)                        |
| `omniroute --no-open`   | Não abra o navegador automaticamente                            |
| `omniroute --help`      | Mostrar ajuda                                                   |

Modo de porta dividida opcional:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Conecte provedores e crie sua chave API

1. Abra Dashboard → `Providers` e conecte pelo menos um provedor (OAuth ou chave API).
2. Abra Dashboard → `Endpoints` e crie uma chave API.
3. (Opcional) Abra Dashboard → `Combos` e defina sua cadeia de fallback.

### 3) Aponte sua ferramenta de codificação para OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Funciona com Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode e SDKs compatíveis com OpenAI.

### 4) Habilitar e validar protocolos (v2.0)

**MCP (para operações orientadas por ferramentas):**

```bash
omniroute --mcp
```

Em seguida, conecte seu cliente MCP em `stdio` e teste ferramentas como:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (para fluxos de trabalho entre agentes):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Valide tudo de ponta a ponta (recomendado)

```bash
npm run test:protocols:e2e
```

Este conjunto valida fluxos reais de clientes MCP e A2A em um aplicativo em execução.

### Alternativa: executar a partir da fonte

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
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

## 🖥️ Aplicativo de desktop – off-line e sempre ativo

> 🆕 **NOVO!** OmniRoute agora está disponível como um **aplicativo de desktop nativo** para Windows, macOS e Linux.

Execute o OmniRoute como um aplicativo de desktop independente — sem terminal, sem navegador, sem necessidade de internet para modelos locais. O aplicativo baseado em Electron inclui:

- 🖥️ **Janela Nativa** — Janela de aplicativo dedicada com integração na bandeja do sistema
- 🔄 **Início automático** — Inicie o OmniRoute no login do sistema
- 🔔 **Notificações nativas** — Receba alertas sobre esgotamento de cota ou problemas com o provedor
- ⚡ **Instalação com um clique** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Modo offline** — Funciona totalmente offline com servidor incluído

### Início rápido

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Bandeja do sistema

Quando minimizado, o OmniRoute fica na bandeja do sistema com ações rápidas:

- Abra o painel
- Alterar porta do servidor
- Sair do aplicativo

📖 Documentação completa: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Visão geral dos preços

| Nível               | Provedor                              | Custo                                  | Redefinição de cota      | Melhor para                                     |
| ------------------- | ------------------------------------- | -------------------------------------- | ------------------------ | ----------------------------------------------- |
| **💳 ASSINATURA**   | Código Claude (Pro)                   | $ 20/mês                               | 5h + semanalmente        | Já inscrito                                     |
|                     | Códice (Plus/Pro)                     | US$ 20-200/mês                         | 5h + semanalmente        | Usuários OpenAI                                 |
|                     | Gêmeos CLI                            | **GRÁTIS**                             | 180 mil/mês + 1 mil/dia  | Todos!                                          |
|                     | Copiloto GitHub                       | US$ 10-19/mês                          | Mensalmente              | Usuários do GitHub                              |
| **🔑 CHAVE DE API** | NVIDIA NIM                            | **GRÁTIS** (desenvolvedor para sempre) | ~40RPM                   | Mais de 70 modelos abertos                      |
|                     | Cérebros                              | **GRÁTIS** (1 milhão de tok/dia)       | 60KTPM/30RPM             | O mais rápido do mundo                          |
|                     | Groq                                  | **GRÁTIS** (30 RPM)                    | RPD de 14,4K             | Lhama/Gemma ultrarrápida                        |
|                     | DeepSeek V3.2                         | US$ 0,27/US$ 1,10 por 1 milhão         | Nenhum                   | Melhor raciocínio preço/qualidade               |
|                     | xAI Grok-4 Rápido                     | **$0,20/$0,50 por 1 milhão** 🆕        | Nenhum                   | Chamada de ferramenta mais rápida +, ultrabaixa |
|                     | xAI Grok-4 (padrão)                   | US$ 0,20/US$ 1,50 por 1 milhão 🆕      | Nenhum                   | Carro-chefe do raciocínio da xAI                |
|                     | Mistral                               | Teste grátis + pago                    | Taxa limitada            | IA Europeia                                     |
|                     | OpenRouter                            | Pagamento conforme uso                 | Nenhum                   | Mais de 100 modelos no total.                   |
| **💰 BARATO**       | GLM-5 (via Z.AI) 🆕                   | US$ 0,5/1 milhão                       | Diariamente 10h          | Saída de 128K, o mais novo carro-chefe          |
|                     | GLM-4.7                               | US$ 0,6/1 milhão                       | Diariamente 10h          | Backup de orçamento                             |
|                     | MiniMax M2.5 🆕                       | Entrada de US$ 0,3/1 milhão            | Rolamento de 5 horas     | Raciocínio + tarefas de agência                 |
|                     | MiniMax M2.1                          | US$ 0,2/1 milhão                       | Rolamento de 5 horas     | Opção mais barata                               |
|                     | Kimi K2.5 (API Moonshot) 🆕           | Pagamento conforme uso                 | Nenhum                   | Acesso direto à API Moonshot                    |
|                     | Kimi K2                               | $ 9 / mês fixo                         | 10 milhões de tokens/mês | Custo previsível                                |
| **🆓 GRÁTIS**       | iFlow                                 | **$0**                                 | Ilimitado                | 5 modelos ilimitados                            |
|                     | Qwen                                  | **$0**                                 | Ilimitado                | 4 modelos ilimitados                            |
|                     | Kiro                                  | **$0**                                 | Ilimitado                | Claude Sonnet/Haiku (Construtor AWS)            |
|                     | LongCat Flash Lite 🆕                 | **$0** (50 milhões de dólares/dia 🔥)  | 1RPS                     | Maior cota gratuita do planeta                  |
|                     | Polinizações AI 🆕                    | **$0** (sem necessidade de chave)      | 1 necessidade/15s        | GPT-5, Claude, DeepSeek, Lhama 4                |
|                     | IA dos trabalhadores da Cloudflare 🆕 | **$0** (10 mil neurônios/dia)          | ~150 resp/dia            | Mais de 50 modelos, vantagem global             |
|                     | IA Scaleway 🆕                        | **$0** (total de 1 milhão de tokens)   | Taxa limitada            | UE/GDPR, Qwen3 235B, Llama 70B                  |

> 🆕 **Novos modelos adicionados (março de 2026):** Família Grok-4 Fast a US$ 0,20/US$ 0,50/M (comparado em 1143ms — 30% mais rápido que Gemini 2.5 Flash), GLM-5 via Z.AI com saída de 128K, raciocínio MiniMax M2.5, preço atualizado DeepSeek V3.2, Kimi K2.5 via API direta Moonshot.

**💡 Pilha Combo de $0 — A configuração gratuita completa:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**Custo zero. Nunca para de codificar.** Configure isso como um combo OmniRoute e todos os fallbacks acontecem automaticamente - nunca há troca manual.

---

---

## 🆓 Modelos gratuitos – O que você realmente obtém

> Todos os modelos abaixo são **100% gratuitos, sem necessidade de cartão de crédito**. OmniRoute roteia automaticamente entre eles quando uma cota acaba – combine todos eles para um combo inquebrável de $ 0.

### 🔵 MODELOS CLAUDE (via Kiro — AWS Builder ID)

| Modelo              | Prefixo | Limite        | Limite de taxa                  |
| ------------------- | ------- | ------------- | ------------------------------- |
| `claude-sonnet-4.5` | `kr/`   | **Ilimitado** | Nenhum limite diário comunicado |
| `claude-haiku-4.5`  | `kr/`   | **Ilimitado** | Nenhum limite diário comunicado |
| `claude-opus-4.6`   | `kr/`   | **Ilimitado** | Último Opus via Kiro            |

### 🟢 MODELOS IFLOW (OAuth grátis — sem cartão de crédito)

| Modelo             | Prefixo | Limite        | Limite de taxa                  |
| ------------------ | ------- | ------------- | ------------------------------- |
| `kimi-k2-thinking` | `if/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `qwen3-coder-plus` | `if/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `deepseek-r1`      | `if/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `minimax-m2.1`     | `if/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `kimi-k2`          | `if/`   | **Ilimitado** | Nenhum limite máximo comunicado |

### 🟡 MODELOS QWEN (autenticação do código do dispositivo)

| Modelo              | Prefixo | Limite        | Limite de taxa                  |
| ------------------- | ------- | ------------- | ------------------------------- |
| `qwen3-coder-plus`  | `qw/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `qwen3-coder-flash` | `qw/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `qwen3-coder-next`  | `qw/`   | **Ilimitado** | Nenhum limite máximo comunicado |
| `vision-model`      | `qw/`   | **Ilimitado** | Multimodal (imagens)            |

### 🟣 CLI GEMINI (Google OAuth)

| Modelo                   | Prefixo | Limite                           | Limite de taxa     |
| ------------------------ | ------- | -------------------------------- | ------------------ |
| `gemini-3-flash-preview` | `gc/`   | **180 mil tok/mês** + 1 mil/dia  | Redefinição mensal |
| `gemini-2.5-pro`         | `gc/`   | 180 mil/mês (pool compartilhado) | Alta qualidade     |

### ⚫ NVIDIA NIM (chave de API gratuita — build.nvidia.com)

| Nível                  | Limite Diário       | Limite de taxa | Notas                                                                       |
| ---------------------- | ------------------- | -------------- | --------------------------------------------------------------------------- |
| Grátis (Desenvolvedor) | Sem limite de token | **~40RPM**     | Mais de 70 modelos; transição para limites de taxas puras em meados de 2025 |

Modelos gratuitos populares: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (chave de API gratuita — inference.cerebras.ai)

| Nível  | Limite Diário              | Limite de taxa | Notas                                                       |
| ------ | -------------------------- | -------------- | ----------------------------------------------------------- |
| Grátis | **1 milhão de tokens/dia** | 60KTPM/30RPM   | A inferência LLM mais rápida do mundo; reinicia diariamente |

Disponível gratuitamente: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (chave de API gratuita — console.groq.com)

| Nível  | Limite Diário    | Limite de taxa    | Notas                                              |
| ------ | ---------------- | ----------------- | -------------------------------------------------- |
| Grátis | **RPD de 14,4K** | 30 RPM por modelo | Sem cartão de crédito; 429 no limite, sem cobrança |

Disponível gratuitamente: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (chave de API gratuita — longcat.chat) 🆕

| Modelo                        | Prefixo | Cota diária gratuita        | Notas                                  |
| ----------------------------- | ------- | --------------------------- | -------------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`   | **50 milhões de tokens** 💥 | Maior cota gratuita de todos os tempos |
| `LongCat-Flash-Chat`          | `lc/`   | 500 mil tokens              | Bate-papo multiturno                   |
| `LongCat-Flash-Thinking`      | `lc/`   | 500 mil tokens              | Raciocínio / CoT                       |
| `LongCat-Flash-Thinking-2601` | `lc/`   | 500 mil tokens              | Versão de janeiro de 2026              |
| `LongCat-Flash-Omni-2603`     | `lc/`   | 500 mil tokens              | Multimodal                             |

> 100% gratuito durante a versão beta pública. Inscreva-se em [longcat.chat](https://longcat.chat) com e-mail ou telefone. Reinicia diariamente às 00:00 UTC.

### 🟢 POLINIZAÇÕES AI (nenhuma chave de API necessária) 🆕

| Modelo     | Prefixo | Limite de taxa    | Provedor por trás    |
| ---------- | ------- | ----------------- | -------------------- |
| `openai`   | `pol/`  | 1 necessidade/15s | GPT-5                |
| `claude`   | `pol/`  | 1 necessidade/15s | Claude Antrópico     |
| `gemini`   | `pol/`  | 1 necessidade/15s | Google Gêmeos        |
| `deepseek` | `pol/`  | 1 necessidade/15s | DeepSeek V3          |
| `llama`    | `pol/`  | 1 necessidade/15s | Batedor Meta Lhama 4 |
| `mistral`  | `pol/`  | 1 necessidade/15s | IA Mistral           |

> ✨ **Atrito zero:** Sem inscrição, sem chave de API. Adicione o provedor Polinizações com um campo-chave vazio e ele funcionará imediatamente.

### 🟠 CLOUDFLARE WORKERS AI (chave de API gratuita — cloudflare.com) 🆕

| Nível  | Neurônios Diários | Uso equivalente                                   | Notas                               |
| ------ | ----------------- | ------------------------------------------------- | ----------------------------------- |
| Grátis | **10.000**        | ~150 LLM resp / áudio 500s / incorporações de 15K | Vantagem global, mais de 50 modelos |

Modelos gratuitos populares: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (áudio grátis!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Requer token de API + ID da conta de [dash.cloudflare.com](https://dash.cloudflare.com). Armazene o ID da conta nas configurações do provedor.

### 🟣 SCALEWAY AI (1 milhão de tokens grátis — scaleway.com) 🆕

| Nível  | Cota Grátis            | Localização  | Notas                                                 |
| ------ | ---------------------- | ------------ | ----------------------------------------------------- |
| Grátis | **1 milhão de tokens** | 🇫🇷 Paris, UE | Não é necessário cartão de crédito dentro dos limites |

Disponível gratuitamente: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Compatível com UE/GDPR. Obtenha a chave API em [console.scaleway.com](https://console.scaleway.com).

> **💡 The Ultimate Free Stack (11 provedores, $ 0 para sempre): **
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Combo de transcrição grátis

> Transcreva qualquer áudio/vídeo por **$0** — Deepgram lidera com $200 grátis, AssemblyAI $50 substituto, Groq Whisper como backup de emergência ilimitado.

| Provedor          | Créditos Grátis             | Melhor Modelo                                  | Limite de taxa                          |
| ----------------- | --------------------------- | ---------------------------------------------- | --------------------------------------- |
| 🟢 **Deepgram**   | **$200 grátis** (inscrição) | `nova-3` — melhor precisão, mais de 30 idiomas | Sem limite de RPM em créditos gratuitos |
| 🔵 **AssemblyAI** | **$50 grátis** (inscrição)  | `universal-3-pro` — capítulos, sentimento, PII | Sem limite de RPM em créditos gratuitos |
| 🔴 **Groque**     | **Grátis para sempre**      | `whisper-large-v3` — Sussurro OpenAI           | 30 RPM (taxa limitada)                  |

**Combo sugerido em `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Em seguida, em `/dashboard/media` → guia **Transcrição**: carregue qualquer arquivo de áudio ou vídeo → selecione seu endpoint de combinação → obtenha a transcrição em formatos suportados.

## 💡 Principais recursos

OmniRoute v2.0 é construído como uma plataforma operacional, não apenas um proxy de retransmissão.

### 🆕 Novo — Melhorias inspiradas no ClawRouter (março de 2026)

| Recurso                                  | O que faz                                                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Família Rápida**             | Modelos xAI por US$ 0,20/US$ 0,50/M – benchmark de 1143 ms (30% mais rápido que Gemini 2.5 Flash)               |
| 🧠 **GLM-5 via Z.AI**                    | Contexto de saída de 128K, US$ 0,5/1 milhão – o mais novo carro-chefe da família GLM                            |
| 🔮 **MiniMax M2.5**                      | Raciocínio + tarefas de agência por US$ 0,30/1 milhão — atualização significativa do M2.1                       |
| 🎯 **toolCalling Flag por modelo**       | Por modelo `toolCalling: true/false` no registro - AutoCombo ignora modelos sem capacidade de ferramenta        |
| 🌍 **Detecção de intenção multilíngue**  | Palavras-chave PT/ZH/ES/AR na pontuação AutoCombo — melhor seleção de modelos para conteúdo diferente do inglês |
| 📊 **Recursos baseados em benchmarks**   | Latência p95 real de solicitações ao vivo alimenta pontuação combinada – AutoCombo aprende com dados reais      |
| 🔁 **Solicitar desduplicação**           | Janela de desduplicação baseada em hash de conteúdo — segura para vários agentes, evita cobranças duplicadas    |
| 🔌 **Estratégia de roteador conectável** | Interface `RouterStrategy` extensível — adicione lógica de roteamento personalizada como plug-ins               |

### 🚀 Anterior v2.0.9+ — Playground, impressões digitais CLI e ACP

| Recurso                                               | O que faz                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Parque Modelo**                                  | Página do painel para testar qualquer modelo diretamente - seletores de provedor/modelo/endpoint, Monaco Editor, streaming, aborto, tempo                                                                                                                                                                         |
| 🔏 **Correspondência de impressão digital CLI**       | Ordenação de cabeçalho/corpo por provedor para corresponder às assinaturas CLI nativas — alterne por provedor em Configurações > Segurança. **Seu IP proxy é preservado**                                                                                                                                         |
| 🤝 **Suporte ACP (Protocolo Agente Cliente)**         | Descoberta de agente CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + mais 9), gerador de processo, endpoint `/api/acp/agents`                                                                                                                                                                                   |
| 🤖 **Painel de Agentes ACP**                          | Depurar › Página Agentes — grade de 14 agentes com status de instalação, versão, formulário de agente personalizado para qualquer ferramenta CLI. Os usuários do **OpenCode** recebem um botão "Baixar opencode.json" que gera automaticamente uma configuração pronta para uso com todos os modelos disponíveis. |
| 🔧 **Roteamento de modelo personalizado `apiFormat`** | Modelos personalizados com `apiFormat: "responses"` agora roteiam corretamente para o tradutor da API de respostas                                                                                                                                                                                                |
| 🏢 **Isolamento do espaço de trabalho do Codex**      | Vários espaços de trabalho do Codex por e-mail — OAuth separa corretamente as conexões por ID do espaço de trabalho                                                                                                                                                                                               |
| 🔄 **Atualização automática eletrônica**              | O aplicativo de desktop verifica atualizações + instalação automática ao reiniciar                                                                                                                                                                                                                                |

### 🤖 Operações de agente e protocolo (v2.0)

| Recurso                                                | O que faz                                                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 🔧 **Servidor MCP (16 ferramentas)**                   | Ferramentas IDE/agente por meio de 3 transportes: stdio, SSE (`/api/mcp/sse`), HTTP Streamable (`/api/mcp/stream`)                     |
| 🤝 **Servidor A2A (JSON-RPC + SSE)**                   | Execução de tarefas entre agentes com fluxos de sincronização e streaming                                                              |
| 🧭 **Página de endpoints consolidados**                | Página de gerenciamento com guias com guias Endpoint Proxy, MCP, A2A e API Endpoints                                                   |
| 🎚️ **Alternativas de ativação/desativação de serviço** | Chaves ON/OFF para MCP e A2A com persistência de configurações (padrão: OFF)                                                           |
| 🛰️ **Pulsação de tempo de execução do MCP**            | Status real do processo (pid, tempo de atividade, idade da pulsação, transporte, modo de escopo)                                       |
| 📋 **Trilha de auditoria MCP**                         | Logs de auditoria filtráveis ​​com sucesso/falha e atribuição de chave                                                                 |
| 🔐 **Aplicação do escopo do MCP**                      | 9 permissões de escopo granular para acesso controlado a ferramentas                                                                   |
| 📡 **Gerenciamento do ciclo de vida de tarefas A2A**   | Listar/filtrar tarefas, inspecionar eventos/artefatos, cancelar tarefas em execução                                                    |
| 📋 **Descoberta de cartão de agente**                  | `/.well-known/agent.json` para descoberta automática de cliente                                                                        |
| 🧪 **Arnês de teste do protocolo E2E**                 | Fluxos reais de cliente MCP SDK + A2A em `test:protocols:e2e`                                                                          |
| ⚙️ **Controles operacionais**                          | Combinação de interruptores, aplicação de perfis de resiliência, reinicialização de disjuntores a partir de uma superfície de controle |

### 🧠 Roteamento e Inteligência

| Recurso                                                     | O que faz                                                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 🎯 **Fullback inteligente de 4 camadas**                    | Roteamento automático: Assinatura → Chave de API → Barato → Grátis                    |
| 📊 **Acompanhamento de cotas em tempo real**                | Contagem de tokens ativos + contagem regressiva redefinida por provedor               |
| 🔄 **Tradução de formato**                                  | OpenAI ↔ Claude ↔ Gemini ↔ Respostas com conversões seguras de esquema                |
| 👥 **Suporte para múltiplas contas**                        | Múltiplas contas por provedor com seleção inteligente                                 |
| 🔄 **Atualização automática de token**                      | Os tokens OAuth são atualizados automaticamente com nova tentativa                    |
| 🎨 **Combos Personalizados**                                | 6 estratégias de balanceamento + controle da cadeia de fallback                       |
| 🌐 **Roteador curinga**                                     | `provider/*` roteamento dinâmico                                                      |
| 🧠 **Pensando em controles de orçamento**                   | Limites de raciocínio de passagem, automático, personalizado e adaptativo             |
| 🔀 **Alases de modelo**                                     | Aliasing de modelo integrado + personalizado e segurança de migração                  |
| ⚡ **Degradação de fundo**                                  | Encaminhar tarefas em segundo plano de baixa prioridade para modelos mais baratos     |
| 🧪 **Roteamento inteligente com reconhecimento de tarefas** | Seleção automática de modelo por tipo de conteúdo (codificação/visão/análise/resumo)  |
| 💬 **Injeção imediata do sistema**                          | Controles de comportamento globais aplicados de forma consistente                     |
| 📄 **Compatibilidade da API de respostas**                  | Suporte completo `/v1/responses` para Codex e fluxos de trabalho de agência avançados |

### 🎵 APIs multimodais

| Recurso                           | O que faz                                                                                                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Geração de imagens**         | `/v1/images/generations` com nuvem e back-ends locais                                                                                                                               |
| 📐 **Incorporações**              | `/v1/embeddings` para pipelines de pesquisa e RAG                                                                                                                                   |
| 🎤 **Transcrição de áudio**       | `/v1/audio/transcriptions` — 7 provedores (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), detecção automática de idioma, suporte a MP4/MP3/WAV |
| 🔊 **Conversão de texto em fala** | `/v1/audio/speech` — 10 provedores (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) com mensagens de erro corretas               |
| 🎬 **Geração de Vídeo**           | `/v1/videos/generations` (fluxos de trabalho ComfyUI + SD WebUI)                                                                                                                    |
| 🎵 **Geração Musical**            | `/v1/music/generations` (fluxos de trabalho ComfyUI)                                                                                                                                |
| 🛡️ **Moderações**                 | `/v1/moderations` verificações de segurança                                                                                                                                         |
| 🔀 **Reclassificação**            | `/v1/rerank` para pontuação de relevância                                                                                                                                           |
| 🔍 **Pesquisa na Web** 🆕         | `/v1/search` — 5 provedores (Serper, Brave, Perplexity, Exa, Tavily), mais de 6.500 grátis/mês, failover automático, cache                                                          |

### 🛡️ Resiliência, Segurança e Governança

| Recurso                                         | O que faz                                                                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 🔌 **Disjuntores**                              | Acionamento/recuperação por modelo com controles de limite                                                             |
| 🎯 **Modelos com reconhecimento de endpoint**   | Modelos personalizados declaram endpoints suportados + formato API                                                     |
| 🛡️ **Rebanho Anti-Trovão**                      | Proteções Mutex + semáforo em eventos de nova tentativa/taxa                                                           |
| 🧠 **Semântica + Cache de Assinatura**          | Redução de custo/latência com duas camadas de cache                                                                    |
| ⚡ **Solicitar Idempotência**                   | Janela de proteção duplicada                                                                                           |
| 🔒 **Falsificação de impressão digital TLS**    | Impressão digital TLS semelhante a navegador — **reduz a detecção de bots e a sinalização de contas**                  |
| 🔏 **Correspondência de impressão digital CLI** | Corresponde às assinaturas de solicitação CLI nativas — **reduz o risco de banimento enquanto preserva o IP do proxy** |
| 🌐 **Filtragem de IP**                          | Controle de lista de permissões/lista de bloqueio para implantações expostas                                           |
| 📊 **Limites de taxas editáveis**               | Limites configuráveis ​​em nível global/de provedor com persistência                                                   |
| 🔑 **Gerenciamento de chaves de API + escopo**  | Emissão/rotação segura de chaves e controles de modelo/provedor                                                        |
| 🛡️ **Protegido `/models`**                      | Autenticação opcional e ocultação de provedor para catálogo de modelos                                                 |

### 📊 Observabilidade e análise

| Recurso                                | O que faz                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| 📝 **Solicitação + Registro de Proxy** | Solicitação/resposta completa e registro de proxy                            |
| 📋 **Painel de registros unificado**   | Visualizações de solicitação, proxy, auditoria e console em uma página       |
| 🔍 **Solicitar Telemetria**            | Latência p50/p95/p99 e rastreamento de solicitação                           |
| 🏥 **Painel de saúde**                 | Tempo de atividade, estados de disjuntores, bloqueios, estatísticas de cache |
| 💰 **Acompanhamento de custos**        | Controles de orçamento e visibilidade de preços por modelo                   |
| 📈 **Visualizações analíticas**        | Insights de uso de modelo/provedor e visualizações de tendências             |
| 🧪 **Estrutura de Avaliação**          | Teste de Golden Set com estratégias de jogo configuráveis ​​                 |

### ☁️ Implantação e plataforma

| Recurso                                 | O que faz                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| 🌐 **Implante em qualquer lugar**       | Ambientes Localhost, VPS, Docker, Cloud                                        |
| 💾 **Sincronização na nuvem**           | Sincronização de configuração via Cloud Worker                                 |
| 🔄 **Backup/Restauração**               | Fluxos de exportação/importação e recuperação de desastres                     |
| 🧙 **Assistente de integração**         | Configuração guiada na primeira execução                                       |
| 🔧 **Painel de Ferramentas CLI**        | Configuração com um clique para ferramentas de codificação populares           |
| 🎮 **Parque Modelo**                    | Teste qualquer provedor/modelo/endpoint no painel                              |
| 🔏 **Alternar impressão digital CLI**   | Correspondência de impressão digital por provedor em Configurações > Segurança |
| 🌐 **i18n (30 idiomas)**                | Painel completo + suporte a idiomas de documentos com cobertura RTL            |
| 🧹 **Limpar todos os modelos**          | Limpeza da lista de modelos com um clique nos detalhes do provedor             |
| 📋 **Modelos de problemas**             | Modelos padronizados do GitHub para bugs e recursos                            |
| 📂 **Diretório de dados personalizado** | Substituição de `DATA_DIR` para local de armazenamento                         |

### Aprofundamento do recurso

#### Fallback inteligente com controle prático de custos

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Quando a cota, a taxa ou a integridade falham, o OmniRoute passa automaticamente para o próximo candidato sem alternância manual.

#### Gerenciamento de protocolo visível e operável

- MCP + A2A podem ser descobertos na interface do usuário e nos documentos (não ocultos)
- APIs de status de protocolo expõem dados operacionais em tempo real (`/api/mcp/*`, `/api/a2a/*`)
- Os painéis incluem ações para operações do dia 2 (alternâncias de combinação, reinicializações de disjuntores, cancelamento de tarefas)

#### Tradutor + fluxo de trabalho de validação

A área do Tradutor inclui:

- **Playground**: solicita verificações de transformação
- **Testador de bate-papo**: solicitação/resposta completa, ida e volta
- **Banco de testes**: vários casos em uma execução
- **Monitoramento ao vivo**: visualização do tráfego em tempo real

Além de validação de protocolo com clientes reais via `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Referência de ferramentas, configurações de IDE e exemplos de clientes
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Habilidades, métodos JSON-RPC, streaming e ciclo de vida de tarefas

## 🧪 Avaliações (Evals)

OmniRoute inclui uma estrutura de avaliação integrada para testar a qualidade da resposta do LLM em relação a um conjunto dourado. Acesse-o em **Analytics → Evals** no painel.

### Conjunto Dourado Integrado

O "OmniRoute Golden Set" pré-carregado contém casos de teste para:

- Saudações, matemática, geografia, geração de código
- Conformidade com o formato JSON, tradução, geração de descontos
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

### Configuração do protocolo (MCP + A2A)

<details>
<summary><b>🧩 Configuração MCP (protocolo de contexto do modelo)</b></summary>

Inicie o transporte MCP no modo stdio:

```bash
omniroute --mcp
```

Fluxo de validação recomendado:

1. Conecte seu cliente MCP por stdio.
2. Execute `omniroute_get_health`.
3. Execute `omniroute_list_combos`.
4. Abra `/dashboard/mcp` para confirmar pulsação, atividade e auditoria.

APIs úteis para automação:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Configuração A2A (Agente2Agente)</b></summary>

Conheça o agente:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Envie uma tarefa:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Gerenciar ciclo de vida:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

IU operacional:

- `/dashboard/a2a` para observabilidade de tarefa/estado/fluxo e ações de fumaça

</details>

<details>
<summary><b>🧪 Validação de protocolo ponta a ponta</b></summary>

Valide ambos os protocolos com clientes reais:

```bash
npm run test:protocols:e2e
```

Isso verifica:

- Conexão/lista/chamada do cliente MCP SDK
- Descoberta A2A/enviar/transmitir/obter/cancelar
- Verificação cruzada de dados em APIs de auditoria MCP e gerenciamento de tarefas A2A

</details>

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

#### Gerenciamento de limite de conta Codex (5h + semanalmente)

Cada conta do Codex agora possui opções de política em `Dashboard -> Providers`:

- `5h` (ON/OFF): impõe a política de limite de janela de 5 horas.
- `Weekly` (ON/OFF): impõe a política de limite de janela semanal.
- Comportamento do limite: quando uma janela habilitada atinge >=90% de uso, essa conta é ignorada.
- Comportamento de rotação: OmniRoute roteia automaticamente para a próxima conta Codex qualificada.
- Comportamento de redefinição: quando o tempo `resetAt` do provedor passar, a conta se tornará elegível novamente automaticamente.

Cenários:

- `5h ON` + `Weekly ON`: a conta é ignorada quando uma das janelas atinge o limite.
- `5h OFF` + `Weekly ON`: somente o uso semanal pode bloquear a conta.
- `5h ON` + `Weekly OFF`: apenas o uso de 5 horas pode bloquear a conta.
- `resetAt` aprovado: a conta entra novamente na rotação automaticamente (sem reativação manual).

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

### NVIDIA NIM (acesso GRATUITO para desenvolvedores – mais de 70 modelos)

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

### iFlow (5 modelos GRATUITOS via OAuth)

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

### Qwen (4 modelos GRATUITOS via código do dispositivo)

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

### OpenCode

**Etapa 1:** Adicione OmniRoute como um provedor personalizado:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Etapa 2:** Crie/edite `opencode.json` na raiz do seu projeto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Etapa 3:** Selecione o modelo no OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Dica:** Adicione qualquer modelo disponível no endpoint `/v1/models` do OmniRoute à seção `models`. Use o formato `provider/model-id` do painel do OmniRoute.

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

**As portas do painel/API estão erradas**

- `PORT` é a porta base canônica (e porta API por padrão)
- `API_PORT` substitui apenas o ouvinte de API compatível com OpenAI
- `DASHBOARD_PORT` substitui apenas o ouvinte dashboard/Next.js
- Defina `NEXT_PUBLIC_BASE_URL` para seu painel/URL público (para retornos de chamada OAuth)

**Erros de sincronização na nuvem**

- Verifique `BASE_URL` pontos para sua instância em execução
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

### 🔐 OAuth em um servidor remoto

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Importante para usuários executando OmniRoute em um VPS, Docker ou qualquer servidor remoto**

#### Por que o Antigravity / Gemini CLI OAuth falha em servidores remotos?

Os provedores **Antigravity** e **Gemini CLI** usam o **Google OAuth 2.0**. O Google exige que `redirect_uri` no fluxo OAuth corresponda exatamente a um dos URIs pré-registrados no Console do Google Cloud do aplicativo.

As credenciais OAuth incluídas no OmniRoute são registradas **somente para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (por exemplo, `https://omniroute.myserver.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Solução: Configure suas próprias credenciais OAuth

Você precisa criar um **ID do cliente OAuth 2.0** no Console do Google Cloud com o URI do seu servidor.

#### Passo a passo

**1. Abra o Console do Google Cloud**

Vá para: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo ID de cliente OAuth 2.0**

- Clique em **"+ Criar credenciais"** → **"ID do cliente OAuth"**
- Tipo de aplicativo: **"Aplicativo Web"**
- Nome: o que você quiser (por exemplo, `OmniRoute Remote`)

**3. Adicionar URIs de redirecionamento autorizados**

No campo **"URIs de redirecionamento autorizados"**, adicione:

```
https://your-server.com/callback
```

> Substitua `your-server.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, por exemplo, `http://45.33.32.156:20128/callback`).

**4. Salve e copie as credenciais**

Após a criação, o Google mostrará o **ID do cliente** e o **Segredo do cliente**.

**5. Definir variáveis de ambiente**

Em seu `.env` (ou variáveis de ambiente Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Reinicie o OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Painel → Provedores → Antigravidade (ou Gemini CLI) → OAuth

O Google agora redirecionará corretamente para `https://your-server.com/callback`.

---

#### Solução temporária (sem credenciais personalizadas)

Se não quiser configurar suas próprias credenciais agora, você ainda pode usar o **fluxo manual de URL**:

1. OmniRoute abre o URL de autorização do Google
2. Após autorização, o Google tenta redirecionar para `localhost` (que falha no servidor remoto)
3. **Copie o URL completo** da barra de endereço do seu navegador (mesmo que a página não carregue)
4. Cole esse URL no campo mostrado no modal de conexão OmniRoute
5. Clique em **"Conectar"**

> Isso funciona porque o código de autorização no URL é válido independentemente de a página de redirecionamento ter sido carregada.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Por que o OAuth do Antigravity / Gemini CLI falha em servidores remotos?

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

</details>

## 🛠️ Pilha de tecnologia

<details>
<summary><b>Clique para expandir os detalhes da pilha de tecnologia</b></summary>

- **Tempo de execução**: Node.js 18–22 LTS (⚠️ Node.js 24+ **não é compatível** — `better-sqlite3` binários nativos são incompatíveis)
- **Idioma**: TypeScript 5.9 — **100% TypeScript** em `src/` e `open-sse/` (zero `any` em módulos principais desde v2.0)
- **Estrutura**: Next.js 16 + React 19 + Tailwind CSS 4
- **Banco de dados**: LowDB (JSON) + SQLite (estado do domínio + logs de proxy + auditoria MCP + decisões de roteamento)
- **Esquemas**: Zod (validação de E/S da ferramenta MCP, contratos de API)
- **Protocolos**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: eventos enviados pelo servidor (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + Chaves de API + Autorização com escopo MCP
- **Testes**: executor de testes Node.js + Vitest (mais de 900 testes incluindo unidade, integração, E2E)
- **CI/CD**: GitHub Actions (publicação automática de npm + Docker Hub no lançamento)
- **Site**: [omniroute.online](https://omniroute.online)
- **Pacote**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliência**: Disjuntor, espera exponencial, rebanho anti-trovão, falsificação de TLS, autocura de combinação automática

</details>

---

## 📖 Documentação

| Documento                                      | Descrição                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| [User Guide](docs/USER_GUIDE.md)               | Provedores, combos, integração CLI, implantação                          |
| [API Reference](docs/API_REFERENCE.md)         | Todos os endpoints com exemplos                                          |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 ferramentas MCP, configurações IDE, clientes Python/TS/Go             |
| [A2A Server](src/lib/a2a/README.md)            | Protocolo JSON-RPC 2.0, habilidades, streaming, gerenciamento de tarefas |
| [Auto-Combo Engine](docs/auto-combo.md)        | Pontuação de 6 fatores, pacotes de modos, autocura                       |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Problemas e soluções comuns                                              |
| [Architecture](docs/ARCHITECTURE.md)           | Arquitetura do sistema e componentes internos                            |
| [Contributing](CONTRIBUTING.md)                | Configuração e diretrizes de desenvolvimento                             |
| [OpenAPI Spec](docs/openapi.yaml)              | Especificação OpenAPI 3.0                                                |
| [Security Policy](SECURITY.md)                 | Relatórios de vulnerabilidades e práticas de segurança                   |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Guia completo: configuração de VM + nginx + Cloudflare                   |
| [Features Gallery](docs/FEATURES.md)           | Tour visual do painel com capturas de tela                               |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Etapas de validação de pré-lançamento                                    |

---

## 🗺️ Roteiro

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

> 📝 Especificações completas de recursos disponíveis em [**OMNI_TOKEN_342**](docs/new-features/) (217 especificações detalhadas)

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
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 História das Estrelas

## Observadores das estrelas ao longo do tempo

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
<!-- Discussões do GitHub habilitadas para perguntas e respostas da comunidade -->
