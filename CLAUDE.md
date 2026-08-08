# Development Invariants for WEB-TOOLBELT (`CLAUDE.md`)

This document enforces strict engineering standards for code creation within the qFoldIT WEB-TOOLBELT layer.

## 🛠️ Environment & Tooling Constraints
* **Node.js Environment:** Target Node.js 20+ runtime using Vite and TypeScript (`esnext`).
* **Licensing:** Strict compliance with GNU AGPL-3.0. Do not vendor or statically link any proprietary or incompatible copyleft code.
* **Architecture Boundary:** Keep scientific solvers external. The browser runtime strictly handles Three.js rendering, Rapier3D WebAssembly physics, WebMCP routing, and the DropleX telemetry client.
* **UI Invariant:** No Scrollbars. The `index.html` viewport must dynamically listen to resize hooks and scale the `<canvas>` buffer seamlessly.

## ⚙️ Environment Variables Matrix
Ensure local `.env.local` contains and validates:
* `VITE_QFOLDIT_GATEWAY_URL` — HTTP endpoint for scientific state synchronization.
* `VITE_QFOLDIT_OBSERVATION_WS` — WebSocket stream endpoint for live DropleX trajectories.
* `VITE_WEBMCP_ENABLED` — Boolean flag controlling autonomous LLM tool execution.

## 🚀 Execution Scripts
* `npm install` — Setup workspace dependencies.
* `npm run dev` — Local hot-reloading development server (port 5173).
* `npm run build` — Generates a static production bundle deployed via `/web-toolbelt/` base path for GitHub Pages.

