import React from "react";
import { View, Text, ImageBackground, FlatList, StatusBar, TouchableOpacity } from "react-native";
import styles from "../styles";
import bg from "../assets/bg.jpeg";

const InfoScreen = ({ navigation }) => {


    return (
        <View style={styles.container}>
        <ImageBackground source={bg} style={styles.bg}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <View style={styles.menuDiv}>
                    <Text style={styles.listMainText}>ChessPal</Text>
                    <Text style={styles.listMainText}>Chess opening trainer</Text>
                    <Text style={styles.listSubText}>This app is a solo project that was made to help people
                    learn the theory moves behind some of the most recognized chess openings.
                    </Text>
                    
                    <Text style={styles.listSubText}>Version 1.0</Text>
                    <Text style={styles.listSubText}>Developed by: Kristjan Savolainen</Text>
                    <Text style={styles.listSubText}>2024</Text>
                </View>
            <StatusBar style="auto" />
            </View>
        </ImageBackground>
        </View>
    );
}

export default InfoScreen;