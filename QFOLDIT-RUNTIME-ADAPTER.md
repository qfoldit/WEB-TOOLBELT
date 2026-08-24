# qFoldIT Runtime Adapter Boundary

This repository is a web-runtime capability source for the canonical qFoldIT Rust runtime-adapter contract.

Canonical contract: `qfoldit.runtime-adapter/1.0`

The web runtime is a presentation/execution adapter. It must consume canonical UAG/UWI state and return provenance-preserving runtime submissions. It must not define a parallel scientific authority.

```text
qfoldit-core
  -> runtime-adapters
  -> Web adapter
  -> Web runtime
  -> Submission
  -> Validator
  -> Evidence 1.1
```

New cross-engine runtime semantics belong in `qfoldit/UEFN-QFOLDIT/crates/runtime-adapters`.
