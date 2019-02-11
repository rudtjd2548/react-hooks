import React, { useState, useRef } from 'react';

import DataRow from './dataRow';
import DataForm from './dataForm';
import { getInputElement } from './utils/helper';

const dataArray = () => {
  const initNewProduct = { name: '', qty: '', price: '' };
  const [newProduct, setNewProduct] = useState(initNewProduct);
  const initProducts = [
    { index: 1, name: 'banana', qty: '1', price: '300' },
    { index: 2, name: 'cheese', qty: '20', price: '1400' }
  ];
  const [products, setProducts] = useState(initProducts);
  const inputRef = useRef();

  const addDataRow = newData => {
    const newDatas = [...products, { ...newData, index: products.length + 1 }];
    setProducts(newDatas);
  };

  const handleSubmit = (type, e) => {
    e.preventDefault();
    if (type === 'old') {
      console.log('save');
    } else if (type === 'new') {
      console.log(products);
      if (!newProduct) return;
      addDataRow(newProduct);
      setNewProduct(initNewProduct);
      inputRef.current.focus();
    }
  };

  const handleChange = (type, index) => e => {
    const inputName = e.target.name;
    if (type === 'new') {
      setNewProduct({ ...newProduct, [inputName]: e.target.value });
    } else if (type === 'old') {
      const copiedProducts = [...products];
      copiedProducts[index][inputName] = e.target.value;
      console.log(copiedProducts);
      setProducts(copiedProducts);
    }
  };

  const handleKeyCode = (type, index) => e => {
    const currentInput = e.target;
    const rightTarget = getInputElement(currentInput, 'next');
    const leftTarget = getInputElement(currentInput, 'before');
    const currentRowTarget = getInputElement(currentInput, 'currentRow');
    const upTarget = getInputElement(currentInput, 'up');
    const downTarget = getInputElement(currentInput, 'down');
    const currentColTarget = getInputElement(currentInput, 'currentCol');
    const samelogic = () => {
      e.preventDefault();
      if (type === 'old') {
        //console.log(products[index][e.target.name]);
        //console.log(currentRowTarget['value']);
        handleSubmit(type, e);
      }
    };
    switch (e.keyCode) {
      case 13:
      case 39:
        samelogic();
        return rightTarget !== undefined
          ? rightTarget.select()
          : type === 'old'
          ? downTarget['name'].select()
          : handleSubmit(type, e);
      case 37:
        samelogic();
        return leftTarget !== undefined
          ? leftTarget.select()
          : currentRowTarget.select();
      case 38:
        samelogic();
        return upTarget !== undefined
          ? upTarget[e.target.name].select()
          : currentColTarget[e.target.name].select();
      case 40:
        samelogic();
        return downTarget !== undefined
          ? downTarget[e.target.name].select()
          : currentColTarget[e.target.name].select();
      default:
        return;
    }
  };

  console.log('[DataArray] rendered');
  return (
    <div id='data-row'>
      {products.map((product, index) => {
        return (
          <DataRow
            key={product.index}
            index={index}
            product={product}
            handleKeyCode={handleKeyCode('old', index)}
            handleChange={handleChange('old', index)}
          />
        );
      })}
      <DataForm
        handleKeyCode={handleKeyCode('new')}
        newProduct={newProduct}
        handleChange={handleChange('new')}
        handleSubmit={handleSubmit}
        ref={inputRef}
        index={products.length + 1}
      />
    </div>
  );
};

export default dataArray;
