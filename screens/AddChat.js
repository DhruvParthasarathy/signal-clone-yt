import { KeyboardAvoidingView, StyleSheet, StatusBar} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"

import {db} from '../firebase';
import { collection, addDoc } from 'firebase/firestore';



const AddChat = ({navigation}) => {

    const [input, setInput] = useState("");

    const createChat = () => {
        addDoc(collection(db, "chats"), {
            chatName: input 
        })
        .then(() => {
            navigation.goBack();
        }).catch((error)=> {
            console.log(error);
        })

    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })

    }, [navigation])
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
      <Input onChangeText={text => setInput(text)} value={input} placeholder="Enter a chat name"
      leftIcon={
          <Icon name="wechat" type='AntDesign' size={24} color='black' />
      }
      />
      <Button onPress={createChat} title="Create new Chat" />
    </KeyboardAvoidingView>
  );
};

export default AddChat;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding: 30,
        alignItems:'center',
    }
});
