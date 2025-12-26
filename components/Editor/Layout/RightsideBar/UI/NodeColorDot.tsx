import { useEffect, useRef } from 'react';
import { DEFAULT_COLORS } from '@/constants/editor.constant';
import { INodeColorDotProps } from '@/types/editor.interfaces';

export const NodeColorDot: React.FC<INodeColorDotProps> = ({ 
  color, 
  className = '' 
}) => {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.setProperty('--node-color', color || DEFAULT_COLORS.NODE);
    }
  }, [color]);

  return (
    <div 
      ref={dotRef} 
      className={`node-color-dot ${className}`} 
      aria-hidden="true"
    />
  );
};