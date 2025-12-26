'use client'

import { ViewportInfoProps } from "@/types/editor.types"

export default function ViewportInfo({ viewport, selectedNode }: ViewportInfoProps) {
  const hasSelectedNode = !!selectedNode
  
  const coordinates = hasSelectedNode && (
    <div className="col-span-2 pt-2 border-t border-night-700/50">
      <div className="text-xs text-night-400 mb-1">Selected: {selectedNode.title}</div>
      <div className="font-mono text-xs">
        {selectedNode.x.toFixed(0)}, {selectedNode.y.toFixed(0)}
      </div>
    </div>
  )

  return (
    <div className="bg-night-900/80 backdrop-blur-sm border border-night-700 rounded-lg px-4 py-3">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs text-night-400 mb-1">Viewport</div>
          <div className="font-mono text-xs">
            {viewport.x.toFixed(0)}, {viewport.y.toFixed(0)}
          </div>
        </div>
        <div>
          <div className="text-xs text-night-400 mb-1">Scale</div>
          <div className="font-mono text-xs">{viewport.scale.toFixed(2)}x</div>
        </div>
        {coordinates}
      </div>
    </div>
  )
}