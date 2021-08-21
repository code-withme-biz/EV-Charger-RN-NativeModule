import React, { Dispatch } from 'react';
import {
  deleteValue,
  getObjectValue,
  storeObjectValue,
} from '../utils/persistState';
import type { LocationPoint } from '../types';

export enum LocationsActionTypes {
  SET_HOME = 'LOCATIONS/SET_HOME',
  SET_WORK = 'LOCATIONS/SET_WORK',
  SET_FAVORITES = 'LOCATIONS/SET_FAVORITES',
  SET_SEARCHES = 'LOCATIONS/SET_SEARCHES',
  RESET_STORE = 'LOCATIONS/RESET_STORE',
}

type LocationsActions =
  | { type: LocationsActionTypes.SET_HOME; payload: LocationPoint }
  | { type: LocationsActionTypes.SET_WORK; payload: LocationPoint }
  | { type: LocationsActionTypes.SET_FAVORITES; payload: LocationPoint[] }
  | { type: LocationsActionTypes.SET_SEARCHES; payload: string[] }
  | { type: LocationsActionTypes.RESET_STORE };

interface ILocationsState {
  home?: LocationPoint;
  work?: LocationPoint;
  favorites: LocationPoint[];
  resentSearches: string[];
  dispatch: Dispatch<LocationsActions>;
}

export const INITIAL_LOCATIONS_STATE: ILocationsState = {
  home: undefined,
  work: undefined,
  favorites: [],
  resentSearches: [],
  dispatch: () => {},
};

const getInitialState = async () => {
  const state = {
    home:
      (await getObjectValue(LocationsActionTypes.SET_HOME)) ||
      INITIAL_LOCATIONS_STATE.home,
    work:
      (await getObjectValue(LocationsActionTypes.SET_WORK)) ||
      INITIAL_LOCATIONS_STATE.work,
    favorites:
      (await getObjectValue(LocationsActionTypes.SET_FAVORITES)) ||
      INITIAL_LOCATIONS_STATE.favorites,
    resentSearches:
      (await getObjectValue(LocationsActionTypes.SET_SEARCHES)) ||
      INITIAL_LOCATIONS_STATE.resentSearches,
    dispatch: () => {},
  };
  return state;
};

export const locationsReducer = (
  state: ILocationsState,
  action: LocationsActions
): ILocationsState => {
  switch (action.type) {
    case LocationsActionTypes.SET_HOME:
      storeObjectValue(LocationsActionTypes.SET_HOME, action.payload);
      return {
        ...state,
        home: action.payload,
      };
    case LocationsActionTypes.SET_WORK:
      storeObjectValue(LocationsActionTypes.SET_WORK, action.payload);
      return {
        ...state,
        work: action.payload,
      };
    case LocationsActionTypes.SET_FAVORITES:
      storeObjectValue(LocationsActionTypes.SET_FAVORITES, action.payload);
      return {
        ...state,
        favorites: action.payload,
      };
    case LocationsActionTypes.SET_SEARCHES:
      storeObjectValue(LocationsActionTypes.SET_SEARCHES, action.payload);
      return {
        ...state,
        resentSearches: action.payload,
      };
    case LocationsActionTypes.RESET_STORE:
      deleteValue(LocationsActionTypes.SET_HOME);
      deleteValue(LocationsActionTypes.SET_WORK);
      deleteValue(LocationsActionTypes.SET_FAVORITES);
      deleteValue(LocationsActionTypes.SET_SEARCHES);
      return {
        ...state,
        ...INITIAL_LOCATIONS_STATE,
      };
    default:
      return state;
  }
};

let initialState;
getInitialState()
  .then((result) => {
    initialState = result;
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    initialState = INITIAL_LOCATIONS_STATE;
  });
export const LocationsContext =
  React.createContext<ILocationsState>(initialState);
