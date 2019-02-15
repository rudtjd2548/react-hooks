import React, { useState, useRef } from 'react';

import Input from './components/UI/Input/Cell';
import './DataArray.css';
import initNewProductJSON from './JSON/initNewProduct';
import DataForm from './DataForm';
import {
  getInputElement,
  updateObject,
  checkValidity,
  inputConfigToArray
} from './utils/helper';

const dataArray = props => {
  const inputRef = useRef();
  const initNewProduct = initNewProductJSON;

  const [newProduct, setNewProduct] = useState(initNewProduct);
  const [products, setProducts] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);

  const [suggestions, setSuggestions] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  });

  const clickSuggestion = e => {
    setSuggestions({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    const updatedFormElement = updateObject(newProduct['product'], {
      value: e.currentTarget.innerText,
      valid: checkValidity(
        e.currentTarget.innerText,
        newProduct['product'].validation
      ),
      touched: true
    });
    const updatedForm = updateObject(newProduct, {
      product: updatedFormElement
    });
    setNewProduct(updatedForm);
  };

  const handleChange = (type, index) => e => {
    const identifier = e.target.name;
    console.log(e.target.name === 'product');

    if (type === 'new') {
      //suggestions
      if (e.target.name === 'product') {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = props.suggestions.filter(suggestion => {
          return (
            suggestion.product.toLowerCase().indexOf(userInput.toLowerCase()) >
            -1
          );
        });
        setSuggestions({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput
        });
      }
      //products
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
      const identifierConfig = copiedProducts[index][identifier];
      identifierConfig.value = e.target.value;
      identifierConfig.touched = true;
      identifierConfig.valid = checkValidity(
        e.target.value,
        identifierConfig.validation
      );
      setProducts(copiedProducts);
    }
  };

  const handleKeyCode = (type, index) => e => {
    const currentInput = e.target;

    const rightTarget = getInputElement(currentInput, 'next');
    //console.log(rightTarget.disabled);
    const leftTarget = getInputElement(currentInput, 'before');
    const currentRowTarget = getInputElement(currentInput, 'currentRow');
    const upTarget = getInputElement(currentInput, 'up');
    const downTarget = getInputElement(currentInput, 'down');
    const currentColTarget = getInputElement(currentInput, 'currentCol');

    if (type === 'old') {
      const targetValid = target => {
        e.preventDefault();
        if (products[index][e.target.name].valid) {
          if (products[index][e.target.name].touched) {
            handleSubmit(type, e);
            products[index][e.target.name].touched = false;
          }
          return target.select();
        } else {
          return currentColTarget[e.target.name].select();
        }
      };
      switch (e.keyCode) {
        case 13:
        case 39:
          return rightTarget !== undefined
            ? targetValid(rightTarget)
            : targetValid(downTarget['product']);
        case 37:
          return leftTarget !== undefined
            ? targetValid(leftTarget)
            : targetValid(currentRowTarget);
        case 38:
          return upTarget !== undefined
            ? targetValid(upTarget[e.target.name])
            : targetValid(currentColTarget[e.target.name]);
        case 40:
          return downTarget === undefined
            ? targetValid(currentColTarget[e.target.name])
            : downTarget[e.target.name].value === ''
            ? targetValid(inputRef.current.form.elements[1])
            : targetValid(downTarget[e.target.name]);
        case 115: //F4
          return handleDelete(
            index,
            currentColTarget[e.target.name],
            downTarget[e.target.name]
          );

        default:
          return;
      }
    } else if (type === 'new') {
      const controlSuggestions = keyCode => {
        const activeSuggestion = suggestions.activeSuggestion;
        const filteredSuggestions = suggestions.filteredSuggestions;
        if (keyCode === '40') {
          if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
          }
          const modifiedSuggestions = updateObject(suggestions, {
            activeSuggestion: activeSuggestion + 1
          });
          setSuggestions(modifiedSuggestions);
        } else if (keyCode === '38') {
          if (activeSuggestion === 0) return;

          const modifiedSuggestions = updateObject(suggestions, {
            activeSuggestion: activeSuggestion - 1
          });
          setSuggestions(modifiedSuggestions);
        } else if (keyCode === '13') {
          const modifiedSuggestions = updateObject(suggestions, {
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion].product
          });
          setSuggestions(modifiedSuggestions);

          let updatedElements = [];
          for (let name in filteredSuggestions[activeSuggestion]) {
            const updatedFormElement = updateObject(newProduct[name], {
              value: filteredSuggestions[activeSuggestion][name],
              valid: checkValidity(
                filteredSuggestions[activeSuggestion][name],
                newProduct[name].validation
              ),
              touched: true
            });
            updatedElements.push({ [name]: updatedFormElement });
          }
          const updatedForm = updateObject(
            newProduct,
            Object.assign({}, ...updatedElements)
          );
          setNewProduct(updatedForm);
        }
      };
      switch (e.keyCode) {
        case 13:
        case 39:
          e.preventDefault();
          return e.target.name === 'product'
            ? suggestions.showSuggestions
              ? controlSuggestions('13')
              : rightTarget.select()
            : rightTarget !== undefined
            ? rightTarget.select()
            : formIsValid
            ? handleSubmit(type, e)
            : currentRowTarget.select();
        case 37:
          e.preventDefault();
          return leftTarget !== undefined
            ? leftTarget.select()
            : currentRowTarget.select();
        case 38:
          e.preventDefault();
          return e.target.name === 'product'
            ? suggestions.showSuggestions
              ? controlSuggestions('38')
              : upTarget !== undefined
              ? upTarget[e.target.name].select()
              : currentColTarget[e.target.name].select()
            : upTarget !== undefined
            ? upTarget[e.target.name].select()
            : currentColTarget[e.target.name].select();
        case 40:
          e.preventDefault();
          return e.target.name === 'product'
            ? controlSuggestions('40')
            : downTarget !== undefined
            ? downTarget[e.target.name].select()
            : currentColTarget[e.target.name].select();
        default:
          return;
      }
    }
  };

  const handleSubmit = (type, e) => {
    e.preventDefault();
    if (type === 'old') {
      console.log('save');
      setFormIsValid(false);
    } else if (type === 'new') {
      const submittedForm = newProduct;
      for (let identifier in submittedForm) {
        submittedForm[identifier].touched = false;
      }
      addDataRow(submittedForm);
      setNewProduct(initNewProduct);
      setFormIsValid(false);
      inputRef.current.form.elements[1].focus();
    }
  };

  const handleDelete = (index, target, downTarget) => {
    target.select();
    setProducts(products.filter(idx => idx !== products[index]));

    if (products.length === 1 || downTarget.value === '') {
      inputRef.current.form.elements[1].focus();
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

  let suggestionsListComponent;

  if (suggestions.showSuggestions && suggestions.userInput) {
    if (suggestions.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className='suggestions'>
          {suggestions.filteredSuggestions.map((suggestion, index) => {
            let className;
            if (index === suggestions.activeSuggestion) {
              className = 'suggestion-active';
            }
            return (
              <li
                className={className}
                key={suggestion.product}
                onClick={clickSuggestion}
              >
                {suggestion.product}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className='no-suggestions'>
          <em>No suggestions</em>
        </div>
      );
    }
  }

  return (
    <div id='data-row'>
      {products.map((product, index) => {
        return (
          <form index={index} key={index}>
            <input
              disabled
              value={index + 1}
              style={{ width: '2rem', textAlign: 'center' }}
            />
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
      {suggestionsListComponent}
    </div>
  );
};

export default dataArray;
