import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlackHeart } from 'assets/images/people';
import { tableHeaderItems } from 'utils/constants';
import { Colors } from 'utils/styles';
import { typography } from 'utils/typography';

export const TableHeader = () => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <View style={{ flexDirection: 'row' }}>
          <BlackHeart height={16} width={16} style={{ marginRight: 10 }}/>
          <Text style={styles.tableHeaderText}>
            <Text style={styles.gray}>| </Text>
            Name
          </Text>
        </View>
        <View style={styles.tableHeaderSmallContainer}>
          {tableHeaderItems.map(item =>
            <Text key={item} style={styles.tableHeaderText}>
              <Text style={[styles.tableHeaderText, styles.gray]}> | </Text>
              {item.length > 4 ? item.split(' ').join('').slice(0, 4) + '...' : item}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.white,
  },
  tableHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: Colors['light-grey'],
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    ...typography.p1,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'normal',
  },
  tableHeaderSmallContainer: {
    flexDirection: 'row',
  },
  gray: {
    color: Colors['medium-grey'],
  },
});
