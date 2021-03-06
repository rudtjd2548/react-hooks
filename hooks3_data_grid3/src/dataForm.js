import React, { forwardRef, useEffect } from 'react';

import Input from './components/UI/Input/Cell';
import { inputConfigToArray } from './utils/helper';

const DataForm = forwardRef(
  ({ newProduct, handleKeyCode, handleChange, handleSubmit, index }, ref) => {
    useEffect(() => {
      ref.current.form.elements[1].focus();
    }, []);

    console.log('[DataForm] rendered');

    return (
      <form onSubmit={handleSubmit}>
        <input
          disabled
          value={index}
          style={{ width: '2rem', textAlign: 'center' }}
        />
        {inputConfigToArray(newProduct, ref).map(identifier => {
          return (
            <Input
              key={identifier.id}
              elementType={identifier.config.elementType}
              elementConfig={identifier.config.elementConfig}
              value={identifier.config.value}
              invalid={!identifier.config.valid}
              shouldValidate={identifier.config.validation}
              touched={identifier.config.touched}
              handleChange={handleChange}
              handleKeyCode={handleKeyCode}
            />
          );
        })}
      </form>
    );
  }
);

export default DataForm;
