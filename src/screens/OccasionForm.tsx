import { StackScreenProps } from '@react-navigation/stack';
import { Button, ButtonProps, Datepicker, Icon, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../Navigation';
import { useAppDispatch } from '../slices/hooks';
import { add } from '../slices/occasions.slice';
import moment from 'moment';
import { Occasion } from '../occasion.type';

type Props = StackScreenProps<RootStackParamList, 'CreateOccasion'>;
const emptyState = {
  name: '',
  active: false,
  id: '-1',
  date: moment().format(),
};

const CloseIcon = (props?: ButtonProps) => (
  <Icon
    {...props}
    name="close-circle-outline"
    fill="rgb(143,155,179)"
    style={[props?.style, { width: 32, height: 32 }]}
  />
);

export default function OccasionForm({ navigation }: Props) {
  const [editingEvent, setEditingEvent] = useState<Occasion>(emptyState);
  console.log(moment().format());

  const dispatch = useAppDispatch();

  return (
    <Layout style={styles.container}>
      <Button
        style={{ position: 'absolute', zIndex: 1, right: 5, top: 10 }}
        appearance="ghost"
        accessoryLeft={CloseIcon}
        size="small"
        onPress={() => {
          setEditingEvent(emptyState);
          navigation.navigate('Home');
        }}
      />
      <Layout style={styles.headerContainer}>
        <Text category="h3">Add a new event</Text>
      </Layout>
      <Layout style={styles.inputContainer}>
        <Input
          placeholder="Place your Text"
          label="Event name"
          value={editingEvent.name}
          onChangeText={(value) => setEditingEvent({ ...editingEvent, name: value })}
        />
        <Datepicker
          label="Date"
          style={{ marginTop: 20 }}
          date={moment(editingEvent.date).toDate()}
          onSelect={(value) => setEditingEvent({ ...editingEvent, date: moment(value).format() })}
        />
      </Layout>
      <Layout style={styles.bottomContainer} testID="inner-layout">
        <Button
          onPress={() => {
            dispatch(
              add({
                name: editingEvent.name,
                date: editingEvent.date,
                id: (Math.random() * 1000).toString(10),
                active: true,
              })
            );
            setEditingEvent(emptyState);
            navigation.navigate('Home');
          }}
        >
          Save
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headerContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flex: 0.5,
    justifyContent: 'center',
    marginHorizontal: 80,
  },
  input: {
    borderWidth: 2,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
