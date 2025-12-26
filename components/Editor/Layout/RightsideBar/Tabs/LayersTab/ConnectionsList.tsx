import { EMPTY_STATE_MESSAGES } from '@/constants/editor.constant';
import { ConnectionItem } from '@/components/Editor/Layout/RightsideBar/Tabs/LayersTab/ConnectionItem';
import { EmptyState } from '@/components/Editor/Layout/RightsideBar/UI/EmptyState';
import { IConnectionsListProps } from '@/types/editor.interfaces';

export function ConnectionsList({
  connections,
  editingConnectionId,
  getNodeInfo,
  onEdit,
  onDelete,
  onSelect
}: IConnectionsListProps){
  if (connections.length === 0) {
    return (
      <EmptyState
        icon={EMPTY_STATE_MESSAGES.NO_CONNECTIONS.icon}
        title={EMPTY_STATE_MESSAGES.NO_CONNECTIONS.title}
      />
    );
  }

  return (
    <div className="space-y-3">
      {connections.map((connection) => (
        <ConnectionItem
          key={connection.id}
          connection={connection}
          sourceNode={getNodeInfo(connection.sourceId)}
          targetNode={getNodeInfo(connection.targetId)}
          isEditing={editingConnectionId === connection.id}
          onEdit={() => onEdit(connection.id)}
          onDelete={() => onDelete(connection.id)}
          onSelect={() => onSelect(connection.id)}
        />
      ))}
    </div>
  );
};