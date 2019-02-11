export const getInputEl = (currentInput, direction, i) => {
  const colsArray = Array.from(
    currentInput.parentNode.parentNode.parentNode.children
  );
  const rowsArray = Array.from(currentInput.parentNode.parentNode.children);
  const currentColIndex = i;
  const currentRowIndex = rowsArray.findIndex(
    input => input === currentInput.parentNode
  );

  const rowInput = index => {
    if (index === -1 || index >= rowsArray.length) return undefined;
    return rowsArray[index].children[0];
  };

  const colInput = index => {
    if (index === -1 || index >= colsArray.length) return undefined;
    return colsArray[index].children[currentRowIndex].children[0];
  };

  if (currentRowIndex === -1 || currentColIndex === -1) return undefined;
  switch (direction) {
    case 'first':
      return rowInput(0);
    case 'last':
      return rowInput(rowsArray.length - 1);
    case 'currentRow':
      return rowInput(currentRowIndex);
    case 'next':
      return rowInput(currentRowIndex + 1);
    case 'before':
      return rowInput(currentRowIndex - 1);
    case 'up':
      return colInput(currentColIndex - 1);
    case 'down':
      return colInput(currentColIndex + 1);
    case 'currentCol':
      return colInput(currentColIndex);
    default:
      return undefined;
  }
};
