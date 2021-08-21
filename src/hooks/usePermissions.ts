import { useCallback, useState } from 'react';

import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import { IS_ANDROID, IS_IOS } from '../contants';

const usePermissions = () => {
  const [permissionEnabled, setPermissionEnabled] = useState(false);

  const requestAndroidPermissions = useCallback(async () => {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);
      const enabled =
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted' ||
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted' ||
        statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === 'granted';
      setPermissionEnabled(enabled);
    } catch (error) {
      setPermissionEnabled(false);
      console.error(error);
    }
  }, []);

  const requestIOSPermissions = useCallback(async () => {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]);
      const enabled =
        statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' &&
        (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' ||
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === 'granted');
      setPermissionEnabled(enabled);
    } catch (error) {
      setPermissionEnabled(false);
      console.error(error);
    }
  }, []);

  const requestPermissions = async () => {
    if (IS_ANDROID) {
      await requestAndroidPermissions();
    } else if (IS_IOS) {
      await requestIOSPermissions();
    }
  };

  return { permissionEnabled, requestPermissions };
};

export default usePermissions;
