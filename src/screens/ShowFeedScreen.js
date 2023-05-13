import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
//import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import moment from 'moment';


const ShowFeedScreen = ({ route, navigation }) => {

    const feedListContext = useContext(FeedListContext);
    const feedID = route.params.id;
    //console.log(feedID);
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    //console.log(feed);
    const { state, fetchItems } = useContext(FeedContext);
    
    useEffect(() => {
        fetchItems(feed.urlFeed);
    }, []);

    const abrirLink = (link) => {
        console.log('implementar, mandar o usuário para o link da notícia (item.link)');
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    // atualmente só exibe o título, faça com que apareça data de publicação, descrição 
                    // (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    // ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('', {})}>
                        <View style={styles.row}>                            
                                <Text style={styles.title}>{item.title}</Text>
                            
                            <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail" 
                                style={styles.description}>
                                    {item.description}
                            </Text>
                            
                            <Text style={styles.pubDate}>{item.pubDate}</Text>
                            <Text style={styles.pubDate}>{moment(item.pubDate).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.pubDate}>{moment(item.pubDate).format('DD/MM/YYYY, H:mm:ss')}</Text>
                        </View>
                        </TouchableOpacity>

                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
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
        fontSize: 24
    }
});

export default ShowFeedScreen;
