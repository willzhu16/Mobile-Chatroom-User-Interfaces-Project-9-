import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) //User is logged in.
  const [isGuest, setGuest] = useState(false) //User is logged in as guest.
  const [isRegistering, setIsRegistering] = useState(false); //User is registering.
  const [chatrooms, setChatrooms] = useState([]); //Chatrooms.

  //Fetches all chatrooms.
  useEffect(() => {
    fetch('...', {
      headers: {
        "X-CS571-ID": "..."
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  //Logins user - stores token.
  function handleLogin(username, password) {
    fetch('...', {
      method: "POST",
      headers: {
        "X-CS571-ID": "...",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(async res => {
      console.log(res.status);

      //Success
      if (res.status === 200) {
        alert("Login Successful"); //Notify user
        const data = await res.json();
        const tokenString = data.token.toString();
        const usernameString = username.toString();

        //Store credentials
        SecureStore.setItemAsync("Token", tokenString); 
        SecureStore.setItemAsync("username", usernameString);
       
        //Update statuses.
        setIsLoggedIn(true);
        setGuest(false);

      } else if (res.status === 400) {
        //Error
        alert("Missing password or username");
        setIsLoggedIn(false);
        return;
      }
      else if (res.status === 401) {
        //Error
        alert("Incorrect password or username");
        setIsLoggedIn(false);
        return;
      }
    })
  }

  //Registers user - stores token.
  function handleSignup(username, password) {
    fetch('...', {
      method: "POST",
      headers: {
        "X-CS571-ID": "...",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(async res => {
      console.log(res.status);

      //Success
      if (res.status === 200) {
        alert("Registration Successful"); //Notify user

        //Update status
        const data = await res.json();
        const tokenString = data.token.toString();
        const usernameString = username.toString();

        //Stores credentials.
        SecureStore.setItemAsync("Token", tokenString);
        SecureStore.setItemAsync("username", usernameString);

        //Update statuses.
        setIsLoggedIn(true);
        setGuest(false);

      } else if (res.status === 409) {
        //Error
        alert("That username has already been taken!");
        return;
      }
    })
  }

  //Guest login
  function handleGuest() {
    setGuest(true);
  }

  //Guest wishes to sign up for account.
  function handleGuestSignUp() {
    setGuest(false);
    setIsRegistering(true);
  }

  //Displays appropraite screen according to login statuses.
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout">
            {() => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Signup">
            {() => <BadgerConversionScreen handleGuestSignUp={handleGuestSignUp} />}
          </ChatDrawer.Screen>

        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  }
  else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} handleGuest={handleGuest} />
  }
}