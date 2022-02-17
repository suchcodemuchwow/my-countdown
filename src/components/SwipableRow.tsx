import countdown from 'countdown';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { ListItem, Text } from '@ui-kitten/components';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import { Occasion } from '../occasion.type';

type SwipableRowProps = {
  item: Occasion;
};

const humanReadableCountdown = (date: string) => {
  const isFuture = moment().diff(date) < 0;
  const diff = countdown(moment(date), moment(), countdown.DEFAULTS, 1).toString();
  return isFuture ? `in ${diff}` : `${diff} ago`;
};

const SwipableRow = ({ item: { id, name, date } }: SwipableRowProps) => {
  const [countdownText, setCountdownText] = useState(humanReadableCountdown(date));

  useEffect(() => {
    const intervalId = setInterval(() => setCountdownText(humanReadableCountdown(date)), 1000);
    return () => clearInterval(intervalId); // This is important
  }, []);

  return (
    <AppleStyleSwipeableRow id={id}>
      <ListItem style={styles.listItemStyle}>
        <Text category="h4">{name}</Text>
        <Text status={moment().diff(date) > 0 ? 'danger' : 'info'} category="h6">
          {countdownText}
        </Text>
      </ListItem>
    </AppleStyleSwipeableRow>
  );
};

const styles = StyleSheet.create({
  listItemStyle: {
    backgroundColor: 'white',
    height: 80,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
});

export default SwipableRow;
