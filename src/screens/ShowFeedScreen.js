import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
//import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { Feather, EvilIcons } from '@expo/vector-icons';
import moment from 'moment';

const ShowFeedScreen = ({ route, navigation }) => {

    moment.locale('pt-br');
    const feedListContext = useContext(FeedListContext);
    const feedID = route.params.id;
    //console.log(feedID);
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    //console.log(feed);
    const { state, fetchItems, restoreState, deleteItem } = useContext(FeedContext);
    
    useEffect(() => {
        //restoreState();
        fetchItems(feed.urlFeed);
    }, []);

    const abrirLink = (link) => {
        //console.log('implementar, mandar o usuário para o link da notícia (item.link)');
        Linking.openURL(link);
    }

    return (
        <>
            <Text>{feedID}</Text>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    // atualmente só exibe o título, faça com que apareça data de publicação, descrição 
                    // (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    // ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <View style={styles.container}>                            
                            <View style={styles.row}>                            
                                {/* <Text style={styles.title}>{item.link}</Text> */}
                                <TouchableOpacity onPress={() => { abrirLink(item.link) }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </TouchableOpacity>
                                    
                                <Text 
                                    numberOfLines={1} 
                                    ellipsizeMode="tail" 
                                    //style={styles.description}
                                >
                                        {item.description}
                                </Text>
                                
                                <Text style={styles.pubDate}>{moment(item.pubDate).format('DD/MM/YYYY, HH:mm:ss')}</Text>
                                {/* <Text style={styles.pubDate}>{item.pubDate}</Text> */}
                                {/* <Text style={styles.pubDate}>{moment(item.pubDate).format('DD/MM/YYYY')}</Text> */}
                                {/* <Text style={styles.pubDate}>{moment(item.pubDate).format('LLLL')}</Text> */}
                            </View>
                            <TouchableOpacity onPress={() => { deleteItem(item.title) }}>
                                <EvilIcons style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View> 
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        maxWidth: '95%',
        borderColor: 'blue',
        marginStart: 10,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '75%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginRight: 25,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    description: {
        fontSize: 12,
        paddingBottom: 10,
    },
    pubDate: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 30,
    }
});

export default ShowFeedScreen;
