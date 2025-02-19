import * as THREE from "three";

export interface IHighlightService {
  highlightObject(obj: THREE.Object3D | null, root: THREE.Object3D): void;
}

class HighlightService {
  private matCache: Map<string, THREE.Material>;
  private highlightMat: THREE.MeshBasicMaterial;

  constructor(
    highlightMat: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    })
  ) {
    this.matCache = new Map<string, THREE.Material>();
    this.highlightMat = highlightMat;
  }

  highlightObject(obj: THREE.Object3D | null, root: THREE.Object3D) {
    this.matCache.forEach((mat: THREE.Material, uuid: string) => {
      const oldObj = root.getObjectByProperty("uuid", uuid);
      if (oldObj && oldObj instanceof THREE.Mesh && oldObj.material) {
        oldObj.material = mat;
      }
    });

    this.matCache.clear();

    if (!obj) return;

    if (obj instanceof THREE.Mesh && obj.material) {
      this.matCache.set(obj.uuid, obj.material);
      obj.material = this.highlightMat;
    } else if (obj instanceof THREE.Group) {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          this.matCache.set(child.uuid, child.material);
          child.material = this.highlightMat;
        }
      });
    }
  }
}

export default HighlightService;
