import { useState, useCallback } from 'react';
import { TAG_CONFIG } from '@/constants/editor.constant';

export const useTagManager = (
  tags: string[],
  onTagsChange: (tags: string[]) => void
) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addTag = useCallback(() => {
    setShowInput(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    if (value.length <= TAG_CONFIG.MAX_LENGTH) {
      setInputValue(value);
    }
  }, []);

  const confirmTag = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed && trimmed.length <= TAG_CONFIG.MAX_LENGTH) {
      onTagsChange([...tags, trimmed]);
      setInputValue('');
      setShowInput(false);
    }
  }, [inputValue, tags, onTagsChange]);

  const cancelTag = useCallback(() => {
    setInputValue('');
    setShowInput(false);
  }, []);

  const removeTag = useCallback((index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  }, [tags, onTagsChange]);

  return {
    showInput,
    inputValue,
    addTag,
    handleInputChange,
    confirmTag,
    cancelTag,
    removeTag
  };
};