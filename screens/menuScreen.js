import React from "react";
import { View, Text, ImageBackground, FlatList, StatusBar, TouchableOpacity, BackHandler } from "react-native";
import styles from "../styles";
import bg from "../assets/bg.jpeg";

const MenuScreen = ({ navigation }) => {
    const opening = {
        name: 'New game',
        moves: ''
    };
    const handleExit = () => {
        BackHandler.exitApp();
    };

    return (
        <View style={styles.container}>
        <ImageBackground source={bg} style={styles.bg}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <View style={styles.menuDiv}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Openings', {opening})}>
                            <Text style={styles.listMainText}>New game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChessPal')}>
                            <Text style={styles.listMainText}>Learn openings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Info')}>
                            <Text style={styles.listMainText}>Info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
                            <Text style={styles.listMainText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={handleExit}>
                            <Text style={styles.listMainText}>Exit</Text>
                        </TouchableOpacity>
                </View>
            <StatusBar style="auto" />
            </View>
        </ImageBackground>
        </View>
    );
    }
export default MenuScreen;