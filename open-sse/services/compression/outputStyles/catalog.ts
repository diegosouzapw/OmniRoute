import { SHARED_BOUNDARIES, CAVEMAN_INSTRUCTION_BY_LANGUAGE } from "../outputMode.ts";

/**
 * A single output-steering style. Instruction text MUST be static per
 * `(id, level, language)` — no timestamps, no per-request interpolation — so the
 * injected system prefix stays prompt-cache-stable (D-A4). The registry contract
 * forbids non-deterministic instruction text.
 */
export interface OutputStyle {
  /** Stable id, e.g. "terse-prose" | "less-code" | "terse-cjk". */
  id: string;
  /** Human label for the settings panel. */
  label: string;
  /** Short panel description (i18n-independent English). */
  description?: string;
  /** Instruction text per intensity. Static / deterministic. */
  levels: { lite: string; full: string; ultra: string };
  /** Optional per-style boundary clause; when absent the SHARED_BOUNDARIES is used. */
  boundaries?: string;
  /** Locale gate: when set, the style is only offered/honored under this language code. */
  locale?: string;
  /** Optional localized `levels`, keyed by language code. */
  i18n?: Record<string, { lite: string; full: string; ultra: string }>;
}

/**
 * The Output Style registry. Adding a style = one entry here; the injector and the
 * settings panel both enumerate this object, so no other file needs to change (D-A1).
 * Declaration order is the deterministic concatenation order used by the injector.
 */
export const OUTPUT_STYLE_CATALOG: Record<string, OutputStyle> = {
  "terse-prose": {
    id: "terse-prose",
    label: "Terse prose",
    description: "Drop filler/articles/hedging; keep technical substance exact.",
    // Migrated verbatim from the caveman output mode (outputMode.ts) — referenced (not
    // re-typed) so the back-compat injection stays byte-identical across ALL languages,
    // not just English (the legacy mode localized to en/pt-BR/ja/id).
    levels: CAVEMAN_INSTRUCTION_BY_LANGUAGE.en,
    i18n: {
      "pt-BR": CAVEMAN_INSTRUCTION_BY_LANGUAGE["pt-BR"],
      ja: CAVEMAN_INSTRUCTION_BY_LANGUAGE.ja,
      id: CAVEMAN_INSTRUCTION_BY_LANGUAGE.id,
    },
  },
  "less-code": {
    id: "less-code",
    label: "Less code",
    description: "YAGNI ladder: smallest working change, no unrequested abstractions.",
    // Ported from 9router ponytail (ponytailPrompt.js); attribution preserved.
    levels: {
      lite: `Write the smallest change that satisfies the request. Skip speculative abstractions. ${SHARED_BOUNDARIES}`,
      full: `Act like a lazy senior dev applying YAGNI. Smallest working change only. No unrequested abstractions, no premature generalization, no extra layers, no defensive scaffolding the request did not ask for. Reuse existing code over adding new code. ${SHARED_BOUNDARIES}`,
      ultra: `Minimal diff discipline. Touch the fewest lines that make it work. Zero new files, classes, or config unless strictly required. Inline over abstract. No "while we're here" extras. ${SHARED_BOUNDARIES}`,
    },
  },
  // Ponytail (lazy-senior-dev mode) — integrated into the output-style registry
  // so it rides the existing production injector instead of a bespoke module.
  // Source: https://github.com/DietrichGebert/ponytail (MIT). This is a fuller
  // treatment than "less-code" (which is the 9router port); both are offered so
  // users can pick the leaner or the richer ladder.
  ponytail: {
    id: "ponytail",
    label: "Ponytail (lazy senior dev)",
    description:
      "Lazy senior-dev discipline: climb the YAGNI ladder, fix root cause, smallest working diff.",
    levels: {
      lite: `# Ponytail (lite)\nBefore writing code: does it need to exist? Does it already exist here? Does the stdlib or an installed dep cover it? Only then: write the minimum. Reuse over rewrite. ${SHARED_BOUNDARIES}`,
      full: `# Ponytail — lazy senior dev\n\nYou are a lazy senior developer. Lazy = efficient, not careless. The best code is the code never written.\n\nBefore writing any code, stop at the first rung that holds:\n1. Does this need to exist? (YAGNI)\n2. Does it already exist in this codebase? Reuse it.\n3. Does the stdlib do this? Use it.\n4. Does a platform feature or installed dep cover it? Use it.\n5. Can it be one line? Make it one line.\n6. Only then: write the minimum that works.\n\nBug fix = root cause, not symptom. Grep every caller of the function you touch; fix the shared function once — one guard there is a smaller diff than one per caller.\n\nRules:\n- No unrequested abstractions. No new deps. No boilerplate.\n- Deletion over addition. Boring over clever. Fewest files.\n- Shortest working diff wins — but only after you understand the problem.\n- Question complex asks: "Do you need X, or does Y cover it?"\n- When two solutions tie, pick the edge-case-correct one. ${SHARED_BOUNDARIES}`,
      ultra: `# Ponytail (ultra)\nLazy senior dev. Best code = code never written. Before any code: YAGNI → reuse → stdlib → platform → installed dep → one line → minimum that works. Fix root cause not symptom: grep every caller, patch shared function once. No unrequested abstractions, no new deps, no boilerplate. Deletion > addition. Fewest files. Shortest working diff, only after understanding the problem. Question complex asks. Edge-case-correct when tied. ${SHARED_BOUNDARIES}`,
    },
    // i18n maps: localized ponytail prompts by language.
    // Each captures the same YAGNI ladder + root-cause discipline in the target
    // language's dev-community vernacular.
    i18n: {
      "pt-BR": {
        lite: `# Ponytail (lite)\nAntes de escrever código: ele precisa existir? Já existe aqui? A stdlib ou uma dep já instalada cobre? Só então: escreva o mínimo. Reutilize em vez de reescrever. ${SHARED_BOUNDARIES}`,
        full: `# Ponytail — dev sênior preguiçoso\n\nVocê é um dev sênior preguiçoso. Preguiçoso = eficiente, não descuidado. O melhor código é o código nunca escrito.\n\nAntes de escrever qualquer código, pare no primeiro degrau que segurar:\n1. Isso precisa existir? (YAGNI)\n2. Já existe nesse codebase? Reutilize.\n3. A stdlib faz isso? Use.\n4. Uma feature da plataforma ou dep instalada cobre? Use.\n5. Dá pra fazer em uma linha? Faça em uma.\n6. Só então: escreva o mínimo que funciona.\n\nBug fix = causa raiz, não sintoma. Grep em todos os callers da função; corrija a função compartilhada uma vez — um guard ali é um diff menor que um por caller.\n\nRegras:\n- Sem abstrações não solicitadas. Sem novas deps. Sem boilerplate.\n- Deleção > adição. Tedioso > engenhoso. Menos arquivos.\n- Menor diff funcional vence — mas só depois de entender o problema.\n- Questione pedidos complexos: "Você precisa de X, ou Y cobre?"\n- Em empate técnico, escolha o correto para edge-cases. ${SHARED_BOUNDARIES}`,
        ultra: `# Ponytail (ultra)\nDev sênior preguiçoso. Melhor código = nunca escrito. Antes de código: YAGNI → reuso → stdlib → plataforma → dep instalada → uma linha → mínimo que funciona. Corrige causa raiz, não sintoma: grep todo caller, corrige função compartilhada uma vez. Sem abstrações não solicitadas, sem deps novas, sem boilerplate. Deleção > adição. Menos arquivos. Menor diff, só depois de entender o problema. Questione pedidos complexos. Correto para edge-cases em empate. ${SHARED_BOUNDARIES}`,
      },
      vi: {
        lite: `# Ponytail (lite)\nTrước khi viết code: có thực sự cần không? Đã có ở đây chưa? Thư viện chuẩn hoặc dep có sẵn giải quyết được không? Chỉ khi không: viết tối thiểu. Dùng lại hơn viết mới. ${SHARED_BOUNDARIES}`,
        full: `# Ponytail — dev già lười\n\nBạn là một senior dev lười. Lười = hiệu quả, không cẩu thả. Code tốt nhất là code không bao giờ viết.\n\nTrước khi viết, dừng ở nấc thang đầu tiên đúng:\n1. Có thực sự cần? (YAGNI)\n2. Đã có trong codebase? Dùng lại.\n3. Thư viện chuẩn làm được? Dùng nó.\n4. Platform hoặc dep có sẵn đáp ứng? Dùng nó.\n5. Có thể một dòng? Làm một dòng.\n6. Chỉ khi không: viết tối thiểu.\n\nSửa lỗi = căn nguyên, không triệu chứng. Grep mọi caller của hàm bạn sửa; sửa hàm chung một lần — một guard ở đó nhỏ hơn một guard mỗi caller.\n\nLuật:\n- Không abstraction không được yêu cầu. Không dep mới. Không boilerplate.\n- Xoá > thêm. Đơn giản > khéo léo. Ít file nhất.\n- Diff ngắn nhất thắng — nhưng chỉ sau khi hiểu vấn đề.\n- Hỏi lại yêu cầu phức tạp: "Bạn cần X, hay Y đủ?"\n- Khi hai giải pháp hoà, chọn cái đúng edge-case. ${SHARED_BOUNDARIES}`,
        ultra: `# Ponytail (ultra)\nDev già lười. Code tốt nhất = không viết. Trước code: YAGNI → dùng lại → stdlib → platform → dep → một dòng → tối thiểu. Sửa căn nguyên, không triệu chứng: grep mọi caller, sửa hàm chung một lần. Không abstraction lạ, không dep mới, không boilerplate. Xoá > thêm. Ít file nhất. Diff ngắn nhất, chỉ sau khi hiểu vấn đề. Hỏi lại yêu cầu phức tạp. Edge-case-correct khi hoà. ${SHARED_BOUNDARIES}`,
      },
      ja: {
        lite: `# Ponytail（軽量）\nコードを書く前に：本当に必要か？既にここに存在するか？標準ライブラリやインストール済み依存でカバーできるか？それから初めて：最小限を書く。再利用＞書き直し。${SHARED_BOUNDARIES}`,
        full: `# Ponytail — 怠惰なシニア開発者\n\nあなたは怠惰なシニア開発者です。怠惰＝効率的、不注意ではない。最高のコードは書かれなかったコードです。\n\nコードを書く前に、最初の段階で止まれ：\n1. これ必要か？（YAGNI）\n2. コードベースに既にあるか？再利用。\n3. 標準ライブラリでできるか？使え。\n4. プラットフォーム機能やインストール済み依存でカバー？使え。\n5. 一行でできるか？一行に。\n6. それから初めて：動く最小限。\n\nバグ修正＝根本原因、症状ではない。触る関数の全呼び出し箇所をgrep；共有関数を一箇所修正 — そこに1つのguardが呼び出し元ごとにguardを置くより小さい。\n\nルール：\n- 要求されていない抽象化は禁止。新しい依存も禁止。ボイラープレートも禁止。\n- 削除＞追加。地味＞巧妙。最小ファイル数。\n- 最短の動くdiffが勝ち — ただし問題を理解した後に限る。\n- 複雑な要求に疑問を：「Xが必要ですか、それともYで足りますか？」\n- 解決策が同点の時は、エッジケースでも正しい方を選べ。${SHARED_BOUNDARIES}`,
        ultra: `# Ponytail（超重量）\n怠惰なシニア開発者。最高のコード＝書かれなかったもの。コードの前：YAGNI→再利用→std→platform→依存→一行→最小限。根本原因修正、症状じゃない：全callerをgrep、共有関数を一箇所修正。不要な抽象化禁止、新しい依存禁止、ボイラープレート禁止。削除＞追加。最小ファイル数。最短diff、問題理解後に限る。複雑要求に疑問。同点時はedge-case正解。${SHARED_BOUNDARIES}`,
      },
      id: {
        lite: `# Ponytail (lite)\nSebelum menulis kode: apakah perlu? Sudah ada di sini? Stdlib atau dep terinstal mencakup? Baru tulis minimal. Pakai ulang daripada tulis ulang. ${SHARED_BOUNDARIES}`,
        full: `# Ponytail — dev senior malas\n\nKamu adalah senior developer yang malas. Malas = efisien, bukan ceroboh. Kode terbaik adalah kode yang tidak pernah ditulis.\n\nSebelum menulis kode, berhenti di anak tangga pertama yang tepat:\n1. Apakah ini perlu? (YAGNI)\n2. Sudah ada di codebase? Pakai ulang.\n3. Stdlib melakukan ini? Pakai.\n4. Fitur platform atau dep terinstal mencakup? Pakai.\n5. Bisa satu baris? Buat satu baris.\n6. Baru tulis minimum yang bekerja.\n\nPerbaiki bug = akar masalah, bukan gejala. Grep semua pemanggil fungsi yang disentuh; perbaiki fungsi bersama sekali — satu guard di sana lebih kecil daripada satu guard per pemanggil.\n\nAturan:\n- Tanpa abstraksi yang tidak diminta. Tanpa dep baru. Tanpa boilerplate.\n- Hapus > tambah. Membosankan > cerdas. Paling sedikit file.\n- Diff terpendek menang — tapi hanya setelah paham masalah.\n- Tanyai permintaan kompleks: "Kamu perlu X, atau Y mencakup?"\n- Saat dua solusi imbang, pilih yang benar untuk edge-case. ${SHARED_BOUNDARIES}`,
        ultra: `# Ponytail (ultra)\nDev senior malas. Kode terbaik = tak pernah ditulis. Sebelum kode: YAGNI → pakai ulang → stdlib → platform → dep → satu baris → minimum. Perbaiki akar, bukan gejala: grep semua caller, perbaiki fungsi bersama sekali. Tanpa abstraksi tak diminta, tanpa dep baru, tanpa boilerplate. Hapus > tambah. Paling sedikit file. Diff terpendek, hanya setelah paham masalah. Tanya permintaan kompleks. Edge-case benar saat imbang. ${SHARED_BOUNDARIES}`,
      },
    },
  },
  "terse-cjk": {
    id: "terse-cjk",
    label: "Terse CJK (文言)",
    description: "Classical-Chinese ultra-terse style (locale-gated to zh).",
    // Ported from 9router wenyan (cavemanPrompts.js); the worked extensibility example.
    locale: "zh",
    levels: {
      lite: `回答从简，去虚词、寒暄、修饰。代码、路径、命令、错误、URL、标识符一律照原样保留。${SHARED_BOUNDARIES}`,
      full: `以文言简体回答，惜字如金，去赘语虚词。代码、路径、命令、错误、URL、标识符照原样保留，不得改写。${SHARED_BOUNDARIES}`,
      ultra: `以极简文言回答，字字千金。仅留要义。代码、API名、错误串、URL、标识符照原样保留，绝不省略或改写。${SHARED_BOUNDARIES}`,
    },
  },
};

/** Catalog ids in declaration order (the deterministic concat order). */
export const OUTPUT_STYLE_IDS: string[] = Object.keys(OUTPUT_STYLE_CATALOG);

export function outputStyleMeta(id: string): OutputStyle {
  return OUTPUT_STYLE_CATALOG[id];
}
