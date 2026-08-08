# Intellectual Property and Provenance Boundary

## Purpose

WEB-TOOLBELT is designed to connect qFoldIT-owned orchestration and canonical scientific state with external scientific projects and platform-specific runtimes without collapsing their intellectual-property boundaries.

## External scientific work

The current integration design explicitly acknowledges:

- **Neil Voss / VossLab — Virtual-Lab-Simulation** for browser-based laboratory simulation and scientific 3D interaction concepts.
- **Silvia Holler — DropleX** for the referenced video tracking and observation-analysis workflow.

See `../ATTRIBUTIONS.md` for the attribution record and source links.

## Boundary rule

External work is integrated through adapters, schemas, APIs, or documented interfaces. External source code is not treated as qFoldIT-owned code merely because qFoldIT provides an adapter for it.

## Licensing rule

- qFoldIT WEB-TOOLBELT source code: AGPL-3.0.
- External projects: their original licenses and notices remain authoritative.
- Third-party assets and trademarks: no rights are granted by this repository.
- qFoldIT services: independently licensed and deployed according to their own repositories and service terms.

## Scientific provenance

Observation data should retain source metadata where available, including source system, adapter identifier, acquisition timestamp, processing version, and relevant attribution or license metadata. This supports reproducibility and downstream provenance across Web, UEFN, Unity, and UNIGINE experiences.
