export enum ScreenEnum {
  HOME_SCREEN = 'HOME_SCREEN',
  EXTRA_INFO = 'EXTRA_INFO',
}

export type RootStackParamList = {
  HOME_SCREEN: undefined;
  EXTRA_INFO: {
    personId: string,
  };
};
