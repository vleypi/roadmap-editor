'use client'

import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useExampleRoadmap } from '@/hooks/useExampleRoadmap'

import { UploadDropZone } from '@/components/Main/Elements/Upload/UploadDropZone'
import { UploadContent } from '@/components/Main/Elements/Upload/UploadContent'
import { UploadActions } from '@/components/Main/Elements/Upload/UploadActions'

export function Upload() {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop()
  const { handleFile, handleUploadClick } = useFileUpload()
  const { loadExample } = useExampleRoadmap()

  return (
    <UploadDropZone
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, handleFile)}
    >
      <UploadContent isDragging={isDragging} />
      <UploadActions 
        onUploadClick={handleUploadClick}
        onExampleClick={loadExample}
      />
    </UploadDropZone>
  )
}