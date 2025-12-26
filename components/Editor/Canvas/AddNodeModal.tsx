// components/editor/AddNodeModal.tsx
'use client'

import { useState } from 'react'
import type { Node, NodeTypeValue } from '@/types/editor.types'

interface AddNodeModalProps {
  worldX: number
  worldY: number
  onClose: () => void
  onSubmit: (nodeData: Omit<Node, 'id'>) => void
}

export default function AddNodeModal({
  worldX,
  worldY,
  onClose,
  onSubmit
}: AddNodeModalProps) {
  const [nodeForm, setNodeForm] = useState({
    title: '',
    type: 'Task' as NodeTypeValue,
    color: '#8b5cf6',
    description: '',
    progress: 0
  })

  // Цвета для выбора
  const colorOptions = [
    { value: '#8b5cf6', name: 'Purple' },
    { value: '#3b82f6', name: 'Blue' },
    { value: '#10b981', name: 'Green' },
    { value: '#f59e0b', name: 'Yellow' },
    { value: '#ef4444', name: 'Red' },
    { value: '#ec4899', name: 'Pink' }
  ]

  const typeOptions: NodeTypeValue[] = ['Task', 'Milestone', 'Feature', 'Bug', 'Research', 'Documentation']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nodeForm.title.trim()) {
      alert('Please enter a title for the node')
      return
    }
    
    onSubmit({
      title: nodeForm.title,
      type: nodeForm.type,
      color: nodeForm.color,
      x: worldX,
      y: worldY,
      description: nodeForm.description || undefined,
      progress: nodeForm.progress,
      tags: nodeForm.type ? [nodeForm.type] : undefined
    })
    
    // Сбрасываем форму
    setNodeForm({
      title: '',
      type: 'Task' as NodeTypeValue,
      color: '#8b5cf6',
      description: '',
      progress: 0
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative z-10 bg-night-900/95 backdrop-blur-sm border border-night-700 rounded-lg shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-night-300">Add New Node</h3>
            <button
              onClick={onClose}
              className="text-night-400 hover:text-night-300 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-night-400 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={nodeForm.title}
                  onChange={(e) => setNodeForm({...nodeForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
                  placeholder="Enter node title"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-night-400 mb-2">
                  Type
                </label>
                <select
                  value={nodeForm.type}
                  onChange={(e) => setNodeForm({...nodeForm, type: e.target.value as NodeTypeValue})}
                  className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-night-400 mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNodeForm({...nodeForm, color: color.value})}
                      className={`w-8 h-8 rounded-full border-2 ${nodeForm.color === color.value ? 'border-white' : 'border-transparent'} transition-all hover:scale-110`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-night-400 mb-2">
                  Description
                </label>
                <textarea
                  value={nodeForm.description}
                  onChange={(e) => setNodeForm({...nodeForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-night-400 mb-2">
                  Progress: {nodeForm.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nodeForm.progress}
                  onChange={(e) => setNodeForm({...nodeForm, progress: parseInt(e.target.value)})}
                  className="w-full h-2 bg-night-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                />
              </div>

              <div className="pt-2">
                <div className="text-xs text-night-500">
                  Position: {worldX.toFixed(0)}, {worldY.toFixed(0)}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add Node
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 bg-night-800 hover:bg-night-700 text-night-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}