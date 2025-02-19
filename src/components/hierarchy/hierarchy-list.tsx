import React from "react";
import HierarchyItem from "./hierarchy-item";
import * as THREE from "three";

interface HierarchyListProps {
  list: THREE.Object3D[];
  clickCallback?: (item: THREE.Object3D) => void;
}

const HierarchyList: React.FC<HierarchyListProps> = ({
  list = [],
  clickCallback = () => undefined,
}) => {
  return (
    <ul className="hierarchy-list-container">
      {list.map((listItem) => (
        <HierarchyItem
          key={listItem.uuid}
          item={listItem}
          clickCallback={clickCallback}
        />
      ))}
    </ul>
  );
};

export default HierarchyList;
