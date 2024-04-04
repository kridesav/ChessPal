import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Chessboard from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

export default function App() {
  const [chessData, setChessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function HomeScreen({ navigation }) {
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
  
    const groupNames = Object.keys(groupedOpenings);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={groupNames}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Opening', { groupName: item })}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  function OpeningScreen({ route, navigation }) {
    const { groupName } = route.params;
    const openings = chessData.filter(opening => opening.name.startsWith(groupName));
  
    return (
      <View style={styles.container}>
        <Text>{groupName}</Text>
        <FlatList
          data={openings}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Chess', { opening: item })}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  function ChessScreen({ route, navigation }) {
    const { opening } = route.params;
    return (
      <View style={styles.container}>
        <Text>{opening.name}</Text>
        <Chessboard fen={opening.fen}/>
        <StatusBar style="auto" />
      </View>
    );
  }

  useEffect(() => {
    setChessData(require('./eco.json'));
    setIsLoading(false);
  }, []);



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Opening" component={OpeningScreen} />
          <Stack.Screen name="Chess" component={ChessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
