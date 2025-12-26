import { useEditorStore } from '@/store/editore.store';
import { NodeInfo } from '@/types/editor.interfaces';

export const useNodeInfo = () => {
  const { nodes } = useEditorStore();

  const getNodeInfo = (nodeId: string): NodeInfo | null => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? {
      title: node.title,
      type: node.type,
      color: node.color
    } : null;
  };

  return { getNodeInfo };
};