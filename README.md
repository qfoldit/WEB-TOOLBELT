# WEB-TOOLBELT
A lightweight, web-native AI execution toolbelt and **Model Context Protocol (MCP)** server designed to transform any browser tab into an autonomous 3D simulation laboratory for **Claude Science** and other advanced LLM orchestrators.

Unlike desktop-bound engines (such as Unity or UNIGINE), **WEB-TOOLBELT** runs entirely inside the browser sandboxed environment. It bridges the gap between text-based AI reasoning and real-time physical 3D execution using standard web technologies.

## 🚀 Key Features*   **Zero-Installation Sandbox:** Runs completely in-browser via WebGL/WebGPU. No heavy local installations, IDEs, or compilation cycles required.*   **Model Context Protocol (MCP) Native:** Exposes 3D scene-graph manipulation, telemetry gathering, and physics controls directly to Claude Science via standardized JSON-RPC tools.*   **High-Performance Web Physics:** Integrates **Rapier.js** (compiled to WebAssembly) for lightning-fast rigid body physics, collision detection, and kinematics tracking.*   **Reactive 3D Rendering:** Powered by **Three.js** for immediate visual feedback of molecular structures (e.g., Boltz-2 outputs), vector fields, and robotic simulations.*   **Multimodal Vision Loop:** Built-in viewport capture allows Claude to take high-resolution canvas screenshots to visually verify rendering accuracy.

## 🏗️ Architecture
```
┌────────────────────────────────────────────────────────────────────────┐
│ WEB-TOOLBELT (Browser Tab) │
│ │
│ ┌─────────────────────────┐ ┌─────────────────┐ ┌──────────────────┐ │
│ │ WebMCP API │ │ Three.js Core │ │ Rapier.js (Wasm)│ │
│ │ (Interface for Claude) ├──┤ (3D Visualizer) ├──┤ (Web Physics) │ │
│ └─────────────────────────┘ └─────────────────┘ └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

1.  **WebMCP Server Layer:** Listens to Claude's JSON-RPC requests (`tools/call`) via WebSockets or Web Workers.
2.  **Three.js Engine Layer:** Instantly spawns primitives, adjusts cameras, modifies materials, and loads scientific datasets (e.g., PDB chemical structures).
3.  **Rapier.js Physics Layer:** Updates rigid bodies, friction, gravity, and joints on a sub-millisecond step loop, generating real-time telemetry logs.

## 🛠️ Available MCP Tools

Once connected, Claude Science gains access to the following programmatic tools:

*   `init_scene(gravity, grid)` — Initializes a blank 3D environment with precise physics parameters.
*   `spawn_object(type, position, physics_mode, props)` — Creates shapes (spheres, cubes, custom meshes) with static or dynamic physics properties.
*   `load_scientific_data(format, raw_data)` — Parses specialized scientific formats (like PDB for molecular docking) into complex 3D atom bonds.
*   `apply_impulse(object_id, force_vector)` — Applies mechanical forces to simulated objects.
*   `run_simulation_steps(steps)` — Advances the physics world clock by `N` frames.
*   `get_telemetry()` — Returns a JSON array containing velocities, angular momentum, and collision impact data.
*   `capture_viewport()` — Sends a Base64 PNG snapshot of the canvas back to Claude's vision matrix.

## 📁 Repository Structure

```text
WEB-TOOLBELT/
├── src/
│   ├── mcp/             # WebMCP protocol and tool declarations
│   │   ├── server.ts    # JSON-RPC request router
│   │   └── tools.ts     # Definition of tools exposed to the AI
│   ├── engine/          # 3D Graphics and Physics setup
│   │   ├── scene.ts     # Three.js viewport initialization
│   │   └── physics.ts   # Rapier.js Wasm simulation loop
│   └── main.ts          # Core orchestrator entry point
├── index.html           # Web interface (Canvas + MCP Status panel)
├── package.json         # Project dependencies
└── vite.config.ts       # Build configuration for WebAssembly assets
```

## ⚡ Quick Start (Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### 1. Clone and Install
```bash
git clone https://github.com
cd WEB-TOOLBELT
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Connect to Claude Science
Add your local development URL (`http://localhost:5173`) or your deployed GitHub Pages endpoint to your Claude Science MCP settings configuration file.
