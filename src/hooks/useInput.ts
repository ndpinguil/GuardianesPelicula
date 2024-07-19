import { useState } from 'react';

const useInput = () => {
  const [input, setInput] = useState('');

  const handleText = (text: string) => {
    setInput(text);
  };

  const handleTextNumber = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setInput(numericValue);
  };

  return { input, handleText, handleTextNumber };
};

export default useInput;
