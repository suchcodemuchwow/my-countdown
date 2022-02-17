import React from 'react';
import { SafeAreaView } from 'react-native';

import { Divider, List } from '@ui-kitten/components';

import { useOccasionsSelector } from '../slices/hooks';
import SwipableRow from '../components/SwipableRow';
import moment from 'moment';
import { Occasion } from '../occasion.type';

export default function Home() {
  const occasions = useOccasionsSelector((state) => state.occasions);
  const unordered: { past: Occasion[]; future: Occasion[] } = [...occasions].reduce(
    (p, c) => {
      p[`${moment().diff(c.date) < 0 ? 'future' : 'past'}`].push(c);
      return p;
    },
    { past: [], future: [] }
  );

  unordered.future.sort((a, b) => moment(a.date).diff(b.date));
  unordered.past.sort((a, b) => moment(b.date).diff(a.date));

  const ordered = [...unordered.future, ...unordered.past];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <List
        style={{ flex: 1 }}
        data={ordered}
        renderItem={({ item }) => <SwipableRow item={item} key={item.id} />}
        keyExtractor={(item, index) => `message ${index}`}
        ItemSeparatorComponent={Divider}
      />
    </SafeAreaView>
  );
}
