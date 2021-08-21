/**
 * @format
 * @flow strict-local
 */

import React, { useEffect, useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { openSettings } from 'react-native-permissions';
import MapView from '../MapVIew';
import { IS_ANDROID, IS_IOS } from '../../contants';
import {
  useGeolocation,
  useLoading,
  usePermissions,
  useTmapWebService,
} from '../../hooks';

const EVCharger = () => {
  const { permissionEnabled, requestPermissions } = usePermissions();
  const {
    csData,
    cPosition,
    address,
    refreshAfterLocationEnabling,
    setRefreshAfterLocationEnabling,
    getCurrentPosition,
    getLocation,
    setAddress,
    setCSData,
  } = useGeolocation();
  const { getAdress, getCSData } = useTmapWebService();
  const { isLoading } = useLoading();

  useEffect(() => {
    onComponentMount();
  });

  useEffect(() => {}, [refreshAfterLocationEnabling]);

  useEffect(() => {
    if (!permissionEnabled) {
      onComponentMount();
    }
    getCurrentPosition();
  }, [permissionEnabled, onComponentMount, getCurrentPosition]);

  useEffect(() => {
    fetchNewAdress();
  }, [cPosition, fetchNewAdress]);

  const onComponentMount = useCallback(async () => {
    await requestPermissions();
    getLocation();
  }, [requestPermissions, getLocation]);

  const fetchNewAdress = useCallback(async () => {
    try {
      const newCsData = await getCSData(cPosition[0], cPosition[1]);
      const newAddress = await getAdress(cPosition[0], cPosition[1]);
      setCSData(newCsData);
      setAddress(newAddress);
    } catch (error) {}
  }, [cPosition, getAdress, getCSData, setAddress, setCSData]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.textCenter}>Data is Loading </Text>
      ) : !permissionEnabled || refreshAfterLocationEnabling !== true ? (
        <>
          <Text style={styles.textCenter}>Please Enable Location</Text>
          {IS_IOS && (
            <Button
              style={styles.buttonSettings}
              onPress={() => {
                openSettings();
                setRefreshAfterLocationEnabling(!refreshAfterLocationEnabling);
              }}
              title="Enable Location"
            />
          )}
          {IS_ANDROID && (
            <Button
              style={styles.buttonSettings}
              onPress={() => {
                setRefreshAfterLocationEnabling(!refreshAfterLocationEnabling);
              }}
              title="Refresh"
            />
          )}
        </>
      ) : (
        <>
          <View style={styles.wrapper}>
            <MapView
              getZoom={10}
              getCLat={cPosition[0]}
              getCLon={cPosition[1]}
              markers={csData}
            />
          </View>
          <View style={styles.border}>
            <TouchableOpacity onPress={this.state}>
              <Text style={styles.button}>
                {address?.addressInfo?.fullAddress || ''}
              </Text>
            </TouchableOpacity>
          </View>
          <View styel={styles.buttonView}>
            <Button
              style={styles.buttonText}
              title="Go To List View"
              onPress={() => {}}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 5,
    alignItems: 'stretch',
  },
  border: {
    borderColor: '#eee',
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
  },
  buttonView: {
    flex: 1,
  },
});

export default EVCharger;
