import React, { Dispatch } from 'react';

export enum AppActionTypes {
  SET_APP_LOADING = 'APP/SET_APP_LOADING',
  RESET_STORE = 'APP/RESET_STORE',
}

type AppActions =
  | { type: AppActionTypes.SET_APP_LOADING; payload: boolean }
  | { type: AppActionTypes.RESET_STORE };

interface IAppState {
  loading?: boolean;
  dispatch: Dispatch<AppActions>;
}

export const INITIAL_APP_STATE: IAppState = {
  loading: true,
  dispatch: () => {},
};

export const appReducer = (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case AppActionTypes.SET_APP_LOADING:
      return { ...state, loading: action.payload };
    case AppActionTypes.RESET_STORE:
      return {
        ...state,
        ...INITIAL_APP_STATE,
      };
    default:
      return state;
  }
};

export const AppContext = React.createContext<IAppState>(INITIAL_APP_STATE);
