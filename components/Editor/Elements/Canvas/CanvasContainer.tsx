'use client'

import { GridBackground } from '@/components/Editor/Elements/UI/GridBackground';
import { NodesLayer } from '@/components/Editor/Elements/Node/NodeLayer';
import { ConnectionsLayer } from '@/components/Editor/Elements/Connection/ConnectionLayer';
import { ICanvasContainerProps } from '@/types/editor.interfaces';


export function CanvasContainer({
  containerRef,
  showGrid,
  gridSize,
  viewport,
  nodes,
  connections,
  selectedNodeId,
  connectingNodeId,
  isDraggingNodeId,
  worldToScreen,
  onMouseDown,
  onClick,
  onContextMenu,
  onNodeClick,
  onNodeMouseDown,
  onNodeContextMenu,
  onConnectionPointClick,
  connectionStart
}: ICanvasContainerProps){
  return (
    <div 
      ref={containerRef}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onContextMenu={onContextMenu}
      className="absolute inset-0 cursor-grab"
    >
      <GridBackground 
        showGrid={showGrid}
        gridSize={gridSize}
        viewport={viewport}
      />

      <div className="absolute inset-0">
        <NodesLayer
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          connectingNodeId={connectingNodeId}
          isDraggingNodeId={isDraggingNodeId}
          worldToScreen={worldToScreen}
          scale={viewport.scale}
          onNodeClick={onNodeClick}
          onNodeMouseDown={onNodeMouseDown}
          onNodeContextMenu={onNodeContextMenu}
          onConnectionPointClick={onConnectionPointClick}
        />

        <ConnectionsLayer
          connections={connections}
          nodes={nodes}
          connectionStart={connectionStart}
          worldToScreen={worldToScreen}
          scale={viewport.scale}
        />
      </div>
    </div>
  );
};