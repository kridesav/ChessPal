import React, { useRef, useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Chess } from 'chess.js';
import styles from '../styles';
import { Surface, Text, Button, ProgressBar, Chip, List } from 'react-native-paper';
import { fetchEval } from '../components/fetchEval';
import { useContext } from 'react';
import { depthContext } from '../components/depthContext';
import { ScrollView } from 'react-native-gesture-handler';


const ChessScreen = ({ route, navigation }) => {
  const { opening } = route.params;
  const chessboardRef = useRef(null);
  const [chess] = useState(new Chess());
  const moves = opening.moves.replace(/\d+\./g, '').split(' ').filter(move => move);
  const [currentMove, setCurrentMove] = useState(0);
  const [evalData, setEvalData] = useState(null);
  const { depth } = useContext(depthContext);
  const [showBestMove, setShowBestMove] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: opening.name });
  }, [opening]);

  useEffect(() => {
    moves.forEach(move => chess.move(move) && setCurrentMove(moves.length));
    chessboardRef.current.resetBoard(chess.fen());
  }, [opening]);

  useEffect(() => {
    fetchEvalData();
  }, [chess.fen()]);

  const handleNextMove = () => {
    if (currentMove < moves.length) {
      chess.move(moves[currentMove]);
      setCurrentMove(currentMove + 1);
      chessboardRef.current.resetBoard(chess.fen());
    }
  };

  const fetchEvalData = async () => {
    const data = await fetchEval(chess.fen(), depth);
    setEvalData(data);
  };

  const highlightBestMove = () => {
    if (chessboardRef.current) chessboardRef.current.resetAllHighlightedSquares();

    if (evalData && showBestMove) {
      const bestMove = evalData.bestmove.split(' ')[1];
      const fromSquare = bestMove.substring(0, 2);
      const toSquare = bestMove.substring(2, 4);
      if (chessboardRef.current) {
        chessboardRef.current.highlight({ square: fromSquare, color: 'lightgreen' });
        chessboardRef.current.highlight({ square: toSquare, color: 'green' });
      }
    }
  };

  useEffect(() => {
    highlightBestMove();
  }, [evalData, showBestMove]);

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

    <Surface style={{ flex: 1 }}>
      <Surface elevation={2} style={{ flex: 1 }}>
        <ProgressBar style={{ height: 15, borderColor: 'black', borderWidth: 0.2 }} progress={(evalData?.evaluation ?? 0) / 20 + 0.5} color={'white'} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 10 }}>
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
        <ScrollView>
          <Surface elevation={2} style={styles.bottomlist2}>
            <View style={styles.chessButtons}>
              <Button icon="arrow-left" mode="elevated" compact onPress={handlePreviousMove}>
                Previous
              </Button>
              <Button icon="undo-variant" mode="elevated" compact onPress={handleResetBoard}>
                Reset
              </Button>
              <Button icon="chess-queen" mode="elevated" compact onPress={() => setShowBestMove(!showBestMove)}>
                {showBestMove ? 'Hide best' : 'Show best'}
              </Button>
              <Button contentStyle={{ flexDirection: 'row-reverse' }} icon="arrow-right" mode="elevated" compact onPress={handleNextMove}>
                Next
              </Button>
            </View>

            <View style={styles.bottomlist2}>
              <Text style={styles.listMainText}>{opening.moves}</Text>
              <Text style={styles.listMainText}>Moves: {currentMove}</Text>
              <View style={{marginTop: 10}}>
              <List.Accordion style={{height: 55}} left={props => <List.Icon {...props} icon="format-list-bulleted" />} title="Show history">
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {chess.history().map((move, index) => (
                  <Button key={index} compact style={styles.chip2}>{move}</Button>
                ))}
                </View>
              </List.Accordion>
              </View>
            </View>
            <StatusBar style="auto" />
          </Surface>
          <Surface elevation={2} style={styles.bottomlist3}>
            <Text style={styles.listMainText}>Evaluation</Text>
            <Text style={styles.listSubText}>Depth: {depth}</Text>
            <Chip mode='outlined' icon='lightbulb-on-outline' style={styles.chip}>{evalData?.bestmove}</Chip>
            <Chip mode='outlined' icon='format-list-numbered' style={styles.chip}>Continuation: {evalData?.continuation}</Chip>
          </Surface>
        </ScrollView>
      </Surface>
    </Surface>
  );
}

export default ChessScreen;