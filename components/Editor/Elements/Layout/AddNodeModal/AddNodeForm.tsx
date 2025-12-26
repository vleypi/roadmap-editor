'use client'

import { COLOR_OPTIONS, NODE_TYPES } from '@/constants/editor.constant';
import { IAddNodeFormProps } from '@/types/editor.interfaces';
import { TNodeType } from '@/types/editor.types';



export function AddNodeForm({
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  worldX,
  worldY
}: IAddNodeFormProps){
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-night-400 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onFormChange({ title: e.target.value })}
            className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
            placeholder="Enter node title"
            autoFocus
            required
          />
        </div>

        <div>
          <label className="block text-sm text-night-400 mb-2" id="node-type-label">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => onFormChange({ type: e.target.value as TNodeType })}
            className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
            aria-labelledby="node-type-label"
          >
            {NODE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-night-400 mb-2">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => onFormChange({ color: color.value })}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color.value ? 'border-white' : 'border-transparent'
                } transition-all hover:scale-110`}
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
            value={formData.description}
            onChange={(e) => onFormChange({ description: e.target.value })}
            className="w-full px-3 py-2 bg-night-800 border border-night-700 rounded-lg text-night-300 focus:outline-none focus:border-purple-500"
            placeholder="Optional description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm text-night-400 mb-2" id="progress-label">
            Progress: {formData.progress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => onFormChange({ progress: parseInt(e.target.value) })}
            className="w-full h-2 bg-night-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            aria-labelledby="progress-label"
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
            onClick={onCancel}
            className="px-4 py-3 bg-night-800 hover:bg-night-700 text-night-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};