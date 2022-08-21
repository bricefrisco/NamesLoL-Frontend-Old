import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Moment from 'react-moment';
import moment from 'moment';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegion } from '../state/settingsSlice';
import {
  fetchSummoners,
  getSummoners,
  getLoaded,
  getLoading,
  getError,
  getErrorMessage,
} from '../state/summonersSlice';
import UpdateButton from './UpdateButton';
import Retry from './Retry';
import theme from '../styles/theme';

const tableStyles = css`
  cursor: default;
  width: 100%;
  max-width: 950px;
  margin-bottom: 10px;
  background-color: ${theme.primary};
  border: 1px solid rgba(145, 158, 171, 0.24);
  td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const tableHeaderStyles = css`
  color: ${theme.textSecondary};
  border-color: rgb(46, 50, 54);
  height: 60px;
  font-weight: 600;
`;

const tableCellStyles = css`
  color: ${theme.textSecondary};
  border-color: rgb(46, 50, 54);
  height: 46px;
`;

const tableRowStyles = css`
  :hover {
    background-color: rgba(255, 255, 255, 0.08);
    transition: background-color 0.35s ease;
  }
`;

const linkStyles = css`
  color: #0d6efd;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const alertStyles = css`
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.35);
  color: white;
  margin-top: 10px;
`;

const loadingStyles = css`
  background-color: #2e609c;
`;

const SummonersTable = ({ timestamp, backwards, nameLength }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const loaded = useSelector(getLoaded);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);
  const summoners = useSelector(getSummoners);
  const region = useSelector(getRegion);

  useEffect(() => {
    dispatch(fetchSummoners(timestamp, backwards, nameLength));
  }, [nameLength, region, dispatch, timestamp, backwards]);

  if (loading) return <LinearProgress sx={loadingStyles} />;

  if (error) {
    return (
      <Box sx={alertStyles}>
        Oh no! An error occurred: &apos;{errorMessage}&apos;
        <br />
        Please{' '}
        <Retry
          text='try again.'
          retryFunction={() =>
            dispatch(fetchSummoners(timestamp, backwards, nameLength))
          }
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
    );
  }

  if (!loaded) return null;

  return (
    <TableContainer component={Paper} sx={tableStyles}>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={tableHeaderStyles}>
              Name
            </TableCell>
            <TableCell align='left' sx={tableHeaderStyles}>
              Name Available
            </TableCell>
            <TableCell align='center' sx={tableHeaderStyles}>
              Availability Date
            </TableCell>
            <TableCell align='center' sx={tableHeaderStyles}>
              Level
            </TableCell>
            <TableCell align='left' sx={tableHeaderStyles}>
              Last Updated
            </TableCell>
            <TableCell align='right' sx={tableHeaderStyles}>
              Update
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summoners.map((summoner) => (
            <TableRow key={summoner.name} sx={tableRowStyles}>
              <TableCell align='left' sx={tableCellStyles} width={100}>
                <b>{summoner.name}</b>
              </TableCell>
              <TableCell align='left' sx={tableCellStyles} width={150}>
                {moment(summoner.availabilityDate).fromNow()}
              </TableCell>
              <TableCell align='center' sx={tableCellStyles} width={200}>
                <Moment
                  date={new Date(summoner.availabilityDate)}
                  format='MM/DD/YYYY hh:mm:ss A'
                />
              </TableCell>
              <TableCell align='center' sx={tableCellStyles} width={100}>
                {summoner.level}
              </TableCell>
              <TableCell align='left' sx={tableCellStyles} width={150}>
                {summoner.lastUpdated
                  ? moment(summoner.lastUpdated - 5000).fromNow() // Account for slight server delay
                  : 'Never'}
              </TableCell>
              <TableCell align='right' sx={tableCellStyles} width={100}>
                <UpdateButton summonerName={summoner.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SummonersTable.defaultProps = {
  nameLength: undefined,
};

SummonersTable.propTypes = {
  timestamp: PropTypes.number.isRequired,
  backwards: PropTypes.bool.isRequired,
  nameLength: PropTypes.number,
};

export default SummonersTable;
