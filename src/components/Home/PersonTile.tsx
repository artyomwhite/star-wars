import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlackHeart, BlackHeartOutlined } from 'assets/images/people';
import { Colors } from 'utils/styles';
import { typography } from 'utils/typography';
import { IPerson, SelectedPeople } from 'types/people';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, ScreenEnum } from 'types/navigation';
import { shortlyText, writeFavouritesToAsyncStorage } from 'utils/helpers';

interface Props {
  person: IPerson,
  selectedPeople: SelectedPeople,
  setSelectedPeople: (prevState: (value: SelectedPeople) => SelectedPeople) => void,
}

export const PersonTile: React.FC<Props> = ({ person, selectedPeople, setSelectedPeople }) => {
  const personId = person.url.split('/')[person.url.split('/').length - 2];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleGenderCount = useCallback((prevState: SelectedPeople, gender: string) => {
    const countKey = gender === 'male' ? 'male' : gender === 'female' ? 'female' : 'other';
    const count = prevState[countKey];
    const newCount = prevState.idArray.includes(personId) ? count - 1 : count + 1;
    return {
      ...prevState,
      [countKey]: newCount,
      idArray: prevState.idArray.includes(personId) ? prevState.idArray.filter(id => id !== personId) : [...prevState.idArray, personId],
    };
  }, [personId]);

  const handleOnPressHeart = useCallback(() => {
    setSelectedPeople(prevState => {
      const updatedFavourites = toggleGenderCount(prevState, person.gender);
      writeFavouritesToAsyncStorage(updatedFavourites);

      return updatedFavourites;
    });
  }, [person.gender, setSelectedPeople, toggleGenderCount]);

  return (
    <TouchableOpacity style={styles.personTileContainer} onPress={() => navigation.navigate(ScreenEnum.EXTRA_INFO, { personId: personId })}>
      <View style={styles.personTile}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={handleOnPressHeart} style={{ paddingVertical: 20 }}>
            {selectedPeople.idArray.includes(personId) ? (
              <BlackHeart width={16} height={16} />
            ) : <BlackHeartOutlined width={16} height={16} />}
          </TouchableOpacity>
          <Text style={styles.tableHeaderText}>
            {shortlyText(person.name, 14)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.year}>{shortlyText(person.birth_year, 3)}</Text>
          <Text style={styles.gender}>{shortlyText(person.gender, 5)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  personTileContainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  personTile: {
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors['light-grey'],
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableHeaderText: {
    ...typography.p1,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'normal',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    gap: 20,
  },
  rightContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  year: {
    textAlign: 'right',
  },
  gender: {

  },
});
