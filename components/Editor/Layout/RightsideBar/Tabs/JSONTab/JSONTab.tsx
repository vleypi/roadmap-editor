'use client'

import { useEditorStore } from '@/store/editore.store';
import { SECTION_TITLES } from '@/constants/editor.constant';
import { useJSONExport } from '@/hooks/RightsideBar/useJSONExport';
import { useJSONHighlight } from '@/hooks/RightsideBar/useJSONHighlight';
import { TabHeader } from '@/components/Editor/Layout/RightsideBar/UI/TabHeader';
import { ActionButton } from '@/components/Editor/Layout/RightsideBar/UI/ActionButton';
import { JSONViewer } from '@/components/Editor/Layout/RightsideBar/Tabs/JSONTab/JSONViewer';

export function JSONTab(){
  const { nodes, connections, viewport } = useEditorStore();
  
  const data = {
    nodes,
    connections: connections || [],
    viewport: viewport || {}
  };
  
  const { copyToClipboard, downloadJSON } = useJSONExport(data);
  const highlightedContent = useJSONHighlight(data);

  return (
    <div className="space-y-4">
      <TabHeader
        title={SECTION_TITLES.json}
        actions={
          <>
            <ActionButton onClick={copyToClipboard} variant="secondary">
              Copy
            </ActionButton>
            <ActionButton onClick={downloadJSON} variant="primary">
              Save
            </ActionButton>
          </>
        }
      />
      <div className="text-xs text-night-400 mb-2">Real-time data from canvas. Updates automatically.</div>
      <JSONViewer highlightedContent={highlightedContent} />
    </div>
  );
};