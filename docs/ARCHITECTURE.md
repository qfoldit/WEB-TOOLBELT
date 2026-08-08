# qFoldIT WEB-TOOLBELT Architecture

WEB-TOOLBELT is a browser-native **experience and execution adapter**.

```text
Physical / Experimental Sources
        ↓
Observation Adapters (DropleX, future CV adapters)
        ↓
qFoldIT Scientific Services
        ↓
Canonical Scientific State
        ↓
WEB-TOOLBELT / Virtual Lab / UEFN / Unity / UNIGINE
```

## Core rule

The browser is authoritative for presentation and interaction, not for heavyweight scientific truth.

Scientific solvers, AI models, quantum workloads, and private infrastructure remain behind the qFoldIT Gateway.

## Observation boundary

```text
Recorded video / camera
        ↓
Observation Adapter
        ↓
ObservationFrame
        ↓
ScientificState
```

DropleX is one provider, not the schema owner.

## Live streams

RTSP termination belongs in a server-side qFoldIT Stream Gateway. The browser consumes browser-safe streams or canonical observation events.

## Engine portability

```text
qfoldit.scientific-state/v1
        ├── Web
        ├── UEFN
        ├── Unity
        └── UNIGINE
```

This prevents an engine from becoming the source of truth for scientific data.

## Provenance

The observation boundary is designed to integrate external scientific work without absorbing its ownership. See [`IP_PROVENANCE.md`](IP_PROVENANCE.md) and [`../ATTRIBUTIONS.md`](../ATTRIBUTIONS.md) for the explicit acknowledgements of Neil Voss / VossLab and Silvia Holler / DropleX.
