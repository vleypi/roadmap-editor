'use client'

import { IUploadContentProps } from "@/types/upload.interface"

export function UploadContent({ isDragging }: IUploadContentProps) {
  return (
    <>
      <div className="mb-8">
        <i className="fas fa-cloud-upload-alt text-6xl text-night-600 group-hover:text-gradient transition-colors duration-300"></i>
      </div>
      
      <div className="space-y-4 mb-10">
        <p className="text-2xl font-medium">
          {isDragging ? 'Drop your JSON file here' : 'Drag & drop your JSON file'}
        </p>
        <p className="text-night-500">
          {isDragging ? 'Release to upload' : 'or click to browse files'}
        </p>
      </div>
    </>
  )
}