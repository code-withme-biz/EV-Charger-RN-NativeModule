import React, { Dispatch } from 'react';
import {
  deleteValue,
  getObjectValue,
  storeObjectValue,
} from '../utils/persistState';
import type { SearchOption } from '../types';

export enum PreferencesActionTypes {
  SET_PREFERENCES_OPTIONS = 'PREFERENCES/SET_PREFERENCES_OPTIONS',
  RESET_STORE = 'PREFERENCES/RESET_STORE',
}

type PreferencesActions =
  | {
      type: PreferencesActionTypes.SET_PREFERENCES_OPTIONS;
      payload: SearchOption[];
    }
  | { type: PreferencesActionTypes.RESET_STORE };

interface IPreferencesState {
  searchOptions: SearchOption[];
  dispatch: Dispatch<PreferencesActions>;
}

export const INITIAL_PREFERENCES_STATE: IPreferencesState = {
  searchOptions: [],
  dispatch: () => {},
};

const getInitialState = async () => {
  const state = {
    searchOptions:
      (await getObjectValue(PreferencesActionTypes.SET_PREFERENCES_OPTIONS)) ||
      INITIAL_PREFERENCES_STATE.searchOptions,
    dispatch: () => {},
  };
  return state;
};

export const preferencesReducer = (
  state: IPreferencesState,
  action: PreferencesActions
): IPreferencesState => {
  switch (action.type) {
    case PreferencesActionTypes.SET_PREFERENCES_OPTIONS:
      storeObjectValue(
        PreferencesActionTypes.SET_PREFERENCES_OPTIONS,
        action.payload
      );
      return { ...state, searchOptions: action.payload };
    case PreferencesActionTypes.RESET_STORE:
      deleteValue(PreferencesActionTypes.SET_PREFERENCES_OPTIONS);
      return {
        ...state,
        ...INITIAL_PREFERENCES_STATE,
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
    initialState = INITIAL_PREFERENCES_STATE;
  });
export const PreferencesContext =
  React.createContext<IPreferencesState>(initialState);
