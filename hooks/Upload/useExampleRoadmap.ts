import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/store/editor.store'
import { EXAMPLE_ROADMAP_DATA } from '@/constants/example.constant'
import { IUseExampleRoadmapReturn } from '@/types/upload.interface'


export function useExampleRoadmap(): IUseExampleRoadmapReturn {
  const router = useRouter()
  const { loadFromJSON } = useEditorStore()

  const loadExample = useCallback(() => {
    try {
      loadFromJSON(EXAMPLE_ROADMAP_DATA)
      router.push('/editor')
    } catch (error) {
      console.error('Error loading example:', error)
      alert('Error loading example roadmap')
    }
  }, [loadFromJSON, router])

  return { loadExample }
}