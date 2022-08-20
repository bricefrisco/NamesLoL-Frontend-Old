import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import { navigate, useParams } from '../utils/api';
import SummonersTable from './SummonersTable';
import Filters from './Filters';
import Pagination from './Pagination';
import theme from '../styles/theme';

const titleStyles = css`
  color: ${theme.textSecondary};
  font-size: 24px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: flex-start;

  @media (max-width: 850px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

const tableStyles = css`
  width: 100%;
`;

const timeIsValid = (time) => {
  if (time === undefined || time === null) return false;
  if (Number.isNaN(Number(time))) return false;
  return Number(time) >= 1;
};

const backwardsIsValid = (backwards) => {
  if (backwards === undefined || backwards === null) return false;
  return !(backwards !== 'true' && backwards !== 'false');
};

const nameLengthIsValid = (nameLength) => {
  if (Number.isNaN(Number(nameLength))) return false;
  return Number(nameLength) >= 3 && Number(nameLength) <= 16;
};

const Summoners = () => {
  const params = useParams();
  const history = useHistory();

  if (
    !timeIsValid(params.get('time')) ||
    !backwardsIsValid(params.get('backwards'))
  ) {
    navigate(history, new Date().valueOf(), false, null);
    return null;
  }

  const time = parseInt(params.get('time'), 10);
  const backwards = params.get('backwards') === 'true';

  const nameLength = params.get('nameLength');
  if (
    params.get('nameLength') &&
    !nameLengthIsValid(params.get('nameLength'))
  ) {
    navigate(history, time, backwards, null);
    return null;
  }

  return (
    <>
      <Typography variant='h1' sx={titleStyles}>
        Find upcoming and expired summoner names
      </Typography>
      <Box sx={containerStyles}>
        <Box sx={tableStyles}>
          <Pagination showWhenLoading={false} />
          <SummonersTable
            timestamp={time}
            backwards={backwards}
            nameLength={nameLength ? parseInt(nameLength, 10) : null}
          />
          <Pagination />
        </Box>
        <Filters />
      </Box>
    </>
  );
};

export default Summoners;
