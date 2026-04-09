# TASK-07 — Adicionar Suporte ao Windsurf IDE como CLI Tool

**Prioridade:** 🟢 DESEJÁVEL  
**Origem:** PR upstream `decolua/9router#407`  
**Branch:** `feat/task-07-windsurf-ide-support`  
**Commit msg:** `feat: add Windsurf IDE support as CLI tool destination`

---

## Problema

O Windsurf IDE (da Codeium) é um editor de código AI-first que se tornou popular na comunidade. Usuários pediram suporte para configurar o OmniRoute como proxy para o Windsurf. Atualmente, o dashboard de CLI Tools suporta:

- Claude Code
- OpenAI Codex
- Antigravity (Gemini CLI)
- Cursor
- Kiro
- Cline
- Continue
- OpenCode

O Windsurf **não está** na lista de ferramentas suportadas.

---

## Solução

Adicionar o Windsurf IDE à lista de CLI tools, seguindo exatamente o padrão dos outros tools já registrados. O Windsurf usa formato OpenAI-compatible e pode ser configurado como proxy HTTP.

---

## Arquivos a Modificar

### 1. MODIFICAR: `src/shared/constants/cliTools.ts`

Localizar a lista de CLI tools e adicionar a entrada do Windsurf. Antes de implementar, ler o arquivo completo para entender o formato e adicionar na posição correta (ordem alfabética ou por popularidade).

**Campos necessários baseados na estrutura existente:**
```typescript
{
  id: "windsurf",
  name: "Windsurf",
  description: "Windsurf IDE — AI-first code editor by Codeium",
  icon: "/providers/windsurf.svg",  // Precisamos do ícone
  platforms: ["windows", "macos", "linux"],
  configType: "env",  // ou "file" dependendo de como o Windsurf é configurado
  configPath: {
    linux: "~/.windsurf/settings.json",
    macos: "~/Library/Application Support/Windsurf/settings.json",
    windows: "%APPDATA%/Windsurf/settings.json",
  },
  models: [
    "claude-sonnet-4.5",
    "gpt-4o",
    "gemini-2.5-pro",
  ],
  modelOptions: [
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", alias: "claude-sonnet-4.5" },
    { id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", alias: "gemini-2.5-pro" },
  ],
}
```

---

### 2. PESQUISA NECESSÁRIA: Formato de Configuração do Windsurf

Antes de implementar, pesquisar na web:

```
Windsurf IDE proxy configuration API base URL
Windsurf settings.json format
Windsurf AI model endpoint configuration
```

O Windsurf pode ter um formato de configuração diferente dos outros IDEs. Pontos a descobrir:

1. **Onde fica o arquivo de configuração?** (settings.json? config file?)
2. **Qual o formato?** (JSON? YAML? Environment variable?)
3. **Como configurar um proxy?** (apiBaseUrl? proxyUrl? endpoint?)
4. **Quais modelos o Windsurf suporta?** (lista de model IDs)

---

### 3. CRIAR: `public/providers/windsurf.svg`

Precisa de um ícone SVG para o Windsurf. Opções:
1. Baixar do site oficial do Windsurf
2. Usar um placeholder genérico de editor
3. Criar um ícone simples

---

### 4. MODIFICAR: `src/app/(dashboard)/dashboard/cli-tools/components/index.ts`

Exportar o novo componente (se necessário seguindo o padrão dos outros tools).

---

### 5. CRIAR (se necessário): Component de UI do Windsurf

Se os outros tools têm componentes dedicados (como `AmpToolCard.js`), criar um `WindsurfToolCard.tsx` seguindo o mesmo padrão. Caso contrário, verificar se existe um componente genérico que renderiza qualquer tool da lista.

---

## Investigação Necessária

Antes de implementar, executar:

```bash
# Ver a estrutura atual dos CLI tools
cat src/shared/constants/cliTools.ts

# Ver como os tool cards são renderizados
ls src/app/\(dashboard\)/dashboard/cli-tools/components/

# Ver se existe um componente genérico ou cada tool tem um dedicado
grep -l "ToolCard" src/app/\(dashboard\)/dashboard/cli-tools/components/*

# Ver o formato dos ícones existentes
ls public/providers/*.svg
```

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit`
3. **Visual:** Dashboard → CLI Tools → Verificar que Windsurf aparece na lista

---

## Riscos

- **Dependência de pesquisa:** O formato de configuração do Windsurf pode mudar entre versões. A implementação deve ser defensiva.
- **Ícone:** Se não conseguirmos o SVG oficial, usar placeholder.
- **Baixo risco operacional:** Apenas adiciona uma entrada à lista — não afeta funcionalidade existente.

---

## Referências

- PR upstream: https://github.com/decolua/9router/pull/407
- Windsurf IDE: https://windsurf.com/
- Codeium (criadora do Windsurf): https://codeium.com/
