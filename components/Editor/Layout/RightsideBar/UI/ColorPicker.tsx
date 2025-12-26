import React from 'react';
import { COLOR_OPTIONS, DEFAULT_COLORS } from '@/constants/editor.constant';
import { IColorPickerProps } from '@/types/editor.interfaces';


export const ColorPicker: React.FC<IColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  showCustomPicker,
  customColor,
  onToggleCustomPicker,
  onCustomColorChange,
  onApplyCustomColor,
  onCloseCustomPicker
}) => (
  <div>
    <div className="flex flex-wrap gap-2 mb-2">
      {COLOR_OPTIONS.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onColorSelect(color.value)}
          className={`color-swatch w-8 h-8 rounded-full border-2 ${
            selectedColor === color.value ? 'border-white' : 'border-transparent'
          } transition-all hover:scale-110`}
          data-color={color.value}
          title={color.name}
        />
      ))}
      <button
        type="button"
        onClick={onToggleCustomPicker}
        className={`w-8 h-8 rounded-full border-2 ${
          selectedColor !== DEFAULT_COLORS.NODE && 
          !COLOR_OPTIONS.find(c => c.value === selectedColor) 
            ? 'border-white' 
            : 'border-transparent'
        } transition-all hover:scale-110 flex items-center justify-center bg-night-800`}
        title="Custom color"
      >
        <i className="fas fa-plus text-night-400 text-sm"></i>
      </button>
    </div>
    
    {showCustomPicker && (
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="color"
          value={customColor}
          onChange={(e) => onCustomColorChange(e.target.value)}
          className="w-8 h-8 cursor-pointer rounded border border-night-700 bg-transparent"
          title="Choose custom color"
          aria-label="Custom color picker"
        />
        <input
          type="text"
          value={customColor}
          onChange={(e) => onCustomColorChange(e.target.value)}
          className="w-20 px-2 py-1 bg-night-800/50 border border-night-700 rounded text-xs text-white"
          placeholder="#RRGGBB"
          maxLength={7}
        />
        <button
          onClick={onApplyCustomColor}
          className="text-xs px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded whitespace-nowrap"
        >
          Apply
        </button>
        <button
          onClick={onCloseCustomPicker}
          className="text-xs text-night-400 hover:text-white ml-1"
          title="Close custom color picker"
          aria-label="Close custom color picker"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    )}
    
    <div className="mt-1 flex items-center text-xs text-night-500">
      <div 
        className="selected-color-indicator w-4 h-4 rounded-full mr-2 border border-night-700"
      />
      <span>Selected: {selectedColor}</span>
    </div>
  </div>
);