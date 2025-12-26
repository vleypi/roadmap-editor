import { IUseDragAndDrop } from "@/types/upload.interface"
import { useState, useCallback } from "react"

export function useDragAndDrop(): IUseDragAndDrop {
    const [isDragging, setIsDragging] = useState(false)
  
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }, [])
  
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }, [])
  
    const handleDrop = useCallback((e: React.DragEvent, onFile: (file: File) => void) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      
      const files = e.dataTransfer.files
      if (files.length > 0) {
        onFile(files[0])
      }
    }, [])
  
    return {
      isDragging,
      handleDragOver,
      handleDragLeave,
      handleDrop
    }
}