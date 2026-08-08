export class StatusPanel {
  private readonly root: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.root.style.cssText = [
      "position:fixed","left:16px","bottom:16px","z-index:10",
      "padding:10px 14px","border:1px solid rgba(255,255,255,.12)",
      "border-radius:10px","background:rgba(10,14,20,.82)","color:#d7e2ef",
      "font:12px ui-monospace,SFMono-Regular,Menlo,monospace",
      "backdrop-filter:blur(10px)"
    ].join(";");
    parent.appendChild(this.root);
  }

  set(message: string): void { this.root.textContent = `qFoldIT WEB-TOOLBELT · ${message}`; }
}
