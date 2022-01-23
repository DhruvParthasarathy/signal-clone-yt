import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {defaultProfilePic} from '../urls';

const CustomListItem = ({id, chatName,  enterChat}) => {
  return (
    <ListItem key={id}>
      <Avatar
      rounded
      source={{
          uri:defaultProfilePic
      }}
      />
      <ListItem.Content>
          <ListItem.Title style={{fontWeight: "bold"}}>
              {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            This is a test subtitle, 
            This is a test subtitle, 
            This is a test subtitle, 
            This is a test subtitle
          </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
