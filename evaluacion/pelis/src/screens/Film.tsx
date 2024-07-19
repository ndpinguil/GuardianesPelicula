import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabase';
import { RootStackParamList } from '../../App';
import { Scene } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FilmScreenRouteProp = RouteProp<RootStackParamList, 'Film'>;

const FilmScreen = () => {
  const route = useRoute<FilmScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { filmId } = route.params;

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [sceneData, setSceneData] = useState<{ id?: number; name: string; minutes: string; budget: string }>({ name: '', minutes: '', budget: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingSceneId, setEditingSceneId] = useState<number | null>(null);

  useEffect(() => {
    fetchScenes();
    fetchFilmDetails();
  }, []);

  const fetchScenes = async () => {
    const { data } = await supabase.from('scene').select('*').eq('film_id', filmId);
    if (data) {
      setScenes(data);
    }
  };

  const fetchFilmDetails = async () => {
    const { data } = await supabase.from('film').select('*').eq('id', filmId).single();
    if (data) {
      // Actualiza detalles de la película si es necesario
    }
  };

  const saveScene = async () => {
    if (sceneData.id) {
      await supabase.from('scene').update({
        name: sceneData.name,
        minutes: parseInt(sceneData.minutes),
        budget: parseFloat(sceneData.budget),
      }).eq('id', sceneData.id);
      setEditingSceneId(null);
      setShowForm(false);
    } else {
      await supabase.from('scene').insert({ ...sceneData, film_id: filmId });
    }
    fetchScenes();
    setSceneData({ name: '', minutes: '', budget: '' });
  };

  const deleteScene = async (id: number) => {
    await supabase.from('scene').delete().eq('id', id);
    fetchScenes();
  };

  const handleEdit = (scene: Scene) => {
    setSceneData({ id: scene.id, name: scene.name, minutes: scene.minutes.toString(), budget: scene.budget.toString() });
    setEditingSceneId(scene.id);
    setShowForm(true);
  };

  const handleCardPress = (sceneId: number) => {
    navigation.navigate('Scene', { sceneId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Film {filmId} - Scenes</Text>
      <FlatList
        data={scenes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)} style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.minutes} minutes</Text>
            <Text>Budget: {item.budget}</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.options}
                onPress={() => handleEdit(item)}
              >
                <Icon name="edit" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => deleteScene(item.id)}
              >
                <Icon name="delete" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
        <Icon name="add-circle" size={70} color="#e8a3ff" />
      </TouchableOpacity>
      <Modal visible={showForm} animationType="slide" transparent={false}>
        <View style={styles.fullScreenForm}>
          <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={sceneData.name}
            onChangeText={(text) => setSceneData({ ...sceneData, name: text })}
            placeholder="Scene Name"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            value={sceneData.minutes}
            onChangeText={(text) => setSceneData({ ...sceneData, minutes: text })}
            placeholder="Minutes"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={sceneData.budget}
            onChangeText={(text) => setSceneData({ ...sceneData, budget: text })}
            placeholder="Budget"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <Button title="Save Scene" onPress={saveScene} />
        </View>
      </Modal>
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
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  options: {
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  fullScreenForm: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    color: '#000',
    borderRadius: 10,
  },
});

export default FilmScreen;
