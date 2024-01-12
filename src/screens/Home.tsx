import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { typography } from '../utils/typography';
import { Colors } from '../utils/styles';
import { InfoTile } from '../components/Home/InfoTile';
import { usePeople } from '../hooks/usePeople';
import { ReqStatusEnum } from '../types';
import { IPerson, SelectedPeople } from '../types/people';
import { NavigationArrow } from 'assets/images/people';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonTile } from 'components/Home/PersonTile';
import { TableHeader } from 'components/Home/TableHeader';
import { UiLoader } from 'components/base/UiLoader';
import { UISearch } from 'components/base/UISearch';
import { getFavouritesFromAsyncStorage } from 'utils/helpers';

export const Home = () => {
  const { data, reqStatus, fetch, totalCount } = usePeople();
  const [page, setPage] = useState(1);
  const insets = useSafeAreaInsets();
  const [selectedPeople, setSelectedPeople] = useState<SelectedPeople>(
    {
      male: 0,
      female: 0,
      other: 0,
      idArray: [],
    }
  );
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const fetchData = useCallback(async (search?: string,) => {
    await fetch({
      actionType: 'loading',
      search,
    });
  }, [fetch]);

  useEffect(() => {
    fetchData();

    (async function getData() {
      const savedData = await getFavouritesFromAsyncStorage();

      if (savedData) {
        setSelectedPeople(savedData);
      }
    })();
  }, []);

  const startIndex = useMemo(() => (page - 1) * 10 + 1, [page]);
  const endIndex = useMemo(() => {
    if (totalCount) {
      return Math.min(startIndex + 10 - 1, totalCount);
    }
  }, [startIndex, totalCount]);

  const handlePressNext = useCallback(() => {
    if (page >= 1) {
      fetch({
        actionType: 'loadMore',
        page: page + 1,
      });
      setPage(page + 1);
    }
  }, [fetch, page]);

  const handlePressPrev = useCallback(async () => {
    if (page >= 1) {
      await fetch({
        actionType: 'loadMore',
        page: page - 1,
      });
      setPage(page - 1);
    }
  }, [fetch, page]);

  const onRefresh = useCallback(async () => {
    await fetch({
      actionType: 'refresh',
      page: page,
    });
  }, [fetch, page]);

  const handleResetSelected = useCallback(() => {
    setSelectedPeople({
      male: 0,
      female: 0,
      other: 0,
      idArray: [],
    });
  }, []);

  const getISLastPage = useMemo(() => {
    if (totalCount) {
      return Math.ceil(totalCount / 10) === page;
    }
  }, [page, totalCount]);

  const Button = useMemo(
    () => (
      <TouchableOpacity style={styles.button} onPress={handleResetSelected}>
        <Text style={styles.buttonText}>clear fans</Text>
      </TouchableOpacity>
    ),
    [handleResetSelected],
  );

  const renderItem = useCallback(({ item }: {item: IPerson}) => (
    <PersonTile person={item} selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople}/>
  ), [selectedPeople]);

  const handleOnSearch = useCallback((value: string) => {
    clearTimeout(timer);
    setSearchValue(value);

    const timerId = setTimeout(() => fetchData(value), 800);
    setTimer(timerId);
  }, [fetchData, timer]);

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Fans</Text>
          {Button}
        </View>
        <View style={styles.statsContainer}>
          <InfoTile mainInfo={selectedPeople.female} additionalInfo={'Female fans'} />
          <InfoTile mainInfo={selectedPeople.male} additionalInfo={'Male fans'} />
          <InfoTile mainInfo={selectedPeople.other} additionalInfo={'Others'} />
        </View>
        <UISearch
          searchValue={searchValue}
          setSearchValue={(value: string) => handleOnSearch(value)}
          containerStyle={{ paddingTop: 15 }}
        />
        <TableHeader />
        {reqStatus === ReqStatusEnum.LOADING && <UiLoader text={'Loading...'} />}
        {reqStatus === ReqStatusEnum.SUCCESS && data?.length === 0 && (
          <Text style={styles.noResultsText}>No results :(</Text>
        )}
      </>
    ),
    [Button, data?.length, handleOnSearch, reqStatus, searchValue, selectedPeople.female, selectedPeople.male, selectedPeople.other],
  );

  const ListFooterComponent = useMemo(
    () => {
      if (reqStatus !== ReqStatusEnum.LOADING && data?.length !== 0) {
        return (
          <View style={[styles.footer, { marginBottom: insets.bottom }]}>
            {reqStatus === ReqStatusEnum.LOAD_MORE && (
              <UiLoader
                text={'Loading'}
                containerStyle={{ position: 'absolute', bottom: -3, left: 25, gap: 10 }}
                textStyle={{ ...typography.h4 }}
              />
            )}
            <View style={styles.footerInner}>
              <Text style={[styles.paginationText, { marginRight: 10 }]}>{startIndex} - {endIndex}</Text>
              <Text style={styles.paginationText}>of {totalCount}</Text>
              <TouchableOpacity
                onPress={handlePressPrev}
                style={page === 1 && styles.disabledArrow}
                disabled={page === 1}
              >
                <NavigationArrow width={25} height={25}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressNext}
                style={[styles.rightButton, getISLastPage && styles.disabledArrow]}
                disabled={getISLastPage}
              >
                <NavigationArrow width={25} height={25}/>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }, [data?.length, endIndex, getISLastPage, handlePressNext, handlePressPrev, insets.bottom, page, reqStatus, startIndex, totalCount]);

  return (
    <>
      <FlatList
        data={data}
        style={styles.main}
        renderItem={renderItem}
        keyExtractor={item => item.url}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={reqStatus === ReqStatusEnum.REFRESH}
            onRefresh={onRefresh}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 22,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    ...typography.button,
    textTransform: 'uppercase',
    color: Colors.red,
  },
  statsContainer: {
    justifyContent: 'space-between',
    gap: 10,
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },

  footer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: 16,
  },
  footerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: Colors['light-grey'],
  },
  paginationText: {
    ...typography.h4,
    fontWeight: 'normal',
  },
  rightButton: {
    marginLeft: 20,
    transform: [{ rotate: '180deg' }],
  },
  disabledArrow: {
    opacity: 0.5,
  },
  noResultsText: {
    textAlign: 'center',
    ...typography.h3,
    fontWeight: 'normal',
    color: Colors['medium-grey'],
    paddingVertical: 30,
    textTransform: 'uppercase',
  },
});
