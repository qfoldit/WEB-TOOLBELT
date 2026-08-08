import { SceneEngine } from "./scene";

export function startRenderLoop(scene: SceneEngine): void {
  const frame = () => {
    scene.render();
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
