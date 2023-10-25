import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const DismisssKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
