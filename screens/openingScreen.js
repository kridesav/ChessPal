// OpeningScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed';
import styles from '../styles';
import bg from '../assets/bg.jpeg';

const OpeningScreen = ({ route, navigation, chessData }) => {
  const { groupName } = route.params;
  const openings = chessData.filter(opening => opening.name.startsWith(groupName));
  const [search, setSearch] = useState('');

  const filteredAndSortedOpenings = useMemo(() => {
    let result = openings;
    if (search.length >= 2) {
      result = result.filter(opening => opening.name.toLowerCase().includes(search.toLowerCase()));
    } else {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [openings, search]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', backgroundColor: 'white' }}>{groupName}</Text>
          <SearchBar platform='android' value={search} onChangeText={setSearch} placeholder='Search...' />
          <FlatList style={{ flex: 1 }}
            data={filteredAndSortedOpenings}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Openings', { opening: item })}>
                <Text style={styles.listMainText}>{item.name}</Text>
                <Text style={styles.listSubText}>{item.moves}</Text>
              </TouchableOpacity>
            )}
          />
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

export default OpeningScreen;