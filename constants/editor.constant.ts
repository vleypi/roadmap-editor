export const RIGHT_SIDEBAR_TYPES = {
  PROPERTIES: 'properties',
  LAYERS: 'layers',
  JSON: 'json'
} as const;

export const COLOR_OPTIONS = [
  { value: '#8b5cf6', name: 'Purple' },
  { value: '#3b82f6', name: 'Blue' },
  { value: '#10b981', name: 'Green' },
  { value: '#f59e0b', name: 'Yellow' },
  { value: '#ef4444', name: 'Red' },
  { value: '#ec4899', name: 'Pink' },
  { value: '#06b6d4', name: 'Cyan' },
  { value: '#7c3aed', name: 'Indigo' }
] as const;

export const NODE_TYPES = [
  { value: 'Task', label: 'Task' },
  { value: 'Milestone', label: 'Milestone' },
  { value: 'Phase', label: 'Phase' },
  { value: 'Feature', label: 'Feature' },
  { value: 'Bug', label: 'Bug' },
  { value: 'Research', label: 'Research' },
  { value: 'Documentation', label: 'Documentation' }
] as const;

export const CONNECTION_TYPES = [
  { value: 'dependency', label: 'Dependency' },
  { value: 'parent-child', label: 'Parent-Child' },
  { value: 'related', label: 'Related' }
] as const;

export const SIDEBAR_CONFIG = {
  MIN_WIDTH: 280,
  MAX_WIDTH: 600,
  DEFAULT_WIDTH: 320
} as const;

export const TAG_CONFIG = {
  MAX_LENGTH: 15
} as const;

export const DEFAULT_COLORS = {
  NODE: '#8b5cf6'
} as const;

export const DEFAULT_NODE_FORM = {
  title: '',
  description: '',
  type: 'Task' as const,
  color: DEFAULT_COLORS.NODE,
  progress: 0,
  tags: [] as string[]
} as const;

export const DEFAULT_CONNECTION_FORM = {
  type: 'dependency' as const
} as const;

export const TAB_ICONS = {
  properties: 'fas fa-sliders-h',
  layers: 'fas fa-layer-group',
  json: 'fas fa-code'
} as const;

export const CONNECTION_TYPE_CLASSES = {
  dependency: 'bg-purple-600/20 text-purple-400',
  'parent-child': 'bg-green-600/20 text-green-400',
  related: 'bg-blue-600/20 text-blue-400'
} as const;

export const SECTION_TITLES = {
  properties: 'Editing Node',
  layers: 'Layers',
  connections: 'Connections',
  json: 'JSON Data'
} as const;

export const EMPTY_STATE_MESSAGES = {
  NO_NODE_SELECTED: {
    title: 'No Node Selected',
    description: 'Click on a node in the canvas to select and edit it',
    icon: 'fas fa-cube'
  },
  NO_CONNECTIONS: {
    title: 'No connections yet',
    description: '',
    icon: 'fas fa-link'
  },
  NO_NODES: {
    title: 'No nodes yet',
    description: '',
    icon: 'fa-solid fa-layer-group'
  }
} as const;

export const REGEX = {
  HEX_COLOR: /^#[0-9A-Fa-f]{0,6}$/
} as const;

export const GRID_CONFIG = {
  DEFAULT_SIZE: 50,
  MIN_SIZE: 10,
  MAX_SIZE: 200,
  SNAP_THRESHOLD: 5
} as const;

export const VIEWPORT_CONFIG = {
  MIN_SCALE: 0.1,
  MAX_SCALE: 3,
  DEFAULT_SCALE: 1
} as const;

export const INITIAL_IDS = {
  NODE_PREFIX: 'node-',
  CONNECTION_PREFIX: 'conn-'
} as const;