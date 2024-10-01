import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

//Login screen.
function BadgerLoginScreen(props) {
    const [username, setUsername] = useState('');//Username
    const [password, setPassword] = useState('');//Password

    //Displays login screen and takes username and password inputs.
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text style={{ fontSize: 20 }}>Username</Text>
        <TextInput style={{
            fontSize: 20, borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: 300,
        }}

            autoCapitalize="none"
            onChangeText={text => setUsername(text)}
        />
        <Text style={{ fontSize: 20 }}>Password</Text>
        <TextInput style={{
            fontSize: 20, borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: 300,
        }}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => setPassword(text)}
        />
        <Button color="crimson" title="Login" onPress={() => {
    
            if (!password || !username){
                alert("Please fill out all fields")
            } else {
            props.handleLogin(username, password)
            setUsername('');
            setPassword('');
            }
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue as Guest" onPress={props.handleGuest} />
    </View>;
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerLoginScreen;