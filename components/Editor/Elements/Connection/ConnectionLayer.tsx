'use client'

import { ConnectionLine } from './ConnectionLine';
import { ConnectionPreview } from './ConnectionPreview';
import { IConnectionsLayerProps } from '@/types/editor.interfaces';


export function ConnectionsLayer({
  connections,
  nodes,
  connectionStart,
  worldToScreen,
  scale
}: IConnectionsLayerProps){
  return (
    <svg className="absolute inset-0 pointer-events-none overflow-visible">
      {connections.map((connection) => {
        const sourceNode = nodes.find(n => n.id === connection.sourceId);
        const targetNode = nodes.find(n => n.id === connection.targetId);
        
        if (!sourceNode || !targetNode) return null;
        
        return (
          <ConnectionLine
            key={connection.id}
            connection={connection}
            sourceNode={sourceNode}
            targetNode={targetNode}
            worldToScreen={worldToScreen}
            scale={scale}
          />
        );
      })}
      
      {connectionStart && (
        <ConnectionPreview connectionStart={connectionStart} />
      )}
    </svg>
  );
};