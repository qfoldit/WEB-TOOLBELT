# qFoldIT Platform Contract Alignment

## Role

WEB-TOOLBELT is the browser-native qFoldIT runtime and public scientific-world projection layer. It consumes canonical mission and scientific state and presents interactive experiences without becoming the scientific solver.

## Canonical contracts

- `qfoldit.mission/1.0`
- `qfoldit.scientific-state/1.0`
- `qfoldit.uag/1.0`
- `qfoldit.engine-adapter/1.0`
- `qfoldit.event/1.0`

## Runtime principle

Web clients should consume safe, versioned projections. Private mission records, protected references and credentials remain server-side.

## UAG principle

The browser runtime should consume UAG-compatible world descriptions and keep rendering-specific state behind the web adapter boundary.

## Scientific integrity

Client-side visualization and interaction may generate candidate inputs and evidence references. Scientific scores must be obtained from the authoritative validation path.
