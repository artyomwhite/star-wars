import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { typography } from 'utils/typography';
import { Colors } from 'utils/styles';

interface Props {
  text: string,
  containerStyle?: ViewStyle,
  textStyle?: TextStyle,
}

export const UiLoader: React.FC<Props> = ({ text, containerStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    paddingVertical: 30,
  },
  text: {
    ...typography.h3,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: Colors['medium-grey'],
  },
});
