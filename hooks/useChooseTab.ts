import { useState } from "react"
import type { TabType } from '@/types/editor.types';
import { RIGHT_SIDEBAR_TYPES } from "@/constants/editor.constant";


export const useChooseTab = () =>{
    const [activeTab, setActiveTab] = useState<TabType>(RIGHT_SIDEBAR_TYPES.PROPERTIES);
    return {activeTab, setActiveTab}
}