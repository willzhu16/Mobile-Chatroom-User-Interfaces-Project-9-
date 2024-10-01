import React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

//Logs user out.
function BadgerLogoutScreen({ setIsLoggedIn }) {

    //Logout - delete stored username and token and set logged in status as false.
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("Token");
        setIsLoggedIn(false);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginTop: -100 }}>Are you sure you're done?</Text>
            <Text>Come back soon!</Text>
            <Text />
            <Button title="Logout" color="darkred" onPress={handleLogout} />
        </View>
    );
}

//Styles.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BadgerLogoutScreen;
