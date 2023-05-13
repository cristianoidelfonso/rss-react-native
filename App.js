import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import IndexScreen from './src/screens/IndexScreen';
import ShowFeedScreen from './src/screens/ShowFeedScreen';
import AddFeedScreen from './src/screens/AddFeedScreen';
import AddNewsScreen from './src/screens/AddNewsScreen';
import { Feather, EvilIcons } from '@expo/vector-icons';
import { Provider as FeedListProvider } from './src/context/FeedListContext';
import { Provider as FeedProvider } from './src/context/FeedContext';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen 
          name="Index" 
          component={IndexScreen} 
          options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Add', {})}>
                  <Feather name="plus" size={30} />
                </TouchableOpacity>
              )
            })
          }
        />
        
        <Stack.Screen 
          name="Show" 
          component={ShowFeedScreen} 
        //   options={({navigation}) => ({
        //     headerRight: () => (
        //       <TouchableOpacity onPress={() => navigation.navigate('AddN', {})}>
        //         <Feather name="plus" size={30} />
        //       </TouchableOpacity>
        //     )
        //   })
        // }
        />
        
        <Stack.Screen name="Add" component={AddFeedScreen} />
        <Stack.Screen name="AddN" component={AddNewsScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <FeedListProvider>
      <FeedProvider>
        <App />
      </FeedProvider>
    </FeedListProvider>
  );
};