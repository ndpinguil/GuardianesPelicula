import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';

export default function Modal() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Paragraph>Modal</Paragraph>
        <Separator />
        <EditScreenInfo path="src/screens/modal.tsx" />
      </YStack>
    </Theme>
  );
}
