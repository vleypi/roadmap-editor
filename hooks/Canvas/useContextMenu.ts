import { useState, useCallback, useEffect } from 'react';

interface ContextMenuState {
  x: number;
  y: number;
  worldX?: number;
  worldY?: number;
  target?: 'canvas' | 'node';
  nodeId?: string;
}

export const useContextMenu = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  viewport: { x: number; y: number; scale: number }
) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const openContextMenu = useCallback((e: React.MouseEvent, target: 'canvas' | 'node' = 'canvas', nodeId?: string) => {
    e.preventDefault();
    
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const worldX = (x - viewport.x) / viewport.scale;
    const worldY = (y - viewport.y) / viewport.scale;
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      worldX,
      worldY,
      target,
      nodeId
    });
  }, [viewport, containerRef]);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  return {
    contextMenu,
    openContextMenu,
    closeContextMenu
  };
};