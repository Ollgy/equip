import React from 'react';

const Button = ({ children, ...props }) => (
  <input
    className='button'
    value={children}
    type='button'
    {...props}
  />
);

export default Button;
