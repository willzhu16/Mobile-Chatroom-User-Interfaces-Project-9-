import { Alert, Button, StyleSheet, Text, View } from "react-native";

//Sends guests to signup screen.
function BadgerConversionScreen(props) {

    //Sends users to signup screen when button is pressed.
    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text/>
        <Button title="Signup!" color="darkred" onPress={props.handleGuestSignUp}/>

    </View>
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

export default BadgerConversionScreen;