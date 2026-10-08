import { type ChildProcess } from "node:child_process";
import { Readable, Writable } from "node:stream";
import * as acp from "@agentclientprotocol/sdk";
import { boundedFrames } from "./buffers";

export class NativeAcpClient {
  readonly connection: acp.ClientConnection;
  private sessionId?: string;

  constructor(child: ChildProcess, onText: (text: string) => void) {
    if (!child.stdin || !child.stdout) throw new Error("ACP agent stdio is unavailable");
    const input = Readable.toWeb(child.stdout) as ReadableStream<Uint8Array>;
    const output = Writable.toWeb(child.stdin) as WritableStream<Uint8Array>;
    const app = acp
      .client({ name: "omniroute" })
      .onRequest(acp.methods.client.session.requestPermission, () => ({
        outcome: { outcome: "cancelled" },
      }))
      .onNotification(acp.methods.client.session.update, ({ params }) => {
        if (params.sessionId !== this.sessionId) return;
        const update = params.update;
        if (update.sessionUpdate === "agent_message_chunk" && update.content.type === "text")
          onText(update.content.text);
      });
    this.connection = app.connect(acp.ndJsonStream(output, input.pipeThrough(boundedFrames())));
  }

  async initialize(cwd: string): Promise<void> {
    const response = await this.connection.agent.request(acp.methods.agent.initialize, {
      protocolVersion: acp.PROTOCOL_VERSION,
      clientCapabilities: {},
    });
    if (response.protocolVersion !== acp.PROTOCOL_VERSION)
      throw new Error("ACP protocol version is unsupported");
    const session = await this.connection.agent.request(acp.methods.agent.session.new, {
      cwd,
      mcpServers: [],
    });
    this.sessionId = session.sessionId;
  }

  async prompt(text: string): Promise<void> {
    if (!this.sessionId) throw new Error("ACP session is not initialized");
    await this.connection.agent.request(acp.methods.agent.session.prompt, {
      sessionId: this.sessionId,
      prompt: [{ type: "text", text }],
    });
  }

  async cancel(): Promise<void> {
    if (this.sessionId)
      await this.connection.agent.notify(acp.methods.agent.session.cancel, {
        sessionId: this.sessionId,
      });
  }

  close(): void {
    this.connection.close();
  }
}
