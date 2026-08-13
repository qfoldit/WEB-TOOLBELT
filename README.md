# qFoldIT WEB-TOOLBELT

**Web-native scientific execution, visualization, and control layer for the qFoldIT Scientific Fabric.**

WEB-TOOLBELT is the browser-facing experience and execution adapter of qFoldIT. It provides a lightweight 3D environment, local interaction physics, telemetry, scientific-state visualization, and an adapter boundary for MCP/WebMCP-driven orchestration.

It is intentionally **not a scientific solver** and does not embed heavyweight Python, ML, or quantum workloads in the browser. It consumes canonical scientific state produced by qFoldIT services and exposes browser capabilities through a stable tool interface.

## Position in qFoldIT

```text
Physical / Experimental Sources
        │
        ▼
Observation Adapters
(e.g. DropleX)
        │
        ▼
qFoldIT Scientific Services
(bio-ml / rosetta / autoresearch / quantum-adapter / plant / ...)
        │
        ▼
Canonical Scientific State
        │
        ├───────────────┬────────────────┐
        ▼               ▼                ▼
 WEB-TOOLBELT       Virtual Lab       Engine Adapters
 Web / 3D           Simulation        UEFN / Unity / UNIGINE
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                 Human + AI interaction
```

## Design principles

1. **Canonical state first** — tools consume and produce normalized qFoldIT state rather than engine-specific data.
2. **Adapters over coupling** — scientific solvers, video analysis, engines, and UI transports remain replaceable.
3. **Browser-native execution** — Three.js/WebGL/WebGPU and Rapier.js/WASM provide the local runtime.
4. **MCP/WebMCP boundary** — AI orchestration talks to declared capabilities, not internal implementation details.
5. **Scientific backend stays authoritative** — browser physics is for interaction and visualization; authoritative scientific calculations remain external.
6. **Replay and live observation** — the same observation schema can represent recorded experiments and live streams.
7. **Engine portability** — the canonical state is designed to be consumable by Web, UEFN, Unity, and UNIGINE adapters.

## Current scope

- Three.js scene runtime
- Rapier.js physics runtime
- canonical scientific-state types
- tool registry and tool declarations
- browser MCP/WebMCP bridge abstraction
- qFoldIT Gateway client abstraction
- observation and trajectory types
- DropleX HTTP adapter contract
- scene, physics, and telemetry tools
- scientific-state loading tools
- video-analysis tool contracts
- adapter registry
- event-driven UI

## Scientific and integration provenance

qFoldIT WEB-TOOLBELT is designed to integrate and interoperate with external scientific and educational work. Where this repository uses concepts, workflows, interfaces, or integration requirements derived from external projects, the originating work is explicitly acknowledged.

### Neil Voss / VossLab — Virtual-Lab-Simulation

The qFoldIT integration architecture acknowledges **Neil Voss / VossLab** and the **Virtual-Lab-Simulation** project as an upstream/reference work for browser-based laboratory simulation and scientific 3D interaction.

- Project: https://github.com/qfoldit/Virtual-Lab-Simulation
- Author / project attribution: Neil Voss / VossLab
- qFoldIT use: integration and interoperability boundary; scientific laboratory visualization and simulation concepts are kept behind adapter contracts.

No claim is made that Neil Voss authored qFoldIT WEB-TOOLBELT source code unless a specific file or contribution is separately identified.

### Silvia Holler / DropleX

The qFoldIT integration architecture acknowledges **Silvia Holler** and the **DropleX** work used as the reference observation/tracking pipeline for video analysis and active-matter experiments.

- Project: https://github.com/skandiz/DropleX
- Contributor / scientific attribution: Silvia Holler
- qFoldIT use: the WEB-TOOLBELT DropleX adapter defines a replaceable boundary for recorded-video analysis and live observation workflows.

The DropleX project and its source code remain under their original license and ownership. qFoldIT WEB-TOOLBELT does not relicense external DropleX code.

For attribution and external-work details, see [`ATTRIBUTIONS.md`](ATTRIBUTIONS.md) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Deliberately external

The repository does **not** vendor DropleX, Python scientific solvers, OpenMM/Rosetta/RDKit, quantum backends, or qFoldIT Kubernetes infrastructure. Those systems are accessed through qFoldIT services and adapters.

This separation preserves independent licensing, provenance, deployment, and upgrade paths for external systems.

## Video modes

### File replay

```text
Browser file
  ↓
optional ffmpeg.wasm preprocessing
  ↓
qFoldIT Gateway
  ↓
DropleX adapter
  ↓
tracking observations
  ↓
3D visualization
```

### Live camera

```text
RTSP / MJPEG camera
  ↓
qFoldIT Stream Gateway
  ↓
frame sampling / protocol conversion
  ↓
DropleX adapter
  ↓
observation stream
  ↓
WEB-TOOLBELT
```

RTSP termination is intentionally server-side.

## Relationship to qFoldIT Toolbelts

WEB-TOOLBELT is a peer of the qFoldIT engine toolbelts:

```text
Canonical Scientific State
        ↓
Experience / Engine Adapter
        ↓
UEFN | Unity | UNIGINE | Web
```

The web implementation is therefore not a dependency of the engine implementations. The common dependency is the canonical qFoldIT state and capability contract.

## Development

Requirements: Node.js 20+, npm.

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Configuration

Copy `.env.example` to `.env.local`:

```text
VITE_QFOLDIT_GATEWAY_URL=http://localhost:8080
VITE_QFOLDIT_OBSERVATION_WS=ws://localhost:8080/observations
VITE_WEBMCP_ENABLED=true
```

Never put private credentials in browser configuration.

## qFoldIT Toolbelt Attribution

This repository follows the qFoldIT Toolbelt licensing and visible-attribution
standard. Derivative tools, plugins, applications, or services that use, derive
from, or are substantially built upon this codebase or its architecture must
provide a visible credit naming qFoldIT and linking to this repository.

Recommended credit:

> Built on qFoldIT WEB-TOOLBELT by qFoldIT
> (https://github.com/qfoldit/WEB-TOOLBELT)

## Licensing

qFoldIT WEB-TOOLBELT is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See [`LICENSE`](LICENSE).

Third-party software, libraries, research projects, datasets, assets, and external services retain their own licenses and attribution requirements. This repository does not grant rights to third-party intellectual property.

## Status

This repository is an architectural foundation and integration layer. It does not claim that the qFoldIT Gateway, DropleX backend, external scientific services, or production camera infrastructure are already deployed.
