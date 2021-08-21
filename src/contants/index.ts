import { Platform } from 'react-native';

export * from './tmapConstants';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const headers = {
  'Content-Type': 'application/json',
};

export const FAKE_START_LOCATION = [36.512992, 126.7063177];
