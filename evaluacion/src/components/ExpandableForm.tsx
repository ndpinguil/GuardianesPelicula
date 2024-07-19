import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface ExpandableFormProps {
  formInputs: {
    [key: string]: {
      value: string;
      placeholder: string;
      keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    };
  };
  onSave: () => void;
  onChange: (key: string, value: string) => void;
  formType: string; // Añadido para identificar el tipo de formulario
}

const ExpandableForm: React.FC<ExpandableFormProps> = ({ formInputs, onSave, onChange, formType }) => {
  // Definir qué campos mostrar en función del tipo de formulario
  const fieldsToShow = formType === 'character' ? ['name', 'budget'] : Object.keys(formInputs);

  return (
    <View>
      {fieldsToShow.map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          value={formInputs[key].value}
          onChangeText={(value) => onChange(key, value)}
          placeholder={formInputs[key].placeholder}
          placeholderTextColor="#ccc"
          keyboardType={formInputs[key].keyboardType || 'default'}
        />
      ))}
      <Button title="Save" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#4b004b',
    padding: 10,
    marginBottom: 10,
    color: '#fff',
    borderRadius: 10,
  },
});

export default ExpandableForm;
