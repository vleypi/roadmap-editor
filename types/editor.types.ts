import {
    COLOR_OPTIONS,
    NODE_TYPES,
    CONNECTION_TYPES,
    RIGHT_SIDEBAR_TYPES,
} from '@/constants/editor.constant';

import { EditorStoreActions, EditorStoreState } from './editor.interfaces';
  
export type ColorOption = typeof COLOR_OPTIONS[number];
export type NodeTypeValue = typeof NODE_TYPES[number]['value'];
export type NodeTypeLabel = typeof NODE_TYPES[number]['label'];
export type ConnectionTypeValue = typeof CONNECTION_TYPES[number]['value'];
export type ConnectionTypeLabel = typeof CONNECTION_TYPES[number]['label'];
export type TabType = typeof RIGHT_SIDEBAR_TYPES[keyof typeof RIGHT_SIDEBAR_TYPES];
  
export type EditorStore = EditorStoreState & EditorStoreActions;
  
export type {
  NodeTypeValue as NodeType,
  ConnectionTypeValue as ConnectionType
};

  