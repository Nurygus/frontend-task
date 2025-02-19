import React, { useState } from "react";
import * as THREE from "three";
import HierarchyList from "./hierarchy-list";

interface HierarchyItemProps {
  item: THREE.Object3D;
  clickCallback?: (item: THREE.Object3D) => void;
}

const HierarchyItem: React.FC<HierarchyItemProps> = ({
  item,
  clickCallback = () => undefined,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    clickCallback(item);
  };
  return (
    <li>
      <div className="hierarchy-item" onClick={handleClick}>
        {hasChildren && (
          <span onClick={handleToggle} className="toggle-icon">
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {item.name || "Unnamed Object"}
      </div>
      {hasChildren && isExpanded && (
        <HierarchyList
          list={item.children as THREE.Object3D[]}
          clickCallback={clickCallback}
        />
      )}
    </li>
  );
};

export default HierarchyItem;
