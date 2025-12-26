import { ILayerItemProps } from '@/types/editor.interfaces';


export function LayerItem({
  node,
  displayIndex,
  totalLayers,
  isSelected,
  isDragging,
  isDragOver,
  onSelect,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop
}: ILayerItemProps){
  return(
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-move ${
        isSelected 
          ? 'bg-purple-600/20' 
          : 'bg-night-800/30 hover:bg-night-700/30'
      } ${
        isDragging ? 'opacity-50' : ''
      } ${
        isDragOver ? 'border-t-2 border-purple-500 -mt-1 mb-1' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded bg-night-800 flex items-center justify-center mr-3">
          <i className="fas fa-layer-group text-night-400"></i>
        </div>
        <div>
          <div className="font-medium">{node.title}</div>
          <div className="text-xs text-night-400">
            {node.type} • Layer {displayIndex + 1} of {totalLayers}
          </div>
        </div>
      </div>
    </div>
  )
}