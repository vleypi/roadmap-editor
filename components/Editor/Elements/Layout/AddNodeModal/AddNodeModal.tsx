'use client'

import { useState } from 'react';
import type { TNodeType } from '@/types/editor.types';
import { AddNodeForm } from '@/components/Editor/Elements/Layout/AddNodeModal/AddNodeForm';
import { IAddNodeModalProps } from '@/types/editor.interfaces';


export function AddNodeModal({
  worldX,
  worldY,
  onClose,
  onSubmit
}: IAddNodeModalProps){
  const [nodeForm, setNodeForm] = useState({
    title: '',
    type: 'Task' as TNodeType,
    color: '#8b5cf6',
    description: '',
    progress: 0
  });

  const handleFormChange = (updates: Partial<typeof nodeForm>) => {
    setNodeForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nodeForm.title.trim()) {
      alert('Please enter a title for the node');
      return;
    }
    
    onSubmit({
      title: nodeForm.title,
      type: nodeForm.type,
      color: nodeForm.color,
      x: worldX,
      y: worldY,
      description: nodeForm.description || undefined,
      progress: nodeForm.progress,
      tags: nodeForm.type ? [nodeForm.type] : undefined
    });
    
    setNodeForm({
      title: '',
      type: 'Task' as TNodeType,
      color: '#8b5cf6',
      description: '',
      progress: 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className="relative z-10 bg-night-900/95 backdrop-blur-sm border border-night-700 rounded-lg shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-night-300">Add New Node</h3>
            <button
              onClick={onClose}
              className="text-night-400 hover:text-night-300 transition-colors"
              title="Close modal"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <AddNodeForm
            formData={nodeForm}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onCancel={onClose}
            worldX={worldX}
            worldY={worldY}
          />
        </div>
      </div>
    </div>
  );
};