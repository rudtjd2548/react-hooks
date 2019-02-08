export const getInputEl = (currentInput, direction) => {
  const inputs = Array.from(currentInput.form.elements);
  const currentIndex = inputs.findIndex(input => input === currentInput);

  if (currentIndex === -1) return undefined;
  switch (direction) {
    case 'first':
      return inputs[0];
    case 'last':
      return inputs[inputs.length - 1];
    case 'current':
      return inputs[currentIndex];
    case 'next':
      return inputs[currentIndex + 1];
    case 'before':
      return inputs[currentIndex - 1];
    case 'submit':
      return inputs[currentIndex].submit();
    default:
      return undefined;
  }
};
