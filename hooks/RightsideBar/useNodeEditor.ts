import { useState, useCallback, useEffect } from 'react';
import { useEditorStore } from '@/store/editore.store';
import { INodeFormData } from '@/types/editor.interfaces';
import { DEFAULT_NODE_FORM, DEFAULT_COLORS } from '@/constants/editor.constant';

export const useNodeEditor = () => {
  const { selectedNodeId, nodes, updateNode } = useEditorStore();
  const [editForm, setEditForm] = useState<INodeFormData>(DEFAULT_NODE_FORM);
  const [hasChanges, setHasChanges] = useState(false);

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  useEffect(() => {
    if (selectedNode) {
      const formData = {
        title: selectedNode.title || '',
        description: selectedNode.description || '',
        type: selectedNode.type,
        color: selectedNode.color || DEFAULT_COLORS.NODE,
        progress: selectedNode.progress || 0,
        tags: selectedNode.tags || []
      };
      setEditForm(formData);
      setHasChanges(false);
    }
  }, [selectedNode]);

  const updateForm = useCallback((updates: Partial<INodeFormData>) => {
    setEditForm(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  }, []);

  const saveChanges = useCallback(() => {
    if (!selectedNodeId || !hasChanges) return;
    updateNode(selectedNodeId, editForm);
    setHasChanges(false);
  }, [selectedNodeId, editForm, hasChanges, updateNode]);

  const resetChanges = useCallback(() => {
    if (selectedNode) {
      setEditForm({
        title: selectedNode.title || '',
        description: selectedNode.description || '',
        type: selectedNode.type,
        color: selectedNode.color || DEFAULT_COLORS.NODE,
        progress: selectedNode.progress || 0,
        tags: selectedNode.tags || []
      });
      setHasChanges(false);
    }
  }, [selectedNode]);

  return {
    editForm,
    updateForm,
    saveChanges,
    resetChanges,
    hasChanges,
    selectedNode
  };
};