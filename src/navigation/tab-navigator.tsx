import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Pressable, StyleSheet } from 'react-native';

import One from '../screens/one';
import { RootStackParamList, themeStyles } from '~/environment/config';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="One"
        component={One}
        options={{
          headerStyle: themeStyles.container,
          title: 'Films',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Modal')}>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          ),
          tabBarShowLabel: false,
          tabBarStyle: themeStyles.container,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
