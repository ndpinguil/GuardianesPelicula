import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { YStack, H2, Separator, Theme, View, Button, Spinner } from 'tamagui';

import CardElement from '../components/card';
import ModalMenu, { ModalMenuOnSubmit } from '~/components/modal-menu';
import CACHE_KEYS from '~/const/cache-keys';
import { OverviewScreenNavigationProps } from '~/model/global-model';

import { createFilm, deleteFilmById, getAllFilms, patchFilm } from '~/services/film-service';
import useAppStore from '../store/store';
import { themeStyles } from '~/environment/config';

export default function TabOneScreen() {
  const navigator = useNavigation<OverviewScreenNavigationProps>();
  const queryClient = useQueryClient();
  const setCurrentScenes = useAppStore((state) => state.setCurrentScenes);
  const setCurrentFilmId = useAppStore((state) => state.setCurrentFilmId);
  const setDirector = useAppStore((state) => state.setDirector);

  const {
    data: films,
    isLoading,
    refetch,
  } = useQuery([CACHE_KEYS.FILMS], () => getAllFilms().then((res) => res.data));

  useEffect(() => {
    refetch();
    console.log('films');
  }, []);

  const { mutate: deleteFilm } = useMutation({
    mutationFn: deleteFilmById,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      queryClient.invalidateQueries([CACHE_KEYS.FILMS]);
      console.log('ivalidating..');
    },
    onError: (err) => {
      console.log('Error', err);
    },
  });

  const { mutate: createFilmMutate } = useMutation({
    mutationFn: createFilm,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
    },
  });

  const { mutate: patchFilmMutate } = useMutation({
    mutationFn: patchFilm,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
    },
  });

  const handleDelete = (id: number) => {
    deleteFilm(id);
  };

  const onSubmit = ({ title, director, duration }: ModalMenuOnSubmit) => {
    console.log(director);
    createFilmMutate({ name: title, director, minutes: Number(duration) });
  };

  const onEdit = ({
    id,
    title,
    duration,
    director,
  }: {
    id: number;
    title: string;
    duration: number;
    director: string;
  }) => {
    patchFilmMutate({ id, name: title, minutes: duration, director });
  };

  return (
    <Theme name="light">
      <ScrollView style={themeStyles.container}>
        <Button
          style={styles.buttonReload}
          onPress={() => {
            queryClient.clear();
            queryClient.refetchQueries();
            refetch();
          }}>
          reload
        </Button>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <H2 style={themeStyles.text}>Films</H2>
          {films?.length === 0 && (
            <View>
              <Text>there is no films</Text>
            </View>
          )}
          {isLoading && (
            <View>
              <Spinner size="large" color={themeStyles.text.color} />
            </View>
          )}
          <Separator />
          {films?.map((film) => {
            return (
              <CardElement
                key={film.id}
                id={film.id}
                title={film.name}
                budget={0}
                director={film.director}
                time={film.minutes}
                onDelete={handleDelete}
                onEdit={onEdit}
                onPress={() => {
                  setCurrentScenes(film.scenes);
                  setCurrentFilmId(film.id);
                  setDirector(film.director);
                  navigator.navigate('Scenes');
                }}
              />
            );
          })}
          <Separator />

          <ModalMenu title="Create film" onSubmit={onSubmit} />
        </YStack>
      </ScrollView>
    </Theme>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#350A24',
  },
  listItem: {},
  buttonReload: {
    marginVertical: 20,
    ...themeStyles.button,
  },
});
