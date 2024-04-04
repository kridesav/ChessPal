import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Chessboard } from 'react-chessboard';

export default function ChessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Chess Screen</Text>
      <Chessboard />
      <StatusBar style="auto" />
    </View>
  );
}
