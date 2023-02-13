import { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export const PostDateTimePicker = (props) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
      
  const onChange = (_, selectedDate) => {
    props.handleDateChange(selectedDate);
  };


  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true)
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {props.date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={new Date(2050, 12, 31)}
        />
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
