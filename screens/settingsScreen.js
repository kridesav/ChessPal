import React from "react";
import { View, ImageBackground, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { Text, Switch, Icon, Surface } from "react-native-paper";
import styles from "../styles";
import { themeContext } from "../components/themeContext";

const SettingsScreen = ({ navigation }) => {
    const { theme, setTheme, themeMode, setThemeMode } = React.useContext(themeContext);

    const onToggleNightMode = () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark');

    return (
        <Surface style={styles.container}>
            <View style={styles.content}>
                <Surface elevation={5} style={styles.bottomlist}>
                    <View style={styles.switchContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon source="theme-light-dark" size={24} />
                            <Text style={styles.nameSubText}>Night Mode</Text>
                        </View>
                        <Switch
                            style={styles.input}
                            value={themeMode === 'dark'}
                            onValueChange={onToggleNightMode}
                        />
                    </View>
                </Surface>
            </View>
        </Surface>
    );
}
export default SettingsScreen;