# qFoldIT Runtime Adapter

WEB-TOOLBELT is the browser/runtime adapter for qFoldIT.

The web runtime must consume the same canonical scientific state and UAG representation as the other engines:

```text
Scientific Object / Mission
        ↓
qfoldit-core contracts
        ↓
UAG / UWI
        ↓
WEB-TOOLBELT
        ↓
Three.js / Rapier / browser runtime
```

The browser layer must not introduce independent scientific calculations when parity with authoritative validators is required. It is a presentation and interaction target.
