'use client'

import { RIGHT_SIDEBAR_TYPES, TAB_ICONS, SECTION_TITLES } from '@/constants/editor.constant'
import { TabsProps } from '@/types/editor.interfaces'

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
    const tabMap = Object.values(RIGHT_SIDEBAR_TYPES).map((tabType) => (
        <button
          type="button"
          key={tabType}
          onClick={() => setActiveTab(tabType)}
          className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center ${
            activeTab === tabType
              ? 'text-white border-b-2 border-purple-500 bg-night-800/30'
              : 'text-night-400 hover:text-white hover:bg-night-800/20'
          }`}
          title={SECTION_TITLES[tabType]}
          aria-label={`Switch to ${SECTION_TITLES[tabType]} panel`}
        >
          <i className={`${TAB_ICONS[tabType]} text-lg`}></i>
        </button>
    ))
    
    return (
        <div className="flex border-b border-night-800 shrink-0">
            {tabMap}
        </div>
    )
}

export default Tabs