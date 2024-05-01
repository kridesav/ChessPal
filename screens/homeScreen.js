import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { Card, Searchbar, Surface, Text, useTheme } from 'react-native-paper';
import styles from '../styles';


const HomeScreen = ({ navigation, chessData, isLoading }) => {
    const [search, setSearch] = useState('');
    const theme = useTheme();
    const [itemsToShow, setItemsToShow] = useState(15);

    useEffect(() => {
      navigation.setOptions({ title: "Main line theory" });
    }, []);
  
    const groupedOpenings = useMemo(() => {
      if (!chessData) {
        return {};
      }
  
      return chessData.reduce((groups, opening) => {
        const key = opening.name.split(/[:|,|\d]/)[0].trim();
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(opening);
        return groups;
      }, {});
    }, [chessData]);
  
    const groupNames = useMemo(() => Object.keys(groupedOpenings), [groupedOpenings]);
  
    const filteredAndSortedGroupNames = useMemo(() => {
      let result = groupNames;
      if (search.length >= 2) {
        result = result.filter(groupName => groupName.toLowerCase().includes(search.toLowerCase()));
      } else {
        result = result.sort();
      }
      return result;
    }, [groupNames, search]);
  
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <Surface style={styles.container}>
          <Surface style={{ flex: 1}}>
            <Searchbar
              value={search}
              onChangeText={setSearch}
              placeholder='Search...'
            />
            <FlatList style={{ flex: 1 }}
              data={filteredAndSortedGroupNames.slice(0, itemsToShow)}
              onEndReached={() => setItemsToShow(itemsToShow + 15)}
              onEndReachedThreshold={0.5}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <Card style={[styles.listItem, {backgroundColor: index % 2 === 0 ? theme.colors.elevation.level2 : theme.colors.elevation.level5}]} onPress={() => navigation.navigate('Variations', { groupName: item })}>
                  <Card.Title title={item} subtitle={`${groupedOpenings[item].length} variations`} />
                </Card>
              )}
            />
            <StatusBar style="auto" />
          </Surface>
      </Surface>
    );
}

export default HomeScreen;