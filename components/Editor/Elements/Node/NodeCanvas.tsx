'use client'

import { NodeHeader } from '@/components/Editor/Elements/Node/NodeHeader';
import { NodeProgress } from '@/components/Editor/Elements/Node/NodeProgress';
import { NodeTags } from '@/components/Editor/Elements/Node/NodeTags';
import { ConnectionPoint } from '@/components/Editor/Elements/Connection/ConnectionPoint';
import { INodeCanvasProps } from '@/types/editor.interfaces';


export function NodeCanvas({
  node,
  isSelected,
  isConnecting,
  isDragging,
  screenPosition,
  scale,
  onClick,
  onMouseDown,
  onContextMenu,
  onConnectionPointClick
}: INodeCanvasProps){
  const nodeStyles = {
    left: `${screenPosition.x}px`,
    top: `${screenPosition.y}px`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: 'center center'
  };

  return (
    <div
      data-node="true"
      className="absolute"
      style={nodeStyles}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      <div className={`relative group ${isSelected ? 'z-50' : 'z-10'} ${isDragging ? 'cursor-grabbing opacity-90' : 'cursor-grab'}`}>
        <div className={`
          w-64 backdrop-blur-sm rounded-2xl p-5 shadow-xl
          border transition-colors duration-75
          ${isSelected 
            ? 'bg-purple-600/20 border-purple-500/30 shadow-2xl' 
            : 'bg-night-900/90 border-transparent hover:bg-night-800/90 hover:border-night-700/50'
          }
          ${isConnecting ? 'ring-2 ring-purple-500/50' : ''}
          ${isDragging ? 'shadow-2xl border-purple-500/50' : ''}
        `}>
          <NodeHeader
            type={node.type}
            color={node.color}
            isConnecting={isConnecting}
            isDragging={isDragging}
          />

          <h3 className="font-bold text-lg mb-3">{node.title}</h3>
          
          {node.description && (
            <p className="text-night-400 text-sm mb-4">{node.description}</p>
          )}
          
          <NodeProgress progress={node.progress} color={node.color} />

          <NodeTags tags={node.tags} />
        </div>

        <ConnectionPoint
          position="right"
          isConnecting={isConnecting}
          onClick={(e) => onConnectionPointClick(e, 'out')}
        />
        <ConnectionPoint
          position="left"
          isConnecting={isConnecting}
          onClick={(e) => onConnectionPointClick(e, 'in')}
        />
      </div>
    </div>
  );
};