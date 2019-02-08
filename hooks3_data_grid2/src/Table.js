import React, { useState } from 'react';

import TableRow from './TableRow';

const Table = () => {
  const products = [
    { id: 1, name: 'A', amount: 0, price: 0 },
    { id: 2, name: 'B', amount: 0, price: 0 },
    { id: 3, name: 'C', amount: 0, price: 0 },
    { id: 4, name: 'D', amount: 0, price: 0 }
  ];
  const [productsArray, setProductsArray] = useState(products);
  console.log(productsArray);

  const handleChange = i => e => {
    const copiedProductsArray = [...productsArray];
    const target = e.target.placeholder;
    copiedProductsArray[i][target] = e.target.value;
    setProductsArray(copiedProductsArray);
  };
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
              product={product}
              handleChange={handleChange(i)}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
