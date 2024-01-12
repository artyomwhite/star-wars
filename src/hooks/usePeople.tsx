import { useCallback, useState } from 'react';
import { getReqStatusByActionType } from '../utils/helpers';
import { IPeople } from '../types/people';
import { IGetPeopleData, ReqStatusEnum } from '../types';
import { getPeople } from '../api/people';

export const usePeople = () => {
  const [reqStatus, setReqStatus] = useState<ReqStatusEnum>(
    ReqStatusEnum.EMPTY,
  );
  const [data, setData] = useState<IPeople>();

  const fetch = useCallback(
    async ({
      actionType,
      page,
      search,
    }: IGetPeopleData): Promise<IPeople | undefined> => {
      try {
        setReqStatus(getReqStatusByActionType(actionType));

        const { data: respData }: {data: IPeople} = await getPeople(page, search);

        setData(respData);
        setReqStatus(ReqStatusEnum.SUCCESS);

        console.log(`[usePeople_fetch request]
        reqOptions -> ${actionType}`);
        return respData;
      } catch (error) {
        console.error('[usePeople_fetch error]', error);
        setData(undefined);
        setReqStatus(ReqStatusEnum.ERROR);
      }
    },
    [],
  );

  return {
    data: data?.results,
    totalCount: data?.count,
    reqStatus,
    fetch,
  };
};
