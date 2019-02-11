import React, { memo, useState, useCallback, useEffect } from 'react';

import { getInputEl } from './utils/helper';
import TableRow from './TableRow';

const Table = memo(() => {
  const products = [
    { id: 1, name: 'A', amount: '1', price: '200' },
    { id: 2, name: 'B', amount: '3', price: '100' },
    { id: 3, name: '', amount: '', price: '' }
  ];
  const [productsArray, setProductsArray] = useState(products);

  const handleChange = i =>
    useCallback(
      e => {
        const copiedProductsArray = [...productsArray];
        const target = e.target.placeholder;
        copiedProductsArray[i][target] = e.target.value;
        setProductsArray(copiedProductsArray);
      },
      [setProductsArray]
    );
  const handleKeyCode = i =>
    useCallback(e => {
      const currentInput = e.target;

      const rightTarget = getInputEl(currentInput, 'next');
      const leftTarget = getInputEl(currentInput, 'before');
      const currentRowTarget = getInputEl(currentInput, 'currentRow');

      const upperTarget = getInputEl(currentInput, 'up', i);
      const currentColTarget = getInputEl(currentInput, 'currentCol', i);
      const downTarget = getInputEl(currentInput, 'down', i);

      switch (e.keyCode) {
        case 38: // up
          return upperTarget !== undefined
            ? upperTarget.focus()
            : currentColTarget.focus();
        case 40: //down
          return downTarget !== undefined
            ? downTarget.focus()
            : currentColTarget.focus();
        case 13:
        case 39: {
          e.preventDefault();
          return rightTarget !== undefined
            ? rightTarget.focus()
            : handleSubmit(e);
        }
        case 37: {
          return leftTarget !== undefined
            ? leftTarget.focus()
            : currentRowTarget.focus();
        }
        default:
          return;
      }
    }, []);
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      //var newProductArray = JSON.parse(JSON.stringify(productsArray));
      //newProductArray.push({ id: 2, name: 'df', amount: '', price: '' });
      //console.log(newProductArray);
      //const newProductArray = [{ id: 1, name: 'df', amount: '', price: '' }];
      //console.log(productsArray.concat(...newProductArray));
      setProductsArray([
        { id: 2, name: 'df', amount: '', price: '' },
        { id: 3, name: 'df', amount: '1', price: '' }
      ]);
      //setProductsArray(prevArray => [...prevArray, ...newProductArray]);
    },
    [productsArray]
  );
  console.log('[Table] is rendered');
  return (
    <table style={{ border: '1' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {productsArray.map((product, i) => {
          return (
            <TableRow
              key={product.id}
              id={product.id}
              name={product.name}
              amount={product.amount}
              price={product.price}
              handleChange={handleChange(i)}
              onKeyDown={handleKeyCode(i)}
            />
          );
        })}
      </tbody>
    </table>
  );
});

export default Table;
