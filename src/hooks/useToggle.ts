import { useState } from 'react';

const useToggle = (initialState: boolean) => {
  const [toggle, setToggle] = useState(initialState);

  const setTrue = () => {
    setToggle(true);
  };

  const setFalse = () => {
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return { setFalse, setTrue, handleToggle, toggle };
};

export default useToggle;
