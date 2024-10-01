import { Text, Button } from "react-native";
import BadgerCard from "./BadgerCard"
import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

//Used to display badger chat messages.
function BadgerChatMessage(props) {
    const dt = new Date(props.created); //Date the message was created.
    const [user, setUser] = useState(""); //Username of logged in user - used to verify account when deleting post.

    //Get username from secure storage.
    useEffect(() => {
        getUsername();
    }, []);

    const getUsername = async () => {
        const holder = await SecureStore.getItemAsync("username"); //Get username.
        setUser(holder);
    }

    //Display messages with delete post button available if poster matches loggin in user. 
    return (
        <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
            <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
            <Text style={{ fontSize: 12 }}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
            <Text></Text>
            <Text>{props.content}</Text>
            {user === props.poster && (
                <Button
                    title="Delete Post"
                    color="red"
                    onPress={() => props.deletePost(props.id)}
                />
            )}
        </BadgerCard>
    );
}

export default BadgerChatMessage;
