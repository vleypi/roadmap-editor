'use client'

import { IConnectionPointProps } from '@/types/editor.interfaces';


export function ConnectionPoint({
  position,
  isConnecting,
  onClick
}: IConnectionPointProps){
  const positionClass = position === 'right' ? '-right-3' : '-left-3';
  return (
    <div 
      data-connection-point="true"
      className={`absolute ${positionClass} top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}
      onClick={onClick}
    >
      <div className={`
        w-6 h-6 rounded-full border-2 flex items-center justify-center 
        ${isConnecting ? 'border-purple-500 bg-purple-500/20' : 'border-night-700 bg-night-800 hover:border-purple-500 transition-colors'}
      `}>
        <div className={`
          w-2 h-2 rounded-full 
          ${isConnecting ? 'bg-purple-500' : 'bg-night-600 group-hover:bg-purple-500 transition-colors'}
        `} />
      </div>
    </div>
  );
};