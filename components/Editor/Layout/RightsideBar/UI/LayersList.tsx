import React from 'react';
import { LayerItem } from './LayerItem';
import { ILayersListProps } from '@/types/editor.interfaces';
import { EMPTY_STATE_MESSAGES } from '@/constants/editor.constant';
import { EmptyState } from '@/components/Editor/Layout/RightsideBar/UI/EmptyState';


export const LayersList: React.FC<ILayersListProps> = ({
  nodes,
  selectedNodeId,
  draggingNodeId,
  dragOverNodeId,
  onSelectNode,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  if (nodes.length === 0) {
    return (
      <EmptyState
        icon={EMPTY_STATE_MESSAGES.NO_NODES.icon}
        title={EMPTY_STATE_MESSAGES.NO_NODES.title}
        description={EMPTY_STATE_MESSAGES.NO_NODES.description}
      />
    );
  }

  return (
    <div className="space-y-2 mb-8">
      {[...nodes].reverse().map((node) => {
        const originalIndex = nodes.findIndex(n => n.id === node.id);
        const displayIndex = nodes.length - originalIndex - 1;

        return (
          <LayerItem
            key={node.id}
            node={node}
            displayIndex={displayIndex}
            totalLayers={nodes.length}
            isSelected={selectedNodeId === node.id}
            isDragging={draggingNodeId === node.id}
            isDragOver={dragOverNodeId === node.id}
            onSelect={() => onSelectNode(node.id)}
            onDragStart={(e) => onDragStart(e, node.id)}
            onDragOver={(e) => onDragOver(e, node.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, node.id)}
          />
        );
      })}
    </div>
  );
};