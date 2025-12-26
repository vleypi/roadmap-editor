import { useCallback } from 'react';

interface UseCanvasEventHandlersProps {
  store: {
    nodes: any[];
    selectedNodeId: string | null;
    selectedNode: any;
    selectNode: (id: string) => void;
    clearSelection: () => void;
    deleteNode: (id: string) => void;
    startConnecting: (id: string) => void;
  };
  managers: {
    nodeDragDrop: any;
    connectionManager: any;
    viewportControls: any;
    contextMenuManager: any;
    addNodeModalManager: any;
  };
  transforms: {
    worldToScreen: (x: number, y: number) => { x: number; y: number };
  };
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useCanvasEventHandlers = ({
  store,
  managers,
  transforms,
  containerRef
}: UseCanvasEventHandlersProps) => {
  // Canvas Mouse Down
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (managers.contextMenuManager.contextMenu) {
      managers.contextMenuManager.closeContextMenu();
    }
    if (managers.addNodeModalManager.modalState.isOpen) {
      managers.addNodeModalManager.closeModal();
    }
    
    if (managers.nodeDragDrop.isDraggingNode) return;
    
    if (managers.connectionManager.connectingNodeId) {
      managers.connectionManager.cancelConnection();
      return;
    }
    
    managers.viewportControls.handleCanvasMouseDown(e);
  }, [managers]);

  // Canvas Context Menu
  const handleCanvasContextMenu = useCallback((e: React.MouseEvent) => {
    managers.contextMenuManager.openContextMenu(e, 'canvas');
    store.clearSelection();
  }, [managers, store]);

  // Node Context Menu
  const handleNodeContextMenu = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    store.selectNode(nodeId);
    managers.contextMenuManager.openContextMenu(e, 'node', nodeId);
  }, [managers, store]);

  return {
    handleCanvasMouseDown,
    handleCanvasContextMenu,
    handleNodeContextMenu
  };
};
