import React, { forwardRef, useEffect } from 'react';

const DataForm = forwardRef(
  ({ newProduct, handleKeyCode, handleChange, handleSubmit, index }, ref) => {
    useEffect(() => {
      ref.current.focus();
    }, []);

    console.log('[DataForm] rendered');

    return (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='index'
          disabled
          value={index}
          onKeyDown={handleKeyCode}
          autoComplete='off'
          style={{ width: '1.5rem', textAlign: 'center' }}
        />
        <input
          type='text'
          name='name'
          placeholder='name'
          value={newProduct.name}
          onChange={handleChange}
          onKeyDown={handleKeyCode}
          autoComplete='off'
          ref={ref}
        />
        <input
          type='number'
          name='qty'
          placeholder='qty'
          value={newProduct.qty}
          onChange={handleChange}
          onKeyDown={handleKeyCode}
          autoComplete='off'
        />
        <input
          type='number'
          name='price'
          placeholder='price'
          value={newProduct.price}
          onChange={handleChange}
          onKeyDown={handleKeyCode}
          autoComplete='off'
        />
      </form>
    );
  }
);

export default DataForm;
