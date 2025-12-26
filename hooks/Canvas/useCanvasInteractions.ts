import { useCallback } from 'react';
import { useEditorStore } from '@/store/editor.store';

export const useCanvasInteractions = (
  isDraggingNode: boolean,
  connectingNodeId: string | null,
  cancelConnection: () => void,
  closeContextMenu: () => void,
  closeModal: () => void
) => {
  const { selectNode, clearSelection } = useEditorStore();

  const handleNodeClick = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (isDraggingNode) {
      e.stopPropagation();
      return;
    }
    
    e.stopPropagation();
    
    if (connectingNodeId) {
      return;
    }
    
    selectNode(nodeId);
    closeContextMenu();
    closeModal();
  }, [selectNode, isDraggingNode, connectingNodeId, closeContextMenu, closeModal]);

  const handleBackgroundClick = useCallback(() => {
    if (isDraggingNode) return;
    
    if (connectingNodeId) {
      cancelConnection();
    }
    
    clearSelection();
    closeContextMenu();
    closeModal();
  }, [clearSelection, isDraggingNode, connectingNodeId, cancelConnection, closeContextMenu, closeModal]);

  return {
    handleNodeClick,
    handleBackgroundClick
  };
};