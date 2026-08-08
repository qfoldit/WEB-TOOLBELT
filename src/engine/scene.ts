import * as THREE from "three";
import type { ScientificObject } from "../core/types";

export class SceneEngine {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10000);
  readonly renderer: THREE.WebGLRenderer;
  private objects = new Map<string, THREE.Object3D>();

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, preserveDrawingBuffer: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene.background = new THREE.Color(0x10151d);
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 8, 5);
    this.scene.add(light);
    this.camera.position.set(4, 3, 6);
    this.camera.lookAt(0, 0, 0);
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize(): void {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  spawn(object: ScientificObject): void {
    if (this.objects.has(object.id)) return;
    const geometry = object.kind === "sphere"
      ? new THREE.SphereGeometry(0.15, 24, 16)
      : new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const material = new THREE.MeshStandardMaterial({ color: 0x64b5f6 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(object.position.x, object.position.y, object.position.z);
    mesh.name = object.id;
    this.scene.add(mesh);
    this.objects.set(object.id, mesh);
  }

  remove(id: string): void {
    const object = this.objects.get(id);
    if (!object) return;
    object.removeFromParent();
    this.objects.delete(id);
  }

  render(): void { this.renderer.render(this.scene, this.camera); }
  capture(): string { return this.renderer.domElement.toDataURL("image/png"); }
}
