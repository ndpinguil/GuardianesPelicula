import { Button, Card, H2, Paragraph } from 'tamagui';
import ModalMenu, { TypeMode } from './modal-menu';
import { StyleSheet } from 'react-native';
import { themeStyles } from '../environment/config';
interface CardProps {
  id: number;
  title: string;
  director: string;
  time: number;
  budget: number;
  onDelete?: (id: number) => void;
  onEdit?: ({
    id,
    title,
    duration,
    director,
    budget,
  }: {
    id: number;
    title: string;
    duration: number;
    director: string;
    budget: number;
  }) => void;
  onPress?: () => void;
  type?: TypeMode;
}

const styles = StyleSheet.create({
  cardItem: {
    width: 300,
    marginVertical: 10,
    ...themeStyles.button,
  },
  button: {
    marginVertical: 10,
  },
});

const CardElement = ({
  id,
  title,
  director,
  time,
  budget,
  onDelete,
  onEdit,
  onPress,
  type = 'film-editor',
}: CardProps) => {
  return (
    <Card onPress={onPress} style={{ ...styles.cardItem }}>
      <Card.Header>
        <H2 style={themeStyles.text}>{title}</H2>
        <Paragraph theme="alt2">Director: {director}</Paragraph>
        <Paragraph theme="alt2">{time !== 0 ? `Duration: ${time}` : ''}</Paragraph>
        <Paragraph theme="alt2">{budget !== 0 ? `Budget: ${budget}` : ''}</Paragraph>
        <Button
          style={styles.button}
          onPress={() => {
            if (onDelete) onDelete(id);
          }}>
          erase
        </Button>

        <ModalMenu
          dialogTriggerText="edit"
          title="Editor"
          type={type}
          onSubmit={({ title: titleInput, duration, director, budget }) => {
            if (onEdit)
              onEdit({
                id,
                title: titleInput,
                duration: Number(duration),
                director,
                budget: Number(budget),
              });
          }}
        />
      </Card.Header>
    </Card>
  );
};

export default CardElement;
