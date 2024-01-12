import React from 'react';
import { SearchIcon } from 'assets/images/people';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { Colors } from 'utils/styles';

interface Props {
  searchValue: string,
  setSearchValue: (value: string) => void,
  containerStyle?: ViewStyle,
}

export const UISearch: React.FC<Props> = ({ searchValue, setSearchValue, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SearchIcon width={20} height={20} />
      <TextInput
        value={searchValue}
        editable
        onChangeText={text => setSearchValue(text)}
        placeholder={'Search'}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    gap: 10,
  },
  input: {
    paddingVertical: 10,
  },
});
