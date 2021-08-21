import { useCallback } from 'react';
import useLoading from './useLoading';
import TmapWebService from '../services/TmapWeb.service';
import axios from 'axios';

const useTmapWebService = () => {
  const { setLoading } = useLoading();

  const fetchAdress = useCallback(
    async (templat, templon) => {
      const adress = await TmapWebService.requestReverseGeocoding(
        templat,
        templon
      );
      setLoading(false);
      return adress;
    },
    [setLoading]
  );

  const fetchCSData = useCallback(
    async (templat, templon) => {
      try {
        return axios.get('https://apis.openapi.sk.com/tmap/pois', {
          params: {
            version: 1,
            count: 20,
            searchKeyword: 'EV충전소',
            centerLat: templat.toString(),
            centerLon: templon.toString(),
            appKey: TmapWebService.SK_API_KEY,
          },
        });
      } catch (error) {
        console.log('error in getting CS datas - secondCSData');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return { fetchAdress, fetchCSData };
};

export default useTmapWebService;
