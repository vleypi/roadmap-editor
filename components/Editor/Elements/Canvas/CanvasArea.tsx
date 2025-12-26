'use client'

import { useEffect } from 'react';
import { useCanvasSetup } from '@/hooks/Canvas/useCanvasSetup';
import { useCanvasEventHandlers } from '@/hooks/Canvas/useCanvasEventHandler';
import { useContextMenuActions } from '@/hooks/Canvas/useContextMenuActions';
import { CanvasContainer } from '@/components/Editor/Elements/Canvas/CanvasContainer';
import { CanvasOverlay } from '@/components/Editor/Elements/Canvas/CanvasOverlay';
import { CanvasModals } from '@/components/Editor/Elements/Canvas/CanvasModals';

export function CanvasArea() {
  const { containerRef, store, managers, transforms } = useCanvasSetup();

  const eventHandlers = useCanvasEventHandlers({
    store,
    managers,
    transforms,
    containerRef
  });

  const contextMenuActions = useContextMenuActions({
    store,
    managers,
    transforms,
    containerRef
  });

  useEffect(() => {
    if (managers.nodeDragDrop.isDraggingNode) {
      window.addEventListener('mousemove', managers.nodeDragDrop.handleMouseMove);
      window.addEventListener('mouseup', managers.nodeDragDrop.handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', managers.nodeDragDrop.handleMouseMove);
        window.removeEventListener('mouseup', managers.nodeDragDrop.handleMouseUp);
      };
    }
  }, [managers.nodeDragDrop]);

  return (
    <div className="flex-1 relative overflow-hidden bg-night-950">
      <CanvasContainer
        containerRef={containerRef}
        showGrid={store.showGrid}
        gridSize={store.gridSize}
        viewport={store.viewport}
        nodes={store.nodes}
        connections={store.connections}
        selectedNodeId={store.selectedNodeId}
        connectingNodeId={managers.connectionManager.connectingNodeId}
        isDraggingNodeId={managers.nodeDragDrop.isDraggingNode}
        worldToScreen={transforms.worldToScreen}
        onMouseDown={eventHandlers.handleCanvasMouseDown}
        onClick={managers.canvasInteractions.handleBackgroundClick}
        onContextMenu={eventHandlers.handleCanvasContextMenu}
        onNodeClick={managers.canvasInteractions.handleNodeClick}
        onNodeMouseDown={managers.nodeDragDrop.handleNodeMouseDown}
        onNodeContextMenu={eventHandlers.handleNodeContextMenu}
        onConnectionPointClick={managers.connectionManager.handleConnectionPointClick}
        connectionStart={managers.connectionManager.connectionStart}
      />

      <CanvasOverlay
        showGrid={store.showGrid}
        viewport={store.viewport}
        selectedNode={store.selectedNode}
        connectingNodeId={managers.connectionManager.connectingNodeId}
        onToggleGrid={store.toggleGrid}
        onCancelConnection={managers.connectionManager.cancelConnection}
      />

      <CanvasModals
        contextMenu={managers.contextMenuManager.contextMenu}
        addNodeModalState={managers.addNodeModalManager.modalState}
        selectedNode={store.selectedNode}
        onCloseContextMenu={managers.contextMenuManager.closeContextMenu}
        onAddNode={contextMenuActions.handleAddNode}
        onAddConnection={contextMenuActions.handleAddConnection}
        onDeleteSelection={contextMenuActions.handleDeleteSelection}
        onCenterView={contextMenuActions.handleCenterView}
        onCenterOnSelection={contextMenuActions.handleCenterOnSelection}
        onResetZoom={contextMenuActions.handleResetZoom}
        onCloseModal={managers.addNodeModalManager.closeModal}
        onSubmitNode={managers.addNodeModalManager.handleSubmit}
      />
    </div>
  );
}