import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Método salva dados em amarzenamento local
 * 
 * @param {*} feeds 
 */
const saveFeeds = async (feeds) => {
    try {
        await AsyncStorage.setItem('feeds', JSON.stringify(feeds));
    } catch (error) {
        console.log(error);
    }
}

/**
 * Método limpa os dados salvos em armazenamento local
 *  
 * */ 
const clearStorage = async () => {
    try {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('feeds');
    } catch (error) {
        console.log(error);
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
            //console.log('apagando todos os feeds');
            clearStorage();
            return newState;
        
        default:
            return state;
    }
};


/**
 * Método utilizado para adicionar um feed
 * 
 * @param {*} dispatch 
 * @returns 
 */
const addFeed = dispatch => {
    return (title, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { title, urlFeed } });
        if(callback) {
            callback();
        }
    };
};

/**
 * Método utilizado para remover um feed
 * 
 * @param {*} dispatch 
 * @returns 
 */
const deleteFeed = dispatch => {
    return (title) => {
        dispatch({ type: 'delete_feed', payload: { title } });
    };
};

/**
 * Método utilizado para restaurar o estado da aplicação, carregando na tela o dados salvos no armazenamento local
 * 
 * @param {*} dispatch 
 * @returns 
 */
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

/**
 * Método utilizado para apagar o armazenamento local
 * 
 * @param {*} dispatch 
 * @returns 
 */
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

/**
 * Expondo os métodos para que possam ser usados em outros pontos da aplicação
 * 
 */
export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    [] // rssFeeds
);
