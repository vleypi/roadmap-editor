import { CONNECTION_TYPE_CLASSES } from '@/constants/editor.constant';
import { NodeColorDot } from '@/components/Editor/Layout/RightsideBar/UI/NodeColorDot';
import { IConnectionItemProps } from '@/types/editor.interfaces';

export function ConnectionItem({
  connection,
  sourceNode,
  targetNode,
  isEditing,
  onEdit,
  onDelete,
  onSelect
}: IConnectionItemProps){
  if (!sourceNode || !targetNode) return null;
  
  return (
    <div
      className={`p-3 rounded-lg transition-colors cursor-pointer ${
        isEditing 
          ? 'bg-purple-600/20 border border-purple-500/30' 
          : 'bg-night-800/30 hover:bg-night-700/30'
      }`}
      onClick={onSelect}
    >
      <div className="grid grid-cols-3 gap-2 items-center mb-2">
        <div className="flex items-center overflow-hidden">
          <NodeColorDot 
            className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
            color={sourceNode.color}
          />
          <div className="text-sm font-medium truncate" title={sourceNode.title}>
            {sourceNode.title}
          </div>
        </div>
        <div className="flex justify-center flex-shrink-0">
          <i className="fas fa-arrow-right text-xs text-night-500"></i>
        </div>
        <div className="flex items-center overflow-hidden">
          <NodeColorDot 
            className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
            color={targetNode.color}
          />
          <div className="text-sm font-medium truncate" title={targetNode.title}>
            {targetNode.title}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-night-500">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded ${CONNECTION_TYPE_CLASSES[connection.type]}`}>
            {connection.type}
          </span>
          <span>ID: {connection.id.substring(0, 8)}...</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-night-400 hover:text-white transition-colors"
            title="Edit connection"
          >
            <i className="fas fa-edit text-xs"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
            title="Delete connection"
          >
            <i className="fas fa-trash text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};