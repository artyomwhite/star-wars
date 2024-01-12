import { Dimensions } from 'react-native';

// Dimensions
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
// Colors
export enum Colors {
  'green' = '#95D646',
  'white' = '#FFFFFF',
  'black' = '#000000',
  'clean-grey' = '#F7F9F9',
  'light-grey' = '#E0E6E7',
  'grey' = '#C2D3CD',
  'medium-grey' = '#AFBFC0',
  'deep-grey' = '#3f2329',
  'red' = '#FF2A24C7',
}

export enum Fonts {
  'in_thin' = 'Inter-Regular_Light',
  'in_semi_bold' = 'Inter-Regular_SemiBold',
  'in_medium' = 'Inter-Regular_Medium',
}
