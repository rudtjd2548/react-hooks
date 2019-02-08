import { useState } from 'react';

export const useInputProps = (name, type, initialValue) => {
  const [value, setValue] = useState(initialValue);
  return { name, type, value, onChange: setValue };
};
