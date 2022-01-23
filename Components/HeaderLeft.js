import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {auth} from "../firebase";
import {Avatar} from "react-native-elements";

const HeaderLeft = ({signOut}) => {
  return (
    <TouchableOpacity activeOpacity={0.5}
    onPress={signOut}
     >
      <View
        style={{
          marginLeft: 15,
        }}
      >
        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
      </View>
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
