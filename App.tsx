/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {AppNavigation} from './src/navigation/AppNavigation';
import {ScreenEnum} from './src/types/navigation';

function App(): JSX.Element {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
      />
      <AppNavigation initialRoute={ScreenEnum.HOME_SCREEN} />
    </>
  );
}

export default App;
