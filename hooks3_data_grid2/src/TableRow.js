import React from 'react';

const TableRow = ({ product, handleChange }) => {
  console.log(
    `[TableRow] is rendered ${product.id} :: ${product.name} :: ${
      product.amount
    } :: ${product.price}`
  );
  return (
    <tr>
      <td>
        <input
          type='text'
          value={product.id}
          placeholder='id'
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type='text'
          value={product.name}
          placeholder='name'
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type='text'
          value={product.amount}
          placeholder='amount'
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type='text'
          value={product.price}
          placeholder='price'
          onChange={handleChange}
        />
      </td>
    </tr>
  );
};

export default TableRow;
