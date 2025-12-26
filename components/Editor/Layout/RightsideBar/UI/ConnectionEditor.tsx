import React from 'react';
import { Connection, ConnectionFormData, NodeInfo } from '@/types/editor.interfaces';
import { ConnectionTypeValue } from '@/types/editor.types';
import { CONNECTION_TYPES, DEFAULT_COLORS } from '@/constants/editor.constant';
import { ActionButton } from '@/components/Editor/Layout/RightsideBar/UI/ActionButton';
import { NodeColorDot } from '@/components/Editor/Layout/RightsideBar/UI/NodeColorDot';
import { IConnectionEditorProps } from '@/types/editor.interfaces';

export const ConnectionEditor: React.FC<IConnectionEditorProps> = ({
  form,
  sourceNode,
  targetNode,
  onFormChange,
  onSave,
  onCancel,
  onDelete
}) => (
  <div className="mb-6 p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-medium">Editing Connection</h4>
      <div className="flex items-center space-x-2">
        <ActionButton onClick={onCancel} variant="secondary">
          Cancel
        </ActionButton>
        <ActionButton onClick={onSave} variant="primary">
          Save
        </ActionButton>
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-night-400 mb-2" id="connection-type-label">
          Connection Type
        </label>
        <select
          value={form.type}
          onChange={(e) => onFormChange(e.target.value as ConnectionTypeValue)}
          className="w-full px-3 py-2 bg-night-800/50 border border-night-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          aria-labelledby="connection-type-label"
          title="Connection type selection"
        >
          {CONNECTION_TYPES.map((connType) => (
            <option key={connType.value} value={connType.value}>
              {connType.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="text-sm text-night-400">
        <div className="flex items-center mb-1">
          <NodeColorDot 
            className="w-3 h-3 rounded-full mr-2"
            color={sourceNode?.color || DEFAULT_COLORS.NODE}
          />
          <span>From: {sourceNode?.title || 'Unknown'}</span>
        </div>
        <div className="flex items-center">
          <NodeColorDot 
            className="w-3 h-3 rounded-full mr-2"
            color={targetNode?.color || DEFAULT_COLORS.NODE}
          />
          <span>To: {targetNode?.title || 'Unknown'}</span>
        </div>
      </div>
      
      <ActionButton onClick={onDelete} variant="danger" className="w-full mt-2">
        <i className="fas fa-trash mr-2"></i>
        Delete Connection
      </ActionButton>
    </div>
  </div>
);