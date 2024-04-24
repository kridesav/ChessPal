import React, { useEffect } from "react";
import { View,ImageBackground,StatusBar, BackHandler } from "react-native";
import styles from "../styles";
import bg from "../assets/bg.jpeg";
import { Surface, Button } from "react-native-paper";

const MenuScreen = ({ navigation }) => {
    const opening = {
        name: 'New game',
        moves: ''
    };
    const handleExit = () => {
        BackHandler.exitApp();
    };

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, []);

    return (
        <View style={styles.container}>
        <ImageBackground source={bg} style={styles.bg}>
                <Surface elevation={4} style={styles.menuDiv}>
                    <Button icon="chess-queen" style={styles.button} mode="elevated" onPress={() => navigation.navigate('Openings', {opening})}>
                    New game
                    </Button>
                    <Button icon="book-open-outline" style={styles.button} mode="elevated" onPress={() => navigation.navigate('ChessPal')}>
                    Learn openings
                    </Button>
                    <Button icon="information-outline" style={styles.button} mode="elevated" onPress={() => navigation.navigate('Info')}>
                    Info
                    </Button>
                    <Button icon="cog-outline" style={styles.button} mode="elevated" onPress={() => navigation.navigate('Settings')}>
                    Settings
                    </Button>
                    <Button icon="exit-to-app" style={styles.button} mode="elevated" onPress={handleExit}>
                    Exit
                    </Button>
                </Surface>
            <StatusBar style="auto" />
        </ImageBackground>
        </View>
    );
    }
export default MenuScreen;