import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { typography } from 'utils/typography';
import { Colors } from 'utils/styles';

interface Props {
  label: string,
  labelStyle?: TextStyle,
  info?: string,
  infoStyle?: TextStyle,
  containerStyle?: ViewStyle,
}

export const UiRowData: React.FC<Props> = ({
  label,
  labelStyle,
  info,
  infoStyle,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>
        {label}
      </Text>
      <Text style={[styles.info, infoStyle]}>
        {info}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: Colors['medium-grey'],
  },
  label: {
    ...typography.h2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  info: {
    ...typography.p1,
  },
});
