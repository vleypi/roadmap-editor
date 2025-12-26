// components/editor/ContextMenu.tsx
'use client'

import { ContextMenuProps } from "@/types/editor.interfaces"
import ContextMenuItem from "@/components/Editor/Canvas/ContextMenu"

export default function ContextMenu({
  x,
  y,
  target = 'canvas',
  hasSelection,
  onClose,
  onAddNode,
  onAddConnection,
  onDeleteSelection,
  onCenterView,
  onCenterOnSelection,
  onResetZoom
}: ContextMenuProps) {
  const menuWidth = 240
  const menuHeight = 340
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : menuWidth
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : menuHeight

  const adjustedX = x + menuWidth > windowWidth ? x - menuWidth : x
  const adjustedY = y + menuHeight > windowHeight ? y - menuHeight : y
  const menuTitle = target === 'node' ? 'Node Actions' : 'Canvas Actions'



  return (
    <div
      className="fixed z-50 bg-night-900/95 backdrop-blur-sm border border-night-700 rounded-lg shadow-2xl w-60"
      style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2">
        <div className="px-3 py-2 mb-2 border-b border-night-700/50">
          <h3 className="text-sm font-medium text-night-300">{menuTitle}</h3>
        </div>

        <div className="space-y-1">
          {/* Основные действия */}
          {target === 'canvas' && (
            <ContextMenuItem
              icon={"fas fa-plus-circle mr-3 text-purple-500"}
              label="Add Node Here"
              onClick={onAddNode}
            />
          )}

          {target === 'node' && (
            <ContextMenuItem
              icon={"fas fa-link mr-3 text-blue-500"}
              label="Add Connection"
              onClick={onAddConnection}
            />
          )}

          {/* Действия с видом */}
          <div className="border-t border-night-700/30 my-1 pt-1">
            {hasSelection && (
              <ContextMenuItem
                icon={"fas fa-crosshairs mr-3 text-green-500"}
                label="Center on Selection"
                onClick={onCenterOnSelection}
              />
            )}

            <ContextMenuItem
              icon={"fas fa-expand mr-3 text-cyan-500"}
              label={hasSelection ? 'Center View Here' : 'Center View'}
              onClick={onCenterView}
            />

            <ContextMenuItem
              icon={"fas fa-search mr-3 text-yellow-500"}
              label="Reset Zoom"
              onClick={onResetZoom}
            />
          </div>

          {/* Действия с выделением */}
          {hasSelection && (
            <div className="border-t border-night-700/30 my-1 pt-1">
              <ContextMenuItem
                icon={"fas fa-trash mr-3"}
                label="Delete Selection"
                danger
                onClick={onDeleteSelection}
              />
            </div>
          )}

          {/* Закрытие */}
          <div className="border-t border-night-700/30 my-1 pt-1">
            <ContextMenuItem
              icon={"fas fa-times mr-3"}
              label="Close"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Подсказка */}
        <div className="px-3 py-2 mt-2 text-xs text-night-500 border-t border-night-700/30">
          {target === 'node'
            ? 'Node-specific options'
            : 'Right-click on node for more options'}
        </div>
      </div>
    </div>
  )
}