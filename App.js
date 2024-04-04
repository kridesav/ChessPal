import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [chessData, setChessData] = useState(null);

  function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  function ChessScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Chess Screen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  useEffect(() => {
    fetch('./eco.json')
      .then((response) => response.json())
      .then((data) => setChessData(data))
      .catch((error) => console.error(error));
  }, []);



  return (
    <NavigationContainer>
      {
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chess" component={ChessScreen} />
        </Stack.Navigator>
      }
    </NavigationContainer>
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
