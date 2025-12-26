import { IActionButtonProps } from '@/types/editor.interfaces';


export const ActionButton: React.FC<IActionButtonProps> = ({ 
  onClick, 
  variant = 'secondary',
  children,
  className = ''
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg',
    secondary: 'bg-night-800 hover:bg-night-700',
    danger: 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};