import { useCallback, useState } from 'react';
import { IGetPersonData, ReqStatusEnum } from 'types';
import { IFullPersonData, IPerson } from 'types/people';
import { getReqStatusByActionType } from 'utils/helpers';
import { getPerson } from 'api/person';
import { IPlanet } from 'types/planets';
import { getPlanet } from 'api/planet';
import { ISpecies } from 'types/species';
import { getSpecies } from 'api/species';

export const usePerson = () => {
  const [reqStatus, setReqStatus] = useState<ReqStatusEnum>(
    ReqStatusEnum.EMPTY,
  );
  const [data, setData] = useState<IFullPersonData>();

  const fetch = useCallback(
    async ({
      actionType,
      id,
    }: IGetPersonData) => {
      try {
        setReqStatus(getReqStatusByActionType(actionType));

        const { data: respDataPerson }: {data: IPerson} = await getPerson(id);

        const planetId = respDataPerson.homeworld?.split('/')[respDataPerson.homeworld?.split('/').length - 2];
        const speciesID = respDataPerson.species[0]?.split('/')[respDataPerson.species[0]?.split('/').length - 2];

        const { data: respDataPlanet }: { data: IPlanet | null } = await getPlanet(planetId);
        const { data: respDataSpecies }: { data: ISpecies | null } | undefined = await getSpecies(speciesID);

        setData({
          ...respDataPerson,
          homeWorld: respDataPlanet,
          species: respDataSpecies,
        });
        setReqStatus(ReqStatusEnum.SUCCESS);

        console.log(`[usePerson_fetch request]
        reqOptions -> ${actionType}`);
      } catch (error) {
        console.error('[usePerson_fetch error]', error);
        setData(undefined);
        setReqStatus(ReqStatusEnum.ERROR);
      }
    },
    [],
  );

  return {
    data: data,
    reqStatus,
    fetch,
  };
};
