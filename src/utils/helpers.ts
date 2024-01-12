import { Colors, Fonts } from './styles';
import { AsyncStorageEnum, ReqStatusEnum } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectedPeople } from 'types/people';

export const baseHeaderOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: Colors.black,
  },
  headerTitleStyle: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.in_semi_bold,
  },
  headerTintColor: Colors['medium-grey'],
};

export type ActionType = 'loading' | 'loadMore' | 'refresh';

export const getReqStatusByActionType = (actionType?: ActionType) => {
  switch (actionType) {
    case 'loadMore':
      return ReqStatusEnum.LOAD_MORE;
    case 'refresh':
      return ReqStatusEnum.REFRESH;
    default:
      return ReqStatusEnum.LOADING;
  }
};

export const shortlyText = (text: string, length: number) => {
  return text?.length > length ? text?.slice(0, length) + '...' : text;
};

export const writeFavouritesToAsyncStorage = async (idList: SelectedPeople) => {
  const idListString = JSON.stringify(idList);

  try {
    await AsyncStorage.setItem(AsyncStorageEnum.FAVOURITE_LIST, idListString);
  } catch (e) {
    console.log('[ERROR write to the async storage] => ', e);
  }
};

export const getFavouritesFromAsyncStorage = async () => {
  try {
    const savedString = await AsyncStorage.getItem(AsyncStorageEnum.FAVOURITE_LIST);
    if (savedString) {
      return JSON.parse(savedString);
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
