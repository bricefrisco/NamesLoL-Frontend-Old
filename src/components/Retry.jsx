import React from 'react';
import PropTypes from 'prop-types';

const Retry = ({ text, retryFunction, className }) => {
  const onClick = () => {
    retryFunction();
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      retryFunction();
    }
  };

  return (
    <span
      role='button'
      tabIndex='0'
      className={className}
      onClick={onClick}
      onKeyDown={onKeyDown}>
      {text}
    </span>
  );
};

Retry.propTypes = {
  text: PropTypes.string.isRequired,
  retryFunction: PropTypes.func.isRequired,
  className: PropTypes.oneOf([PropTypes.object, PropTypes.string]).isRequired,
};

export default Retry;
