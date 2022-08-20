import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { css } from '@emotion/react';
import { Replay, Check, Error } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { parseResponse } from '../utils/api';
import { getLimit, getRegion, toggleLimit } from '../state/settingsSlice';
import { updateSummoner } from '../state/summonersSlice';
import theme from '../styles/theme';

const updatedStyles = css`
  margin-top: 2px;
  margin-right: 3px;
`;

const loadingStyles = css`
  color: ${theme.textSecondary};
  margin-right: 3px;
  margin-top: 2px;
`;

const UpdateButton = ({ summonerName }) => {
  const dispatch = useDispatch();
  const limit = useSelector(getLimit);
  const region = useSelector(getRegion);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState();

  const click = () => {
    if (loading || limit) return;

    dispatch(toggleLimit());

    setError(undefined);
    setLoading(true);
    setSuccess(false);

    fetch(
      `${
        process.env.REACT_APP_BACKEND_URI
      }/${region.toLowerCase()}/summoner/${summonerName.toLowerCase()}`,
    )
      .then(parseResponse)
      .then((summoner) => {
        dispatch(updateSummoner(summoner));
        setSuccess(true);
        setLoading(false);
        setError(undefined);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  if (loading) {
    return <CircularProgress size={24} sx={loadingStyles} />;
  }

  if (success) {
    return <Check sx={updatedStyles} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <IconButton size='small' onClick={click} disabled={limit} color='inherit'>
      <Replay />
    </IconButton>
  );
};

UpdateButton.propTypes = {
  summonerName: PropTypes.string.isRequired,
};

export default UpdateButton;
