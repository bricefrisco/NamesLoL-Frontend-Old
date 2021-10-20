import {createSlice} from "@reduxjs/toolkit";
import {close} from './summonerSlice';

export const Region = ['NA', 'EUNE', 'EUW', 'OCE', 'LAS']
const defaultRegion = 'NA'

const parseRegion = (cookie) => {
    const region = cookie
        ?.split("; ")
        ?.find(row => row.startsWith("region="))
        ?.split("=")[1] ?? defaultRegion;

    return region;
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        nameInput: "",
        region: parseRegion(document.cookie),
        nameLength: undefined,
        limit: false,
        hideSearch: false
    },
    reducers: {
        setName: (state, action) => {
            state.nameInput = action.payload;
        },
        setNameLength: (state, action) => {
            state.nameLength = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
            document.cookie = 'region=' + action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setHideSearch: (state, action) => {
            state.hideSearch = action.payload;
        }
    },
});

export const {
    setName,
    setNameLength,
    setRegion,
    setLimit,
    setHideSearch
} = settingsSlice.actions;

export const getNameInput = (state) => state.settings.nameInput;
export const getRegion = (state) => state.settings.region;
export const getNameLength = (state) => state.settings.nameLength;
export const getLimit = (state) => state.settings.limit;
export const getHideSearch = (state) => state.settings.hideSearch;

export const toggleLimit = () => (dispatch) => {
    dispatch(setLimit(true))
    setTimeout(() => {
        dispatch(setLimit(false))
    }, 1300)
}

export const changeRegion = (region) => (dispatch) => {
    dispatch(setRegion(region))
    dispatch(close())
}

export default settingsSlice.reducer;
