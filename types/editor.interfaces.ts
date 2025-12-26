import { NodeTypeValue, ConnectionTypeValue, TabType } from "./editor.types";

  export interface NodeFormData {
    title: string;
    description?: string;
    type: NodeTypeValue;
    color: string;
    progress: number;
    tags?: string[];
  }
  
  export interface ConnectionFormData {
    type: ConnectionTypeValue;
  }
  
  export interface Node {
    id: string
    title: string
    type: NodeTypeValue
    x: number
    y: number
    color: string          
    progress: number       
    description?: string   
    tags?: string[]       
  }
  
  export interface Connection {
    id: string;
    sourceId: string;
    targetId: string;
    type: ConnectionTypeValue;
  }
  
  export interface Viewport {
    x: number;
    y: number;
    scale: number;
  }
  
  export interface CanvasData {
    nodes: Node[];
    connections: Connection[];
    viewport: Viewport;
  }
  
  export interface RightSidebarProps {
    activePanel?: TabType;
    onPanelChange?: (panel: TabType) => void;
    canvasData?: CanvasData;
  }
  
  export interface NodeInfo {
    title: string;
    type: NodeTypeValue;
    color: string;
  }
  
  export interface DragEventHandlers {
    onDragStart: (e: React.DragEvent, nodeId: string) => void;
    onDragOver: (e: React.DragEvent, nodeId: string) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, targetNodeId: string) => void;
  }
  
  export interface EditorStoreState {
    viewport: Viewport;
    nodes: Node[];
    connections: Connection[];
    showGrid: boolean;
    gridSize: number;
    selectedNodeId: string | null;
    connectingNodeId: string | null;
  }
  
  export interface EditorStoreActions {
    setViewport: (viewport: Viewport) => void;
    updateViewport: (updates: Partial<Viewport>) => void;
    
    selectNode: (nodeId: string | null) => void;
    clearSelection: () => void;
    addNode: (node: Omit<Node, 'id'>) => void;
    deleteNode: (nodeId: string) => void;
    updateNode: (nodeId: string, updates: Partial<Node>) => void;
    
    moveNodeLayer: (nodeId: string, targetIndex: number) => void;
    bringNodeToFront: (nodeId: string) => void;
    sendNodeToBack: (nodeId: string) => void;
    
    addConnection: (connection: Omit<Connection, 'id'>) => void;
    deleteConnection: (connectionId: string) => void;
    updateConnection: (connectionId: string, updates: Partial<Connection>) => void;
    startConnecting: (nodeId: string) => void;
    cancelConnecting: () => void;
    completeConnection: (targetNodeId: string) => void;
    
    toggleGrid: () => void;
    setGridSize: (size: number) => void;

    loadFromJSON: (jsonData: any) => void; 
}

 // Интерфейсы для JSON подсветки
 export interface JSONHighlightOptions {
    indent?: number;
    keyColor?: string;
    stringColor?: string;
    numberColor?: string;
    booleanColor?: string;
    nullColor?: string;
    braceColor?: string;
  }

  export interface ContextMenuProps {
    x: number
    y: number
    target?: 'canvas' | 'node'
    hasSelection: boolean
    onClose: () => void
    onAddNode: () => void
    onAddConnection: () => void
    onDeleteSelection: () => void
    onCenterView: () => void
    onCenterOnSelection: () => void
    onResetZoom: () => void
  }

  export interface ContextMenuButtonProps {
    icon: string
    label: string
    danger?: boolean
    onClick: () => void
  }
  
  export interface ViewportInfoProps {
    viewport: {
      x: number
      y: number
      scale: number
    }
    selectedNode?: Node
  }

  export interface GridButtonProps {
    showGrid: boolean
    onToggle: () => void
  }

  export interface TopBarProps {
    title?: string
  }
  
export interface ExportData {
    title: string;
    description?: string;
    nodes: Node[];
    connections: Connection[];
    viewport: Viewport;
    version: string;
    exportedAt: string;
}

export interface RightSidebarProxyProps {
    activeTab: TabType;
}

export interface TabsProps {
    activeTab: TabType
    setActiveTab: (panel: TabType) => void
}

export interface IActionButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export interface IColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  showCustomPicker: boolean;
  customColor: string;
  onToggleCustomPicker: () => void;
  onCustomColorChange: (color: string) => void;
  onApplyCustomColor: () => void;
  onCloseCustomPicker: () => void;
}

export interface IConnectionEditorProps {
  connection: Connection;
  form: ConnectionFormData;
  sourceNode: NodeInfo | null;
  targetNode: NodeInfo | null;
  onFormChange: (type: ConnectionTypeValue) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export interface IConnectionItemProps {
  connection: Connection;
  sourceNode: NodeInfo | null;
  targetNode: NodeInfo | null;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export interface IConnectionsListProps {
  connections: Connection[];
  editingConnectionId: string | null;
  getNodeInfo: (nodeId: string) => NodeInfo | null;
  onEdit: (connectionId: string) => void;
  onDelete: (connectionId: string) => void;
  onSelect: (connectionId: string) => void;
}

export interface IEmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}

export interface IFormFieldProps {
  label: string;
  required?: boolean;
  labelId?: string;
  children: React.ReactNode;
}

export interface IJSONViewerProps {
  highlightedContent: React.ReactElement[];
}

export interface ILayerItemProps {
  node: Node;
  displayIndex: number;
  totalLayers: number;
  isSelected: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export interface ILayersListProps {
  nodes: Node[];
  selectedNodeId: string | null;
  draggingNodeId: string | null;
  dragOverNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onDragStart: (e: React.DragEvent, nodeId: string) => void;
  onDragOver: (e: React.DragEvent, nodeId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, nodeId: string) => void;
}

export interface INodeColorDotProps {
  color: string;
  className?: string;
}


export interface IProgressSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export interface ITabHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export interface ITagManagerProps {
  tags: string[];
  showInput: boolean;
  inputValue: string;
  onAddTag: () => void;
  onInputChange: (value: string) => void;
  onConfirmTag: () => void;
  onCancelTag: () => void;
  onRemoveTag: (index: number) => void;
}