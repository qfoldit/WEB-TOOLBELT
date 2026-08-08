# qFoldIT Scientific State v1

Schema identifier:

`qfoldit.scientific-state/v1`

The schema bridges scientific services, video observations, simulations, 3D visualization, and engine adapters.

Core concepts:

- **ScientificObject** — stable spatial object plus domain properties.
- **TrackPoint** — timestamped position with optional velocity, acceleration, confidence.
- **Trajectory** — ordered TrackPoints for one object.
- **ObservationFrame** — timestamped observations from physical or simulated sources.
- **ScientificState** — versioned container for objects, observations, trajectories, metrics, and metadata.

The browser may manipulate visual state. Authoritative scientific results remain in qFoldIT services.
