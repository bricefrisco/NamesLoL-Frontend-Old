import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoading,
  getOpen,
  close,
  getSummoner,
  getError,
  getErrorMessage,
  fetchSummoner,
} from '../state/summonerSlice';
import Retry from './Retry';

const rootCardStyles = css`
  .available {
    background-color: rgba(61, 177, 128, 0.5);
    color: #fff;
  }

  .unavailable {
    background-color: #cd7b00;
  }

  .unavailable > button {
    color: black;
  }
`;

const cardStyles = css`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 800px) {
    padding: 15px;
    flex-direction: column;
    div,
    button {
      margin-top: 10px;
    }
  }
`;

const nameStyles = css`
  text-align: center;
  font-weight: 400;
  @media (max-width: 800px) {
    font-weight: 500;
    font-size: 24px;
  }
`;

const statusStyles = css`
  text-align: center;
`;

const labelStyles = css`
  margin-bottom: 2px;
  font-weight: 500;
`;

const disclosureStyles = css`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: lightgray;
`;

const loadingStyles = css`
  margin-top: 10px;
  background-color: #2e609c;
`;

const closeStyles = css`
  ::after {
    content: '';
    flex: 1 0 auto;
  }
`;

const alertStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.35);
  color: white;
  margin-top: 10px;
`;

const linkStyles = css`
  color: rgb(0, 135, 246);
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Summoner = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const open = useSelector(getOpen);
  const summoner = useSelector(getSummoner);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  if (loading) {
    return <LinearProgress sx={loadingStyles} />;
  }

  if (error) {
    return (
      <Collapse in={open}>
        <Box sx={alertStyles}>
          <Box>
            Oh no! An error occurred: &apos;{errorMessage}&apos;
            <br />
            Please{' '}
            <Retry
              text='try again.'
              retryFunction={() => dispatch(fetchSummoner())}
            />{' '}
            If the issue persists, please let us know{' '}
            <Box
              component='a'
              sx={linkStyles}
              target='_blank'
              rel='noreferrer noopener'
              href='https://github.com/bricefrisco/NamesLoL/issues'
            >
              here.
            </Box>
          </Box>
          <IconButton size='small' onClick={() => dispatch(close())}>
            <Close sx={closeStyles} />
          </IconButton>
        </Box>
      </Collapse>
    );
  }

  if (!summoner) return null;

  const infoAvailable = summoner.availabilityDate !== undefined;
  const nameAvailable =
    !infoAvailable || new Date(summoner.availabilityDate) <= new Date();

  return (
    <Collapse in={open}>
      <Box sx={rootCardStyles}>
        <Box
          sx={cardStyles}
          className={nameAvailable ? 'available' : 'unavailable'}
        >
          <Typography variant='h3' sx={nameStyles}>
            {summoner.name}
          </Typography>
          <Box sx={statusStyles}>
            <Box sx={labelStyles}>Status</Box>
            <Box>{nameAvailable ? 'Available*' : 'Unavailable'}</Box>
          </Box>
          {infoAvailable && (
            <>
              <Box sx={statusStyles}>
                <Box sx={labelStyles}>Availability Date</Box>
                <Moment
                  date={new Date(summoner.availabilityDate)}
                  format='MM/DD/YYYY hh:mm:ss A'
                />
              </Box>
              <Box sx={statusStyles}>
                <Box sx={labelStyles}>Last Activity</Box>
                <Moment
                  date={new Date(summoner.revisionDate)}
                  format='MM/DD/YYYY hh:mm:ss A'
                />
              </Box>
              <Box sx={statusStyles}>
                <Box sx={labelStyles}>Level</Box>
                <Box>{summoner.level}</Box>
              </Box>
            </>
          )}
          <IconButton size='small' onClick={() => dispatch(close())}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      {nameAvailable && (
        <Typography sx={disclosureStyles}>
          *If the name is not blocked by Riot Games
        </Typography>
      )}
    </Collapse>
  );
};

export default Summoner;
