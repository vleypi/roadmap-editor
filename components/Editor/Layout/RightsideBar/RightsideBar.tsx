import { useChooseTab } from '@/hooks/useChooseTab';
import Tabs from '@/components/Editor/Layout/RightsideBar/Tabs/TabsContainer';
import { RightSidebarProxy } from '@/components/Editor/Layout/RightsideBar/RightsideBarProxy'

export function RightSidebar(){
    const {activeTab, setActiveTab} = useChooseTab()
    return (
        <div className="relative w-100 border-l border-night-800 bg-night-900/50 flex flex-col overflow-hidden">   
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <RightSidebarProxy activeTab={activeTab} />
        </div>
    );
};

export default RightSidebar;