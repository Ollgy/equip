import React from 'react';

export default React.forwardRef(({ name, ...props }, ref) => (
  <div
    className='inputWrap'
  >
    <input
      className='input'
      id={name}
      ref={ref}
      name={name}
      {...props}
    />
  </div>
));
