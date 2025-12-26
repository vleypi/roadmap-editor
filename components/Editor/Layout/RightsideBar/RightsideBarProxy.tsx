import { RIGHT_SIDEBAR_TYPES } from '@/constants/editor.constant'

import { PropertiesTab } from '@/components/Editor/Layout/RightsideBar/Tabs/PropertiesTab';
import { LayersTab } from '@/components/Editor/Layout/RightsideBar/Tabs/LayersTab';
import { JSONTab } from '@/components/Editor/Layout/RightsideBar/Tabs/JSONTab';
import { RightSidebarProxyProps } from '@/types/editor.interfaces'; 

export function RightSidebarProxy({ activeTab }: RightSidebarProxyProps){

    const RenderTab = () => {
        switch (activeTab) {
          case RIGHT_SIDEBAR_TYPES.PROPERTIES:
            return <PropertiesTab />;
          case RIGHT_SIDEBAR_TYPES.LAYERS:
            return <LayersTab />;
          case RIGHT_SIDEBAR_TYPES.JSON:
            return <JSONTab />;
          default:
            return null;
        }
    };

    return (
        <div className='p-[15px] overflow-y-auto max-h-full'>
          <RenderTab />
        </div>
    )
}