import type { ScientificState } from "./types";

export class ScientificStateStore {
  private state: ScientificState | null = null;
  set(state: ScientificState): void { this.state = state; }
  get(): ScientificState | null { return this.state; }
  clear(): void { this.state = null; }
}
