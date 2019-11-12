import React from 'react';

const CloseButton = ({ onClick }) => (
  <button
    type="button"
    className="button-close"
    onClick={onClick}
  />
);

export default CloseButton;
