import { Adapt, Button, Dialog, Input, Label, Sheet } from 'tamagui';
import useInput from '~/hooks/useInput';

export interface ModalMenuOnSubmit {
  title: string;
  director: string;
  duration: string;
  budget: string;
}

export type TypeMode =
  | 'film-creation'
  | 'film-editor'
  | 'scene-creation'
  | 'scene-editor'
  | 'character-creation'
  | 'character-editor';

interface ModalMenuProps {
  title?: string;
  dialogTriggerText?: string;
  type?: TypeMode;
  onSubmit?: ({ title }: ModalMenuOnSubmit) => void;
}

const ModalMenu = ({
  title = '',
  onSubmit,
  dialogTriggerText = '+',
  type = 'film-creation',
}: ModalMenuProps) => {
  const titleInput = useInput();
  const directorInput = useInput();
  const minutesInput = useInput();
  const budgetInput = useInput();

  const handleSubmit = () => {
    if (onSubmit)
      onSubmit({
        title: titleInput.input,
        duration: minutesInput.input,
        director: directorInput.input,
        budget: budgetInput.input,
      });
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>{dialogTriggerText}</Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="lazy" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="lazy"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4">
          <Dialog.Title>{title}</Dialog.Title>
          {type === 'film-creation' && (
            <>
              <Label>Title: </Label>
              <Input defaultValue="put a title" onChangeText={titleInput.handleText} />
              <Label>Director: </Label>
              <Input defaultValue="put director" onChangeText={directorInput.handleText} />
              <Label>Duration in minutes: </Label>
              <Input
                defaultValue="0"
                value={minutesInput.input}
                onChangeText={minutesInput.handleTextNumber}
              />
            </>
          )}
          {type === 'film-editor' && (
            <>
              <Label>Title: </Label>
              <Input onChangeText={titleInput.handleText} />
              <Label>Duration: </Label>
              <Input onChangeText={minutesInput.handleTextNumber} />
              <Label>Director: </Label>
              <Input onChangeText={directorInput.handleText} />
            </>
          )}

          {type === 'scene-creation' && (
            <>
              <Label>Name: </Label>
              <Input onChangeText={titleInput.handleText} />
              <Label>Duration in minutes: </Label>
              <Input
                defaultValue="0"
                value={minutesInput.input}
                onChangeText={minutesInput.handleTextNumber}
              />
              <Label>Budget: </Label>
              <Input
                defaultValue="0"
                value={budgetInput.input}
                onChangeText={budgetInput.handleTextNumber}
              />
            </>
          )}

          {type === 'scene-editor' && (
            <>
              <Label>Name: </Label>
              <Input onChangeText={titleInput.handleText} />
              <Label>Duration in minutes: </Label>
              <Input
                defaultValue="0"
                value={minutesInput.input}
                onChangeText={minutesInput.handleTextNumber}
              />
              <Label>Budget: </Label>
              <Input
                defaultValue="0"
                value={budgetInput.input}
                onChangeText={budgetInput.handleTextNumber}
              />
            </>
          )}

          {type === 'character-creation' && (
            <>
              <Label>Name: </Label>
              <Input onChangeText={titleInput.handleText} />
              <Label>Budget: </Label>
              <Input
                defaultValue="0"
                value={budgetInput.input}
                onChangeText={budgetInput.handleTextNumber}
              />
            </>
          )}

          {type === 'character-editor' && (
            <>
              <Label>Name: </Label>
              <Input onChangeText={titleInput.handleText} />
              <Label>Budget: </Label>
              <Input
                defaultValue="0"
                value={budgetInput.input}
                onChangeText={budgetInput.handleTextNumber}
              />
            </>
          )}
          <Button onPress={handleSubmit}>submit</Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
export default ModalMenu;
