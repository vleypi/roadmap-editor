import { IConnection, INode, IConnectionLineRenderData, IWorldToScreenFunction } from "@/types/editor.interfaces";

export const calculateConnectionLineData = (
  connection: IConnection,
  sourceNode: INode,
  targetNode: INode,
  worldToScreen: IWorldToScreenFunction,
  scale: number
): IConnectionLineRenderData | null => {

  const startPos = worldToScreen(sourceNode.x, sourceNode.y);
  const endPos = worldToScreen(targetNode.x, targetNode.y);

  const nodeOffset = 128 * scale;
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) {
    return null;
  }

  const nx = dx / distance;
  const ny = dy / distance;

  const effectiveOffset = Math.min(nodeOffset, distance / 2);

  const startX = startPos.x + nx * effectiveOffset;
  const startY = startPos.y + ny * effectiveOffset;
  const endX = endPos.x - nx * effectiveOffset;
  const endY = endPos.y - ny * effectiveOffset;

  if (!isFinite(startX) || !isFinite(startY) || !isFinite(endX) || !isFinite(endY)) {
    return null;
  }

  const finalDistance = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );

  if (finalDistance < 2) {
    return null;
  }

  const angle = Math.atan2(endY - startY, endX - startX);
  const arrowLength = 8;
  const arrowWidth = 5;

  const arrowX1 = endX - arrowLength * Math.cos(angle) + arrowWidth * Math.cos(angle - Math.PI / 2);
  const arrowY1 = endY - arrowLength * Math.sin(angle) + arrowWidth * Math.sin(angle - Math.PI / 2);
  const arrowX2 = endX - arrowLength * Math.cos(angle) + arrowWidth * Math.cos(angle + Math.PI / 2);
  const arrowY2 = endY - arrowLength * Math.sin(angle) + arrowWidth * Math.sin(angle + Math.PI / 2);

  if (!isFinite(arrowX1) || !isFinite(arrowY1) || !isFinite(arrowX2) || !isFinite(arrowY2)) {
    return null;
  }


  const strokeColor = connection.type === 'dependency' ? '#8b5cf6' :
                    connection.type === 'parent-child' ? '#10b981' : '#3b82f6';

  const strokeDasharray = connection.type === 'dependency' ? "4,4" : "none";

  return {
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
  };
};