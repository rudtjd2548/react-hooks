import React, { useCallback } from 'react';

import './Input.scss';

const Input = React.memo(
  React.forwardRef((props, ref) => {
    console.log(`[${props.name} Input] rendered`);

    const handleChange = useCallback(
      e => {
        props.onChange(e.target.value);
      },
      [props.onChange]
    );

    return (
      <input {...props} ref={ref} onChange={handleChange} className='Input' />
    );
  })
);

export default Input;
