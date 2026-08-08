import type { ToolCall } from "../core/types";
import type { ToolRegistry } from "./registry";

type Message =
  | { type: "qfoldit.tools/list" }
  | { type: "qfoldit.tools/call"; requestId: string; call: ToolCall };

export class WebMCPBridge {
  private listener?: (event: MessageEvent<Message>) => void;

  constructor(private readonly registry: ToolRegistry) {}

  start(): void {
    this.listener = async (event) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;

      if (message.type === "qfoldit.tools/list") {
        window.postMessage({ type: "qfoldit.tools/list/result", tools: this.registry.list() }, window.location.origin);
        return;
      }

      if (message.type === "qfoldit.tools/call") {
        const result = await this.registry.call(message.call);
        window.postMessage({ type: "qfoldit.tools/call/result", requestId: message.requestId, result }, window.location.origin);
      }
    };
    window.addEventListener("message", this.listener);
  }

  stop(): void {
    if (this.listener) window.removeEventListener("message", this.listener);
  }
}
