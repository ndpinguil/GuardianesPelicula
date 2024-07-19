import { useNavigation } from '@react-navigation/native';
import { Button, H1, ScrollView, Theme, YStack, Image } from 'tamagui';
import { OverviewScreenNavigationProps } from '~/model/global-model';

import FilmImage from '../../assets/film.png';

import { StyleSheet } from 'react-native';
import { themeStyles } from '~/environment/config';

const Start = () => {
  const navigator = useNavigation<OverviewScreenNavigationProps>();

  return (
    <Theme name="light">
      <ScrollView style={styles.container}>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <H1 style={themeStyles.text}>Movie creator</H1>
          <Image source={FilmImage} style={styles.container}></Image>
          <Button
            style={themeStyles.button || {}}
            onPress={() => {
              navigator.navigate('TabNavigator');
            }}>
            Begin
          </Button>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
});

export default Start;
