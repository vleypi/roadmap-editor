import { useCallback, useEffect } from 'react';
import { useEditorStore } from '@/store/editor.store';

export const useViewportControls = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const { viewport, setViewport, updateViewport } = useEditorStore();

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node], [data-connection-point]')) {
      return;
    }
    
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      
      const startX = e.clientX - viewport.x;
      const startY = e.clientY - viewport.y;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateViewport({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY
        });
      };
      
      const handleMouseUp = () => {
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, [viewport, updateViewport]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const zoomIntensity = 0.001;
    const delta = e.deltaY;
    
    const worldX = (mouseX - viewport.x) / viewport.scale;
    const worldY = (mouseY - viewport.y) / viewport.scale;
    
    const newScale = Math.max(0.1, Math.min(5, viewport.scale * Math.exp(-delta * zoomIntensity)));
    
    const newX = mouseX - worldX * newScale;
    const newY = mouseY - worldY * newScale;
    
    setViewport({
      scale: newScale,
      x: newX,
      y: newY
    });
  }, [viewport, setViewport, containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, containerRef]);

  const centerView = useCallback((worldX?: number, worldY?: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (worldX !== undefined && worldY !== undefined) {
      setViewport({
        scale: viewport.scale,
        x: centerX - worldX * viewport.scale,
        y: centerY - worldY * viewport.scale
      });
    } else {
      setViewport({
        scale: viewport.scale,
        x: centerX,
        y: centerY
      });
    }
  }, [viewport.scale, setViewport, containerRef]);

  const resetZoom = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setViewport({
      scale: 1,
      x: centerX,
      y: centerY
    });
  }, [setViewport, containerRef]);

  return {
    handleCanvasMouseDown,
    centerView,
    resetZoom
  };
};