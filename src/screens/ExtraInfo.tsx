import React, { useEffect } from 'react';
import { UiModalHeader } from 'components/base/UiModalHeader';
import { RootStackParamList, ScreenEnum } from 'types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePerson } from 'hooks/usePerson';
import { UiRowData } from 'components/base/UiRowData';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import { ReqStatusEnum } from 'types';

type Props = NativeStackScreenProps<RootStackParamList, ScreenEnum.EXTRA_INFO>;

export const ExtraInfo = ({ route, navigation }: Props) => {
  const { personId } = route.params;
  const { data, fetch, reqStatus } = usePerson();

  useEffect(() => {
    fetch({
      actionType: 'loading',
      id: personId,
    });
  }, []);

  return (
    <>
      <UiModalHeader
        label={'person info'}
        actionLeftState={'close'}
        actionRightState={'loading'}
        load={reqStatus === ReqStatusEnum.LOADING}
        onClose={() => navigation.pop(1)}
      />
      <View style={styles.main}>
        <UiRowData label={'name'} info={data?.name} />
        <UiRowData label={'birth year'} info={data?.birth_year} />
        <UiRowData label={'gender'} info={data?.gender} />
        <UiRowData label={'home world'} info={data?.homeWorld?.name} />
        <UiRowData label={'species'} info={data?.species?.name} containerStyle={{ borderBottomWidth: 0 }}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
});
