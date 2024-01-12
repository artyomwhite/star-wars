import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { typography } from '../../utils/typography';
import { Colors } from '../../utils/styles';

interface Props {
  mainInfo: string | number;
  additionalInfo?: string;
}

export const InfoTile: React.FC<Props> = ({ mainInfo, additionalInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{mainInfo}</Text>
      <Text style={styles.additionalText}>{additionalInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: 0,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors['medium-grey'],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  mainText: {
    ...typography.h1,
    fontWeight: 'normal',
  },
  additionalText: {
    ...typography.h4,
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
