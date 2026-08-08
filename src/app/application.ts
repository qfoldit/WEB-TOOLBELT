import { ScientificStateStore } from "../core/state";
import { emit } from "../core/events";
import { SceneEngine } from "../engine/scene";
import { PhysicsEngine } from "../engine/physics";
import { startRenderLoop } from "../engine/renderer";
import { QFoldITGatewayClient } from "../adapters/qfoldit-gateway";
import { DropleXAdapter } from "../adapters/droplex";
import { ToolRegistry } from "../mcp/registry";
import { WebMCPBridge } from "../mcp/webmcp-bridge";
import { StatusPanel } from "../ui/status-panel";
import type { ScientificState, ToolResult } from "../core/types";

export class Application {
  private readonly state = new ScientificStateStore();
  private readonly tools = new ToolRegistry();
  private readonly physics = new PhysicsEngine();
  private readonly gateway = new QFoldITGatewayClient(
    import.meta.env.VITE_QFOLDIT_GATEWAY_URL ?? "http://localhost:8080"
  );
  private readonly droplex = new DropleXAdapter(this.gateway);
  private scene!: SceneEngine;
  private bridge!: WebMCPBridge;
  private status!: StatusPanel;

  async start(root: HTMLElement): Promise<void> {
    root.innerHTML = "";
    root.style.cssText = "position:fixed;inset:0;background:#10151d;overflow:hidden;";

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block;";
    root.appendChild(canvas);

    this.status = new StatusPanel(root);
    this.status.set("initializing");

    this.scene = new SceneEngine(canvas);
    await this.physics.init();
    this.registerTools();

    this.bridge = new WebMCPBridge(this.tools);
    this.bridge.start();
    startRenderLoop(this.scene);

    this.status.set("ready · canonical state + adapters + browser tool bridge");
    emit("status", { message: "ready" });
  }

  private registerTools(): void {
    this.tools.register("init_scene", async () => {
      await this.physics.init();
      return { ok: true, data: { initialized: true } };
    });

    this.tools.register("spawn_object", async (args) => {
      this.scene.spawn({
        id: String(args.id),
        kind: String(args.kind ?? "cube"),
        position: args.position as { x: number; y: number; z: number },
        properties: args.properties as Record<string, unknown> | undefined
      });
      return { ok: true };
    });

    this.tools.register("remove_object", async (args) => {
      this.scene.remove(String(args.id));
      return { ok: true };
    });

    this.tools.register("apply_impulse", async () => ({
      ok: true,
      data: { note: "Physics body binding remains an adapter-owned implementation detail." }
    }));

    this.tools.register("run_simulation_steps", async (args) => {
      this.physics.step(Number(args.steps ?? 1));
      return { ok: true };
    });

    this.tools.register("get_telemetry", async () => ({ ok: true, data: this.physics.telemetry() }));

    this.tools.register("load_scientific_data", async (args) => {
      const state = args.state as ScientificState;
      if (state.schema !== "qfoldit.scientific-state/v1") {
        return { ok: false, error: { code: "SCHEMA_MISMATCH", message: "Unsupported scientific-state schema." } };
      }
      this.state.set(state);
      for (const object of state.objects) this.scene.spawn(object);
      emit("state:changed", { stateId: state.stateId });
      return { ok: true, data: { stateId: state.stateId } };
    });

    this.tools.register("get_scientific_state", async () => ({ ok: true, data: this.state.get() }));
    this.tools.register("clear_scientific_state", async () => { this.state.clear(); return { ok: true }; });
    this.tools.register("capture_viewport", async () => ({
      ok: true, data: { mimeType: "image/png", dataUrl: this.scene.capture() }
    }));

    this.tools.register("analyze_video_file", async (args): Promise<ToolResult> =>
      this.droplex.analyzeFile(
        String(args.source_ref),
        args.tracking_profile ? String(args.tracking_profile) : undefined,
        args.sampling_fps ? Number(args.sampling_fps) : undefined
      )
    );

    this.tools.register("start_video_stream", async (args): Promise<ToolResult> =>
      this.droplex.startStream(
        String(args.source_ref),
        args.tracking_profile ? String(args.tracking_profile) : undefined,
        args.sampling_fps ? Number(args.sampling_fps) : undefined
      )
    );

    this.tools.register("stop_video_stream", async (args) => this.droplex.stopStream(String(args.stream_id)));
    this.tools.register("get_tracking_state", async (args) => this.droplex.getTrackingState(String(args.stream_id)));
    this.tools.register("get_trajectory", async (args) =>
      this.droplex.getTrajectory(String(args.object_id), String(args.observation_id))
    );
    this.tools.register("get_motion_metrics", async (args) =>
      this.gateway.submitTool("get_motion_metrics", {
        object_id: String(args.object_id), observation_id: String(args.observation_id)
      })
    );
  }
}
