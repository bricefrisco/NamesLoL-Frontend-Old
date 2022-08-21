import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { getPagination, getLoading, getError } from '../state/summonersSlice';
import { navigate, useParams } from '../utils/api';
import theme from '../styles/theme';

const paginationStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const buttonStyles = css`
  color: ${theme.textSecondary};
  margin-left: 5px;
  margin-right: 5px;
`;

const dateStyles = css`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  padding: 5px 15px;
  width: 140px;

  div > input {
    color: rgb(3, 169, 244) !important;
    font-weight: 500;
    font-size: 14px;
  }

  div > div > button {
    color: ${theme.textSecondary};
  }

  div > div > button > svg {
    font-size: 1.5rem;
  }

  div::before {
    border-bottom: none !important;
  }

  div::after {
    border-bottom: none !important;
  }
`;

const Pagination = ({ showWhenLoading }) => {
  const history = useHistory();
  const params = useParams();

  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const pagination = useSelector(getPagination);

  const goBackwards = () => {
    navigate(history, pagination.backwards, true, params.get('nameLength'));
  };

  const goForwards = () => {
    navigate(history, pagination.forwards, false, params.get('nameLength'));
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate == null) return;
    selectedDate.setHours(0);
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);

    navigate(history, selectedDate.getTime(), false, params.get('nameLength'));
  };

  if (loading && !showWhenLoading) return null;
  if (error) return null;
  if (!pagination.backwards) return null;

  const today = new Date();

  return (
    <Box sx={paginationStyles}>
      <IconButton
        size='small'
        sx={buttonStyles}
        onClick={goBackwards}
        disabled={loading}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            variant='inline'
            inputFormat='MM/dd/yyyy'
            inputProps={{ readOnly: true }}
            minDate={
              new Date(
                today.getFullYear() - 2,
                today.getMonth(),
                today.getDate(),
              )
            }
            maxDate={
              new Date(
                today.getFullYear() + 1,
                today.getMonth(),
                today.getDate(),
              )
            }
            value={new Date(pagination.backwards)}
            onChange={(e) => handleDateChange(e)}
            renderInput={(props) => (
              <TextField {...props} sx={dateStyles} variant='standard' />
            )}
          />
        </Stack>
      </LocalizationProvider>

      <IconButton
        size='small'
        sx={buttonStyles}
        onClick={goForwards}
        disabled={loading}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

Pagination.defaultProps = {
  showWhenLoading: false,
};

Pagination.propTypes = {
  showWhenLoading: PropTypes.bool,
};

export default Pagination;
