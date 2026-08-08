export type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
};

const object = (properties: Record<string, unknown>, required: string[] = []) => ({
  type: "object" as const, properties, required
});

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  { name: "init_scene", description: "Initialize the qFoldIT 3D scene and physics environment.", inputSchema: object({ gravity: { type: "object" }, grid: { type: "boolean" } }) },
  { name: "spawn_object", description: "Create a visual object from canonical scientific state.", inputSchema: object({ id: { type: "string" }, kind: { type: "string" }, position: { type: "object" }, properties: { type: "object" } }, ["id", "kind", "position"]) },
  { name: "remove_object", description: "Remove a visual object from the scene.", inputSchema: object({ id: { type: "string" } }, ["id"]) },
  { name: "apply_impulse", description: "Apply a physics impulse through the local interaction layer.", inputSchema: object({ object_id: { type: "string" }, force_vector: { type: "object" } }, ["object_id", "force_vector"]) },
  { name: "run_simulation_steps", description: "Advance local interactive physics.", inputSchema: object({ steps: { type: "integer", minimum: 1 } }, ["steps"]) },
  { name: "get_telemetry", description: "Return local physics telemetry.", inputSchema: object({}) },
  { name: "load_scientific_data", description: "Load canonical qFoldIT scientific state into the web visualization layer.", inputSchema: object({ state: { type: "object" } }, ["state"]) },
  { name: "get_scientific_state", description: "Return the currently loaded canonical scientific state.", inputSchema: object({}) },
  { name: "clear_scientific_state", description: "Clear the loaded scientific state.", inputSchema: object({}) },
  { name: "capture_viewport", description: "Capture the current 3D viewport as a PNG data URL.", inputSchema: object({}) },
  { name: "analyze_video_file", description: "Submit a recorded video to the qFoldIT video-analysis gateway.", inputSchema: object({ source_ref: { type: "string" }, tracking_profile: { type: "string" }, sampling_fps: { type: "number" } }, ["source_ref"]) },
  { name: "start_video_stream", description: "Start live video analysis through the qFoldIT stream gateway.", inputSchema: object({ source_ref: { type: "string" }, tracking_profile: { type: "string" }, sampling_fps: { type: "number" } }, ["source_ref"]) },
  { name: "stop_video_stream", description: "Stop a live video analysis session.", inputSchema: object({ stream_id: { type: "string" } }, ["stream_id"]) },
  { name: "get_tracking_state", description: "Retrieve the latest tracking observation for a live analysis session.", inputSchema: object({ stream_id: { type: "string" } }, ["stream_id"]) },
  { name: "get_trajectory", description: "Retrieve a tracked object's trajectory.", inputSchema: object({ object_id: { type: "string" }, observation_id: { type: "string" } }, ["object_id", "observation_id"]) },
  { name: "get_motion_metrics", description: "Retrieve derived motion metrics for a tracked object.", inputSchema: object({ object_id: { type: "string" }, observation_id: { type: "string" } }, ["object_id", "observation_id"]) }
];
