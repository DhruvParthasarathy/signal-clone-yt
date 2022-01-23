import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {telegramLogo} from "../urls";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * The below use effect runs on mount of the login page
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
      /**
       * if the user is already authenticated, 
       * we push them to the home page
       *  */ 
      navigation.replace('Home');
      }
    })
  
    // clean up function
    return unsubscribe;
  }, []); // run only on component mounting, run once
  
  const signIn = () => {

    signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      console.log(error);
    })
    
  }

  return (
    <KeyboardAvoidingView 
    behavior="padding"
    style={styles.container} >
      <StatusBar style="light" />
      <Image
        source={{
          uri: telegramLogo,
        }}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.inputContainer}>
        <Input
          type="email"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        ></Input>
        <Input
          secureTextEntry
          type="password"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        ></Input>
      </View>

      <Button containerStyle={styles.button} 
      onPress={signIn}
      title="Login"/>
      <Button type="outline" containerStyle={styles.button} 
      onPress={() => navigation.navigate('Register')}
      title="Register"/>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
  inputContainer: {
      width: 300
  },
  button:{
      width: 200,
      marginTop: 10
  }
});
