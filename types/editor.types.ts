import {
  COLOR_OPTIONS,
  NODE_TYPES,
  CONNECTION_TYPES,
  RIGHT_SIDEBAR_TYPES,
} from '@/constants/editor.constant';

import { IEditorStoreActions, IEditorStoreState } from './editor.interfaces';

export type TColorOption = typeof COLOR_OPTIONS[number];
export type TNodeType = typeof NODE_TYPES[number]['value'];
export type TNodeTypeLabel = typeof NODE_TYPES[number]['label'];
export type TConnectionType = typeof CONNECTION_TYPES[number]['value'];
export type TConnectionTypeLabel = typeof CONNECTION_TYPES[number]['label'];
export type TTabType = typeof RIGHT_SIDEBAR_TYPES[keyof typeof RIGHT_SIDEBAR_TYPES];

export type TEditorStore = IEditorStoreState & IEditorStoreActions;