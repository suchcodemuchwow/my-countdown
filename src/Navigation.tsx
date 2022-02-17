import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, ButtonProps, Icon } from '@ui-kitten/components';
import { HomeScreen, OccasionFormScreen } from './screens';

export type RootStackParamList = {
  Home: undefined;
  CreateOccasion: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const PlusIcon = (props?: ButtonProps) => <Icon {...props} name="plus" />;

export const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: true,
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerRight: () => (
                <Button
                  style={{}}
                  appearance="ghost"
                  accessoryLeft={PlusIcon}
                  onPress={() => navigationRef.navigate('CreateOccasion')}
                />
              ),
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="CreateOccasion"
            component={OccasionFormScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
