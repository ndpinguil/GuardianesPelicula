import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQueryClient } from 'react-query';
import { H2, Separator, Theme, YStack } from 'tamagui';
import CardElement from '~/components/card';
import ModalMenu from '~/components/modal-menu';
import { themeStyles } from '~/environment/config';
import { OverviewScreenNavigationProps } from '~/model/global-model';

import { createScene, deleteSceneById, patchScene } from '~/services/scene-service';
import useAppStore from '~/store/store';

const Scenes = () => {
  const navigator = useNavigation<OverviewScreenNavigationProps>();
  const setCurrentCharacters = useAppStore((state) => state.setCurrentCharacters);
  const setCurrentSceneId = useAppStore((state) => state.setCurrentSceneId);

  const queryClient = useQueryClient();
  const { mutate: createSceneMutate } = useMutation({
    mutationFn: createScene,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      queryClient.invalidateQueries();
      navigator.navigate('TabNavigator');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      if (error.response.data.message === 'film duration exceeded') {
        Alert.alert('error', error.response.data.message);
      }
    },
  });

  const { mutate: deleteSceneByIdMutate } = useMutation({
    mutationFn: deleteSceneById,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      queryClient.invalidateQueries();
      navigator.navigate('TabNavigator');
    },
  });

  const { mutate: patchSceneMutate } = useMutation({
    mutationFn: patchScene,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      queryClient.invalidateQueries();
      navigator.navigate('TabNavigator');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      if (error.response.data.message === 'film duration exceeded') {
        Alert.alert('error', error.response.data.message);
      }
    },
  });

  const currentScenes = useAppStore((state) => state.scenes);
  const currentFilmId = useAppStore((state) => state.currentFilmId);
  const director = useAppStore((state) => state.director);

  const handleDelete = (id: number) => {
    console.log(id);
    deleteSceneByIdMutate(id);
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <H2 style={themeStyles.text}>Scenes</H2>
          <Separator />
          {currentScenes.map((scene) => {
            return (
              <CardElement
                key={scene.id}
                id={scene.id}
                title={scene.name}
                budget={scene.budget}
                director={director}
                time={scene.minutes}
                onDelete={handleDelete}
                type="scene-editor"
                onEdit={({ title, duration, budget }) => {
                  patchSceneMutate({ id: scene.id, name: title, minutes: duration, budget });
                }}
                onPress={() => {
                  setCurrentSceneId(scene.id);
                  setCurrentCharacters(scene.characters);
                  navigator.navigate('Characters');
                }}
              />
            );
          })}
          <Separator />

          <ModalMenu
            title="Create scene"
            type="scene-creation"
            onSubmit={({ title, duration, budget }) => {
              createSceneMutate({
                name: title,
                minutes: Number(duration),
                budget: Number(budget),
                film: { id: currentFilmId },
              });
            }}
          />
        </YStack>
      </ScrollView>
    </Theme>
  );
};
export default Scenes;
