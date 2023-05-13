import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Feather,EvilIcons } from '@expo/vector-icons';

const FeedForm = ({ onSubmit, initialValues }) => {

    const [title, setTitle] = useState(initialValues.title);
    const [urlFeed, setUrlFeed] = useState(initialValues.urlFeed);

    return (

        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)}
                autoFocus
            />
            <Text style={styles.label}>Enter urlFeed:</Text>
            <TextInput
                style={styles.input}
                value={urlFeed}
                onChangeText={text => setUrlFeed(text)}
            />
            <Button title="Save Feed" onPress={() => onSubmit(title, urlFeed)} />

            {/* <TouchableOpacity style={styles.button} onPress={() => onSubmit(title, urlFeed)}> 
                <Feather style={styles.icon} name="save" size={30} />
                <Text style={styles.buttonText}>Salvar</Text> 
            </TouchableOpacity>  */}
        </View>
    );
};

FeedForm.defaultProps = {
    initialValues: {
        title: '',
        urlFeed: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default FeedForm;