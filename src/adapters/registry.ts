export interface ScientificAdapter {
  readonly id: string;
  readonly capabilities: readonly string[];
}

export class AdapterRegistry {
  private adapters = new Map<string, ScientificAdapter>();
  register(adapter: ScientificAdapter): void { this.adapters.set(adapter.id, adapter); }
  get(id: string): ScientificAdapter | undefined { return this.adapters.get(id); }
  list(): ScientificAdapter[] { return [...this.adapters.values()]; }
}
