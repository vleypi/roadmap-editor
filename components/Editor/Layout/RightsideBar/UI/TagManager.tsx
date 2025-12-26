import React from 'react';
import { TAG_CONFIG } from '@/constants/editor.constant';
import { ITagManagerProps } from '@/types/editor.interfaces';


export const TagManager: React.FC<ITagManagerProps> = ({
  tags,
  showInput,
  inputValue,
  onAddTag,
  onInputChange,
  onConfirmTag,
  onCancelTag,
  onRemoveTag
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm text-night-400">Tags</label>
      <button
        onClick={onAddTag}
        className="text-xs text-purple-400 hover:text-purple-300"
      >
        <i className="fas fa-plus mr-1"></i>Add Tag
      </button>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="px-3 py-1 bg-night-800 rounded-lg text-sm flex items-center"
        >
          <span>{tag}</span>
          <button
            onClick={() => onRemoveTag(index)}
            className="ml-2 text-night-400 hover:text-white"
            title={`Remove tag ${tag}`}
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      ))}
      {tags.length === 0 && !showInput && (
        <span className="text-sm text-night-500">No tags added</span>
      )}
    </div>
    
    {showInput && (
      <div className="mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onConfirmTag();
            if (e.key === 'Escape') onCancelTag();
          }}
          onBlur={() => {
            if (!inputValue.trim()) onCancelTag();
          }}
          className="w-full px-3 py-2 bg-night-800 border border-purple-500/50 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
          placeholder={`Enter tag (max ${TAG_CONFIG.MAX_LENGTH} chars) and press Enter`}
          autoFocus
          maxLength={TAG_CONFIG.MAX_LENGTH}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-night-500">
            {inputValue.length}/{TAG_CONFIG.MAX_LENGTH} characters
          </span>
          <button
            onClick={onCancelTag}
            className="text-xs text-night-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);