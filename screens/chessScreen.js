import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Chess } from 'chess.js';
import { Button } from '@rneui/themed';
import styles from '../styles';
import bg from '../assets/bg.jpeg';

const ChessScreen = ({ route, navigation }) => {
  const { opening } = route.params;
  const chessboardRef = useRef(null);
  const [chess] = useState(new Chess());
  const moves = opening.moves.replace(/\d+\./g, '').split(' ').filter(move => move);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    moves.forEach(move => chess.move(move) && setCurrentMove(moves.length));
    chessboardRef.current.resetBoard(chess.fen());
  }, [opening]);

  const handleNextMove = () => {
    if (currentMove < moves.length) {
      chess.move(moves[currentMove]);
      setCurrentMove(currentMove + 1);
      chessboardRef.current.resetBoard(chess.fen());
    }
  };

  const handlePreviousMove = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      chess.undo();
      chessboardRef.current.resetBoard(chess.fen());
    }
  };

  const handleResetBoard = () => {
    chess.reset();
    setCurrentMove(0);
    chessboardRef.current.resetBoard(chess.fen());
  };

  const handleMove = (move) => {
    const lastMove = move.from + move.to;
    if (chess.move(lastMove)) {
      setCurrentMove(currentMove + 1);
    }
  }

  return (
    <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', backgroundColor: 'white', borderBottomWidth: 0.5 }}>{opening.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5 }}>
            <Chessboard
              ref={chessboardRef}
              onMove={(state) => {
                if (state.move) {
                  handleMove(state.move)
                }
              }
              }
            />
          </View>
          <View style={styles.chessButtons}>
            <Button title='Previous' onPress={handlePreviousMove} />
            <Button title='Reset Board' onPress={handleResetBoard} />
            <Button title='Next' onPress={handleNextMove} />
          </View>
          <Text style={styles.listMainText}>{opening.moves}</Text>
          <Text style={styles.listSubText}>History: {chess.history().join(' ')}</Text>
          <Text style={styles.listSubText}>Move: {currentMove}</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

export default ChessScreen;