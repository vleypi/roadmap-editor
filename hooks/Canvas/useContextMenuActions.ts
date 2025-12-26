import { useCallback } from 'react';

interface UseContextMenuActionsProps {
  store: {
    nodes: any[];
    selectedNodeId: string | null;
    selectedNode: any;
    deleteNode: (id: string) => void;
    startConnecting: (id: string) => void;
  };
  managers: {
    contextMenuManager: any;
    addNodeModalManager: any;
    viewportControls: any;
  };
  transforms: {
    worldToScreen: (x: number, y: number) => { x: number; y: number };
  };
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useContextMenuActions = ({
  store,
  managers,
  transforms,
  containerRef
}: UseContextMenuActionsProps) => {
  const handleAddNode = useCallback(() => {
    const { contextMenu } = managers.contextMenuManager;
    if (contextMenu?.worldX !== undefined && contextMenu?.worldY !== undefined) {
      managers.contextMenuManager.closeContextMenu();
      setTimeout(() => {
        managers.addNodeModalManager.openModal(contextMenu.worldX!, contextMenu.worldY!);
      }, 100);
    }
  }, [managers]);

  const handleAddConnection = useCallback(() => {
    if (store.selectedNode && containerRef.current) {
      store.startConnecting(store.selectedNode.id);
      managers.contextMenuManager.closeContextMenu();
      document.body.style.cursor = 'crosshair';
    }
  }, [store, managers, containerRef]);

  const handleDeleteSelection = useCallback(() => {
    if (store.selectedNode) {
      store.deleteNode(store.selectedNode.id);
    }
    managers.contextMenuManager.closeContextMenu();
  }, [store, managers]);

  const handleCenterView = useCallback(() => {
    const { contextMenu } = managers.contextMenuManager;
    
    if (store.selectedNode) {
      managers.viewportControls.centerView(store.selectedNode.x, store.selectedNode.y);
    } else if (contextMenu?.worldX !== undefined && contextMenu?.worldY !== undefined) {
      managers.viewportControls.centerView(contextMenu.worldX, contextMenu.worldY);
    } else {
      managers.viewportControls.centerView();
    }
    
    managers.contextMenuManager.closeContextMenu();
  }, [managers, store]);

  const handleCenterOnSelection = useCallback(() => {
    if (store.selectedNode && containerRef.current) {
      managers.viewportControls.centerView(store.selectedNode.x, store.selectedNode.y);
    }
    managers.contextMenuManager.closeContextMenu();
  }, [store, managers, containerRef]);

  const handleResetZoom = useCallback(() => {
    managers.viewportControls.resetZoom();
    managers.contextMenuManager.closeContextMenu();
  }, [managers]);

  return {
    handleAddNode,
    handleAddConnection,
    handleDeleteSelection,
    handleCenterView,
    handleCenterOnSelection,
    handleResetZoom
  };
};