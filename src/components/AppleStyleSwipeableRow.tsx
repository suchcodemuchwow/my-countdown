import React, { useRef } from 'react';
import { Animated, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { useAppDispatch } from '../slices/hooks';
import { remove } from '../slices/occasions.slice';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

type AnimatedInterpolation = Animated.AnimatedInterpolation;

const renderAction = (progressAnimatedValue: AnimatedInterpolation, isLeft: boolean) => {
  const leftStyle = {
    backgroundColor: '#497AFC',
    alignItems: 'flex-start',
  };

  const rightStyle = {
    backgroundColor: '#FF3D71',
    alignItems: 'flex-end',
  };

  const style = (isLeft ? leftStyle : rightStyle) as StyleProp<ViewStyle>;

  const translateX = progressAnimatedValue.interpolate({
    inputRange: [0, 0.2, 0.5, 1],
    outputRange: [0, 0, 0, SCREEN_WIDTH * 0.8 * (isLeft ? 1 : -1)],
  });

  const opacity = progressAnimatedValue.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [1, 1, 1, 0],
  });

  return (
    <RectButton style={[styles.hiddenButtonStyle, style]}>
      <Animated.Text style={[styles.text, { transform: [{ translateX }], opacity }]}>
        {isLeft ? 'Archive' : 'Delete'}
      </Animated.Text>
    </RectButton>
  );
};

const AppleStyleSwipeableRow: React.FC<{ id: string }> = ({ id, children }) => {
  const dispatch = useAppDispatch();
  const swipeableRowRef = useRef(null);
  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={SCREEN_WIDTH * 0.3}
      rightThreshold={SCREEN_WIDTH * 0.3}
      onSwipeableLeftOpen={() => dispatch(remove({ id }))}
      onSwipeableRightOpen={() => dispatch(remove({ id }))}
      renderLeftActions={(p) => renderAction(p, true)}
      renderRightActions={(p) => renderAction(p, false)}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  hiddenButtonStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    marginHorizontal: 20,
  },
});

export default AppleStyleSwipeableRow;
