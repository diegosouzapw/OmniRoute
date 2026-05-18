"use client";

import dynamic from "next/dynamic";
import type { EditorProps } from "@monaco-editor/react";

// Self-hosted Monaco. Configures @monaco-editor/react to use the bundled
// `monaco-editor` package instead of the default jsdelivr CDN, which is
// blocked by our CSP (script-src 'self'). Keep all Editor imports going
// through this wrapper so the loader is configured exactly once.
const MonacoEditor = dynamic<EditorProps>(
  async () => {
    const [{ default: Editor, loader }, monaco] = await Promise.all([
      import("@monaco-editor/react"),
      import("monaco-editor"),
    ]);
    loader.config({ monaco });
    return Editor;
  },
  { ssr: false }
);

export type { EditorProps };
export default MonacoEditor;
