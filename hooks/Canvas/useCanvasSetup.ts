import { useRef } from 'react';
import { useEditorStore } from '@/store/editor.store';
import { useNodeDragDrop } from '@/hooks/Canvas/useNodeDragAndDrop';
import { useConnectionManager } from '@/hooks/Canvas/useConnectionManager';
import { useViewportControls } from '@/hooks/Canvas/useViewportControls';
import { useContextMenu } from '@/hooks/Canvas/useContextMenu';
import { useAddNodeModal } from '@/hooks/Canvas/useAddNodeModal';
import { useCanvasInteractions } from '@/hooks/Canvas/useCanvasInteractions';
import { useCoordinateTransform } from '@/hooks/Canvas/useCoordinateTransform';

export const useCanvasSetup = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const {
    viewport,
    nodes,
    connections,
    showGrid,
    gridSize,
    selectedNodeId,
    selectNode,
    clearSelection,
    toggleGrid,
    deleteNode,
    startConnecting
  } = useEditorStore();

  const nodeDragDrop = useNodeDragDrop(containerRef);
  const connectionManager = useConnectionManager(containerRef);
  const viewportControls = useViewportControls(containerRef);
  const contextMenuManager = useContextMenu(containerRef, viewport);
  const addNodeModalManager = useAddNodeModal();
  const { worldToScreen } = useCoordinateTransform(viewport);

  const canvasInteractions = useCanvasInteractions(
    nodeDragDrop.isDraggingNode !== null,
    connectionManager.connectingNodeId,
    connectionManager.cancelConnection,
    contextMenuManager.closeContextMenu,
    addNodeModalManager.closeModal
  );

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  return {
    containerRef,
    store: {
      viewport,
      nodes,
      connections,
      showGrid,
      gridSize,
      selectedNodeId,
      selectedNode,
      selectNode,
      clearSelection,
      toggleGrid,
      deleteNode,
      startConnecting
    },
    managers: {
      nodeDragDrop,
      connectionManager,
      viewportControls,
      contextMenuManager,
      addNodeModalManager,
      canvasInteractions
    },
    transforms: {
      worldToScreen
    }
  };
};