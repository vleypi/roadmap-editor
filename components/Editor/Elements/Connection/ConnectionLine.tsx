'use client'

import { calculateConnectionLineData} from '@/utils/connectionGeometry';
import { IConnectionLineProps, IConnectionLineRenderData } from '@/types/editor.interfaces';

export function ConnectionLine({
  connection,
  sourceNode,
  targetNode,
  worldToScreen,
  scale
}: IConnectionLineProps){
  const lineData: IConnectionLineRenderData | null = calculateConnectionLineData(
    connection,
    sourceNode,
    targetNode,
    worldToScreen,
    scale
  );

  if (!lineData) return null;

  const {
    startX,
    startY,
    endX,
    endY,
    arrowX1,
    arrowY1,
    arrowX2,
    arrowY2,
    strokeColor,
    strokeDasharray
  } = lineData;

  return (
    <g>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray={strokeDasharray}
        opacity="0.8"
      />
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={strokeColor}
        opacity="0.8"
      />
    </g>
  );
};