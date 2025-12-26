'use client'

import { INodeHeaderProps } from '@/types/editor.interfaces';

export function NodeHeader({
  type,
  color,
  isConnecting,
  isDragging
}: INodeHeaderProps){
  const statusText = isConnecting ? 'Connecting...' : isDragging ? 'Dragging...' : 'Drag to move';
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div 
          className="w-3 h-3 rounded-full mr-3"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-medium text-night-400 uppercase tracking-wider">
          {type}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-xs text-night-500">
          {statusText}
        </div>
      </div>
    </div>
  );
};