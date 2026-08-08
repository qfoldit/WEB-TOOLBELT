import type { ToolCall, ToolResult } from "../core/types";
import type { ToolDefinition } from "./schemas";
import { TOOL_DEFINITIONS } from "./schemas";

export type ToolHandler = (args: Record<string, unknown>) => Promise<ToolResult> | ToolResult;

export class ToolRegistry {
  private handlers = new Map<string, ToolHandler>();

  register(name: string, handler: ToolHandler): void { this.handlers.set(name, handler); }
  list(): ToolDefinition[] { return TOOL_DEFINITIONS.filter(tool => this.handlers.has(tool.name)); }

  async call(request: ToolCall): Promise<ToolResult> {
    const handler = this.handlers.get(request.name);
    if (!handler) return { ok: false, error: { code: "TOOL_NOT_FOUND", message: `Tool '${request.name}' is not registered.` } };
    try {
      return await handler(request.arguments ?? {});
    } catch (error) {
      return { ok: false, error: { code: "TOOL_EXECUTION_ERROR", message: error instanceof Error ? error.message : String(error) } };
    }
  }
}
