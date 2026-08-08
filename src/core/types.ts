export type Vector3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };

export type ScientificObject = {
  id: string;
  kind: string;
  label?: string;
  position: Vector3;
  rotation?: Quaternion;
  properties?: Record<string, unknown>;
};

export type TrackPoint = {
  timestamp: number;
  position: Vector3;
  velocity?: Vector3;
  acceleration?: Vector3;
  confidence?: number;
};

export type Trajectory = { objectId: string; points: TrackPoint[] };

export type ObservationFrame = {
  observationId: string;
  timestamp: number;
  source: string;
  tracks: Array<{
    objectId: string;
    position: Vector3;
    velocity?: Vector3;
    acceleration?: Vector3;
    confidence?: number;
  }>;
  metadata?: Record<string, unknown>;
};

export type ScientificState = {
  schema: "qfoldit.scientific-state/v1";
  stateId: string;
  timestamp: number;
  domain: string;
  objects: ScientificObject[];
  trajectories?: Trajectory[];
  observations?: ObservationFrame[];
  metrics?: Record<string, number>;
  metadata?: Record<string, unknown>;
};

export type ToolCall = { name: string; arguments?: Record<string, unknown> };
export type ToolResult = {
  ok: boolean;
  data?: unknown;
  error?: { code: string; message: string };
};
