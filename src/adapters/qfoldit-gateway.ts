import type { ObservationFrame, ScientificState, ToolResult } from "../core/types";

export class QFoldITGatewayClient {
  constructor(private readonly baseUrl: string, private readonly fetchImpl: typeof fetch = fetch) {}

  async getScientificState(stateId: string): Promise<ScientificState> {
    const response = await this.fetchImpl(`${this.baseUrl}/v1/states/${encodeURIComponent(stateId)}`);
    if (!response.ok) throw new Error(`Gateway request failed: ${response.status}`);
    return response.json() as Promise<ScientificState>;
  }

  async submitTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
    const response = await this.fetchImpl(`${this.baseUrl}/v1/tools/${encodeURIComponent(name)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(args)
    });
    if (!response.ok) {
      return { ok: false, error: { code: `HTTP_${response.status}`, message: response.statusText } };
    }
    return response.json() as Promise<ToolResult>;
  }

  async getObservation(observationId: string): Promise<ObservationFrame> {
    const response = await this.fetchImpl(`${this.baseUrl}/v1/observations/${encodeURIComponent(observationId)}`);
    if (!response.ok) throw new Error(`Observation request failed: ${response.status}`);
    return response.json() as Promise<ObservationFrame>;
  }
}
