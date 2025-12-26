import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/store/editore.store'
import { IUseFileUploadReturn } from '@/types/upload.interface'



export function useFileUpload(): IUseFileUploadReturn {
  const router = useRouter()
  const { loadFromJSON } = useEditorStore()

  const handleFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      alert('Please upload a JSON file')
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const jsonData = JSON.parse(content)

        if (!jsonData || typeof jsonData !== 'object') {
          throw new Error('Invalid JSON structure')
        }

        loadFromJSON(jsonData)
        router.push('/editor')
      } catch (error) {
        console.error('Error parsing JSON:', error)
        alert('Error parsing JSON file. Please check the file format.')
      }
    }

    reader.onerror = () => {
      alert('Error reading file')
    }

    reader.readAsText(file)
  }, [loadFromJSON, router])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    handleFile(file)
  }, [handleFile])

  const handleUploadClick = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.style.display = 'none'
    
    input.onchange = (e) => {
      handleFileUpload(e as any)
      document.body.removeChild(input)
    }
    
    document.body.appendChild(input)
    input.click()
  }, [handleFileUpload])

  return {
    handleFile,
    handleFileUpload,
    handleUploadClick
  }
}