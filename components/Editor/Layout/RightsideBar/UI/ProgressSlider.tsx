import React from 'react';
import { IProgressSliderProps } from '@/types/editor.interfaces';

export const ProgressSlider: React.FC<IProgressSliderProps> = ({ 
  value, 
  onChange 
}) => (
  <div>
    <label className="block text-sm text-night-400 mb-2" id="node-progress-label">
      Progress: {value}%
    </label>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-night-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
      aria-labelledby="node-progress-label"
    />
    <div className="flex justify-between text-xs text-night-500 mt-1">
      <span>0%</span>
      <span>50%</span>
      <span>100%</span>
    </div>
  </div>
);