import { Application } from "./app/application";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("qFoldIT WEB-TOOLBELT root element was not found.");

new Application().start(root).catch((error) => {
  console.error(error);
  root.textContent = `WEB-TOOLBELT initialization failed: ${String(error)}`;
});
