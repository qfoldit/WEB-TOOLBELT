export function emit(type: string, detail: unknown): void {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
