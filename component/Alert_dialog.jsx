import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

export const Alert_dialog = ({showAlert, hideDialog, text, title, btn}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={showAlert} onDismiss={() => hideDialog()}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{text}</Text>
          </Dialog.Content>
          <Dialog.Actions>{btn}</Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
