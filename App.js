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
import { PaperProvider } from 'react-native-paper';
import { themeContext } from './components/themeContext';
import { darkTheme, lightTheme } from './components/theme';


const Stack = createNativeStackNavigator();

export default function App() {
  const [chessData, setChessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [theme, setTheme] = useState(themeMode === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setChessData(require('./eco.json'));
    setIsLoading(false);
    setTheme(themeMode === 'dark' ? darkTheme : lightTheme);
  }, [themeMode]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <themeContext.Provider value={{ theme, setTheme, themeMode, setThemeMode }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.onBackground,
                headerTitleStyle: {
                  fontWeight: 'normal',
                },
              }}
            >
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
        </PaperProvider>
      </themeContext.Provider>
    </GestureHandlerRootView>
  );
}
