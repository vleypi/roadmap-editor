'use client'

import { useEditorStore } from '@/store/editor.store';
import { SECTION_TITLES } from '@/constants/editor.constant';
import { useConnectionEditor } from '@/hooks/RightsideBar/useConnectionsEditor';
import { useLayerDragDrop } from '@/hooks/RightsideBar/useLayerDragAndDrop';
import { useNodeInfo } from '@/hooks/RightsideBar/useNodeInfo';
import { TabHeader } from '@/components/Editor/Layout/RightsideBar/UI/TabHeader';
import { LayersList } from '@/components/Editor/Layout/RightsideBar/Tabs/LayersTab/LayersList';
import { ConnectionEditor } from '@/components/Editor/Layout/RightsideBar/Tabs/LayersTab/ConnectionEditor';
import { ConnectionsList } from '@/components/Editor/Layout/RightsideBar/Tabs/LayersTab/ConnectionsList';

export function LayersTab(){
  const { nodes, connections, selectedNodeId, selectNode } = useEditorStore();
  
  const connectionEditor = useConnectionEditor();
  const dragDrop = useLayerDragDrop();
  const { getNodeInfo } = useNodeInfo();

  const handleSelectNode = (nodeId: string) => {
    selectNode(nodeId);
    connectionEditor.cancelEditing();
  };

  return (
    <div className="space-y-6">
      <div>
        <TabHeader title={SECTION_TITLES.layers} />
        <LayersList
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          draggingNodeId={dragDrop.draggingNodeId}
          dragOverNodeId={dragDrop.dragOverNodeId}
          onSelectNode={handleSelectNode}
          onDragStart={dragDrop.handleDragStart}
          onDragOver={dragDrop.handleDragOver}
          onDragLeave={dragDrop.handleDragLeave}
          onDrop={dragDrop.handleDrop}
        />
      </div>

      <div className="pt-4 border-t border-night-800">
        <TabHeader title={SECTION_TITLES.connections} />
        
        {connectionEditor.editingConnection && (
          <ConnectionEditor
            connection={connectionEditor.editingConnection}
            form={connectionEditor.editForm}
            sourceNode={getNodeInfo(connectionEditor.editingConnection.sourceId)}
            targetNode={getNodeInfo(connectionEditor.editingConnection.targetId)}
            onFormChange={connectionEditor.updateFormType}
            onSave={connectionEditor.saveConnection}
            onCancel={connectionEditor.cancelEditing}
            onDelete={() => connectionEditor.removeConnection(
              connectionEditor.editingConnection!.id
            )}
          />
        )}

        <ConnectionsList
          connections={connections}
          editingConnectionId={connectionEditor.editingConnection?.id || null}
          getNodeInfo={getNodeInfo}
          onEdit={connectionEditor.startEditing}
          onDelete={connectionEditor.removeConnection}
          onSelect={connectionEditor.startEditing}
        />
      </div>
    </div>
  );
};