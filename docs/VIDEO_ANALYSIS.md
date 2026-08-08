# Video Analysis Integration

## File mode

```text
File
 ↓
optional browser preprocessing (ffmpeg.wasm)
 ↓
qFoldIT Gateway
 ↓
DropleX Adapter
 ↓
ObservationFrame / Trajectory
 ↓
Scientific State
 ↓
3D visualization
```

## Live mode

```text
RTSP / MJPEG
 ↓
qFoldIT Stream Gateway
 ↓
sampling / buffering / protocol conversion
 ↓
DropleX
 ↓
observation events
 ↓
WEB-TOOLBELT
```

The gateway provides authentication, camera credential isolation, protocol termination, rate limiting, frame sampling, backpressure, and observability.

WEB-TOOLBELT does not import Python DropleX code. It calls stable qFoldIT Gateway capabilities.

## Attribution and licensing boundary

The DropleX integration is an adapter contract, not a vendored copy of the DropleX implementation. The project explicitly acknowledges Silvia Holler and preserves the independent licensing and ownership of DropleX. See [`../ATTRIBUTIONS.md`](../ATTRIBUTIONS.md).
