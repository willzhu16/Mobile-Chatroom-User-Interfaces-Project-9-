import { FlatList, StyleSheet, Text, View, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import BadgerCard from "../helper/BadgerCard";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

//Displays a chatroom.
function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]) //All messages from chatroom
    const [isLoading, setIsLoading] = useState(false)//Used to create a post.
    const [modalVisible, setModalVisible] = useState(false); //Used to create a post
    const [title, setTitle] = useState(''); //Title of post to be created.
    const [body, setBody] = useState(''); //Body of post to be created.

    //Get all messages.
    useEffect(() => {
        fetch(`...${props.name}`, {
            headers: {
                "X-CS571-ID": "..."
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    }, []);

    //Refresh the page to see new messages.
    function refresh() {
        setIsLoading(true);
        fetch(`...${props.name}`, {
            headers: {
                "X-CS571-ID": "..."
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            setIsLoading(false)
        })
    }

    //Attempts to create a post. 
    const handleCreatePost = async () => {
        const token = await SecureStore.getItemAsync("Token"); //Authorization token.
        fetch(`...${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "...",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        }).then(res => {
            if (res.status === 200) {
                //Successfully posted - must refresh.
                alert("Successfully Posted!")
                refresh();
            } else if (res.status === 400){
                //Error - should never happen.
                alert("Missing title or body");
            }
            else if (res.status === 401){
                //Error - user not logged in.
                alert("Must be logged in to do that");
            }
            else if (res.status === 404){
                //Should never happen
                alert("Chatroom does not exist");
            }
            else if (res.status === 413){
                //Error: Message too long.
                alert("'title' must be 128 characters or fewer and 'content' must be 1024 characters or fewer");
            }
        })
    };

    //Attempts to delete specified post. 
    const handleDeletePost = async (id) => {
        const token = await SecureStore.getItemAsync("Token");//Authorization token.
        fetch(`...${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "...",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => {
            if (res.status === 200) {
                //Success - must refresh to show changes.
                alert("Successfully deleted!")
                refresh();
            } 
            else if (res.status === 401){
                //Error - not logged in.
                alert("Must be logged in to do that");
            }
            else if (res.status === 404){
                //Should never happen.
                alert("Message does not exist");
            }
        })
    }

    //Display the messages in a flatlist, allowing for pulling up for refresh along with create a new post button which brings up a modal.
    return <View style={{ flex: 1 }}>
        <FlatList
            data={messages}
            onRefresh={refresh}
            refreshing={isLoading}
            keyExtractor={p => p.id}
            renderItem={renderObj => {
                message = renderObj.item;
                return <BadgerChatMessage
                    title={message.title}
                    poster={message.poster}
                    created={message.created}
                    content={message.content} 
                    id={message.id}
                    deletePost={handleDeletePost}/>

            }}
        />
        <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
        <Modal
            animationType="slide"
            visible={modalVisible}
            presentationStyle={"pagesheet"}
            onRequestClose={() => {
                Alert.alert('Modal has been closed');
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modelView}>
                    <Text style={styles.modalText}>Create A Post</Text>
                    <Text style={{ fontSize: 20 }}>Title</Text>
                    <TextInput style={{
                        fontSize: 20, borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                        width: 300,
                    }}
                        autoCapitalize="none"
                        onChangeText={text => setTitle(text)}
                    />
                    <Text style={{ fontSize: 20 }}>Body</Text>
                    <TextInput style={{
                        fontSize: 20, borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                        width: 300,
                    }}
                        autoCapitalize="none"
                        onChangeText={text => setBody(text)}
                    />
                    <Button color="" title="Cancel" onPress={() => {
                        setTitle("");
                        setBody("");
                        setModalVisible(false);
                    }} />
                    <Button color="#007AFF" title="Create Post" disabled={!body || !title} onPress={() => {
                        handleCreatePost();
                        setModalVisible(false);
                    }} />
                </View>
            </View>
        </Modal>
    </View>
}

//Styles.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 30
    },
    createPostButton: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default BadgerChatroomScreen;