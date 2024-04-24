import React, { useRef, useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Chess } from 'chess.js';
import styles from '../styles';
import { Surface, Text, Button } from 'react-native-paper';

const ChessScreen = ({ route, navigation }) => {
  const { opening } = route.params;
  const chessboardRef = useRef(null);
  const [chess] = useState(new Chess());
  const moves = opening.moves.replace(/\d+\./g, '').split(' ').filter(move => move);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    navigation.setOptions({ title: opening.name });
  }, [opening]);

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
    <Surface style={{ flex: 1}}>
      <Surface elevation={2} style={{ flex: 1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10 }}>
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
        <Surface elevation={2} style={styles.bottomlist2}>
          <View style={styles.chessButtons}>
            <Button icon="keyboard-backspace" mode="elevated" onPress={handlePreviousMove}>
              Previous
            </Button>
            <Button icon="undo-variant" mode="elevated" onPress={handleResetBoard}>
              Reset Board
            </Button>
            <Button contentStyle={{ flexDirection: 'row-reverse' }} icon="arrow-right" mode="elevated" onPress={handleNextMove}>
              Next
            </Button>
          </View>
          <View style={styles.bottomlist2}>
            <Text style={styles.listMainText}>{opening.moves}</Text>
            <Text style={styles.listSubText}>History: {chess.history().join(' ')}</Text>
            <Text style={styles.listSubText}>Move: {currentMove}</Text>
            <StatusBar style="auto" />
          </View>
        </Surface>
      </Surface>
    </Surface>
  );
}

export default ChessScreen;