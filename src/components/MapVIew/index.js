import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, StyleSheet } from 'react-native';

const TMapBridgeView = requireNativeComponent('TMapBridgeView');

export default function MapView({
  getZoom,
  getCLat,
  getCLon,
  getDLat,
  getDLon,
  markers,
  pathdata,
}) {
  return (
    <TMapBridgeView
      style={styles.mapview}
      zoom={getZoom}
      clatitude={getCLat}
      clongitude={getCLon}
      dlatitude={getDLat}
      dlongitude={getDLon}
      markerdata={markers}
      routesdata={pathdata}
    />
  );
}

const styles = StyleSheet.create({
  mapview: {
    flex: 1,
  },
});

TMapBridgeView.propTypes = {
  getZoom: PropTypes.number,
  getCLat: PropTypes.number,
  getCLon: PropTypes.number,
  getDLat: PropTypes.number,
  getDLon: PropTypes.number,
  markers: PropTypes.objectOf(PropTypes.array),
  pathdata: PropTypes.objectOf(PropTypes.array),
};
TMapBridgeView.defaultProps = {
  getZoom: 10,
  getCLat: null,
  getCLon: null,
  getDLat: null,
  getDLon: null,
  markers: [],
  pathdata: [],
};
