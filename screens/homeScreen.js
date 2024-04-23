import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed';
import styles from '../styles';
import bg from '../assets/bg.jpeg';

const HomeScreen = ({ navigation, chessData, isLoading }) => {
    const [search, setSearch] = useState('');
  
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
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <SearchBar platform='android' value={search} onChangeText={setSearch} placeholder='Search...' />
          <FlatList style={{ flex: 1 }}
            data={filteredAndSortedGroupNames}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Variations', { groupName: item })}>
                <Text style={styles.listMainText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;