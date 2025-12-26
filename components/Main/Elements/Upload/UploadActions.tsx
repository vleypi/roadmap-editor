'use client'

import { IUploadActionsProps } from "@/types/upload.interface"

export function UploadActions({ onUploadClick, onExampleClick }: IUploadActionsProps) {
  return (
    <>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
            onClick={onUploadClick}
            className="relative group/btn"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30 group-hover/btn:opacity-70 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-xl transition-all flex items-center">
            <i className="fas fa-upload mr-3"></i>
            Upload File
            </div>
        </button>
        
        <button 
            onClick={onExampleClick}
            className="bg-white/5 border border-night-700 text-night-300 px-8 py-3.5 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-night-600 transition-all flex items-center"
        >
            <i className="fas fa-play mr-3"></i>
            Try Example
        </button>
        </div>
        <p className="text-sm text-night-500 mt-10">
            Supported formats: JSON • Max size: 10MB
        </p>
    </>
  )
}