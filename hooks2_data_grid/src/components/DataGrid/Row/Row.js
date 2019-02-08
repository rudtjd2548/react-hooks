import React, { useEffect, useCallback, useRef } from 'react';

import { getInputEl } from '../../../utils/helper';
import Input from '../../../components/UI/Input/Input';

const Row = ({ inputsProps, handleSubmit, handleKeyCode }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    getInputEl(mappedInputs[0].ref.current, 'first').focus();
  }, []);

  const mappedInputs = inputsProps.map(inputProps => {
    return (
      <Input
        {...inputProps}
        key={inputProps.name}
        ref={inputRef}
        placeholder={inputProps.name}
        onKeyDown={handleKeyCode}
      />
    );
  });

  console.log('[Row] is rendered');
  return (
    <form onSubmit={handleSubmit}>
      <div>{mappedInputs}</div>
    </form>
  );
};

export default Row;
