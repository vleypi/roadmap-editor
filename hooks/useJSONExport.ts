import { useCallback } from 'react';

interface ExportableData {
  nodes: any[];
  connections: any[];
  viewport: any;
}

export const useJSONExport = (data: ExportableData) => {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  }, [data]);

  const downloadJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  return {
    copyToClipboard,
    downloadJSON
  };
};