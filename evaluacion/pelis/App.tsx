import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './src/screens/Dashboard';
import FilmScreen from './src/screens/Film';
import SceneScreen from './src/screens/Scene';
import CharacterScreen from './src/screens/Character';

export type RootStackParamList = {
  Dashboard: undefined;
  Film: { filmId: number };
  Scene: { sceneId: number };
  Character: { characterId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Film" component={FilmScreen} />
        <Stack.Screen name="Scene" component={SceneScreen} />
        <Stack.Screen name="Character" component={CharacterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;