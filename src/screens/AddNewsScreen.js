import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/FeedContext';
import NewsForm from '../components/NewsForm';

const AddNewsScreen = ({ navigation, route }) => {

    const { addItem } = useContext(Context);

    <Text>{route.params.id}</Text>
    return (
        <NewsForm 
            onSubmit={(title,urlFeed) => {
                addItem(title, urlFeed, ()=>navigation.pop());
            }}
        />
    );

    
};

const styles = StyleSheet.create({});

export default AddNewsScreen;
