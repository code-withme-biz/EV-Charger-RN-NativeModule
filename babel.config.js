module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ios.js', '.android.js'],
        alias: {
          '@react-native-async-storage/async-storage': require.resolve(
            '@react-native-async-storage/async-storage'
          ),
          'react-native-geolocation-service': require.resolve(
            'react-native-geolocation-service'
          ),
          'react-native-permissions': require.resolve(
            'react-native-permissions'
          ),
        },
      },
    ],
  ],
};
