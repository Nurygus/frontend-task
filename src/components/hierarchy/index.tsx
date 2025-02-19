import "./hierarchy-component.css";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import { useBehaviorSubject, useViewer } from "../../hooks";
import HierarchyItem from "./hierarchy-item";
import HighlightService from "../../services/highlight-service";

const HierarchyComponent: React.FC = () => {
  const viewer = useViewer();
  const status = useBehaviorSubject(viewer.status);
  const highlightService = useRef(new HighlightService());

  const handleSelect = useCallback(
    (obj: THREE.Object3D | null) => {
      highlightService.current.highlightObject(obj, viewer.scene);
      viewer.updateViewer();
    },
    [viewer]
  );

  return (
    <div>
      <h3>Hierarchy</h3>
      <ul>
        {status === "loading" && <li>Loading...</li>}
        {status === "idle" && viewer.model ? (
          <HierarchyItem item={viewer.model} clickCallback={handleSelect} />
        ) : (
          <li>No hierarchy available</li>
        )}
        {status === "error" && <li>Error loading hierarchy</li>}
      </ul>
    </div>
  );
};

export default HierarchyComponent;
