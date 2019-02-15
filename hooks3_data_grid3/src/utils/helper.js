export const getInputElement = (currentInput, direction) => {
  const rowsArray = Array.from(currentInput.parentNode.elements);
  const colsArray = Array.from(document.getElementById('data-row').children);

  let accessableRowsIndexes = [];
  for (let i in rowsArray) {
    if (rowsArray[i].disabled !== true) {
      accessableRowsIndexes.push(Number(i));
    }
  }

  const currentColIndex = colsArray.findIndex(
    form => form === currentInput.form
  );
  const currentRowIndex = rowsArray.findIndex(input => input === currentInput);

  const colArray = index => {
    if (index === -1 || index >= colsArray.length) return undefined;
    return colsArray[index].children;
  };

  const newIndex = accessableRowsIndexes.indexOf(currentRowIndex);
  const formattedRowsArray = i => {
    return rowsArray[accessableRowsIndexes[i]];
  };

  if (currentRowIndex === -1) return;
  switch (direction) {
    case 'first':
      return formattedRowsArray(0);
    case 'last':
      return formattedRowsArray(accessableRowsIndexes.length - 1);
    case 'currentRow':
      return formattedRowsArray(newIndex);
    case 'next':
      return formattedRowsArray(newIndex + 1);
    case 'before':
      return formattedRowsArray(newIndex - 1);
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
