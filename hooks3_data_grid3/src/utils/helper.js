export const getInputElement = (currentInput, direction, i) => {
  const rowsArray = Array.from(currentInput.parentNode.elements);
  const colsArray = Array.from(document.getElementById('data-row').children);

  const currentColIndex = colsArray.findIndex(
    form => form === currentInput.form
  );
  const currentRowIndex = rowsArray.findIndex(input => input === currentInput);

  const colArray = index => {
    if (index === -1 || index >= colsArray.length) return undefined;
    return colsArray[index].children;
  };

  if (currentRowIndex === -1) return;
  switch (direction) {
    case 'first':
      return rowsArray[0];
    case 'last':
      return rowsArray[rowsArray.length - 1];
    case 'currentRow':
      return rowsArray[currentRowIndex];
    case 'next':
      return rowsArray[currentRowIndex + 1];
    case 'before':
      return rowsArray[currentRowIndex - 1];
    case 'up':
      return colArray(currentColIndex - 1);
    case 'down':
      return colArray(currentColIndex + 1);
    case 'currentCol':
      return colArray(currentColIndex);
    default:
      return undefined;
  }
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const inputConfigToArray = (array, inputRef) => {
  const dataArray = [];
  for (let key in array) {
    dataArray.push({
      id: key,
      config: array[key]
    });
  }
  dataArray[0].config.elementConfig.ref = inputRef;
  return dataArray;
};
