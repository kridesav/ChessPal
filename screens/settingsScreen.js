import React from "react";
import { View, Text, ImageBackground, FlatList, StatusBar, TouchableOpacity } from "react-native";
import styles from "../styles";
import bg from "../assets/bg.jpeg";

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <ImageBackground source={bg} style={styles.bg}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <View style={styles.menuDiv}>
                    <Text style={styles.listMainText}>Settings</Text>
                    <Text style={styles.listSubText}>Coming soon...</Text>
                </View>
            <StatusBar style="auto" />
            </View>
        </ImageBackground>
        </View>
    );
}

export default SettingsScreen;