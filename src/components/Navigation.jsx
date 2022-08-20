import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import { Language } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeRegion, getRegion, Region } from '../state/settingsSlice';
import theme from '../styles/theme';

const appBarStyles = css`
  background-color: ${theme.primary};
  max-height: 48px !important;
  min-height: 48px !important;

  padding-left: 0px !important;
  padding-right: 0px !important;
`;

const flexBetweenStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const regionDivStyles = css`
  display: flex;
  align-items: center;
`;

const regionSelectorStyles = css`
  color: #fff;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 8px;

  svg {
    color: #fff;
  }

  .MuiFilledInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const region = useSelector(getRegion);

  return (
    <AppBar position='static' sx={appBarStyles} color='primary'>
      <Toolbar sx={appBarStyles}>
        <Container sx={flexBetweenStyles}>
          <Typography variant='h6'>NamesLoL</Typography>
          <Box>
            <Box sx={regionDivStyles}>
              <Language />
              <FormControl>
                <Select
                  autoWidth
                  value={region}
                  variant='filled'
                  disableUnderline
                  sx={regionSelectorStyles}
                  onChange={(e) => dispatch(changeRegion(e.target.value))}
                >
                  {Region.map((r) => (
                    <MenuItem key={r.toString().toUpperCase()} value={r}>
                      {r.toString().toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
