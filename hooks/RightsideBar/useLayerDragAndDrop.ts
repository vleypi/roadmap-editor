import { useState, useCallback } from 'react';
import { useEditorStore } from '@/store/editor.store';

export const useLayerDragDrop = () => {
  const { nodes, moveNodeLayer } = useEditorStore();
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, nodeId: string) => {
    setDraggingNodeId(nodeId);
    e.dataTransfer.setData('text/plain', nodeId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    if (draggingNodeId !== nodeId) {
      setDragOverNodeId(nodeId);
    }
  }, [draggingNodeId]);

  const handleDragLeave = useCallback(() => {
    setDragOverNodeId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetNodeId: string) => {
    e.preventDefault();
    if (draggingNodeId && draggingNodeId !== targetNodeId) {
      const targetIndex = nodes.findIndex(n => n.id === targetNodeId);
      if (targetIndex !== -1) {
        moveNodeLayer(draggingNodeId, targetIndex);
      }
    }
    setDraggingNodeId(null);
    setDragOverNodeId(null);
  }, [draggingNodeId, nodes, moveNodeLayer]);

  return {
    draggingNodeId,
    dragOverNodeId,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};