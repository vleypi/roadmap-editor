'use client'

import { IGridBackgroundProps } from '@/types/editor.interfaces';


export function GridBackground({ 
  showGrid, 
  gridSize, 
  viewport 
}: IGridBackgroundProps){
  if (!showGrid) return null;

  const gridStyles = {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize * viewport.scale}px ${gridSize * viewport.scale}px`,
    transform: `translate(${viewport.x % (gridSize * viewport.scale)}px, ${viewport.y % (gridSize * viewport.scale)}px)`
  };

  return (
    <div 
      className="absolute inset-0"
      style={gridStyles}
    />
  );
};