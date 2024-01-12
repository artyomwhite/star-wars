import {Fonts} from './styles';
import {StyleSheet} from 'react-native';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    lineHeight: 33,
    letterSpacing: 0.2,
    fontFamily: Fonts.in_thin,
  },
  h2: {
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: 0.2,
    fontFamily: Fonts.in_thin,
  },
  h3: {
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0.4,
    fontFamily: Fonts.in_thin,
  },
  h4: {
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: Fonts.in_thin,
  },

  p1: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.4,
    fontFamily: Fonts.in_thin,
  },

  button: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontFamily: Fonts.in_medium,
  },
});
