import { useCallback } from 'react';

export const useCoordinateTransform = (viewport: { x: number; y: number; scale: number }) => {
  const worldToScreen = useCallback((worldX: number, worldY: number) => ({
    x: worldX * viewport.scale + viewport.x,
    y: worldY * viewport.scale + viewport.y
  }), [viewport]);

  const screenToWorld = useCallback((screenX: number, screenY: number) => ({
    x: (screenX - viewport.x) / viewport.scale,
    y: (screenY - viewport.y) / viewport.scale
  }), [viewport]);

  return {
    worldToScreen,
    screenToWorld
  };
};