import { StyleSheet, Text, View } from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, Input} from "react-native-elements";
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { defaultProfilePic } from '../urls';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    /**
     * The useLayoutEffect triggers the commands just before the screen paints, as compared to just before the render as in useEffect
     * 
     * Used in screen navigations
     * 
     * Here we pass the navigation object as the dependency
     */

    useLayoutEffect(() => {

        // we can customize properties of the view here
      navigation.setOptions({
          headerBackTitle: "Back to Login",
      });
      
    }, [navigation]);
    

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const authUser = userCredential.user;

            /**
             * once we have created the user in the DB,
             * we update the user's name and photo from the current component's state
             */
        
            updateProfile(authUser, {
                name: name,
                photoURL: imageUrl || defaultProfilePic
                
            })
            .then(() => {
            })
            .catch(error => 
                console.log(error.message)
                );

        })
        .catch(error => {
            console.log(error.message);
        })
    }

  return (
    <View
    
    behavior="padding"
    style={styles.container}>
        <StatusBar style='light'/>
        <Text style={{marginBottom: 50, fontSize:22}}>
            Create a Signal account
        </Text>

        <View style={styles.inputContainer} >
            <Input 
            placeholder="Full Name"
            type="text"
            value={name}
            onChangeText={(text) => setName(text)} 
            />
            <Input 
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)} 
            />
            <Input 
            placeholder="Password"
            type="password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)} 
            />
            <Input 
            placeholder="Profile Picture URL (Optional)"
            type="text"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register} />
        </View>

        <Button
        style={styles.button}
        onPress={register}
        raised
        title="Register" />

    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer: {
        width: 300
    },
    button:{
        marginTop: 10,
        width:200
    }
});
