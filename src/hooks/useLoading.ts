import { AppContext, AppActionTypes } from '../contexts/AppContext';
import { useCallback, useContext } from 'react';

const useLoading = () => {
  const { loading, dispatch } = useContext(AppContext);

  const setLoading = useCallback(
    (l?: boolean) => {
      dispatch({ type: AppActionTypes.SET_APP_LOADING, payload: !!l });
    },
    [dispatch]
  );

  return { loading, setLoading };
};

export default useLoading;
