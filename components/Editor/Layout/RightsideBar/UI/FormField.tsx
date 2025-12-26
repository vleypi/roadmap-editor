import { IFormFieldProps } from '@/types/editor.interfaces';

export const FormField: React.FC<IFormFieldProps> = ({ 
  label, 
  required, 
  labelId,
  children 
}) => (
  <div>
    <label 
      className="block text-sm text-night-400 mb-2"
      id={labelId}
    >
      {label} {required && '*'}
    </label>
    {children}
  </div>
);