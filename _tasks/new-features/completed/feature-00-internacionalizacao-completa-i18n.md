# Feature 88 — Internacionalização Completa (i18n) do OmniRoute

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — 7 idiomas implementados com `react-i18next`  
**Prioridade:** 🟢 Baixa (não impacta funcionalidade core, mas amplia alcance global)  
**Impacto:** Dashboard e UI 100% multilíngue, acessível a usuários de qualquer idioma

---

## Motivação

O OmniRoute atualmente tem **100% de strings hardcoded em inglês** espalhadas por:

| Camada                         | Quantidade                                       | Exemplos                                        |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------------- |
| **Páginas (pages)**            | 25 arquivos                                      | Dashboard, Settings, Providers, Analytics, etc. |
| **Componentes compartilhados** | 48 arquivos                                      | Sidebar, Header, Modal, DataTable, etc.         |
| **Componentes de features**    | ~49 arquivos                                     | Charts, Filters, ProviderLimits, etc.           |
| **Total estimado**             | **~97 arquivos** com strings visíveis ao usuário |

O zero-limit implementa i18n com 7 idiomas (EN, ZH-CN, ID, JA, KO, VI, TH) usando `react-i18next`. Cada idioma é um arquivo JSON com ~200-300 chaves agrupadas por namespace. Para o OmniRoute, que tem um frontend significativamente maior, estimamos **~800-1200 chaves de tradução**.

---

## O que Ganhamos

1. **Alcance global**: Usuários não-anglófonos (PT-BR, ES, ZH, JA, KO, etc.) podem usar o dashboard nativamente
2. **Profissionalismo**: Projetos open-source com i18n atraem mais contribuidores internacionais
3. **Contribuições da comunidade**: Arquivos JSON de tradução são fáceis de contribuir via PR
4. **Preparação para crescimento**: Infraestrutura pronta para adicionar idiomas sob demanda
5. **SEO**: Páginas traduzidas rankeiam melhor em buscas locais

---

## Análise de Tecnologias Disponíveis

### Opção 1: `next-intl` ⭐ **RECOMENDADO**

| Aspecto             | Detalhe                                                           |
| ------------------- | ----------------------------------------------------------------- |
| **Compatibilidade** | Nativo para Next.js App Router (que usamos)                       |
| **Setup**           | Simples, usa middleware do Next.js                                |
| **Formato**         | JSON por idioma                                                   |
| **Feature**         | Suporte a SSR, RSC (React Server Components), plurais, formatação |
| **Routing**         | URL-based (`/pt-BR/dashboard`, `/en/dashboard`) ou cookie-based   |
| **Bundle size**     | ~5KB gzipped                                                      |
| **Popularidade**    | ~3.5k stars, mantido ativamente                                   |

```bash
npm install next-intl
```

**Por que é o melhor para nós:** O OmniRoute usa Next.js App Router. `next-intl` é a solução idiomática — suporta Server Components nativamente sem hydration mismatch, tem integração direta com o middleware de roteamento do Next.js, e suporta tanto URL-based (`/pt-BR/dashboard`) quanto cookie-based locale detection.

---

### Opção 2: `react-i18next` + `i18next`

| Aspecto             | Detalhe                                                   |
| ------------------- | --------------------------------------------------------- |
| **Compatibilidade** | Universal (React puro), usado pelo zero-limit             |
| **Setup**           | Moderado, requer configuração manual de plug-ins para SSR |
| **Formato**         | JSON, YAML, ou PO                                         |
| **Feature**         | Plurais, interpolação, namespaces, lazy-loading           |
| **Routing**         | Não fornece routing — precisa implementar manualmente     |
| **Bundle size**     | ~15KB gzipped (core + react bindings)                     |
| **Popularidade**    | ~9k stars, ecossistema maduro                             |

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

**Prós:** É a mesma lib que o zero-limit usa — podemos copiar a estrutura. Ecossistema imenso com plug-ins para tudo.  
**Contras:** Não é nativo de Next.js App Router — requer workarounds para Server Components. Mais boilerplate.

---

### Opção 3: `next-i18next`

| Aspecto             | Detalhe                        |
| ------------------- | ------------------------------ |
| **Compatibilidade** | Next.js Pages Router ❌        |
| **Status**          | **Deprecated para App Router** |

**Descartado:** Só funciona com Pages Router. O OmniRoute usa App Router.

---

### Opção 4: ICU / `react-intl` (FormatJS)

| Aspecto          | Detalhe                                    |
| ---------------- | ------------------------------------------ |
| **Formato**      | ICU Message Syntax                         |
| **Bundle size**  | ~25KB gzipped                              |
| **Complexidade** | Alta — ICU syntax tem curva de aprendizado |

**Descartado para fase 0:** Overengineering para o nosso caso. Adequado para projetos com pluralização complexa (ex: "1 arquivo" vs "2 arquivos" vs "0 arquivos" em polonês). Para EN/PT-BR, `next-intl` resolve nativamente.

---

## Recomendação: `next-intl`

### Veredito

| Critério                           | `next-intl`       | `react-i18next` |
| ---------------------------------- | ----------------- | --------------- |
| Compatibilidade Next.js App Router | ✅ Nativo         | ⚠️ Workarounds  |
| Server Components                  | ✅ Suporte direto | ❌ Client-only  |
| Bundle size                        | ✅ 5KB            | ⚠️ 15KB         |
| Routing automático por idioma      | ✅ Middleware     | ❌ Manual       |
| Comunidade/Ecossistema             | ✅ Forte          | ✅ Maior        |
| Curva de aprendizado               | ✅ Baixa          | ✅ Baixa        |

**`next-intl` vence em todos os critérios relevantes para o nosso stack.**

---

## Estimativa de Esforço

### Escopo Total

| Tarefa                          | Estimativa  | Detalhe                                                 |
| ------------------------------- | ----------- | ------------------------------------------------------- |
| **Fase 1: Infraestrutura**      | 4-6h        | Setup next-intl, middleware, provider, locale detection |
| **Fase 2: Extração de strings** | 12-16h      | Extrair ~800-1200 strings de 97 arquivos para JSON      |
| **Fase 3: Tradução PT-BR**      | 4-6h        | Traduzir EN → PT-BR (manual ou ChatGPT + revisão)       |
| **Fase 4: Idiomas adicionais**  | 2-3h/idioma | Com GPT para draft + revisão humana                     |
| **Fase 5: UI do seletor**       | 2-3h        | Dropdown de idioma no Settings/Header                   |
| **Fase 6: Testes**              | 3-4h        | Verificar que todas as pages renderizam em cada idioma  |
| **Total (EN + PT-BR)**          | **~25-35h** | Para 2 idiomas completos                                |
| **Total (+5 idiomas)**          | **~40-50h** | Para 7 idiomas como o zero-limit                        |

### Complexidade por Área

| Área                         | Strings Est.  | Dificuldade                                 |
| ---------------------------- | ------------- | ------------------------------------------- |
| Sidebar/Header/Nav           | ~30           | 🟢 Fácil                                    |
| Dashboard principal          | ~80           | 🟡 Média (charts, stats labels)             |
| Settings page                | ~60           | 🟢 Fácil                                    |
| Providers pages              | ~100          | 🟡 Média (formulários dinâmicos)            |
| Analytics/Charts             | ~50           | 🟡 Média (formatação numérica locale-aware) |
| Modals (OAuth, Config, etc.) | ~120          | 🟡 Média                                    |
| Messages de erro/toast       | ~80           | 🟢 Fácil                                    |
| Landing/Docs/Terms           | ~150          | 🔴 Alta (muito texto)                       |
| CLI Tools                    | ~40           | 🟢 Fácil                                    |
| Usage/Costs                  | ~70           | 🟡 Média                                    |
| **Total**                    | **~780-1000** |                                             |

---

## ANTES (Situação Atual)

```jsx
// src/shared/components/Sidebar.js (exemplo)
<nav>
  <Link href="/dashboard">Dashboard</Link>
  <Link href="/providers">Providers</Link>
  <Link href="/settings">Settings</Link>
  <Link href="/analytics">Analytics</Link>
</nav>

// src/app/(dashboard)/dashboard/page.js (exemplo)
<h1>Welcome to OmniRoute</h1>
<p>Total requests: {count}</p>
<button>Refresh</button>
```

---

## DEPOIS (Implementação Proposta)

### 1. Estrutura de arquivos de tradução

```
src/
├── i18n/
│   ├── request.ts           ← Config server-side
│   ├── routing.ts            ← Config de rotas por locale
│   └── messages/
│       ├── en.json           ← Inglês (padrão)
│       ├── pt-BR.json        ← Português BR
│       ├── es.json           ← Espanhol
│       ├── zh-CN.json        ← Chinês simplificado
│       ├── ja.json           ← Japonês
│       ├── ko.json           ← Coreano
│       └── vi.json           ← Vietnamita
```

### 2. Formato dos arquivos de tradução

```json
// src/i18n/messages/en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success",
    "confirm": "Are you sure?",
    "refresh": "Refresh"
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "providers": "Providers",
    "settings": "Settings",
    "analytics": "Analytics",
    "usage": "Usage",
    "costs": "Costs",
    "health": "Health",
    "cliTools": "CLI Tools",
    "translator": "Translator",
    "documentation": "Documentation"
  },
  "dashboard": {
    "title": "Welcome to OmniRoute",
    "totalRequests": "Total Requests",
    "activeProviders": "Active Providers",
    "successRate": "Success Rate",
    "avgLatency": "Avg. Latency"
  },
  "providers": {
    "title": "Providers",
    "addProvider": "Add Provider",
    "editProvider": "Edit Provider",
    "testConnection": "Test Connection",
    "connectionSuccess": "Connection successful!",
    "connectionFailed": "Connection failed: {error}",
    "noProviders": "No providers configured yet"
  },
  "settings": {
    "title": "Settings",
    "general": "General",
    "security": "Security",
    "language": "Language",
    "theme": "Theme",
    "darkMode": "Dark Mode",
    "lightMode": "Light Mode"
  }
}
```

```json
// src/i18n/messages/pt-BR.json
{
  "common": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "delete": "Excluir",
    "loading": "Carregando...",
    "error": "Ocorreu um erro",
    "success": "Sucesso",
    "confirm": "Tem certeza?",
    "refresh": "Atualizar"
  },
  "sidebar": {
    "dashboard": "Painel",
    "providers": "Provedores",
    "settings": "Configurações",
    "analytics": "Análises",
    "usage": "Uso",
    "costs": "Custos",
    "health": "Saúde",
    "cliTools": "Ferramentas CLI",
    "translator": "Tradutor",
    "documentation": "Documentação"
  },
  "dashboard": {
    "title": "Bem-vindo ao OmniRoute",
    "totalRequests": "Total de Requisições",
    "activeProviders": "Provedores Ativos",
    "successRate": "Taxa de Sucesso",
    "avgLatency": "Latência Média"
  }
}
```

### 3. Setup do middleware Next.js

```javascript
// middleware.js (na raiz do projeto)
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(pt-BR|en|es|zh-CN|ja|ko|vi)/:path*"],
};
```

```javascript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-BR", "es", "zh-CN", "ja", "ko", "vi"],
  defaultLocale: "en",
  localeDetection: true, // Detecta idioma do browser automaticamente
  localePrefix: "as-needed", // Omite /en/ mas mostra /pt-BR/
});
```

### 4. Uso nos componentes

```jsx
// src/shared/components/Sidebar.js (DEPOIS)
import { useTranslations } from "next-intl";

export default function Sidebar() {
  const t = useTranslations("sidebar");

  return (
    <nav>
      <Link href="/dashboard">{t("dashboard")}</Link>
      <Link href="/providers">{t("providers")}</Link>
      <Link href="/settings">{t("settings")}</Link>
      <Link href="/analytics">{t("analytics")}</Link>
    </nav>
  );
}
```

```jsx
// Server Component (sem hook, usa getTranslations)
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>
        {t("totalRequests")}: {count}
      </p>
    </div>
  );
}
```

### 5. Seletor de idioma no Settings

```jsx
// Novo componente: LanguageSelector
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/navigation";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select value={locale} onChange={(e) => handleChange(e.target.value)}>
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}
```

---

## Plano de Execução Faseado

### Fase 1: Infraestrutura (4-6h)

- [ ] Instalar `next-intl`
- [ ] Criar `src/i18n/routing.ts`, `src/i18n/request.ts`
- [ ] Configurar middleware Next.js
- [ ] Adicionar `NextIntlClientProvider` ao layout
- [ ] Criar `en.json` com estrutura de namespaces vazia

### Fase 2: Extração de Strings (12-16h)

- [ ] Extrair strings do Sidebar, Header, Footer
- [ ] Extrair strings de todas as 25 páginas
- [ ] Extrair strings de todos os 48 componentes
- [ ] Extrair strings de modals e toasts
- [ ] Extrair strings de mensagens de erro
- [ ] Substituir strings hardcoded por `t('key')` em cada arquivo

### Fase 3: PT-BR (4-6h)

- [ ] Traduzir `en.json` → `pt-BR.json` (GPT + revisão manual)
- [ ] Verificar termos técnicos (manter "Provider", "Token", etc.)
- [ ] Testar todas as páginas em PT-BR

### Fase 4: Idiomas Extras (2-3h/idioma)

- [ ] Traduzir para ES, ZH-CN, JA, KO, VI
- [ ] Revisar com falantes nativos (contribuição da comunidade)

### Fase 5: UI (2-3h)

- [ ] Criar componente `LanguageSelector`
- [ ] Adicioná-lo ao Settings e/ou Header
- [ ] Persistir preferência no localStorage

### Fase 6: Testes (3-4h)

- [ ] Verificar todas as páginas em cada idioma
- [ ] Testar locale detection automática
- [ ] Testar fallback para EN quando chave está faltando

---

## Estratégia de Tradução de Conteúdo

| Tipo de Conteúdo                 | Estratégia                                      |
| -------------------------------- | ----------------------------------------------- |
| **Labels de UI** (botões, menus) | Tradução completa via JSON                      |
| **Mensagens de erro**            | Tradução completa via JSON                      |
| **Documentação (/docs)**         | Markdown por idioma (`docs/en/`, `docs/pt-BR/`) |
| **Landing page**                 | Tradução completa via JSON                      |
| **Termos e Privacidade**         | Tradução profissional (jurídico)                |
| **Nomes de modelos/providers**   | **NÃO traduzir** (manter original)              |
| **Logs do proxy**                | **NÃO traduzir** (sempre em EN para debugging)  |
| **API responses**                | **NÃO traduzir** (API sempre em EN)             |

---

## Arquivos Afetados (Resumo)

| Camada         | Arquivos                     | Ação                                   |
| -------------- | ---------------------------- | -------------------------------------- |
| Infraestrutura | 4-5 novos                    | middleware, routing, request, provider |
| Mensagens      | 7 JSON novos                 | Um por idioma                          |
| Páginas        | 25 existentes                | Substituir strings por `t()`           |
| Componentes    | 48 existentes                | Substituir strings por `t()`           |
| Settings       | 1 existente                  | Adicionar LanguageSelector             |
| **Total**      | **~85 arquivos** modificados |                                        |

---

## Dependências

```bash
npm install next-intl
# Apenas 1 dependência, sem sub-dependências pesadas
```

---

## Referência: Como o zero-limit Faz

O zero-limit usa `react-i18next` com:

- Arquivos JSON em `src/locales/{lang}/translation.json`
- Hook `useTranslation()` em cada componente
- Seletor de idioma no Settings (`SettingsPage.tsx`)
- Detecção de idioma do browser via `i18next-browser-languagedetector`
- 13 idiomas: EN, PT-BR, ES, DE, FR, IT, ZH-CN, ID, JA, KO, VI, TH, RU
- ~200-300 chaves por idioma (projeto menor que o OmniRoute)

**Diferença chave:** Optamos por `next-intl` ao invés de `react-i18next` porque o OmniRoute usa Next.js App Router com Server Components, onde `next-intl` é a solução nativa e mais performática.
