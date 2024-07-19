import { StyleSheet } from 'react-native';

export const environment = {
  HOST_BACKEND: 'https://films-project-production.up.railway.app',
};

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  Scenes: undefined;
  Characters: undefined;
  Start: undefined;
};

export const themeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#350A24',
  },
  text: {
    color: '#FFFFFF6E',
  },
  button: {
    backgroundColor: '#570838',
    color: '#FFFFFF6E',
  },
  option: {},
});
