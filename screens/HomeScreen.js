import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot} from "firebase/firestore";

import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"

import CustomListItem from "../Components/CustomListItem";
import HeaderLeft from "../Components/HeaderLeft";





const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        signOut(auth)
        .then(() => {
            navigation.replace("Login");
            alert("Succesfully Logged out!");
        })
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(collection(db, "chats"),
        (snapshot) => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
            
        })

    }, []); // run on first mount

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <HeaderLeft signOut={signOutUser}/>,
      headerRight: () => (
          <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              width:80,
              marginRight: 20,

          }}>
            <TouchableOpacity activeOpacity={0.5}>
               <AntDesign name="camerao" size={24} color='black'/> 
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}>
               <SimpleLineIcons name="pencil" size={24}
               color='black' />
            </TouchableOpacity>
              
          </View>
      )
    });
  }, [navigation]); // trigger only on component mount

  return (
    // Safe area view protects the screen from the bevels and notch on the top of the
    // device
    <SafeAreaView>
      {/* Import scroll view from react-native, not from
        react-native-gesture-handler */}
      <ScrollView style={styles.container}>
          {chats.map(({id,data : {chatName}}) => (
            <CustomListItem key={id} id={id} chatName={chatName} />
          ) )}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
});
