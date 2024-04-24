// OpeningScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import { ImageBackground, FlatList, StatusBar} from 'react-native';
import { Card, Searchbar, Surface, Title, Paragraph } from 'react-native-paper';
import styles from '../styles';
import bg from '../assets/bg.jpeg';

const OpeningScreen = ({ route, navigation, chessData }) => {
  const { groupName } = route.params;
  const openings = chessData.filter(opening => opening.name.startsWith(groupName));
  const [search, setSearch] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: groupName });
  }, [groupName]);

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
    <Surface style={styles.container}>
        <Surface style={{ flex: 1}}>
          <Searchbar platform='android' value={search} onChangeText={setSearch} placeholder='Search...' />
          <FlatList style={{ flex: 1 }}
            data={filteredAndSortedOpenings}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <Card style={styles.listItem2} onPress={() => navigation.navigate('Openings', { opening: item })}>
                <Card.Title title={item.name} />
                <Card.Content>
                  <Paragraph>{item.moves}</Paragraph>
                </Card.Content>
              </Card>
            )}
          />
          <StatusBar style="auto" />
        </Surface>
    </Surface>
  );
}

export default OpeningScreen;