// app/editor/page.tsx
'use client'

import CanvasArea from '@/components/Editor/Canvas/CanvasArea'
import RightSidebar from '@/components/Editor/Layout/RightsideBar/RightsideBar'
import TopBar from '@/components/Editor/Layout/TopBar/TopBar'
import StatusBar from '@/components/Editor/Layout/StatusBar/StatusBar'

export default function EditorPage() {
    return (
      <div className="font-sans bg-night-950 text-white h-screen flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
            <CanvasArea />
            <RightSidebar  /> 
        </div>
        <StatusBar />
      </div>
    )
}