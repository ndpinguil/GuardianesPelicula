import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQueryClient } from 'react-query';
import { H2, Separator, Theme, YStack } from 'tamagui';

import CardElement from '~/components/card';
import ModalMenu from '~/components/modal-menu';
import { OverviewScreenNavigationProps } from '~/model/global-model';
import { createCharacter, deleteCharacterById, patchCharacter } from '~/services/character-service';
import useAppStore from '~/store/store';
import { Alert } from 'react-native';
import { themeStyles } from '~/environment/config';

const Characters = () => {
  const currentCharacters = useAppStore((state) => state.currentCharacters);
  const currentSceneId = useAppStore((state) => state.currentSceneId);
  const director = useAppStore((state) => state.director);
  const navigator = useNavigation<OverviewScreenNavigationProps>();
  const queryClient = useQueryClient();

  const { mutate: createCharacterMutate } = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      navigator.navigate('TabNavigator');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error.response.data.message);
      if (error.response.data.message === 'scene budget exceeded') {
        Alert.alert('Error', error.response.data.message);
      }
    },
  });

  const { mutate: deleteCharacterByIdMutate } = useMutation({
    mutationFn: deleteCharacterById,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      navigator.navigate('TabNavigator');
    },
  });

  const { mutate: patchCharacterMutate } = useMutation({
    mutationFn: patchCharacter,
    onSuccess: () => {
      queryClient.clear();
      queryClient.refetchQueries();
      navigator.navigate('TabNavigator');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error.response.data.message);
      if (error.response.data.message === 'scene budget exceeded') {
        Alert.alert('Error', error.response.data.message);
      }
    },
  });

  return (
    <Theme name="light">
      <ScrollView>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <H2 style={themeStyles.text}>Characters</H2>
          <Separator />
          {currentCharacters.map((character) => {
            return (
              <CardElement
                key={character.id}
                id={character.id}
                title={character.name}
                budget={character.budget}
                director={director}
                time={0}
                type="character-editor"
                onDelete={(id) => {
                  deleteCharacterByIdMutate(id);
                }}
                onEdit={({ title, budget }) => {
                  patchCharacterMutate({ id: character.id, name: title, budget });
                }}
              />
            );
          })}
          <Separator />

          <ModalMenu
            title="Create character"
            type="character-creation"
            onSubmit={({ title, budget }) => {
              console.log(budget);
              createCharacterMutate({
                name: title,
                budget: Number(budget),
                scene: { id: currentSceneId },
              });
            }}
          />
        </YStack>
      </ScrollView>
    </Theme>
  );
};
export default Characters;
