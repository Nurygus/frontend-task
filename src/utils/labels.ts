import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/Addons.js";

export function createTextLabels(rootObj: THREE.Object3D) {
  rootObj.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      if (!obj.userData.propertyValue.statusCode) return;

      const div = document.createElement("div");
      div.className = `label status-code-${obj.userData.propertyValue.statusCode}`;
      div.textContent = obj.userData.propertyValue.statusText;
      div.style.marginTop = "0px";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.35)";
      div.style.borderRadius = "4px";
      div.style.padding = "4px";
      const label = new CSS2DObject(div);
      label.position.set(0, 0, 0);
      obj.add(label);
    }
  });
}
