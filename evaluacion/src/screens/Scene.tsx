import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabase';
import { RootStackParamList } from '../../App';
import { Scene } from '../types';
import ExpandableForm from '../components/ExpandableForm'; // Ajusta la ruta según tu estructura

type SceneScreenRouteProp = RouteProp<RootStackParamList, 'Scene'>;

const SceneScreen = () => {
  const route = useRoute<SceneScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { sceneId } = route.params;

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [sceneData, setSceneData] = useState({ name: '', minutes: '', budget: '' });

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    const { data } = await supabase.from('scene').select('*').eq('film_id', sceneId);
    if (data) {
      setScenes(data);
    }
  };

  const saveScene = async () => {
    await supabase.from('scene').insert({ ...sceneData, film_id: sceneId });
    fetchScenes();
    setSceneData({ name: '', minutes: '', budget: '' });
  };

  const deleteScene = async (id: number) => {
    await supabase.from('scene').delete().eq('id', id);
    fetchScenes();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scene {sceneId} - Characters</Text>
      <FlatList
        data={scenes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.minutes} minutes</Text>
            <Text>Budget: {item.budget}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Character', { characterId: item.id })}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteScene(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ExpandableForm
        onSave={saveScene}
        formInputs={{
          name: { value: sceneData.name, placeholder: 'Name' },
          minutes: { value: sceneData.minutes, placeholder: 'Minutes', keyboardType: 'numeric' },
          budget: { value: sceneData.budget, placeholder: 'Budget', keyboardType: 'numeric' },
        }}
        onChange={(key, value) => setSceneData((prev) => ({ ...prev, [key]: value }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#200020',
  },
  title: {
    color: '#e8a3ff',
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#4b004b',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default SceneScreen;
