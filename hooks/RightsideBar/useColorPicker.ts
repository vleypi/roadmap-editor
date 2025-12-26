import { useState, useCallback } from 'react';
import { REGEX} from '@/constants/editor.constant';

export const useColorPicker = (
  currentColor: string,
  onColorChange: (color: string) => void
) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customColor, setCustomColor] = useState(currentColor);

  const toggleCustomPicker = useCallback(() => {
    setShowCustomPicker(prev => !prev);
    setCustomColor(currentColor);
  }, [currentColor]);

  const handleCustomColorChange = useCallback((value: string) => {
    if (REGEX.HEX_COLOR.test(value)) {
      setCustomColor(value);
    }
  }, []);

  const applyCustomColor = useCallback(() => {
    onColorChange(customColor);
    setShowCustomPicker(false);
  }, [customColor, onColorChange]);

  const closeCustomPicker = useCallback(() => {
    setShowCustomPicker(false);
    setCustomColor(currentColor);
  }, [currentColor]);

  return {
    showCustomPicker,
    customColor,
    toggleCustomPicker,
    handleCustomColorChange,
    applyCustomColor,
    closeCustomPicker
  };
};