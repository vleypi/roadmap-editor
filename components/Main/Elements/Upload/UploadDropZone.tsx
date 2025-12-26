'use client'

import { IUploadDropZoneProps } from "@/types/upload.interface"

export function UploadDropZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  children
}: IUploadDropZoneProps) {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-colors ${
          isDragging 
            ? 'border-purple-500 bg-purple-500/5' 
            : 'border-night-700 group-hover:border-night-600'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {children}
      </div>
    </div>
  )
}