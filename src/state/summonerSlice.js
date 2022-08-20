import { createSlice } from '@reduxjs/toolkit';
import { parseResponse } from '../utils/api';

/* eslint-disable no-param-reassign */
export const summonerSlice = createSlice({
  name: 'summoner',
  initialState: {
    summoner: undefined,
    loading: false,
    error: false,
    errorMessage: undefined,
    open: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = undefined;
      state.summoner = undefined;
      state.open = true;
    },
    loaded: (state, action) => {
      state.loading = false;
      state.error = false;
      state.errorMessage = undefined;
      state.summoner = action.payload;
      state.open = true;
    },
    errored: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.summoner = undefined;
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { loading, loaded, errored, close } = summonerSlice.actions;

export const getLoading = (state) => state.summoner.loading;
export const getError = (state) => state.summoner.error;
export const getErrorMessage = (state) => state.summoner.errorMessage;
export const getSummoner = (state) => state.summoner.summoner;
export const getOpen = (state) => state.summoner.open;

export const fetchSummoner = () => (dispatch, getState) => {
  const name = getState().settings.nameInput;
  const { region, hideSearch } = getState().settings;

  dispatch(loading());

  const url = new URL(
    `${
      process.env.REACT_APP_BACKEND_URI
    }/${region.toLowerCase()}/summoner/${name.toLowerCase()}`,
  );

  if (hideSearch) {
    url.searchParams.append('hideSearch', 'true');
  }

  fetch(url.toString())
    .then(parseResponse)
    .then((summoner) => dispatch(loaded(summoner)))
    .catch((err) => {
      if (err.toString().toLowerCase().includes('was not found')) {
        dispatch(
          loaded({
            name,
            region,
          }),
        );
      } else {
        dispatch(errored(err.toString()));
      }
    });
};

export default summonerSlice.reducer;
