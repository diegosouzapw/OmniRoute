// Identificador estável dos formatos suportados (1:1 com FORMAT_META em exampleTemplates.tsx).
// Mantém compatibilidade com strings já no backend (open-sse/translator/formats.ts).
export type FormatId =
  | "openai"
  | "openai-responses"
  | "claude"
  | "gemini"
  | "antigravity"
  | "kiro"
  | "cursor";

// Tabs no shell de 2 abas.
export type TranslatorTab = "translate" | "monitor";

// Modo do simple controls: só converter (estático) vs enviar e mostrar resposta (com SSE).
export type TranslateMode = "preview" | "send";

// Slugs canônicos dos accordions Advanced (deep-link).
export type AdvancedSlug = "rawjson" | "pipeline" | "streamtransform" | "testbench" | "compression";

// Estado do deep-link parseado a partir da querystring (hook useTranslateDeepLink).
export interface TranslateDeepLink {
  tab: TranslatorTab;
  mode: TranslateMode;
  advanced: AdvancedSlug | null; // null = nenhum aberto
}

// Resultado narrado mostrado no painel direito (modo simple).
// Renderizado por ResultNarrated; F3 popula, F4 conhece o shape para passar referência.
export interface TranslateNarratedResult {
  detected: FormatId | null; // formato detectado no input do usuário
  target: FormatId; // selecionado no SimpleControls
  status: "idle" | "translating" | "sending" | "ok" | "error";
  responsePreview: string | null; // primeiras N chars da resposta SSE/JSON
  translatedJson: string | null; // JSON resultado (para botão "ver JSON")
  pipelinePath: "direct" | "hub-and-spoke" | "passthrough" | null;
  intermediateJson: string | null; // OpenAI intermediário quando hub-and-spoke
  errorMessage: string | null; // sanitized error (sem stack)
  latencyMs: number | null;
}

// Props compartilhados entre os accordion children.
export interface AdvancedAccordionProps {
  // Lazy-render guard (D7): só monta children se já abriu pelo menos uma vez.
  defaultOpen?: boolean;
  // Slug usado pelo deep-link (D6); o hook useTranslateDeepLink lê isso.
  slug: AdvancedSlug;
  // Caller pode forçar abertura (deep-link inicial).
  forceOpen?: boolean;
  // Caller pode receber notificação quando o estado open mudar (para sync com URL).
  onOpenChange?: (open: boolean) => void;
}

// Templates retornados por getExampleTemplates(t) — espelha o shape de exampleTemplates.tsx.
// exampleTemplates.tsx não exporta este type, então definimos inline aqui.
// NÃO duplicar os dados — importar apenas getExampleTemplates/FORMAT_META/FORMAT_OPTIONS do módulo.
interface ExampleTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  formats: Partial<Record<FormatId, Record<string, unknown>>>;
}
