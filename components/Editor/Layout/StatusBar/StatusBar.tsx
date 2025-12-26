'use client'
import { useEditorStore } from '@/store/editore.store'


export function StatusBar() {
    const { 
        nodes, 
        connections, 
      } = useEditorStore()

    return (
        <div className="h-8 border-t border-night-800 bg-night-900/90 backdrop-blur-sm flex items-center justify-between px-4 text-sm">
        <div className="flex items-center space-x-6">
            <div className="flex items-center">
                <i className="fas fa-circle text-green-500 mr-2 text-xs"></i>
                <span className="text-night-300">Auto-save enabled</span>
            </div>
            <div className="text-night-500">
            {nodes.length} nodes • {connections.length} connections • 1.0.0
            </div>
        </div>
        </div>
    )
}