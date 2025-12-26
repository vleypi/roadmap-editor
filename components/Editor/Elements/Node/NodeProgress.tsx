'use client'

import { INodeProgressProps } from '@/types/editor.interfaces';

export function NodeProgress({ progress, color }: INodeProgressProps){
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-night-400">Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-night-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};