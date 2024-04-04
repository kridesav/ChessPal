import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useMemo } from 'react';
import Chessboard from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from '@rneui/themed';
import bg from './assets/bg.jpeg';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [chessData, setChessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('');
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    const groupedOpenings = chessData.reduce((groups, opening) => {
      const key = opening.name.split(/[:|,|\d]/)[0].trim();
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(opening);
      return groups;
    }, {});

    let groupNames = Object.keys(groupedOpenings);

    const filteredAndSortedGroupNames = useMemo(() => {
      let result = groupNames;
      if (search.length >= 2) {
        result = result.filter(groupName => groupName.toLowerCase().includes(search.toLowerCase()));
      } else {
        result = result.sort();
      }
      return result;
    }, [groupNames, search]);

    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={{ resizeMode: 'cover', flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <SearchBar platform='android' value={search} onChangeText={setSearch} placeholder='Search...' />
              <FlatList style={{ flex: 1 }}
                data={filteredAndSortedGroupNames}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ height: 60, borderWidth: 0.2, width: '100%', backgroundColor: 'transparent', justifyContent: 'center' }} onPress={() => navigation.navigate('Variations', { groupName: item })}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <StatusBar style="auto" />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  function OpeningScreen({ route, navigation }) {
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
        <ImageBackground source={bg} style={{ resizeMode: 'cover', flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', backgroundColor: 'white' }}>{groupName}</Text>
              <SearchBar platform='android' value={search} onChangeText={setSearch} placeholder='Search...' />
              <FlatList style={{ flex: 1 }}
                data={filteredAndSortedOpenings}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ height: 60, borderWidth: 0.2, width: '100%', backgroundColor: 'transparent', justifyContent: 'center' }} onPress={() => navigation.navigate('Openings', { opening: item })}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '400' }}>{item.moves}</Text>
                  </TouchableOpacity>
                )}
              />
              <StatusBar style="auto" />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  function ChessScreen({ route, navigation }) {
    const { opening } = route.params;
    return (
      <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
        <ImageBackground source={bg} style={{ flex: 1, resizeMode: "cover" }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', backgroundColor: 'white', borderBottomWidth: 0.5 }}>{opening.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5 }}>
              <Chessboard fen={opening.fen} />
            </View>
            <Text>{opening.moves}</Text>
            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </View>
    );
  }

  useEffect(() => {
    setChessData(require('./eco.json'));
    setIsLoading(false);
  }, []);



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ChessPal" component={HomeScreen} />
          <Stack.Screen name="Variations" component={OpeningScreen} />
          <Stack.Screen name="Openings" component={ChessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
