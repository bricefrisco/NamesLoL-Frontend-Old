import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';

const linkStyles = css`
  color: rgb(0, 135, 246);
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Retry = ({ text, retryFunction }) => {
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
    <Box
      component='span'
      role='button'
      tabIndex='0'
      sx={linkStyles}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text}
    </Box>
  );
};

Retry.propTypes = {
  text: PropTypes.string.isRequired,
  retryFunction: PropTypes.func.isRequired,
};

export default Retry;
