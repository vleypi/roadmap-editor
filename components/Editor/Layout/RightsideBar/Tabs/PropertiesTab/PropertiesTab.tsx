'use client'

import { SECTION_TITLES, EMPTY_STATE_MESSAGES, NODE_TYPES } from '@/constants/editor.constant';
import { useNodeEditor } from '@/hooks/RightsideBar/useNodeEditor';
import { useTagManager } from '@/hooks/RightsideBar/useTagManager';
import { useColorPicker } from '@/hooks/RightsideBar/useColorPicker';
import { EmptyState } from '@/components/Editor/Layout/RightsideBar/UI/EmptyState';
import { TabHeader } from '@/components/Editor/Layout/RightsideBar/UI/TabHeader';
import { FormField } from '@/components/Editor/Layout/RightsideBar/UI/FormField';
import { ActionButton } from '@/components/Editor/Layout/RightsideBar/UI/ActionButton';
import { ColorPicker } from '@/components/Editor/Layout/RightsideBar/Tabs/PropertiesTab/ColorPicker';
import { TagManager } from '@/components/Editor/Layout/RightsideBar/Tabs/PropertiesTab/TagManager';
import { ProgressSlider } from '@/components/Editor/Layout/RightsideBar/Tabs/PropertiesTab/ProgressSlider';
import { TNodeType } from '@/types/editor.types';

export function PropertiesTab(){
  const {
    editForm,
    updateForm,
    saveChanges,
    resetChanges,
    selectedNode
  } = useNodeEditor();

  const {
    showInput: showTagInput,
    inputValue: tagInputValue,
    addTag,
    handleInputChange: handleTagInputChange,
    confirmTag,
    cancelTag,
    removeTag
  } = useTagManager(
    editForm.tags || [],
    (tags) => updateForm({ tags })
  );

  const {
    showCustomPicker,
    customColor,
    toggleCustomPicker,
    handleCustomColorChange,
    applyCustomColor,
    closeCustomPicker
  } = useColorPicker(
    editForm.color,
    (color) => updateForm({ color })
  );

  if (!selectedNode) {
    return (
      <EmptyState
        icon={EMPTY_STATE_MESSAGES.NO_NODE_SELECTED.icon}
        title={EMPTY_STATE_MESSAGES.NO_NODE_SELECTED.title}
        description={EMPTY_STATE_MESSAGES.NO_NODE_SELECTED.description}
      />
    );
  }

  return (
    <div className="space-y-6">
      <TabHeader
        title={SECTION_TITLES.properties}
        actions={
          <>
            <ActionButton onClick={resetChanges} variant="secondary">
              Reset
            </ActionButton>
            <ActionButton onClick={saveChanges} variant="primary">
              Save
            </ActionButton>
          </>
        }
      />

      <div className="space-y-4">
        <FormField label="Title" required>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            className="w-full px-3 py-2 bg-night-800/50 border border-night-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="Node title"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={editForm.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            className="w-full px-3 py-2 bg-night-800/50 border border-night-700 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
            placeholder="Optional description"
            rows={3}
          />
        </FormField>

        <FormField label="Type" labelId="node-type-label">
          <select
            value={editForm.type}
            onChange={(e) => updateForm({ type: e.target.value as TNodeType })}
            className="w-full px-3 py-2 bg-night-800/50 border border-night-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            aria-labelledby="node-type-label"
            title="Node type selection"
          >
            {NODE_TYPES.map((nodeType) => (
              <option key={nodeType.value} value={nodeType.value}>
                {nodeType.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Color">
          <ColorPicker
            selectedColor={editForm.color}
            onColorSelect={(color) => updateForm({ color })}
            showCustomPicker={showCustomPicker}
            customColor={customColor}
            onToggleCustomPicker={toggleCustomPicker}
            onCustomColorChange={handleCustomColorChange}
            onApplyCustomColor={applyCustomColor}
            onCloseCustomPicker={closeCustomPicker}
          />
        </FormField>

        <ProgressSlider
          value={editForm.progress}
          onChange={(progress) => updateForm({ progress })}
        />

        <TagManager
          tags={editForm.tags || []}
          showInput={showTagInput}
          inputValue={tagInputValue}
          onAddTag={addTag}
          onInputChange={handleTagInputChange}
          onConfirmTag={confirmTag}
          onCancelTag={cancelTag}
          onRemoveTag={removeTag}
        />

        <div className="pt-4 border-t border-night-700">
          <div className="text-xs text-night-500 mb-2">Node ID</div>
          <code className="text-sm text-night-400 font-mono break-all">
            {selectedNode.id}
          </code>
          <div className="text-xs text-night-500 mt-2">
            Position: {selectedNode.x.toFixed(0)}, {selectedNode.y.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
};