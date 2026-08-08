# Migration from the Current WEB-TOOLBELT

The current public repository is a very small foundation. Its README describes a `src/` architecture, but the current repository tree contains only the top-level project files.

This package supplies that missing architecture as a qFoldIT-oriented foundation while preserving the original intent:

- browser-native 3D;
- Three.js;
- Rapier.js;
- MCP/WebMCP-oriented tool access;
- scientific visualization;
- viewport capture.

Architectural additions:

- canonical qFoldIT scientific state;
- adapter registry;
- qFoldIT Gateway client;
- DropleX adapter contract;
- video file/live tool contracts;
- explicit separation of observation, scientific services, and rendering;
- engine-portable state model;
- UEFN/Unity/UNIGINE interoperability boundary.

This is a foundation: it does not claim that the Gateway, DropleX backend, or external scientific services are already deployed.
