import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveFeeds = async (feeds) => {
    try {
        await AsyncStorage.setItem('feeds', JSON.stringify(feeds));
    } catch (error) {
        console.log(error);
    }
}

const clearStorage = async () => {
    try {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('feeds');
        alert('limpou feeds');
    } catch (error) {
        console.log(error);
        alert('falha ao limpar feeds');
    }
}

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            //console.log('add_feed - FeedListContext');
            newState = [
                ...state,
                {
                    title: action.payload.title,
                    urlFeed: action.payload.urlFeed,
                }
            ]
            saveFeeds(newState);
            return newState;
        
        case 'delete_feed':
            //console.log('delete_feed - FeedListContext');
            newState = state.filter((feed) => feed.title !== action.payload.title);
            saveFeeds(newState);
            return newState;
            
        case 'restore_state':
            //console.log('restore_state - FeedListContext');
            newState =  action.payload;
            return newState;

        case 'delete_all':
            //console.log('delete_all - FeedListContext');
            console.log('apagando todos os feeds');
            clearStorage();
            return newState;
        
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (title, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { title, urlFeed } });
        if(callback) {
            callback();
        }
    };
};

const deleteFeed = dispatch => {
    return (title) => {
        dispatch({ type: 'delete_feed', payload: { title } });
    };
};

const restoreState = dispatch => async () => {
    try {
        const savedFeeds = await AsyncStorage.getItem('feeds');
        if(!savedFeeds) {
            console.log('nada foi salvo ainda ...');
        }else {
            dispatch({type: 'restore_state', payload: JSON.parse(savedFeeds)});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({type: 'delete_all', payload: {}});
    }
}

const rssFeeds = [
    {
        title: 'G1 - Todas as notícias',
        urlFeed: 'https://g1.globo.com/rss/g1/',
        description: '',
        urlSite: '',
        urlImage: ''
    },
    {
        title: 'G1 - Brasil',
        urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
        description: '',
        urlSite: '',
        urlImage: ''
    },
    {
        title: 'G1 - Tecnologia e Games',
        urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
        description: '',
        urlSite: '',
        urlImage: ''
    },
    {
        title: 'Jovem Nerd',
        urlFeed: 'http://jovemnerd.com.br/rss',
        description: '',
        urlSite: '',
        urlImage: ''
    }
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    [] // rssFeeds
);
