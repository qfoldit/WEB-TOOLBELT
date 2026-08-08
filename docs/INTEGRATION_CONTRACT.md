# qFoldIT Integration Contract

Stable boundary:

```text
Capability → Input Schema → Adapter → Canonical Output
```

Rules:

1. No scientific solver code in WEB-TOOLBELT.
2. No engine-specific state in canonical scientific schemas.
3. No DropleX-specific fields required by generic observations.
4. No RTSP implementation in browser code.
5. No private service credentials in the client.
6. Stable tool names; replaceable implementations.
7. Replay and live observations use the same schema.
8. Prefer versioned schemas over implicit object shapes.
