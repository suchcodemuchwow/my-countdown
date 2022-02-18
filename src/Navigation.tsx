import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Button, ButtonProps, Icon } from '@ui-kitten/components';
import { HomeScreen, OccasionFormScreen } from './screens';

const enum ROUTES {
  HOME = 'HOME',
  FORM = 'FORM',
}

export type RootStackParamList = {
  HOME: undefined;
  FORM: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const rootNavigatorScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: true,
};

const formScreenOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerShown: false,
};

const homeScreenOptions = (navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>) => ({
  title: 'Home',
  headerRight: () => (
    <Button appearance="ghost" accessoryLeft={PlusIcon} onPress={() => navigationRef.navigate(ROUTES.FORM)} />
  ),
});
const PlusIcon = (props?: ButtonProps) => <Icon {...props} name="plus" />;

export const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={ROUTES.FORM} screenOptions={rootNavigatorScreenOptions}>
        <Stack.Group>
          <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={homeScreenOptions(navigationRef)} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name={ROUTES.FORM} component={OccasionFormScreen} options={formScreenOptions} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
