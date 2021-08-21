import React, { useReducer } from 'react';
import RootNavigator from './navigators';

import {
  AppContext,
  LocationsContext,
  PreferencesContext,
  appReducer,
  locationsReducer,
  preferencesReducer,
  INITIAL_APP_STATE,
  INITIAL_LOCATIONS_STATE,
  INITIAL_PREFERENCES_STATE,
} from './contexts';

const App = () => {
  const [appCtx, appDispatcher] = useReducer(appReducer, INITIAL_APP_STATE);
  const [locationCtx, locationDispatcher] = useReducer(
    locationsReducer,
    INITIAL_LOCATIONS_STATE
  );
  const [preferencesCtx, preferencesDispatcher] = useReducer(
    preferencesReducer,
    INITIAL_PREFERENCES_STATE
  );

  return (
    <AppContext.Provider value={{ ...appCtx, dispatch: appDispatcher }}>
      <LocationsContext.Provider
        value={{ ...locationCtx, dispatch: locationDispatcher }}
      >
        <PreferencesContext.Provider
          value={{ ...preferencesCtx, dispatch: preferencesDispatcher }}
        >
          <RootNavigator />
        </PreferencesContext.Provider>
      </LocationsContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
