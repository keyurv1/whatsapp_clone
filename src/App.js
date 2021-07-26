import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import 'react-native-gesture-handler';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ChatScreen from './screens/ChatScreen';
import firestore from '@react-native-firebase/firestore'
import AccountScreen from './screens/AccountScreen'; 
const Stack = createStackNavigator();
const Navigation=()=> {
const [user,setUser] = useState('')
  useEffect(()=>{
    const unregister = auth().onAuthStateChanged(userExist=>{
      if(userExist) {
        setUser(userExist)
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
      })
    } 
      else setUser("")
  })
return()=>{
  unregister()
}
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerTintColor:"black"
      }}
      >
      {user?
      <>
          <Stack.Screen name="Home"   options={{
            headerRight:()=><MaterialIcons
            name="logout"
            size={34}
            color="black"
            style={{marginRight:10}}
            onPress={()=>{
              firestore().collection('users')
              .doc(user.uid)
              .update({
              status:firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                    auth().signOut()
                })
            }}
                />,
                title:"Messanger"
            }} >
            {props=><HomeScreen {...props} user={user}/>}
               </Stack.Screen>
                 <Stack.Screen name="Chat" options={({route}) => ({title:<View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View>})}>
                  {props => <ChatScreen {...props} user={user} /> }

               </Stack.Screen>
                <Stack.Screen name="Account">
                  {props => <AccountScreen {...props} user={user} /> }
              </Stack.Screen>
              </>
              :
              <>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
              </>
            }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const App= ()  => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <View style={styles.container}>
      <Navigation/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:"lightyellow"
 },
 touchableOpacityStyle: {
  position: 'absolute',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 30,
},
floatingButtonStyle: {
  resizeMode: 'contain',
  width: 50,
  height: 50,
  //backgroundColor:'black'
},
});

export default App;
