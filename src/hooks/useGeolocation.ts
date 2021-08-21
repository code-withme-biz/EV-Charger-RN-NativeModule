import Geolocation from 'react-native-geolocation-service';
import { useCallback, useState } from 'react';
import { FAKE_START_LOCATION } from '../contants';

const useGeolocation = () => {
  const [csData, setCSData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(FAKE_START_LOCATION);
  const [address, setAddress] = useState({});
  const [refreshAfterLocationEnabling, setRefreshAfterLocationEnabling] =
    useState(false);

  const getCurrentPosition = useCallback(() => {
    Geolocation.getCurrentPosition((position) => {
      const templat = position.coords.latitude; // 37.512992;
      const templon = position.coords.longitude; // 126.7063177;
      setCurrentPosition([templat, templon]);
    });
  }, []);

  const getLocation = useCallback(() => {
    Geolocation.watchPosition((position) => {
      const templat = position.coords.latitude;
      const templon = position.coords.longitude;
      setCurrentPosition([templat, templon]);
      setRefreshAfterLocationEnabling(true);
    });
  }, []);

  return {
    csData,
    currentPosition,
    address,
    refreshAfterLocationEnabling,
    setCurrentPosition,
    setCSData,
    setAddress,
    setRefreshAfterLocationEnabling,
    getLocation,
    getCurrentPosition,
  };
};

export default useGeolocation;
