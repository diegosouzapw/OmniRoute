/**
 * Multilingual Intent Detection for AutoCombo
 *
 * Classifies prompts as: code | math | reasoning | creative | simple | medium
 * using keywords in 9 languages (EN, PT-BR, ES, ZH, JA, RU, DE, KO, AR).
 *
 * Inspired by ClawRouter (BlockRunAI) multilingual routing system.
 * Execution: purely synchronous, <1ms, no I/O.
 */

export type IntentType = "code" | "math" | "reasoning" | "creative" | "simple" | "medium";

export interface ClassificationResult {
  type: IntentType;
  confidence: number;
  signals: string[];
}

export const CODE_KEYWORDS: readonly string[] = [
  // English
  "function",
  "class",
  "import",
  "def",
  "SELECT",
  "async",
  "await",
  "const",
  "let",
  "var",
  "return",
  "```",
  "algorithm",
  "compile",
  "debug",
  "refactor",
  "typescript",
  "python",
  "javascript",
  "code",
  "implement",
  "write a",
  "create a component",
  "endpoint",
  "repository",
  "deploy",
  "install",
  "script",
  "api",
  "database",
  "query",
  "schema",
  "interface",
  "generic",
  "enum",
  "module",
  "package",
  "dependency",
  // Português (PT-BR)
  "função",
  "classe",
  "importar",
  "definir",
  "consulta",
  "assíncrono",
  "aguardar",
  "constante",
  "variável",
  "retornar",
  "algoritmo",
  "compilar",
  "depurar",
  "refatorar",
  "código",
  "implementar",
  "criar um",
  "componente",
  "como fazer",
  "repositório",
  "configurar",
  "instalar",
  "banco de dados",
  "escrever uma função",
  "criar uma classe",
  // Español
  "función",
  "clase",
  "importar",
  "definir",
  "consulta",
  "asíncrono",
  "esperar",
  "constante",
  "variable",
  "retornar",
  "algoritmo",
  "compilar",
  "depurar",
  "refactorizar",
  "código",
  "implementar",
  // 中文
  "函数",
  "类",
  "导入",
  "定义",
  "查询",
  "异步",
  "等待",
  "常量",
  "变量",
  "返回",
  "算法",
  "编译",
  "调试",
  "代码",
  // 日本語
  "関数",
  "クラス",
  "インポート",
  "非同期",
  "定数",
  "変数",
  "コード",
  "アルゴリズム",
  // Русский
  "функция",
  "класс",
  "импорт",
  "запрос",
  "асинхронный",
  "константа",
  "переменная",
  "алгоритм",
  "код",
  // Deutsch
  "funktion",
  "klasse",
  "importieren",
  "abfrage",
  "asynchron",
  "konstante",
  "variable",
  "algorithmus",
  "code",
  // 한국어
  "함수",
  "클래스",
  "가져오기",
  "정의",
  "쿼리",
  "비동기",
  "대기",
  "상수",
  "변수",
  "반환",
  "코드",
  // العربية
  "دالة",
  "فئة",
  "استيراد",
  "استعلام",
  "غير متزامن",
  "ثابت",
  "متغير",
  "كود",
  "خوارزمية",
];

export const REASONING_KEYWORDS: readonly string[] = [
  // English
  "prove",
  "theorem",
  "derive",
  "step by step",
  "chain of thought",
  "formally",
  "mathematical",
  "proof",
  "logically",
  "analyze",
  "reasoning",
  "deduce",
  "infer",
  "hypothesis",
  "convergence",
  // Português (PT-BR)
  "provar",
  "teorema",
  "derivar",
  "passo a passo",
  "cadeia de pensamento",
  "formalmente",
  "matemático",
  "prova",
  "logicamente",
  "analisar",
  "raciocínio",
  "deduzir",
  "inferir",
  "hipótese",
  "demonstrar",
  "cálculo",
  "equação diferencial",
  "integral",
  "otimização",
  // Español
  "demostrar",
  "teorema",
  "derivar",
  "paso a paso",
  "formalmente",
  "matemático",
  "lógicamente",
  // 中文
  "证明",
  "定理",
  "推导",
  "逐步",
  "思维链",
  "数学",
  "逻辑",
  "分析",
  // 日本語
  "証明",
  "定理",
  "導出",
  "論理的",
  "分析",
  // Русский
  "доказать",
  "теорема",
  "шаг за шагом",
  "математически",
  "логически",
  // Deutsch
  "beweisen",
  "theorem",
  "schritt für schritt",
  "mathematisch",
  "logisch",
  // 한국어
  "증명",
  "정리",
  "단계별",
  "수학적",
  "논리적",
  // العربية
  "إثبات",
  "نظرية",
  "خطوة بخطوة",
  "رياضي",
  "منطقياً",
];

export const MATH_KEYWORDS: readonly string[] = [
  // English
  "calculate",
  "solve",
  "equation",
  "proof",
  "formula",
  "integral",
  "derivative",
  "theorem",
  "algebra",
  "geometry",
  "arithmetic",
  "polynomial",
  "matrix",
  "vector",
  "statistics",
  "probability",
  // Português (PT-BR)
  "calcular",
  "resolver",
  "equação",
  "fórmula",
  "integral",
  "derivada",
  "teorema",
  "álgebra",
  "geometria",
  "aritmética",
  "polinômio",
  "matriz",
  "vetor",
  "estatística",
  "probabilidade",
  // Español
  "calcular",
  "resolver",
  "ecuación",
  "fórmula",
  "integral",
  "derivada",
  "teorema",
  "álgebra",
  "geometría",
  "aritmética",
  "polinomio",
  "matriz",
  "vector",
  "estadística",
  "probabilidad",
  // 中文
  "计算",
  "求解",
  "方程",
  "公式",
  "积分",
  "导数",
  "代数",
  "几何",
  "算术",
  "多项式",
  "矩阵",
  "向量",
  "统计",
  "概率",
  // 日本語
  "計算",
  "方程式",
  "公式",
  "積分",
  "微分",
  "代数",
  "幾何学",
  "算術",
  "多項式",
  "行列",
  "ベクトル",
  "統計",
  "確率",
  // Русский
  "вычислить",
  "решить",
  "уравнение",
  "формула",
  "интеграл",
  "производная",
  "алгебра",
  "геометрия",
  "арифметика",
  "полином",
  "матрица",
  "вектор",
  "статистика",
  "вероятность",
  // Deutsch
  "berechnen",
  "gleichung",
  "formel",
  "integral",
  "ableitung",
  "algebra",
  "geometrie",
  "arithmetik",
  "polynom",
  "matrix",
  "vektor",
  "statistik",
  "wahrscheinlichkeit",
  // 한국어
  "계산",
  "방정식",
  "공식",
  "적분",
  "미분",
  "대수",
  "기하학",
  "산술",
  "다항식",
  "행렬",
  "벡터",
  "통계",
  "확률",
  // العربية
  "حل",
  "معادلة",
  "صيغة",
  "تكامل",
  "مشتق",
  "جبر",
  "هندسة",
  "حساب",
  "متعدد الحدود",
  "مصفوفة",
  "متجه",
  "إحصاء",
  "احتمال",
];

export const CREATIVE_KEYWORDS: readonly string[] = [
  // English
  "write",
  "story",
  "poem",
  "creative",
  "brainstorm",
  "blog",
  "article",
  "copywrite",
  "marketing",
  "narrative",
  "fiction",
  "screenplay",
  "lyrics",
  "essay",
  // Português (PT-BR)
  "escrever",
  "história",
  "poema",
  "criativo",
  "brainstorm",
  "blog",
  "artigo",
  "redação",
  "marketing",
  "narrativa",
  "ficção",
  "roteiro",
  "letras",
  "ensaio",
  // Español
  "escribir",
  "historia",
  "poema",
  "creativo",
  "blog",
  "artículo",
  "redacción",
  "marketing",
  "narrativa",
  "ficción",
  "guion",
  "letras",
  "ensayo",
  // 中文
  "写",
  "故事",
  "诗",
  "创意",
  "头脑风暴",
  "博客",
  "文章",
  "文案",
  "营销",
  "叙事",
  "小说",
  "剧本",
  "歌词",
  "散文",
  // 日本語
  "書く",
  "物語",
  "詩",
  "クリエイティブ",
  "ブログ",
  "記事",
  "コピーライティング",
  "マーケティング",
  "ナラティブ",
  "小説",
  "脚本",
  "歌詞",
  "エッセイ",
  // Русский
  "написать",
  "история",
  "стихотворение",
  "креативный",
  "блог",
  "статья",
  "копирайтинг",
  "маркетинг",
  "нарратив",
  "фантастика",
  "сценарий",
  "текст песни",
  "эссе",
  // Deutsch
  "schreiben",
  "geschichte",
  "gedicht",
  "kreativ",
  "blog",
  "artikel",
  "texten",
  "marketing",
  "erzählung",
  "fiktion",
  "drehbuch",
  "songtext",
  "aufsatz",
  // 한국어
  "쓰기",
  "이야기",
  "시",
  "창의적",
  "블로그",
  "기사",
  "카피라이팅",
  "마케팅",
  "서사",
  "소설",
  "시나리오",
  "가사",
  "에세이",
  // العربية
  "كتابة",
  "قصة",
  "قصيدة",
  "إبداعي",
  "مقال",
  "تسويق",
  "سرد",
  "رواية",
  "سيناريو",
  "كلمات أغنية",
  "مقالة",
];

export const SIMPLE_KEYWORDS: readonly string[] = [
  // English
  "what is",
  "define",
  "translate",
  "hello",
  "yes or no",
  "summarize",
  "list",
  "tell me",
  "who is",
  // Português (PT-BR)
  "o que é",
  "definir",
  "traduzir",
  "olá",
  "oi",
  "sim ou não",
  "resumir",
  "listar",
  "me diga",
  "quem é",
  "quando foi",
  "onde fica",
  "explique brevemente",
  "de forma simples",
  // Español
  "qué es",
  "definir",
  "traducir",
  "hola",
  "resumir",
  "listar",
  // 中文
  "什么是",
  "定义",
  "翻译",
  "你好",
  "总结",
  "列出",
  // Русский
  "что такое",
  "определить",
  "перевести",
  "привет",
  "резюмировать",
  // Deutsch
  "was ist",
  "definieren",
  "übersetzen",
  "hallo",
  "zusammenfassen",
  // 한국어
  "이란",
  "정의",
  "번역",
  "안녕",
  "요약",
  // العربية
  "ما هو",
  "تعريف",
  "ترجمة",
  "مرحبا",
  "ملخص",
];

/**
 * Classify a prompt's intent using multilingual keyword matching.
 * Priority: code > math > reasoning > creative > simple > medium (default)
 */
export function classifyPromptIntent(prompt: string, systemPrompt?: string): IntentType {
  const fullText = `${systemPrompt ?? ""} ${prompt}`.toLowerCase();
  const wordCount = prompt.trim().split(/\s+/).length;

  for (const kw of CODE_KEYWORDS) {
    if (fullText.includes(kw.toLowerCase())) return "code";
  }
  for (const kw of MATH_KEYWORDS) {
    if (fullText.includes(kw.toLowerCase())) return "math";
  }
  for (const kw of REASONING_KEYWORDS) {
    if (fullText.includes(kw.toLowerCase())) return "reasoning";
  }
  for (const kw of CREATIVE_KEYWORDS) {
    if (fullText.includes(kw.toLowerCase())) return "creative";
  }
  if (wordCount < 60) {
    for (const kw of SIMPLE_KEYWORDS) {
      if (fullText.includes(kw.toLowerCase())) return "simple";
    }
  }
  return "medium";
}

export interface IntentClassifierConfig {
  enabled: boolean;
  extraCodeKeywords?: string[];
  extraMathKeywords?: string[];
  extraReasoningKeywords?: string[];
  extraCreativeKeywords?: string[];
  extraSimpleKeywords?: string[];
  simpleMaxWords?: number;
}

export const DEFAULT_INTENT_CONFIG: IntentClassifierConfig = {
  enabled: true,
  simpleMaxWords: 60,
};

export function classifyWithConfig(
  prompt: string,
  config: IntentClassifierConfig,
  systemPrompt?: string
): IntentType {
  if (!config.enabled) return "medium";
  const fullText = `${systemPrompt ?? ""} ${prompt}`.toLowerCase();
  const wordCount = prompt.trim().split(/\s+/).length;
  const maxSimpleWords = config.simpleMaxWords ?? 60;
  const codeKws = [...CODE_KEYWORDS, ...(config.extraCodeKeywords ?? [])];
  const mathKws = [...MATH_KEYWORDS, ...(config.extraMathKeywords ?? [])];
  const reasoningKws = [...REASONING_KEYWORDS, ...(config.extraReasoningKeywords ?? [])];
  const creativeKws = [...CREATIVE_KEYWORDS, ...(config.extraCreativeKeywords ?? [])];
  const simpleKws = [...SIMPLE_KEYWORDS, ...(config.extraSimpleKeywords ?? [])];
  for (const kw of codeKws) {
    if (fullText.includes(kw.toLowerCase())) return "code";
  }
  for (const kw of mathKws) {
    if (fullText.includes(kw.toLowerCase())) return "math";
  }
  for (const kw of reasoningKws) {
    if (fullText.includes(kw.toLowerCase())) return "reasoning";
  }
  for (const kw of creativeKws) {
    if (fullText.includes(kw.toLowerCase())) return "creative";
  }
  if (wordCount < maxSimpleWords) {
    for (const kw of simpleKws) {
      if (fullText.includes(kw.toLowerCase())) return "simple";
    }
  }
  return "medium";
}
