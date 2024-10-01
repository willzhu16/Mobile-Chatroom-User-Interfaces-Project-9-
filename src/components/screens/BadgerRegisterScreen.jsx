import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";

//Registers a user.
function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState('');//Username for new account.
    const [password, setPassword] = useState('');//Password for new account.
    const [passwordVer, setPasswordVer] = useState('');//Verify password
    const [registrationError, setRegistrationError] = useState('')//Error message.

    //Checks for correct conditions and then registers the user. 
    const handleRegister = async () => {
        if (!username) {
            setRegistrationError('Please enter a username.');
            return;
        }
        if (!password || !passwordVer) {
            setRegistrationError('Please enter a password');
            return;
        } else if (password !== passwordVer) {
            setRegistrationError('Passwords do not match.');
            return;
        }
        props.handleSignup(username, password);
       
        //Reset fields.
        setUsername('');
        setPassword('');
        setPasswordVer('');
    };

    //Display registration screen.
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text style={{ fontSize: 20 }} ></Text>
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
        <Text style={{ fontSize: 20 }} >Confirm Password</Text>
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
            onChangeText={text => setPasswordVer(text)}
        />
        <Text style={{fontSize: 20, color: 'red'}}>{registrationError}</Text>
        <Button color="crimson" title="Signup" onPress={() => handleRegister()} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

//Styles.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerRegisterScreen;