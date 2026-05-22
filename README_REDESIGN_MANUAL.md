# 📐 Manual de Repaginação do README — OmniRoute

> Documento de trabalho. Analisa o README atual, compara com o 9router e propõe **3 layouts**
> para a parte **acima** de `## 🛠️ Tech Stack`. Não é parte da documentação publicada — pode
> ser apagado depois que o redesign for aplicado.

---

## 0. Escopo do redesign

| Faixa                             | Linhas        | Ação                                                                                                                |
| --------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Topo → fim do Troubleshooting** | **1–1468**    | 🎯 **Redesenhar** (27 seções)                                                                                       |
| `## 🛠️ Tech Stack` em diante      | **1469–1678** | 🔒 **Manter intacto** (Tech Stack, Documentation, Contributors, Star History, StarMapper, Acknowledgments, License) |

Estado atual do alvo: **27 seções / ~1.468 linhas**. O 9router cobre o mesmo terreno em **~7 seções enxutas**.

---

## 1. Diagnóstico — o que está quebrado

### 1.1 Hero sobrecarregado (linhas 1–60)

- **Dois blocos de badges** separados (linhas 9–13 e 41–56): npm, license, node, stars, Trendshift, depois npm version/week/month/year, Docker, electron, license (de novo), contributions, streak, website, whatsapp.
- **Trendshift duplicado**: linha 13 **e** linha 25.
- **Promo AgentRouter gigante** (badge `for-the-badge` + subtítulo "Limited offer") logo no topo — parece anúncio antes de explicar o produto.
- **Mural de 40+ idiomas** (linha 35): uma parede de bandeiras a 35 linhas do topo.
- **Parágrafo-descrição denso** (linha 7) com 6 números em negrito numa só frase — nada "brilha", tudo compete pela atenção.
- **Resultado**: a primeira tela é uma muralha de badges/links/promo. Falta um soco visual de "o que é + por que me importo".

### 1.2 Números inconsistentes (corrói credibilidade)

| Métrica                    | Onde diverge                                                                                           | Valores conflitantes |
| -------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------- |
| **Provedores totais**      | hero (l.7) `160+` · Why (l.214) `207+` · tabela vs alternativas (l.260) `207+` · header (l.406) `160+` | **160+ vs 207+**     |
| **MCP tools / scopes**     | hero/Also-solves `37 tools` · tabela 31 problemas (l.708) `29 tools, 10 scopes`                        | **37/13 vs 29/10**   |
| **Estratégias de routing** | hero (l.7) `13` · tabela Why (l.261) `14`                                                              | **13 vs 14**         |
| **Provedores free**        | "11 Free Providers" (l.689, l.1024) · tabela visual (l.426) mostra `8` · About `50+`                   | **8 vs 11 vs 50+**   |

### 1.3 Conteúdo duplicado / redundante

- **DOIS diagramas de fallback** que até divergem: "Why OmniRoute?" mostra **3 tiers** (l.221–246); "How It Works" mostra **4 tiers** (l.531–555).
- **TRÊS listas de benefícios sobrepostas**: "Why this matters / Also solves" (l.248–289) + "What OmniRoute Solves" (l.680, tabela + 31 problemas) + "Key Features" (l.1091). Dizem quase a mesma coisa três vezes.
- **Compressão mencionada 5×**: hero, "Also solves", diagrama "How It Works", seção dedicada, e "Key Features".

### 1.4 Ordem de seções problemática

- `## 📧 Support` na **linha 292** — cedo demais (antes de mostrar CLI tools, provedores ou features).
- `## ⚡ Quick Start` só na **linha 746** — o dev rola ~745 linhas de marketing antes de descobrir como instalar. Para uma ferramenta de dev, isso é invertido.
- `## 🤖 AI Agent Skills` (l.516) espremida entre Providers e How It Works — quebra o fluxo.

### 1.5 Muros de texto

- **Docker** (l.807–896): parágrafos longos de notas (Cloudflare tunnel, WAL, stop-timeout…) que deveriam estar colapsados.
- **Compressão** (l.559–677): excelente conteúdo, mas longo e técnico demais para a primeira dobra de um README.
- **FAQ** (l.1345–1454, ~110 linhas), **Use Cases** (l.1159–1265, ~106 linhas), **Pricing** (l.980–1021): grandes e abertos.

### 1.6 Tamanho

~1.468 linhas antes do Tech Stack. Meta realista de redução: **‑60% a ‑75%** de conteúdo visível (o resto vai para `<details>` ou links de docs, sem perder nada).

---

## 2. Correções transversais (aplicam-se a QUALQUER layout escolhido)

### 2.1 Fixar números canônicos (escolher um valor e usar em todo lugar)

| Métrica                | Valor canônico recomendado                                     | Observação                                                      |
| ---------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| Provedores totais      | **160+**                                                       | Combina com a About nova e o header da seção. Aposentar `207+`. |
| Provedores free        | **11 grátis "forever" + 50+ com free-tier**                    | Alinhar a tabela visual (hoje 8) e os headers.                  |
| MCP                    | **37 tools · 3 transports · 13 scopes**                        | Corrigir `29 tools / 10 scopes` da tabela dos 31 problemas.     |
| Estratégias de routing | **14**                                                         | Corrigir o `13` do hero.                                        |
| Compressão             | **15–95% (RTK+Caveman stacked), ~89% médio**                   | Já consistente — manter.                                        |
| Provas sociais         | **4.690+ testes · 517 arquivos · 40+ idiomas · 16+ CLI tools** | Manter como credibilidade.                                      |

### 2.2 Deduplicar

- **Um único** diagrama de fallback (unificar os dois; usar 4 tiers: Subscription → API Key → Cheap → Free).
- **Uma única** tabela consolidada de capacidades (fundir "What Solves" + "Key Features" + "Also solves").
- **Um único** Trendshift no hero.

### 2.3 Reordenar

- `Quick Start` sobe para logo após o pitch.
- `Support` desce para o rodapé (logo antes do Tech Stack).
- Niche (Agent Skills, Transcription, Evals) viram `<details>` ou blocos curtos no fim.

### 2.4 Persuasão honesta (promessas que cumprimos)

Manter o tom vendedor, mas toda afirmação ancorada: "never hit limits" → justificado pelo **auto-fallback**; "save up to 95%" → é o teto do **stacked**, citar a média ~89%; "unlimited FREE" → é o que Kiro/Qoder/Qwen oferecem hoje (datado). Evitar superlativos sem lastro.

---

## 3. Princípios de design

**Do 9router (o que copiar):** hero curtíssimo (logo + 1 tagline + 1 linha "conecte X → Y" + 5 badges + nav); bloco `❌ problema / ✅ solução` escaneável; **um** diagrama; Quick Start em 3 passos logo no início.

**Nossa vantagem (o que destacar, e o 9router não tem):** 160+ provedores (vs 40+) · RTK **+ Caveman stacked** 15–95% (vs RTK 20–40%) · MCP (37 tools) · A2A · Memory · Skills · Guardrails · Evals · 14 estratégias · multi-plataforma (Web/Desktop/Termux/PWA) · 40+ idiomas · TLS stealth · cloud agents.

---

## 4. Os 3 layouts propostos

### 🅰️ Layout A — Minimalista / Dev-first

**Filosofia:** chegar a valor + instalação no menor número de linhas. Colapsar agressivamente. Meta **~350–450 linhas**.

```
1. Hero slim (img + título + 1 tagline + 1 linha "conecte X→Y" + 5 badges + nav)
   └─ <details> Badges extras, 40+ idiomas, sponsor AgentRouter
2. 🤔 Why — ❌problema / ✅solução (estilo 9router) + 5 linhas do comparativo
   └─ <details> tabela comparativa completa
3. 🔄 How It Works — UM diagrama de fallback unificado
4. ⚡ Quick Start — 3 passos  └─ <details> Docker/source/Arch/pnpm
5. 🤖 Tools + Providers (grids enxutos)  └─ <details> "+130 provedores"
6. 💡 Capabilities — UMA tabela consolidada  └─ <details> 31 problemas
7. 🗜️ Compressão — tabela + before/after  └─ <details> arquitetura/math
8. 📚 Resto (Pricing, Use Cases, Proxy, Platforms, FAQ…) → <details> ou links docs
```

**Prós:** lê em 1 minuto, dev instala rápido. **Contras:** marketing/visual mais discreto.

---

### 🅱️ Layout B — Vitrine visual / Marketing-first

**Filosofia:** encantar e vender a promessa, depois provar. Landing-page. Meta **~600–700 linhas**.

```
1. Hero visual (screenshot grande + headline-promessa + faixa de 3 stats
   "160+ provedores · 15–95% economia · $0 pra começar" + CTAs)
2. 💥 A Promessa — grid 2×3 de cards (Never hit limits / Save 95% / $0 / Todo tool / 1 endpoint / Self-host)
3. 🤔 Why — ❌/✅
4. 🏆 vs Alternativas — tabela comparativa VISÍVEL (é persuasiva)
5. 🎬 Prova social — vídeos + Trendshift + estrelas no alto
6. 🤖 Funciona com suas ferramentas — grid com ⭐ stars
7. 🌐 160+ provedores — grid visual, free destacado
8. 🗜️ Economize 15–95% — números headline + before/after
9. ⚡ Quick Start — 3 passos
10. 📚 Resto → <details>
```

**Prós:** impressiona, ótimo pra conversão/compartilhamento. **Contras:** mais longo; dev técnico pode achar "vendedor demais".

---

### 🅲 Layout C — Equilibrado / Híbrido ⭐ (recomendado)

**Filosofia:** hero limpo-mas-confiante, caminho rápido ao valor, prova persuasiva, e `<details>` disciplinado. Narrativa: Gancho → Por quê → Prova → Instale → Capacidades → Aprofundamentos (colapsados). Meta **~500–600 linhas**.

```
1. Hero limpo (img + título + 1 tagline + 1 linha "conecte X→Y" + faixa de stats
   + 5 badges + Trendshift único + nav)
   └─ <details> Badges secundários + 40+ idiomas + sponsor
2. 🤔 Why OmniRoute? — ❌/✅ + UM diagrama de 4 tiers
3. 🏆 What sets us apart — top-8 do comparativo  └─ <details> tabela completa
4. ⚡ Quick Start — 3 passos + callout Free Stack  └─ <details> outros métodos
5. 🤖 Works with 16+ tools — grid coding-agents + CLI fundidos
6. 🌐 160+ provedores (50+ free) — OAuth + Free + top API  └─ <details> "+130 mais"
7. ✨ Capabilities — UMA tabela consolidada  └─ <details> 31 problemas
8. 🗜️ Compressão — save 15–95% (tabela + before/after)  └─ <details> arquitetura/math
9. 📦 Platforms & Deploy — Multi-plataforma + Docker condensados  └─ <details> notas
10. 📚 More — Pricing, Use Cases, Proxy, Evals, Free Models, Transcription, FAQ,
    Troubleshooting, Skills, Vídeos → grupos colapsáveis / links docs
11. 📧 Support (movido pro fim)
```

**Prós:** limpo + persuasivo + completo, ~⅓ do tamanho, nada importante perdido (só colapsado). **Contras:** exige mais cuidado de execução que o A.

---

## 5. Recomendação e próximos passos

- **Recomendado: Layout C** — equilibra a clareza do 9router com os nossos diferenciais, sem perder conteúdo (só colapsa).
- Independente da escolha, aplicar **todas** as correções transversais da seção 2 (números canônicos, deduplicação, reordenação).
- Próximo passo: você escolhe o layout; eu reescrevo as linhas 1–1468 do `README.md`, preservando 1469+ intactas, e depois propago para os READMEs traduzidos (`docs/i18n/*`) se desejar.
