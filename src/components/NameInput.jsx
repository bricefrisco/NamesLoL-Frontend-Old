import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummoner, getLoading } from '../state/summonerSlice';
import {
  getLimit,
  getNameInput,
  getHideSearch,
  setHideSearch,
  setName,
  toggleLimit,
} from '../state/settingsSlice';
import theme from '../styles/theme';

const inputStyles = css`
  background-color: rgba(255, 255, 255, 0.02);
  margin-top: 15px;

  .MuiInputBase-root > input {
    font-family: Ubuntu Mono;
    margin-left: 5px;
  }

  div::before {
    border-color: rgb(46, 50, 54) !important;
    color: ${theme.textSecondary};
  }

  input: {
    font-family: Ubuntu Mono !important;
    margin-left: 5px;
  }
`;

const hideSearchStyles = css`
  color: ${theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: flex-end;

  p {
    font-size: 11px;
    font-weight: 500;
    min-width: 70px;
    margin-right: -10px;
  }
`;

const searchIconStyles = css`
  color: ${theme.textSecondary};
`;

const NameInput = () => {
  const dispatch = useDispatch();
  const summonerName = useSelector(getNameInput);
  const loading = useSelector(getLoading);
  const limit = useSelector(getLimit);
  const hideSearch = useSelector(getHideSearch);

  const click = () => {
    dispatch(toggleLimit());
    dispatch(fetchSummoner());
  };

  const keypress = (e) => {
    if (e.keyCode === 13) {
      click();
    }
  };

  return (
    <TextField
      variant='standard'
      autoComplete='off'
      size='small'
      fullWidth
      sx={inputStyles}
      placeholder='Summoner name'
      value={summonerName}
      onKeyDown={keypress}
      InputProps={{
        endAdornment: (
          <>
            <Box sx={hideSearchStyles}>
              <Typography>Hide Search</Typography>
              <Tooltip title="Hide search (won't add summoner name to table)">
                <Checkbox
                  size='small'
                  color='default'
                  checked={hideSearch}
                  onChange={(e) => dispatch(setHideSearch(e.target.checked))}
                />
              </Tooltip>
            </Box>
            <InputAdornment position='end'>
              <IconButton size='small' onClick={click}>
                <Search sx={searchIconStyles} />
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
      onChange={(e) => dispatch(setName(e.target.value))}
      disabled={loading || limit}
    />
  );
};

export default NameInput;
