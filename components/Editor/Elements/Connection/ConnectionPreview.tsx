'use client'

import { IConnectionPreviewProps } from '@/types/editor.interfaces';


export function ConnectionPreview({ connectionStart }: IConnectionPreviewProps){
  return (
    <line
      id="connection-preview-line"
      x1={connectionStart.screenX}
      y1={connectionStart.screenY}
      x2={connectionStart.screenX}
      y2={connectionStart.screenY}
      stroke="#8b5cf6"
      strokeWidth="2"
      strokeDasharray="4,4"
      opacity="0.8"
    />
  );
};