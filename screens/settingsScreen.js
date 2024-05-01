import React, { useContext } from "react";
import { View, ImageBackground, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { Text, Switch, Icon, Surface, Button } from "react-native-paper";
import styles from "../styles";
import { themeContext } from "../components/themeContext";
import { depthContext } from "../components/depthContext";

const SettingsScreen = ({ navigation }) => {
    const { theme, setTheme, themeMode, setThemeMode } = useContext(themeContext);
    const { depth, setDepth } = useContext(depthContext);
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
                    <View style={styles.switchContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon source="memory" size={24} />
                            <Text style={styles.nameSubText}>Engine Depth</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                icon="minus"
                                style={{ marginRight: -10 }}
                                onPress={() => depth > 1 ? setDepth(depth - 1) : null}
                            />
                            <Text style={[styles.nameSubText, { marginRight: 10 }]}>{depth}</Text>
                            <Button
                                icon="plus"
                                style={{ marginRight: -15 }}
                                onPress={() => depth < 15 ? setDepth(depth + 1) : null}
                            />
                        </View>
                    </View>
                </Surface>
            </View>
        </Surface>
    );
}
export default SettingsScreen;