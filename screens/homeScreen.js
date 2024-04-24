import React, { useState, useMemo, useEffect } from 'react';
import { Text, FlatList, StatusBar } from 'react-native';
import { Card, Searchbar, Surface } from 'react-native-paper';
import styles from '../styles';


const HomeScreen = ({ navigation, chessData, isLoading }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
      navigation.setOptions({ title: "Learn openings" });
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
              data={filteredAndSortedGroupNames}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Card style={styles.listItem} onPress={() => navigation.navigate('Variations', { groupName: item })}>
                  <Card.Title title={item} />
                </Card>
              )}
            />
            <StatusBar style="auto" />
          </Surface>
      </Surface>
    );
}

export default HomeScreen;