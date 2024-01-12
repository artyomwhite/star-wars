module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.android.js', '.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@context': './src/context',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
