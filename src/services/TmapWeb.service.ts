import axios from 'axios';
import type { RouteSearchParam } from '../types';
import AxiosInstance from './axios';

class TmapWebService {
  SK_API_KEY: string = 'l7xx9d4d587fe7104a57b8feda886c846d1f';

  setApiKey(key: string) {
    this.SK_API_KEY = key;
  }

  /**
   * @param  {number} templat - Temp Latitude
   * @param  {number} templon - Temp Longitude
   */
  async requestReverseGeocoding(templat: number, templon: number) {
    try {
      const { data } = await AxiosInstance.get(
        '/geo/reversegeocoding?format=json&callback=result',
        {
          params: {
            version: 1,
            lat: templat.toString(),
            lon: templon.toString(),
            appKey: this.SK_API_KEY,
            coordType: 'WGS84GEO',
            addressType: 'A10',
          },
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting address - firstAddress', error);
      return {};
    }
  }

  /**
   * @param  {number} templat - Temp Latitude
   * @param  {number} templon - Temp Longitude
   */
  async requestPois(templat: number, templon: number) {
    try {
      const { data } = await axios.get(
        'https://apis.openapi.sk.com/tmap/pois',
        {
          params: {
            version: 1,
            count: 20,
            searchKeyword: 'EV충전소',
            centerLat: templat.toString(),
            centerLon: templon.toString(),
            appKey: this.SK_API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting CS datas - secondCSData', error);
      return [];
    }
  }

  /**
   * @param {string} poiInfo - The ID of the selected POI
   */
  async requestPoisInfo(poiInfo: string) {
    try {
      const { data } = await axios.get(
        `https://apis.openapi.sk.com/tmap/pois/${poiInfo}`,
        {
          params: {
            version: 1,
            appKey: this.SK_API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting CS datas - secondCSData', error);
      return [];
    }
  }
  /**
   * @param  {number} templat - Temp Latitude
   * @param  {number} templon - Temp Longitude
   */
  async requestPoisAround(templat: number, templon: number) {
    try {
      const { data } = await axios.get(
        'https://apis.openapi.sk.com/tmap/pois/search/around',
        {
          params: {
            version: 1,
            count: 20,
            centerLat: templat.toString(),
            centerLon: templon.toString(),
            appKey: this.SK_API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting CS datas - secondCSData', error);
      return [];
    }
  }

  /**
   * @param  {RouteSearchParam} params
   */
  async requestRoutes(params: RouteSearchParam) {
    try {
      const { data } = await axios.post(
        'https://apis.openapi.sk.com/tmap/routes',
        {
          version: 1,
          ...params,
          appKey: this.SK_API_KEY,
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting CS datas - secondCSData', error);
      return [];
    }
  }

  /**
   * @param  {RouteSearchParam} params
   */
  async requestRouteDistance(params: RouteSearchParam) {
    try {
      const { data } = await axios.get(
        'https://apis.openapi.sk.com/tmap/routes/distance',
        {
          params: {
            version: 1,
            ...params,
            appKey: this.SK_API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('error in getting CS datas - secondCSData', error);
      return [];
    }
  }
}

export default new TmapWebService();
