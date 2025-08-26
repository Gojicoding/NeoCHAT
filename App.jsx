import React from 'react;
import './App.css'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useAuthState} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
        apiKey: "AIzaSyCUeHXo56GsPPD0c-fVzcz1viehYfFBho8",
    authDomain: "neoend-206b3.firebaseapp.com",
    projectId: "neoend-206b3",
    storageBucket: "neoend-206b3.firebasestorage.app",
    messagingSenderId: "925556064601",
    appId: "1:925556064601:web:d474854fbe845b37a4cc48",
    measurementId: "G-2X8LDQVJFG" 
})



const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

return (
       <div className="App">
        <header>
       </header>
       <section>
        {user ? <ChatRoom /> : SignIn />}
       </section>
  </div>
 );
}

function SignIn() {
       const signInWithGoogle = () => {
              const provider = new firebase.auth.GoogleAuthProvider();
              auth.signInWithPopup(provider);
              }

return(
       <button onClick={signInWithGoogle}>Sign in with Google</button>
       )

}

function SignOut(){
        return auth.currentUser && (
                <button onClick={() => auth.signOut()} >Sign Out</button>
                )
}


function ChatRoom() {

       const messagesRef = firestore.collection('messages');
       const query = messagesRef.orderBy('createdAt').limit(25);

       const [messages] = useCollectionData(query, {idField: 'id'});
       
       return (
              <>
              <div>
                     {messages && messages.map(msg => <ChatMessages key={msg.id} message={msg}/> )}
              </div>
              </>
       )
}

function ChatMessage(props) {
     const { text, uid } = props.message;  

     return <p>{text}  </p>
}


export default App,
