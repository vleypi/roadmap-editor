'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TopBarProps } from '@/types/editor.interfaces'
import { useJSONExport } from '@/hooks/useJSONExport'
import { useEditorStore } from '@/store/editore.store'


export default function TopBar({ title = "Untitled Roadmap" }: TopBarProps) {
    const { nodes, connections, viewport } = useEditorStore();
    const {
        downloadJSON
     } = useJSONExport({ nodes, connections, viewport })
    const router = useRouter()

    return (
        <div className="h-16 border-b border-night-800 bg-night-900/90 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center space-x-8">
            <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-map text-white text-lg"></i>
                </div>
                <h1 className="text-xl font-bold">Roadmap Editor</h1>

                <div className="ml-6 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                    {title}
                </div>
            </div>

            <div className="flex items-center space-x-4">
            <button 
                onClick={() => router.back()}
                className="px-4 py-2 text-night-400 hover:text-white hover:bg-night-800 rounded-lg transition-colors"
            >
                <i className="fas fa-arrow-left mr-2"></i>
                Back
            </button>
            <div className="h-6 w-px bg-night-700"></div>
            <button 
                onClick={downloadJSON}
                className="px-4 py-2 bg-night-800 hover:bg-night-700 rounded-lg transition-colors flex items-center"
            >
                <i className="fas fa-download mr-2"></i>
                Export
            </button>
            </div>
        </div>
        </div>
    )
}
