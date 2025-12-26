import { TNodeType, TConnectionType, TTabType } from "./editor.types";

export interface INodeFormData {
  title: string;
  description?: string;
  type: TNodeType;
  color: string;
  progress: number;
  tags?: string[];
}

export interface IConnectionFormData {
  type: TConnectionType;
}

export interface INode {
  id: string
  title: string
  type: TNodeType
  x: number
  y: number
  color: string          
  progress: number       
  description?: string   
  tags?: string[]       
}

export interface IConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: TConnectionType;
}

export interface IViewport {
  x: number;
  y: number;
  scale: number;
}

export interface ICanvasData {
  nodes: INode[];
  connections: IConnection[];
  viewport: IViewport;
}

export interface IRightSidebarProps {
  activePanel?: TTabType;
  onPanelChange?: (panel: TTabType) => void;
  canvasData?: ICanvasData;
}

export interface INodeInfo {
  title: string;
  type: TNodeType;
  color: string;
}

export interface IDragEventHandlers {
  onDragStart: (e: React.DragEvent, nodeId: string) => void;
  onDragOver: (e: React.DragEvent, nodeId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, targetNodeId: string) => void;
}

export interface IEditorStoreState {
  viewport: IViewport;
  nodes: INode[];
  connections: IConnection[];
  showGrid: boolean;
  gridSize: number;
  selectedNodeId: string | null;
  connectingNodeId: string | null;
}

export interface IEditorStoreActions {
  setViewport: (viewport: IViewport) => void;
  updateViewport: (updates: Partial<IViewport>) => void;
  
  selectNode: (nodeId: string | null) => void;
  clearSelection: () => void;
  addNode: (node: Omit<INode, 'id'>) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<INode>) => void;
  
  moveNodeLayer: (nodeId: string, targetIndex: number) => void;
  bringNodeToFront: (nodeId: string) => void;
  sendNodeToBack: (nodeId: string) => void;
  
  addConnection: (connection: Omit<IConnection, 'id'>) => void;
  deleteConnection: (connectionId: string) => void;
  updateConnection: (connectionId: string, updates: Partial<IConnection>) => void;
  startConnecting: (nodeId: string) => void;
  cancelConnecting: () => void;
  completeConnection: (targetNodeId: string) => void;
  
  toggleGrid: () => void;
  setGridSize: (size: number) => void;

  loadFromJSON: (jsonData: any) => void; 
}

export interface IJSONHighlightOptions {
  indent?: number;
  keyColor?: string;
  stringColor?: string;
  numberColor?: string;
  booleanColor?: string;
  nullColor?: string;
  braceColor?: string;
}

export interface IContextMenuProps {
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

export interface IContextMenuItemProps {
  icon: string
  label: string
  danger?: boolean
  onClick: () => void
}

export interface IContextMenuPositionParams {
  x: number;
  y: number;
  target?: 'canvas' | 'node';
}

export interface IContextMenuPositionData {
  adjustedX: number;
  adjustedY: number;
  menuTitle: string;
}

export interface IExportData {
  title: string;
  description?: string;
  nodes: INode[];
  connections: IConnection[];
  viewport: IViewport;
  version: string;
  exportedAt: string;
}

export interface IRightSidebarProxyProps {
  activeTab: TTabType;
}

export interface ITabsProps {
  activeTab: TTabType
  setActiveTab: (panel: TTabType) => void
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
  connection: IConnection;
  form: IConnectionFormData;
  sourceNode: INodeInfo | null;
  targetNode: INodeInfo | null;
  onFormChange: (type: TConnectionType) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export interface IConnectionItemProps {
  connection: IConnection;
  sourceNode: INodeInfo | null;
  targetNode: INodeInfo | null;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export interface IConnectionsListProps {
  connections: IConnection[];
  editingConnectionId: string | null;
  getNodeInfo: (nodeId: string) => INodeInfo | null;
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
  node: INode;
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
  nodes: INode[];
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

export interface IViewportInfoProps {
  viewport: IViewport;
  selectedNode?: INode;
}

export interface IGridBackgroundProps {
  showGrid: boolean;
  gridSize: number;
  viewport: { x: number; y: number; scale: number };
}

export interface IGridButtonProps {
  showGrid: boolean;
  onToggle: () => void;
}

export interface INodeCanvasProps {
  node: INode;
  isSelected: boolean;
  isConnecting: boolean;
  isDragging: boolean;
  screenPosition: { x: number; y: number };
  scale: number;
  onClick: (e: React.MouseEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onConnectionPointClick: (e: React.MouseEvent, pointType: 'in' | 'out') => void;
}

export interface INodeHeaderProps {
  type: string;
  color: string;
  isConnecting: boolean;
  isDragging: boolean;
}

export interface INodesLayerProps {
  nodes: INode[];
  selectedNodeId: string | null;
  connectingNodeId: string | null;
  isDraggingNodeId: string | null;
  worldToScreen: (x: number, y: number) => { x: number; y: number };
  scale: number;
  onNodeClick: (e: React.MouseEvent, nodeId: string) => void;
  onNodeMouseDown: (e: React.MouseEvent, nodeId: string) => void;
  onNodeContextMenu: (e: React.MouseEvent, nodeId: string) => void;
  onConnectionPointClick: (e: React.MouseEvent, nodeId: string, pointType: 'in' | 'out') => void;
}

export interface INodeProgressProps {
  progress: number;
  color: string;
}

export interface INodeTagsProps {
  tags?: string[];
}

export interface IConnectionIndicatorProps {
  onCancel: () => void;
}

export interface IConnectionsLayerProps {
  connections: IConnection[];
  nodes: INode[];
  connectionStart: { nodeId: string; screenX: number; screenY: number } | null;
  worldToScreen: (x: number, y: number) => { x: number; y: number };
  scale: number;
}

export interface IConnectionLineProps {
  connection: IConnection;
  sourceNode: INode;
  targetNode: INode;
  worldToScreen: (x: number, y: number) => { x: number; y: number };
  scale: number;
}

export interface IConnectionPointProps {
  position: 'left' | 'right';
  isConnecting: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export interface IConnectionPreviewProps {
  connectionStart: {
    screenX: number;
    screenY: number;
  };
}

export interface IAddNodeFormProps {
  formData: INodeFormData;
  onFormChange: (updates: Partial<INodeFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  worldX: number;
  worldY: number;
}

export interface IAddNodeModalProps {
  worldX: number;
  worldY: number;
  onClose: () => void;
  onSubmit: (nodeData: Omit<INode, 'id'>) => void;
}

export interface ICanvasContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  showGrid: boolean;
  gridSize: number;
  viewport: IViewport;
  nodes: INode[];
  connections: IConnection[];
  selectedNodeId: string | null;
  connectingNodeId: string | null;
  isDraggingNodeId: string | null;
  worldToScreen: (x: number, y: number) => { x: number; y: number };
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onNodeClick: (e: React.MouseEvent, nodeId: string) => void;
  onNodeMouseDown: (e: React.MouseEvent, nodeId: string) => void;
  onNodeContextMenu: (e: React.MouseEvent, nodeId: string) => void;
  onConnectionPointClick: (e: React.MouseEvent, nodeId: string, pointType: 'in' | 'out') => void;
  connectionStart: any;
}

export interface ICanvasModalsProps {
  contextMenu: any;
  addNodeModalState: any;
  selectedNode?: INode;
  onCloseContextMenu: () => void;
  onAddNode: () => void;
  onAddConnection: () => void;
  onDeleteSelection: () => void;
  onCenterView: () => void;
  onCenterOnSelection: () => void;
  onResetZoom: () => void;
  onCloseModal: () => void;
  onSubmitNode: (nodeData: Omit<INode, 'id'>) => void;
}

export interface ICanvasOverlayProps {
  showGrid: boolean;
  viewport: IViewport;
  selectedNode?: INode;
  connectingNodeId: string | null;
  onToggleGrid: () => void;
  onCancelConnection: () => void;
}


export interface IWorldToScreenFunction {
  (x: number, y: number): { x: number; y: number };
}

export interface IConnectionLineRenderData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  arrowX1: number;
  arrowY1: number;
  arrowX2: number;
  arrowY2: number;
  strokeColor: string;
  strokeDasharray: string;
}

