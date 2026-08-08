# MCP / WebMCP Boundary

`ToolRegistry` is the protocol-neutral capability layer.

`WebMCPBridge` is the browser transport boundary.

This separation allows protocol evolution without coupling MCP/WebMCP details to scene, physics, scientific state, or adapters.

Current capability groups:

- Scene
- Physics
- Scientific state
- Video observation

Private credentials must never be exposed to page-level tools. Privileged operations belong behind the qFoldIT Gateway.
