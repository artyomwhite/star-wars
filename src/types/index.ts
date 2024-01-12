import { ActionType } from '../utils/helpers';

export enum ReqStatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  REFRESH = 'refresh',
  LOAD_MORE = 'loadMore',
  EMPTY = '',
}

export interface IGetPeopleData {
  actionType: ActionType;
  page?: number;
  search?: string,
}

export interface IGetPersonData {
  actionType: ActionType;
  id: string;
}

export enum AsyncStorageEnum {
  FAVOURITE_LIST = 'FAVOURITE_LIST',
}
