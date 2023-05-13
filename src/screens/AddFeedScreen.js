import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/FeedListContext';
import moment from 'moment';
import FeedForm from '../components/FeedForm';

const AddFeedScreen = ({ navigation }) => {

    const { addFeed } = useContext(Context);

    return (
        <FeedForm 
            onSubmit={(title,urlFeed) => {
                addFeed(title, urlFeed, ()=>navigation.navigate('Index'))
            }}
        />
    );

    
};

const styles = StyleSheet.create({});

export default AddFeedScreen;
