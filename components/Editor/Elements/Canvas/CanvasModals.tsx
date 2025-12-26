'use client'

import { ContextMenu } from '@/components/Editor/Elements/Layout/ContexMenu/ContextMenu';
import { AddNodeModal } from '@/components/Editor/Elements/Layout/AddNodeModal/AddNodeModal';
import { ICanvasModalsProps } from '@/types/editor.interfaces';

export function CanvasModals({
  contextMenu,
  addNodeModalState,
  selectedNode,
  onCloseContextMenu,
  onAddNode,
  onAddConnection,
  onDeleteSelection,
  onCenterView,
  onCenterOnSelection,
  onResetZoom,
  onCloseModal,
  onSubmitNode
}: ICanvasModalsProps){
  return (
    <>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          target={contextMenu.target}
          hasSelection={!!selectedNode}
          onClose={onCloseContextMenu}
          onAddNode={onAddNode}
          onAddConnection={onAddConnection}
          onDeleteSelection={onDeleteSelection}
          onCenterView={onCenterView}
          onCenterOnSelection={onCenterOnSelection}
          onResetZoom={onResetZoom}
        />
      )}

      {addNodeModalState.isOpen && (
        <AddNodeModal
          worldX={addNodeModalState.worldX || 0}
          worldY={addNodeModalState.worldY || 0}
          onClose={onCloseModal}
          onSubmit={onSubmitNode}
        />
      )}
    </>
  );
};