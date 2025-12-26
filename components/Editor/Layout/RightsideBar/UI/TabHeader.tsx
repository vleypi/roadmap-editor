import { ITabHeaderProps } from '@/types/editor.interfaces';

export const TabHeader: React.FC<ITabHeaderProps> = ({ title, actions }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-bold text-lg">{title}</h3>
    {actions && <div className="flex items-center space-x-2">{actions}</div>}
  </div>
);