import { IContextMenuPositionParams, IContextMenuPositionData } from '@/types/editor.interfaces';

export const calculateContextMenuPosition = ({
  x,
  y,
  target = 'canvas'
}: IContextMenuPositionParams): IContextMenuPositionData => {
  const menuWidth = 240;
  const menuHeight = 340;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : menuWidth;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : menuHeight;

  const adjustedX = x + menuWidth > windowWidth ? x - menuWidth : x;
  const adjustedY = y + menuHeight > windowHeight ? y - menuHeight : y;
  const menuTitle = target === 'node' ? 'Node Actions' : 'Canvas Actions';

  return {
    adjustedX,
    adjustedY,
    menuTitle
  };
};
