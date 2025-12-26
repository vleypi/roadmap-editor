import React from 'react';
import { IEmptyStateProps } from '@/types/editor.interfaces';


export const EmptyState: React.FC<IEmptyStateProps> = ({ 
  icon, 
  title, 
  description 
}) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-night-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
      <i className={`${icon} text-2xl text-night-500`}></i>
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    {description && (
      <p className="text-night-500 text-sm">{description}</p>
    )}
  </div>
);