'use client'

import { GridButton } from '@/components/Editor/Elements/UI/GridButton';
import { ViewportInfo } from '@/components/Editor/Elements/Layout/ViewportInfo/ViewportInfo';
import { ConnectionIndicator } from '@/components/Editor/Elements/Connection/ConnectionIndicator';
import { ICanvasOverlayProps } from '@/types/editor.interfaces';


export function CanvasOverlay({
  showGrid,
  viewport,
  selectedNode,
  connectingNodeId,
  onToggleGrid,
  onCancelConnection
}: ICanvasOverlayProps){
  return (
    <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-3">
      <GridButton 
        showGrid={showGrid}
        onToggle={onToggleGrid}
      />
      
      <ViewportInfo 
        viewport={viewport}
        selectedNode={selectedNode}
      />
      
      {connectingNodeId && (
        <ConnectionIndicator 
          onCancel={onCancelConnection}
        />
      )}
    </div>
  );
};