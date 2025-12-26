import { Node, Connection, Viewport, ExportData } from "@/types/editor.interfaces";


export const exportJson = (
  title: string,
  nodes: Node[],
  connections: Connection[],
  viewport: Viewport,
  description?: string
): void => {
  const exportData: ExportData = {
    title: title || "Roadmap",
    description,
    nodes: nodes.map(node => ({
      ...node,
      isDragging: undefined,
      isSelected: undefined
    })),
    connections: connections || [],
    viewport: viewport || { scale: 1, x: 0, y: 0 },
    version: "1.0",
    exportedAt: new Date().toISOString()
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-') || 'roadmap'}-${new Date().toISOString().split('T')[0]}.json`;
  
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const getJsonString = (
  title: string,
  nodes: Node[],
  connections: Connection[],
  viewport: Viewport,
  description?: string
): string => {
  const exportData: ExportData = {
    title: title || "Roadmap",
    description,
    nodes: nodes.map(node => ({
      ...node,
      isDragging: undefined,
      isSelected: undefined
    })),
    connections: connections || [],
    viewport: viewport || { scale: 1, x: 0, y: 0 },
    version: "1.0",
    exportedAt: new Date().toISOString()
  };

  return JSON.stringify(exportData, null, 2);
};