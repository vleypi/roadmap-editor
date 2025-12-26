'use client'

import { IConnectionIndicatorProps } from '@/types/editor.interfaces';


export function ConnectionIndicator({ onCancel }: IConnectionIndicatorProps){
    return (
      <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg px-4 py-2 text-sm">
        <div className="flex items-center">
          <i className="fas fa-link mr-2 text-purple-400"></i>
          <span className="text-purple-300">Connecting mode</span>
          <button
            onClick={onCancel}
            className="ml-3 text-purple-400 hover:text-white"
            title="Cancel connection"
            aria-label="Cancel connection"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="text-xs text-purple-500 mt-1">
          Click on another node to connect, or click anywhere to cancel
        </div>
      </div>
    );
  };