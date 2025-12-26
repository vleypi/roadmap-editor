'use client'

import { GridButtonProps } from "@/types/editor.types"

export default function GridButton({ showGrid, onToggle }: GridButtonProps) {
  const gridIconClass = showGrid ? 'text-purple-400' : 'text-night-400'
  
  return (
    <button 
      onClick={onToggle}
      className="px-4 py-2 bg-night-900/80 backdrop-blur-sm border border-night-700 rounded-lg hover:bg-night-800 transition-colors flex items-center"
    >
      <i className={`fas fa-border-all mr-2 ${gridIconClass}`}></i>
      Grid
    </button>
  )
}