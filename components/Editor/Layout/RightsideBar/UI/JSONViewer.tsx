import React from 'react';
import { IJSONViewerProps } from '@/types/editor.interfaces';


export const JSONViewer: React.FC<IJSONViewerProps> = ({ 
  highlightedContent 
}) => (
  <div className="relative">
    <div className="bg-night-900 rounded-lg overflow-hidden">
      <pre className="p-4 text-sm font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
        <code>{highlightedContent}</code>
      </pre>
    </div>
  </div>
);