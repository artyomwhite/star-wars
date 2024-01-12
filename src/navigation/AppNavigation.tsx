import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, ScreenEnum } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { ExtraInfo } from '../screens/ExtraInfo';
import { Colors } from '../utils/styles';
import { baseHeaderOptions } from '../utils/helpers';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  initialRoute: ScreenEnum.HOME_SCREEN;
}

export const AppNavigation = ({ initialRoute }: Props) => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={ScreenEnum.HOME_SCREEN}
            component={Home}
            options={() => ({
              ...baseHeaderOptions,
              headerShown: true,
              title: 'Star Wars people',
              contentStyle: { backgroundColor: Colors['clean-grey'] },
            })}
          />
          <Stack.Screen
            name={ScreenEnum.EXTRA_INFO}
            component={ExtraInfo}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              gestureEnabled: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
