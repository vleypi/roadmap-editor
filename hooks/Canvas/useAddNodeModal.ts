import { useState, useCallback } from 'react';
import { useEditorStore } from '@/store/editor.store';
import type { INode } from '@/types/editor.interfaces';

interface AddNodeModalState {
  isOpen: boolean;
  worldX?: number;
  worldY?: number;
}

export const useAddNodeModal = () => {
  const { addNode } = useEditorStore();
  const [modalState, setModalState] = useState<AddNodeModalState>({
    isOpen: false,
    worldX: 0,
    worldY: 0
  });

  const openModal = useCallback((worldX: number, worldY: number) => {
    setModalState({
      isOpen: true,
      worldX,
      worldY
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      worldX: 0,
      worldY: 0
    });
  }, []);

  const handleSubmit = useCallback((nodeData: Omit<INode, 'id'>) => {
    addNode(nodeData);
    closeModal();
  }, [addNode, closeModal]);

  return {
    modalState,
    openModal,
    closeModal,
    handleSubmit
  };
};