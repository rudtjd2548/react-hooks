import React, { useState, useRef } from 'react';

import Input from './components/UI/Input/Cell';
import DataForm from './DataForm';
import {
  getInputElement,
  updateObject,
  checkValidity,
  inputConfigToArray
} from './utils/helper';

const dataArray = () => {
  const inputRef = useRef();
  const initNewProduct = {
    product: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'product',
        placeholder: 'product',
        autoComplete: 'off'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    qty: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'qty',
        placeholder: 'qty',
        autoComplete: 'off'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    price: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'price',
        placeholder: 'price',
        autoComplete: 'off'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  };

  const [newProduct, setNewProduct] = useState(initNewProduct);
  const [products, setProducts] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChange = (type, index) => e => {
    const identifier = e.target.name;

    if (type === 'new') {
      const updatedFormElement = updateObject(newProduct[identifier], {
        value: e.target.value,
        valid: checkValidity(e.target.value, newProduct[identifier].validation),
        touched: true
      });
      const updatedForm = updateObject(newProduct, {
        [identifier]: updatedFormElement
      });
      let isValid = true;
      for (let identifier in updatedForm) {
        isValid = updatedForm[identifier].valid && isValid;
      }
      setNewProduct(updatedForm);
      setFormIsValid(isValid);
    } else if (type === 'old') {
      const copiedProducts = [...products];
      copiedProducts[index][identifier].value = e.target.value;
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
          ? downTarget[0].select()
          : formIsValid
          ? handleSubmit(type, e)
          : currentRowTarget.select();
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

  const handleSubmit = (type, e) => {
    e.preventDefault();
    if (type === 'old') {
      console.log('save');
    } else if (type === 'new') {
      addDataRow(newProduct);
      setNewProduct(initNewProduct);
      setFormIsValid(false);
      inputRef.current.focus();
    }
  };

  const addDataRow = newData => {
    //const formData = {};
    //for (let identifier in newData) {
    //    formData[identifier] = newData[identifier].value;
    //} ==== for server ====
    const newProducts = [...products, { ...newData }];
    setProducts(newProducts);
  };

  return (
    <div id='data-row'>
      {products.map((product, index) => {
        return (
          <form index={index} key={index}>
            {inputConfigToArray(product).map(identifier => {
              return (
                <Input
                  key={identifier.id}
                  elementType={identifier.config.elementType}
                  elementConfig={identifier.config.elementConfig}
                  value={identifier.config.value}
                  invalid={!identifier.config.valid}
                  touched={identifier.config.touched}
                  handleChange={handleChange('old', index)}
                  handleKeyCode={handleKeyCode('old', index)}
                />
              );
            })}
          </form>
        );
      })}
      <DataForm
        index={products.length + 1}
        newProduct={newProduct}
        handleChange={handleChange('new')}
        handleKeyCode={handleKeyCode('new')}
        handleSubmit={handleSubmit}
        ref={inputRef}
      />
    </div>
  );
};

export default dataArray;
