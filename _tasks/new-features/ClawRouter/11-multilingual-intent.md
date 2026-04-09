# 11 — Multilingual Keyword Detection para o AutoCombo

> **Prioridade**: 🟡 Média  
> **Categoria**: Feature de routing inteligente  
> **Impacto**: Detecção de intent (código, reasoning, simples) em 9 idiomas vs apenas inglês hoje

---

## Contexto e Motivação

O ClawRouter usa uma lista de palavras-chave em **9 idiomas** para classificar o tipo de
request antes de rotear:
- Inglês, Chinês, Japonês, Russo, Alemão, **Português**, Espanhol, Coreano, Árabe

**Por que isso importa para o OmniRoute?**  
Nossos usuários são primariamente brasileiros (PT-BR). Quando alguém pergunta
"como criar uma função Python?" ou "escreva uma consulta SQL", nosso AutoCombo pode
não detectar corretamente que é um request de **código** e rotear para o modelo errado.

Com a detecção multilingual, podemos:
1. Rotear "função" → modelo com boa performance de código
2. Rotear "prove o teorema de Pitágoras" → modelo com reasoning
3. Rotear "o que é uma variável?" → modelo barato (simples)

---

## Arquivos a Modificar

```
open-sse/services/autoCombo/index.ts   ← ou onde existe a classificação de intent
open-sse/services/autoCombo/scorer.ts  ← ou o arquivo de scoring do AutoCombo
```

---

## Passo 1: Criar arquivo de keywords multilingual

Criar um novo arquivo dedicado às keywords de detecção de intent:

```typescript
// open-sse/services/autoCombo/intentKeywords.ts

/**
 * Keywords para detecção de intent em 9 idiomas.
 * Baseado no sistema do ClawRouter (github.com/BlockRunAI/ClawRouter).
 * Usado para classificar requests como: code, reasoning, simple, ou medium.
 */

export const CODE_KEYWORDS: readonly string[] = [
  // ──── English ────
  "function", "class", "import", "def", "SELECT", "async", "await",
  "const", "let", "var", "return", "```", "algorithm", "compile",
  "debug", "refactor", "typescript", "python", "javascript", "code",
  "implement", "write a", "create a component",

  // ──── Português (PT-BR) ────
  "função", "classe", "importar", "definir", "consulta", "assíncrono",
  "aguardar", "constante", "variável", "retornar", "algoritmo",
  "compilar", "depurar", "refatorar", "código", "implementar",
  "criar um", "escrever um componente", "como fazer", "endpoint",
  "repositório", "deploy", "configurar", "instalar", "script",

  // ──── Español ────
  "función", "clase", "importar", "definir", "consulta", "asíncrono",
  "esperar", "constante", "variable", "retornar", "algoritmo",
  "compilar", "depurar", "refactorizar", "código", "implementar",

  // ──── 中文 (Chinese) ────
  "函数", "类", "导入", "定义", "查询", "异步", "等待",
  "常量", "变量", "返回", "算法", "编译", "调试", "代码",

  // ──── 日本語 (Japanese) ────
  "関数", "クラス", "インポート", "非同期", "定数", "変数",
  "コード", "アルゴリズム",

  // ──── Русский (Russian) ────
  "функция", "класс", "импорт", "определ", "запрос", "асинхронный",
  "ожидать", "константа", "переменная", "вернуть", "алгоритм",

  // ──── Deutsch (German) ────
  "funktion", "klasse", "importieren", "definieren", "abfrage",
  "asynchron", "erwarten", "konstante", "variable", "zurückgeben",

  // ──── 한국어 (Korean) ────
  "함수", "클래스", "가져오기", "정의", "쿼리", "비동기",
  "대기", "상수", "변수", "반환",

  // ──── العربية (Arabic) ────
  "دالة", "فئة", "استيراد", "تعريف", "استعلام", "غير متزامن",
  "انتظار", "ثابت", "متغير", "إرجاع",
];

export const REASONING_KEYWORDS: readonly string[] = [
  // ──── English ────
  "prove", "theorem", "derive", "step by step", "chain of thought",
  "formally", "mathematical", "proof", "logically", "analyze",
  "reasoning", "deduce", "infer", "hypothesis",

  // ──── Português (PT-BR) ────
  "provar", "teorema", "derivar", "passo a passo", "cadeia de pensamento",
  "formalmente", "matemático", "prova", "logicamente", "analisar",
  "raciocínio", "deduzir", "inferir", "hipótese", "demonstrar",
  "demonstração", "cálculo", "equação diferencial", "integral",
  "otimização", "complexidade", "por que", "como funciona",

  // ──── Español ────
  "demostrar", "teorema", "derivar", "paso a paso", "cadena de pensamiento",
  "formalmente", "matemático", "prueba", "lógicamente", "analizar",

  // ──── 中文 ────
  "证明", "定理", "推导", "逐步", "思维链", "形式化", "数学", "逻辑",

  // ──── 日本語 ────
  "証明", "定理", "導出", "ステップバイステップ", "論理的",

  // ──── Русский ────
  "доказать", "докажи", "доказательств", "теорема", "вывести",
  "шаг за шагом", "пошагово", "цепочка рассуждений", "математически",

  // ──── Deutsch ────
  "beweisen", "beweis", "theorem", "ableiten", "schritt für schritt",
  "formal", "mathematisch", "logisch",

  // ──── Español ────
  "probar", "lema",

  // ──── 한국어 ────
  "증명", "정리", "도출", "단계별", "수학적", "논리적",

  // ──── العربية ────
  "إثبات", "نظرية", "اشتقاق", "خطوة بخطوة", "رياضي", "منطقياً",
];

export const SIMPLE_KEYWORDS: readonly string[] = [
  // ──── English ────
  "what is", "define", "translate", "hello", "yes or no", "summarize",
  "list", "name", "tell me", "who is", "when was", "where is",

  // ──── Português (PT-BR) ────
  "o que é", "definir", "traduzir", "olá", "oi", "sim ou não",
  "resumir", "listar", "me diga", "quem é", "quando foi", "onde fica",
  "explique brevemente", "de forma simples",

  // ──── Español ────
  "qué es", "definir", "traducir", "hola", "sí o no",
  "resumir", "listar", "díme", "quién es",

  // ──── 中文 ────
  "什么是", "定义", "翻译", "你好", "是或否", "总结",

  // ──── Russo ────
  "что такое", "определить", "перевести", "привет", "резюмировать",

  // ──── Deutsch ────
  "was ist", "definieren", "übersetzen", "hallo", "zusammenfassen",

  // ──── 한국어 ────
  "이란", "정의", "번역", "안녕", "요약",

  // ──── العربية ────
  "ما هو", "تعريف", "ترجمة", "مرحبا", "ملخص",
];

/**
 * Classificar um prompt com base nas keywords multilinguais.
 * Retorna: "code" | "reasoning" | "simple" | "medium"
 */
export function classifyPromptIntent(
  prompt: string,
  systemPrompt?: string
): "code" | "reasoning" | "simple" | "medium" {
  const fullText = `${systemPrompt ?? ""} ${prompt}`.toLowerCase();
  
  // Verificar tamanho do prompt (proxy para complexidade):
  const wordCount = prompt.split(/\s+/).length;

  // Checar code keywords:
  const isCode = CODE_KEYWORDS.some(kw => fullText.includes(kw.toLowerCase()));
  if (isCode) return "code";

  // Checar reasoning keywords:
  const isReasoning = REASONING_KEYWORDS.some(kw => fullText.includes(kw.toLowerCase()));
  if (isReasoning) return "reasoning";

  // Checar simple keywords:
  const isSimple = SIMPLE_KEYWORDS.some(kw => fullText.includes(kw.toLowerCase()));
  if (isSimple && wordCount < 50) return "simple";

  // Default: medium (request de complexidade média)
  return "medium";
}
```

---

## Passo 2: Integrar no AutoCombo Scorer

Localizar onde o AutoCombo faz scoring/classificação. Provavelmente em
`open-sse/services/autoCombo/` ou `combo.ts`. Substituir ou complementar
a lógica de classificação existente:

```typescript
// Em open-sse/services/autoCombo/index.ts:
import { classifyPromptIntent } from "./intentKeywords.ts";

// No método que seleciona o modelo:
async function selectModelForRequest(
  messages: Message[],
  options: ComboOptions
): Promise<ModelSelection> {
  // Extrair o último prompt do usuário:
  const userPrompt = messages.filter(m => m.role === "user").at(-1)?.content ?? "";
  const systemPrompt = messages.find(m => m.role === "system")?.content;

  // Classificar o intent com detecção multilingual:
  const intent = classifyPromptIntent(
    typeof userPrompt === "string" ? userPrompt : JSON.stringify(userPrompt),
    typeof systemPrompt === "string" ? systemPrompt : undefined
  );

  // Usar o intent para escolher o tier de modelo:
  switch (intent) {
    case "code":
      return selectFromCodeTier(options);      // ex: DeepSeek, GPT-4o, Claude Sonnet
    case "reasoning":
      return selectFromReasoningTier(options); // ex: o3, GPT-5, Claude Opus
    case "simple":
      return selectFromEcoTier(options);       // ex: gpt-4o-mini, Grok-3-mini, Flash Lite
    case "medium":
    default:
      return selectFromBalancedTier(options);  // ex: gpt-4o, Gemini-2.5-flash
  }
}
```

---

## Passo 3: Adicionar Logging de Intent no Analytics

```typescript
// Ao classificar e logar a request:
await logProxyRequest({
  // ... outros campos ...
  detectedIntent: intent,
  intentLanguageHint: detectLanguage(prompt), // opcional: qual idioma foi detectado
  selectedModelTier: tier,
});
```

No dashboard `/dashboard/analytics`, exibir uma coluna ou filtro por intent:
- `code` — requests de programação
- `reasoning` — requests matemáticos/lógicos
- `simple` — perguntas simples
- `medium` — outros

---

## Passo 4: Configuração de Thresholds via Settings

Adicionar opção nas settings para ajustar o comportamento:

```typescript
export interface IntentClassifierConfig {
  enabled: boolean;
  
  // Palavras-chave extras do usuário para cada categoria:
  extraCodeKeywords?: string[];
  extraReasoningKeywords?: string[];
  extraSimpleKeywords?: string[];
  
  // Threshold de tokens para "simple" (default: 50 tokens):
  simpleTokenThreshold: number;
  
  // Threshold para "complex" (default: 500 tokens):
  complexTokenThreshold: number;
}
```

---

## Testes de Validação

### Teste 1: Detecção PT-BR de código
```typescript
import { classifyPromptIntent } from "./intentKeywords.ts";

console.assert(
  classifyPromptIntent("como criar uma função em TypeScript?") === "code",
  "PT-BR code detection failed"
);

console.assert(
  classifyPromptIntent("como criar uma classe Python com herança?") === "code",
  "PT-BR class detection failed"
);
```

### Teste 2: Detecção PT-BR de reasoning
```typescript
console.assert(
  classifyPromptIntent("prove por indução que a soma de 1 a n é n*(n+1)/2") === "reasoning",
  "PT-BR reasoning detection failed"
);
```

### Teste 3: Detecção de prompt simples
```typescript
console.assert(
  classifyPromptIntent("o que é uma variável?") === "simple",
  "PT-BR simple detection failed"
);
```

### Teste 4: Verificar no dashboard
Fazer requests em PT-BR e verificar que o `detectedIntent` aparece corretamente nos logs.

---

## Referências

- [ClawRouter router/config.ts - keywords multilingual](https://github.com/BlockRunAI/ClawRouter/blob/main/src/router/config.ts)
- ClawRouter: `Multilingual keywords: EN + ZH + JA + RU + DE + ES + PT + KO + AR`

---

## Notas de Performance

A classificação deve ser **síncrona e em <1ms** — apenas string matching, sem IA.
Testar com prompts de 1000+ palavras para garantir que não há lag perceptível.
Usar `someKeyword.some(kw => ...)` que para no primeiro match (lazy evaluation).

---

## Rollback

Desabilitar via config `intentClassifier.enabled = false`. Ou simplesmente não chamar
`classifyPromptIntent()` no AutoCombo e manter o comportamento anterior.
