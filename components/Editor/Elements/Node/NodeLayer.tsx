'use client'

import { NodeCanvas } from '@/components/Editor/Elements/Node/NodeCanvas';
import { INodesLayerProps } from '@/types/editor.interfaces';

export function NodesLayer({
  nodes,
  selectedNodeId,
  connectingNodeId,
  isDraggingNodeId,
  worldToScreen,
  scale,
  onNodeClick,
  onNodeMouseDown,
  onNodeContextMenu,
  onConnectionPointClick
}: INodesLayerProps){
  return (
    <>
      {nodes.map((node) => {
        const screenPos = worldToScreen(node.x, node.y);
        const isSelected = node.id === selectedNodeId;
        const isConnecting = connectingNodeId === node.id;
        const isDragging = node.id === isDraggingNodeId;
        
        return (
          <NodeCanvas
            key={node.id}
            node={node}
            isSelected={isSelected}
            isConnecting={isConnecting}
            isDragging={isDragging}
            screenPosition={screenPos}
            scale={scale}
            onClick={(e) => onNodeClick(e, node.id)}
            onMouseDown={(e) => onNodeMouseDown(e, node.id)}
            onContextMenu={(e) => onNodeContextMenu(e, node.id)}
            onConnectionPointClick={(e, pointType) => onConnectionPointClick(e, node.id, pointType)}
          />
        );
      })}
    </>
  );
};