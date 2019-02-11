import React from 'react';

const dataRow = ({ product, handleKeyCode, handleChange }) => {
  console.log('[DataRow] rendered');
  return (
    <form>
      <input
        type='text'
        name='index'
        value={product.index}
        onKeyDown={handleKeyCode}
        disabled
        style={{ width: '1.5rem', textAlign: 'center' }}
        autoComplete='off'
      />
      <input
        type='text'
        name='name'
        value={product.name}
        onChange={handleChange}
        onKeyDown={handleKeyCode}
        autoComplete='off'
      />
      <input
        type='text'
        name='qty'
        value={product.qty}
        onChange={handleChange}
        onKeyDown={handleKeyCode}
        autoComplete='off'
      />
      <input
        type='text'
        name='price'
        value={product.price}
        onChange={handleChange}
        onKeyDown={handleKeyCode}
        autoComplete='off'
      />
    </form>
  );
};

export default dataRow;
