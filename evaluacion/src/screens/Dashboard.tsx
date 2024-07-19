import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Film } from '../types';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [films, setFilms] = useState<Film[]>([]);
  const [filmData, setFilmData] = useState<{ id?: number; name: string; director: string; minutes: string }>({ name: '', director: '', minutes: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<number | null>(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    const { data } = await supabase.from('film').select('*');
    if (data) {
      setFilms(data);
    }
  };

  const saveFilm = async () => {
    if (filmData.id) {
      await supabase.from('film').update({
        name: filmData.name,
        director: filmData.director,
        minutes: parseInt(filmData.minutes),
      }).eq('id', filmData.id);
      setEditingFilmId(null);
      setShowForm(false);
    } else {
      await supabase.from('film').insert(filmData);
    }
    fetchFilms();
    setFilmData({ name: '', director: '', minutes: '' });
  };

  const deleteFilm = async (id: number) => {
    await supabase.from('film').delete().eq('id', id);
    fetchFilms();
  };

  const handleEdit = (film: Film) => {
    setFilmData({ id: film.id, name: film.name, director: film.director, minutes: film.minutes.toString() });
    setEditingFilmId(film.id);
    setShowForm(true);
  };

  const handleCardPress = (filmId: number) => {
    navigation.navigate('Film', { filmId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DASHBOARD</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)} style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.director}</Text>
            <Text>{item.minutes} minutes</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.options}
                onPress={() => handleEdit(item)}
              >
                <Icon name="edit" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => deleteFilm(item.id)}
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
            value={filmData.name}
            onChangeText={(text) => setFilmData({ ...filmData, name: text })}
            placeholder="Film Name"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            value={filmData.director}
            onChangeText={(text) => setFilmData({ ...filmData, director: text })}
            placeholder="Director"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            value={filmData.minutes}
            onChangeText={(text) => setFilmData({ ...filmData, minutes: text })}
            placeholder="Minutes"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <Button title="Save Film" onPress={saveFilm} />
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Dashboard;
