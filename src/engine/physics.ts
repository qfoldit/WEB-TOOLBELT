import RAPIER from "@dimforge/rapier3d-compat";
import type { Vector3 } from "../core/types";

export class PhysicsEngine {
  private world: RAPIER.World | null = null;

  async init(gravity: Vector3 = { x: 0, y: -9.81, z: 0 }): Promise<void> {
    await RAPIER.init();
    this.world = new RAPIER.World(gravity);
  }

  step(steps = 1): void {
    if (!this.world) throw new Error("Physics engine is not initialized");
    for (let i = 0; i < steps; i++) this.world.step();
  }

  telemetry(): Record<string, unknown> {
    return { initialized: this.world !== null };
  }
}
