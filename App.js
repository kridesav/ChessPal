import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/homeScreen';
import OpeningScreen from './screens//openingScreen';
import ChessScreen from './screens/chessScreen';
import MenuScreen from './screens/menuScreen';
import InfoScreen from './screens/infoScreen';
import SettingsScreen from './screens/settingsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [chessData, setChessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setChessData(require('./eco.json'));
    setIsLoading(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="ChessPal">
            {props => <HomeScreen {...props} chessData={chessData} isLoading={isLoading} />}
          </Stack.Screen>
          <Stack.Screen name="Variations">
            {props => <OpeningScreen {...props} chessData={chessData} />}
          </Stack.Screen>
          <Stack.Screen name="Openings" component={ChessScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
