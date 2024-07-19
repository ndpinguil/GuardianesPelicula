import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabase';
import { RootStackParamList } from '../../App';
import { Character } from '../types'; // Asegúrate de tener un tipo Character definido
import Icon from 'react-native-vector-icons/MaterialIcons';

type CharacterScreenRouteProp = RouteProp<RootStackParamList, 'Character'>;

const CharacterScreen = () => {
  const route = useRoute<CharacterScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { characterId } = route.params;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterData, setCharacterData] = useState<{ id?: number; name: string; budget: string }>({ name: '', budget: '' });
  const [showForm, setShowForm] = useState(false);
  const [sceneId, setSceneId] = useState<number | null>(null);

  useEffect(() => {
    fetchCharacter();
  }, []);

  useEffect(() => {
    if (sceneId) {
      fetchCharacters();
    }
  }, [sceneId]);

  const fetchCharacter = async () => {
    const { data } = await supabase.from('character').select('*').eq('id', characterId).single();
    if (data) {
      setCharacterData({ name: data.name, budget: data.budget.toString() });
      setSceneId(data.scene_id); // Asumiendo que character tiene un campo scene_id
    }
  };

  const fetchCharacters = async () => {
    const { data } = await supabase.from('character').select('*').eq('scene_id', sceneId);
    if (data) {
      setCharacters(data);
    }
  };

  const saveCharacter = async () => {
    if (characterData.id) {
      await supabase.from('character').update({ name: characterData.name, budget: parseFloat(characterData.budget) })
        .eq('id', characterData.id);
    } else {
      await supabase.from('character').insert({ name: characterData.name, budget: parseFloat(characterData.budget), scene_id: sceneId });
    }
    fetchCharacters();
    setCharacterData({ name: '', budget: '' });
    setShowForm(false);
  };

  const deleteCharacter = async (id: number) => {
    await supabase.from('character').delete().eq('id', id);
    fetchCharacters();
  };

  const handleEdit = (character: Character) => {
    setCharacterData({ id: character.id, name: character.name, budget: character.budget.toString() });
    setShowForm(true);
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text>Budget: {item.budget}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.options}>
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteCharacter(item.id)} style={styles.options}>
          <Icon name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character {characterId}</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacter}
        ListEmptyComponent={<Text style={styles.emptyText}>No characters available.</Text>}
      />
      <Modal visible={showForm} animationType="slide" transparent={false}>
        <View style={styles.fullScreenForm}>
          <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={characterData.name}
            onChangeText={(text) => setCharacterData({ ...characterData, name: text })}
            placeholder="Name"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            value={characterData.budget}
            onChangeText={(text) => setCharacterData({ ...characterData, budget: text })}
            placeholder="Budget"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <Button title="Save Character" onPress={saveCharacter} />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
        <Icon name="add" size={50} color="#e8a3ff" />
      </TouchableOpacity>
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  options: {
    alignItems: 'center',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#ccc',
  },
});

export default CharacterScreen;
