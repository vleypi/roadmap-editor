'use client'

import { INodeTagsProps } from '@/types/editor.interfaces';


export function NodeTags({ tags }: INodeTagsProps){
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="px-2 py-1 bg-night-800 text-xs rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};