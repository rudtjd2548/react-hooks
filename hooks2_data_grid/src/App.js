import React, { useState, useCallback } from 'react';

import Input from './components/UI/Input/Input';
import './App.scss';

const useInputProps = (name, type, initialValue) => {
  const [value, setValue] = useState(initialValue);
  return { name, type, value, onChange: setValue };
};

const getInputEl = (currentInput, direction) => {
  const inputs = Array.from(currentInput.form.elements);
  const currentIndex = inputs.findIndex(input => input === currentInput);

  if (currentIndex === -1) return undefined;

  if (direction === 'current') return inputs[currentIndex];
  if (direction === 'next') return inputs[currentIndex + 1];
  if (direction === 'before') return inputs[currentIndex - 1];
  return undefined;
};

const App = () => {
  const inputsProps = [
    useInputProps('product', 'text', ''),
    useInputProps('amount', 'number', 0),
    useInputProps('price', 'number', 0)
  ];

  const handleKeyCode = useCallback(e => {
    const currentInput = e.target;
    switch (e.keyCode) {
      case 13:
      case 39: {
        e.preventDefault();
        const nextTarget = getInputEl(currentInput, 'next');
        if (nextTarget !== undefined) {
          return nextTarget.focus();
        } else {
          return handleSubmit(e);
        }
      }
      case 37: {
        e.preventDefault();
        const beforeTarget = getInputEl(currentInput, 'before');
        const currentTarget = getInputEl(currentInput, 'current');
        if (beforeTarget !== undefined) {
          return beforeTarget.focus();
        } else {
          return currentTarget.focus();
        }
      }
      default:
        return;
    }
  }, []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    console.log(inputsProps);
  }, []);

  console.log('[App.js] is rendered');

  return (
    <React.Fragment>
      <h1>Hello</h1>
      <form>
        <div>
          {inputsProps.map(inputProps => {
            return (
              <Input
                {...inputProps}
                key={inputProps.name}
                placeholder={inputProps.name}
                onKeyDown={handleKeyCode}
              />
            );
          })}
        </div>
      </form>
    </React.Fragment>
  );
};

export default App;
