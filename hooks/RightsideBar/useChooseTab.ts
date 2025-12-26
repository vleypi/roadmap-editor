import { useState } from "react"
import type { TTabType } from '@/types/editor.types';
import { RIGHT_SIDEBAR_TYPES } from "@/constants/editor.constant";


export const useChooseTab = () =>{
    const [activeTab, setActiveTab] = useState<TTabType>(RIGHT_SIDEBAR_TYPES.PROPERTIES);
    return {activeTab, setActiveTab}
}