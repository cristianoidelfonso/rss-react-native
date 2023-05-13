import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Context } from '../context/FeedListContext'
import moment from 'moment';

const IndexScreen = ({ navigation }) => {

    const { state, deleteFeed, restoreState, deleteAll } = useContext(Context);
    // moment.locale('pt-br');
    //let now = moment().utc().format('ddd, DD MMM YYYY HH:mm:ss ZZ');

    const clearAsyncStorage = () => {
        Alert.alert(
            'Atenção',
            `Todas as informações salvas em AsynStorage serão apagadas.\n\nDeseja continuar?`,
            [
              { text: 'Sim', onPress: () => {deleteAll()} },
              { text: 'Não', style: 'cancel', onPress: () => {} },
            ],
        );
    } 

    const apagarItem = (title) => {
        Alert.alert(
            'Atenção', 
            'Esta operação apagará o feed. Deseja continuar?',
            [
                { text: 'Sim', onPress: () => {deleteFeed(title)} },
                { text: 'Não', style: 'cancel', onPress: () => {} }
            ]
        );
    }

    useEffect(() => {
        restoreState();
    }, []);

    return (
        <>
            {/* <Text>{now}</Text> */}
            <Button title='Clear Storage' onPress={() => clearAsyncStorage()} />
            
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.urlFeed}
                renderItem={({ item }) => {
                    //console.log(item);
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <TouchableOpacity onPress={() => { apagarItem(item.title) }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    ok: {
        color: 'green',
    },
    cancel: {
        color: 'red',
    }
});

export default IndexScreen;
