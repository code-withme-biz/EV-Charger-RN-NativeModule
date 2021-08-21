import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

//= ==third party plugins=======

//= ==custom components & containers  =======
import { MapView } from '../../components';
// import { AppContext } from '../../context/AppContext';
//= ==========apis=======================
import {
  useGeolocation,
  useLoading,
  usePermissions,
  useTmapWebService,
} from '../../hooks';

//= =============utils==================================
// import { FAKE_START_LOCATION } from '../../contants';

//= =============styles==================================
import { styles } from './styles';

//= =============images & constants ===============================
//= ============import end ====================

const Welcome = () => {
  //= ========Hook Init===========

  // const currentLocation = useContext(AppContext);
  //= ========= Props Section========
  //= ======== State Section========
  const { permissionEnabled, requestPermissions } = usePermissions();
  const {
    csData,
    currentPosition,
    setAddress,
    setCSData,
    getCurrentPosition,
    getLocation,
  } = useGeolocation();
  const { fetchAdress, fetchCSData } = useTmapWebService();
  const { isLoading, setLoading } = useLoading();

  const fetchNewAdress = useCallback(async () => {
    try {
      const newCsData = await fetchCSData(
        currentPosition[0],
        currentPosition[1]
      );
      const newAddress = await fetchAdress(
        currentPosition[0],
        currentPosition[1]
      );
      setCSData(newCsData);
      setAddress(newAddress);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [
    currentPosition,
    fetchAdress,
    fetchCSData,
    setAddress,
    setCSData,
    setLoading,
  ]);

  useEffect(() => {
    if (!permissionEnabled) {
      requestPermissions();
    } else {
      // Uncomment to get real Geolocation
      // getCurrentPosition();
      // getLocation();
      fetchNewAdress();
    }
    return () => {};
  }, [
    permissionEnabled,
    fetchNewAdress,
    requestPermissions,
    getCurrentPosition,
    getLocation,
  ]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={'white'} />;
  }

  return (
    <View style={styles.wrapper}>
      <MapView
        getZoom={10}
        getCLat={currentPosition[0]}
        getCLon={currentPosition[1]}
        markers={csData}
      />
    </View>
  );
};

export default Welcome;
