import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'tamagui';

interface AlertMessageProps {
  message: string;
  onClose: () => void;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    backgroundColor: 'blue',
  },
});

const AlertMessage = ({ message, onClose }: AlertMessageProps) => {
  return (
    <View style={{ width: 100, height: 100, backgroundColor: 'red' }}>
      <View>
        <Text>{message}</Text>
        <Pressable onPress={onClose}>
          <Text>Ok</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AlertMessage;
