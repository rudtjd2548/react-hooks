import React, { memo } from 'react';

const TableRow = memo(
  ({ id, name, amount, price, handleChange, onKeyDown }) => {
    console.log(
      `[TableRow[${id}]] is rendered ${id} :: ${name} :: ${amount} :: ${price}`
    );
    return (
      <tr>
        <td>
          <input
            type='text'
            value={id}
            placeholder='id'
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </td>
        <td>
          <input
            type='text'
            value={name}
            placeholder='name'
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </td>
        <td>
          <input
            type='text'
            value={amount}
            placeholder='amount'
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </td>
        <td>
          <input
            type='text'
            value={price}
            placeholder='price'
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </td>
      </tr>
    );
  }
);

export default TableRow;
