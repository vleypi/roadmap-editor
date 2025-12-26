import { useState, useCallback, useEffect } from 'react';
import { useEditorStore } from '@/store/editor.store';

interface ConnectionStart {
  nodeId: string;
  screenX: number;
  screenY: number;
}

export const useConnectionManager = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const { connectingNodeId, startConnecting, cancelConnecting, completeConnection } = useEditorStore();
  
  const [connectionStart, setConnectionStart] = useState<ConnectionStart | null>(null);

  const handleConnectionPointClick = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    
    if (connectingNodeId) {
      if (connectingNodeId !== nodeId) {
        completeConnection(nodeId);
      } else {
        cancelConnecting();
      }
    } else {
      startConnecting(nodeId);
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      setConnectionStart({
        nodeId,
        screenX: clientX,
        screenY: clientY
      });
      
      document.body.style.cursor = 'crosshair';
    }
  }, [connectingNodeId, startConnecting, completeConnection, cancelConnecting, containerRef]);

  const cancelConnection = useCallback(() => {
    cancelConnecting();
    document.body.style.cursor = '';
    setConnectionStart(null);
  }, [cancelConnecting]);

  // Preview line animation
  useEffect(() => {
    const handleConnectionMouseMove = (e: MouseEvent) => {
      if (!connectionStart || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      const previewLine = document.getElementById('connection-preview-line');
      if (previewLine) {
        previewLine.setAttribute('x1', connectionStart.screenX.toString());
        previewLine.setAttribute('y1', connectionStart.screenY.toString());
        previewLine.setAttribute('x2', currentX.toString());
        previewLine.setAttribute('y2', currentY.toString());
      }
    };
    
    if (connectionStart) {
      window.addEventListener('mousemove', handleConnectionMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleConnectionMouseMove);
      };
    }
  }, [connectionStart, containerRef]);

  return {
    connectionStart,
    connectingNodeId,
    handleConnectionPointClick,
    cancelConnection
  };
};