import { useState, useCallback, useRef } from 'react';
import { useEditorStore } from '@/store/editor.store';

interface DragStart {
  nodeX: number;
  nodeY: number;
  mouseWorldX: number;
  mouseWorldY: number;
}

export const useNodeDragDrop = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const { nodes, viewport, updateNode, selectNode, connectingNodeId, completeConnection, cancelConnecting } = useEditorStore();
  
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<DragStart | null>(null);

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (e.button !== 0) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    if (connectingNodeId) {
      if (connectingNodeId !== nodeId) {
        completeConnection(nodeId);
      } else {
        cancelConnecting();
      }
      return;
    }
    
    selectNode(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const mouseWorldX = (clientX - viewport.x) / viewport.scale;
    const mouseWorldY = (clientY - viewport.y) / viewport.scale;
    
    setIsDraggingNode(nodeId);
    setDragStart({
      nodeX: node.x,
      nodeY: node.y,
      mouseWorldX,
      mouseWorldY
    });
    
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  }, [nodes, viewport, selectNode, connectingNodeId, completeConnection, cancelConnecting, containerRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingNode || !dragStart || !containerRef.current) return;
    
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const currentMouseWorldX = (clientX - viewport.x) / viewport.scale;
    const currentMouseWorldY = (clientY - viewport.y) / viewport.scale;
    
    const deltaX = currentMouseWorldX - dragStart.mouseWorldX;
    const deltaY = currentMouseWorldY - dragStart.mouseWorldY;
    
    const newX = dragStart.nodeX + deltaX;
    const newY = dragStart.nodeY + deltaY;
    
    updateNode(isDraggingNode, { x: newX, y: newY });
  }, [isDraggingNode, dragStart, viewport, updateNode, containerRef]);

  const handleMouseUp = useCallback(() => {
    if (isDraggingNode) {
      setIsDraggingNode(null);
      setDragStart(null);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [isDraggingNode]);

  return {
    isDraggingNode,
    handleNodeMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};