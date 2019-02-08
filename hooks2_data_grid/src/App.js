import React, { useCallback } from 'react';

import Row from './components/DataGrid/Row/Row';
import { useInputProps } from './utils/useHooks';
import { getInputEl } from './utils/helper';
import './App.scss';

const App = React.memo(() => {
  const inputsProps = [
    useInputProps('product', 'text', ''),
    useInputProps('amount', 'number', ''),
    useInputProps('Purchase Price', 'number', ''),
    useInputProps('Sales price', 'number', '')
  ];

  const handleKeyCode = useCallback(
    e => {
      const currentInput = e.target;
      switch (e.keyCode) {
        case 13:
        case 39: {
          //e.preventDefault();
          const nextTarget = getInputEl(currentInput, 'next');
          return nextTarget !== undefined
            ? nextTarget.focus()
            : handleSubmit(e);
        }
        case 37: {
          e.preventDefault();
          const beforeTarget = getInputEl(currentInput, 'before');
          const currentTarget = getInputEl(currentInput, 'current');
          return beforeTarget !== undefined
            ? beforeTarget.focus()
            : currentTarget.focus();
        }
        default:
          return;
      }
    },
    [inputsProps]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log(
        inputsProps.map(inputProps => {
          return inputProps.value;
        })
      );
    },
    [inputsProps]
  );

  console.log('[App.js] is rendered');

  return (
    <React.Fragment>
      <h1>Hello</h1>
      <Row
        inputsProps={inputsProps}
        handleSubmit={handleSubmit}
        handleKeyCode={handleKeyCode}
      />
    </React.Fragment>
  );
});

export default App;
