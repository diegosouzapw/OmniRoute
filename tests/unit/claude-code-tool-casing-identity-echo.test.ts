import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { restoreClaudeToolName } from "../../open-sse/services/claudeCodeToolRemapper.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

interface ClaudeEvent {
  type: string;
  index?: number;
  content_block?: { type: string; id?: string; name?: string; input?: unknown };
}

type TranslatorState = Record<string, unknown>;

function firstToolUse(events: ClaudeEvent[] | null): ClaudeEvent["content_block"] {
  return events?.find(
    (e) => e.type === "content_block_start" && e.content_block?.type === "tool_use"
  )?.content_block;
}

function openaiToolCallChunk(name: string): { choices: Array<Record<string, unknown>> } {
  return {
    choices: [
      {
        delta: {
          tool_calls: [{ index: 0, id: "call_echo", function: { name, arguments: "" } }],
        },
      },
    ],
  };
}

/**
 * Claude Code 2.1.x added CronCreate/CronList/CronDelete/ScheduleWakeup/
 * EnterWorktree. The `/loop` skill schedules via CronCreate; upstream gateways
 * that emit the lowercased name (and echo it into the toolNameMap alias
 * channel) previously let `croncreate` reach Claude Code un-restored, which
 * the CLI rejects with "No such tool available" — killing /loop AND every
 * other native tool call emitted in lowercase form.
 */
describe("Claude Code cron-era tool names survive identity-echo alias maps", () => {
  const ECHO_MAPS = [
    ["identity entry croncreate→croncreate", new Map([["croncreate", "croncreate"]])],
    ["cloak-direction entry CronCreate→croncreate", new Map([["CronCreate", "croncreate"]])],
    [
      "identity + unrelated aliases",
      new Map([
        ["subdispatch", "SubDispatch"],
        ["croncreate", "croncreate"],
      ]),
    ],
  ] as const;

  for (const [label, map] of ECHO_MAPS) {
    it(`restoreClaudeToolName upgrades echoed lowercase cron tools — ${label}`, () => {
      assert.equal(restoreClaudeToolName("croncreate", map), "CronCreate");
      assert.equal(restoreClaudeToolName("cronlist", map), "CronList");
      assert.equal(restoreClaudeToolName("crondelete", map), "CronDelete");
      assert.equal(restoreClaudeToolName("schedulewakeup", map), "ScheduleWakeup");
      assert.equal(restoreClaudeToolName("enterworktree", map), "EnterWorktree");
      assert.equal(restoreClaudeToolName("bash", map), "Bash");
      assert.equal(restoreClaudeToolName("taskcreate", map), "TaskCreate");
      assert.equal(restoreClaudeToolName("taskupdate", map), "TaskUpdate");
      assert.equal(restoreClaudeToolName("tasklist", map), "TaskList");
      assert.equal(restoreClaudeToolName("taskget", map), "TaskGet");
    });

    it(`openaiToClaudeResponse emits PascalCase content_block.name — ${label}`, () => {
      const state: TranslatorState = {
        toolCalls: new Map(),
        nextBlockIndex: 0,
        toolNameMap: map,
      };
      const block = firstToolUse(
        openaiToClaudeResponse(openaiToolCallChunk("croncreate"), state) as ClaudeEvent[]
      );
      assert.equal(block?.name, "CronCreate");
    });
  }

  it("request-side non-identity alias still beats canonical casing", () => {
    // A client that actually declared a custom lowercase MCP-style name keeps it.
    const map = new Map([
      ["read", "mcp__fs__read"],
      ["croncreate", "CronCreate"],
    ]);
    assert.equal(restoreClaudeToolName("read", map), "mcp__fs__read");
  });

  it("unknown tools with identity entries are preserved verbatim", () => {
    const map = new Map([["my_custom_tool", "my_custom_tool"]]);
    assert.equal(restoreClaudeToolName("my_custom_tool", map), "my_custom_tool");
  });

  it("canonical echo stays canonical on no-map routes (live repro 2026-08-22)", () => {
    // Live-tested against glm-5.2 via opencode-go: the request declared
    // CronCreate/Bash, the gateway echoed them TitleCase, and claude-to-openai
    // builds no _toolNameMap — the old #7926 REVERSE_MAP fallback downcased
    // the echo to `croncreate`/`bash`, which Claude Code rejects with
    // "No such tool available", killing those tools for the whole session.
    // Every restoreClaudeToolName caller converts toward a Claude-format
    // client, so blind TitleCase→lowercase downcasing has no legitimate
    // consumer left: legacy lowercase clients are protected by explicit
    // alias maps (see test above), not by unmapped downcasing.
    assert.equal(restoreClaudeToolName("TodoWrite", null), "TodoWrite");
    assert.equal(restoreClaudeToolName("Read", undefined), "Read");
    assert.equal(restoreClaudeToolName("WebSearch", null), "WebSearch");
  });
});

/**
 * Live-reproduced 2026-08-22: an `ox-alpha-free` upstream answered the
 * stream:true /v1/messages request with a non-streaming JSON body; omniroute
 * converted it via translateNonStreamingResponse, which emitted tool_use.name
 * verbatim ("bash") — Claude Code rejected it with "No such tool available",
 * killing Bash/Read/Write/CronCreate for the whole session.
 */
describe("translateNonStreamingResponse restores Claude Code tool casing", () => {
  function openaiJson(name: string) {
    return {
      id: "202608221120471ad3e3bd71e24afd",
      object: "chat.completion",
      choices: [
        {
          index: 0,
          finish_reason: "tool_calls",
          message: {
            role: "assistant",
            content: null,
            reasoning_content: "The user wants echo ok",
            tool_calls: [
              {
                id: "call_b90e72ccc16f440c88c4f9e6",
                type: "function",
                function: { name, arguments: '{"command":"echo ok"}' },
              },
            ],
          },
        },
      ],
      usage: { prompt_tokens: 246, completion_tokens: 35 },
    };
  }

  it("upgrades lowercase native tool names with no alias map (live repro)", () => {
    const out = translateNonStreamingResponse(
      openaiJson("bash"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      null
    );
    const toolUse = out.content.find((b) => b.type === "tool_use");
    assert.equal(toolUse.name, "Bash");
    assert.equal(toolUse.input.command, "echo ok");
  });

  it("upgrades cron-era tools through identity-echo maps", () => {
    const out = translateNonStreamingResponse(
      openaiJson("croncreate"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      new Map([["croncreate", "croncreate"]])
    );
    assert.equal(out.content.find((b) => b.type === "tool_use").name, "CronCreate");
  });

  it("request-side aliases still win over canonical casing", () => {
    const out = translateNonStreamingResponse(
      openaiJson("read"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      new Map([["read", "mcp__fs__read"]])
    );
    assert.equal(out.content.find((b) => b.type === "tool_use").name, "mcp__fs__read");
  });

  it("keeps canonical casing the upstream echoed verbatim when no alias map exists (live repro #11085)", () => {
    // Live-tested on the Claude Code → OpenAI-style upstream route: the request
    // declares CronCreate/Bash, the gateway echoes them TitleCase, and
    // claude-to-openai builds no _toolNameMap — the #7926 REVERSE_MAP fallback
    // must not downcase a canonical name back into "No such tool available".
    const out = translateNonStreamingResponse(
      openaiJson("CronCreate"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      null
    );
    assert.equal(out.content.find((b) => b.type === "tool_use").name, "CronCreate");
    assert.equal(restoreClaudeToolName("Bash", null), "Bash");
    assert.equal(restoreClaudeToolName("WebSearch", null), "WebSearch");
    assert.equal(restoreClaudeToolName("TaskCreate", new Map()), "TaskCreate");
  });

  it("declared lowercase form still wins when an explicit alias maps canonical → lowercase", () => {
    // Legacy OpenCode/XML-style clients declare `bash`; request-side cloak
    // records { CronCreate→croncreate }-style aliases and restoreClaudeToolName
    // must keep honoring them even when the upstream echoes the canonical form.
    assert.equal(
      restoreClaudeToolName("CronCreate", new Map([["CronCreate", "croncreate"]])),
      "croncreate"
    );
    assert.equal(restoreClaudeToolName("Read", new Map([["Read", "read"]])), "read");
  });
});
