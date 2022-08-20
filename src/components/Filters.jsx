import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setNameLength } from '../state/settingsSlice';
import { navigate, useParams } from '../utils/api';
import theme from '../styles/theme';

const cardStyles = css`
  display: inline-block;
  color: ${theme.textSecondary};
  margin-left: 30px;
  min-width: 250px;
  max-width: 250px;
  background-color: ${theme.primary};
  border: 1px solid rgba(145, 158, 171, 0.24);
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;

  @media (max-width: 850px) {
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 0px;
  }

  @media (max-width: 450px) {
    margin: auto;
    margin-bottom: 10px;
  }
`;

const titleStyles = css`
  font-weight: 500;
  font-size: 0.9rem;
  padding-bottom: 5px;
`;

const formStyles = css`
  margin-top: 20px;
  min-width: 100%;
`;

const inputLabelStyles = css`
  margin-left: -15px;
`;

const selectStyles = css`
  ::before {
    border-color: rgb(255, 255, 255, 0.2) !important;
  }

  color: ${theme.textSecondary};
`;

const buttonStyles = css`
  color: ${theme.textSecondary};
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.23);
  margin-top: 15px;

  :hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const menuItems = ['Any', 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Filters = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const [nl, setNL] = React.useState('Any');

  const nameLength = params.get('nameLength');

  useEffect(() => {
    if (!nameLength && nl !== 'Any') {
      setNL('Any');
      return;
    }

    if (nameLength && nameLength !== nl) {
      setNL(nameLength);
    }
  }, [nameLength]);

  const apply = () => {
    navigate(history, params.get('time'), params.get('backwards'), nl);
    dispatch(setNameLength(nl));
  };

  return (
    <Box sx={cardStyles}>
      <Typography sx={titleStyles}>Filters</Typography>
      <Divider />
      <FormControl sx={formStyles}>
        <InputLabel id='filter-name-length-input' sx={inputLabelStyles}>
          Name Length
        </InputLabel>
        <Select
          labelId='filter-name-length-input'
          value={nl}
          onChange={(e) => setNL(e.target.value)}
          sx={selectStyles}
          variant='standard'
        >
          {menuItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={buttonStyles} onClick={apply}>
        Apply
      </Button>
    </Box>
  );
};

export default Filters;
