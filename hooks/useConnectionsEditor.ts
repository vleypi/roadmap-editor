import { useState, useCallback } from 'react';
import { useEditorStore } from '@/store/editore.store';
import { Connection, ConnectionFormData } from '@/types/editor.interfaces';
import { ConnectionTypeValue } from '@/types/editor.types';
import { DEFAULT_CONNECTION_FORM } from '@/constants/editor.constant';

export const useConnectionEditor = () => {
  const {
    connections,
    selectNode,
    updateConnection,
    deleteConnection
  } = useEditorStore();

  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);
  const [editForm, setEditForm] = useState<ConnectionFormData>(DEFAULT_CONNECTION_FORM);

  const startEditing = useCallback((connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    if (connection) {
      setEditingConnection(connection);
      setEditForm({ type: connection.type });
      selectNode(null);
    }
  }, [connections, selectNode]);

  const saveConnection = useCallback(() => {
    if (!editingConnection) return;
    updateConnection(editingConnection.id, { type: editForm.type });
    setEditingConnection(null);
  }, [editingConnection, editForm, updateConnection]);

  const cancelEditing = useCallback(() => {
    setEditingConnection(null);
  }, []);

  const removeConnection = useCallback((connectionId: string) => {
    if (confirm('Are you sure you want to delete this connection?')) {
      deleteConnection(connectionId);
      if (editingConnection?.id === connectionId) {
        setEditingConnection(null);
      }
    }
  }, [editingConnection, deleteConnection]);

  const updateFormType = useCallback((type: ConnectionTypeValue) => {
    setEditForm({ type });
  }, []);

  return {
    editingConnection,
    editForm,
    startEditing,
    saveConnection,
    cancelEditing,
    removeConnection,
    updateFormType
  };
};
