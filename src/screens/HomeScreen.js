import React,{useState,useEffect} from 'react'
import { View, Text,Image,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore'
export default function HomeScreen({user,navigation}) {
console.log(user)
const [users,setUsers] = useState(null)
const getUsers = async ()=>{
const querySnap = await firestore().collection('users').where('uid','!=',user.uid).get()
const allusers = querySnap.docs.map(docSnap=> docSnap.data())
    //console.log(allusers)
          etUsers(allusers)
}
    useEffect(()=>{
        getUsers()
    },[])

const RenderCard =({item}) =>{
   return(
       <TouchableOpacity  onPress={()=>navigation.navigate('Chat',{name:item.name,uid:item.uid,
        status: typeof(item.status) == "string" ? item.status: item.status.toDate().toString()})}>
       <View style={styles.mycard}>
           <Image source={{uri:item.pic}} style={styles.image} />
           <View>
               <Text style={styles.text}>
                   {item.name}
               </Text>
              
           </View>
        </View>
        </TouchableOpacity>
   )
}

    return (
        <>
        <FlatList 
            data={users}
            renderItem={({item})=>{return <RenderCard item={item}/>}}
            keyExtractor={(item)=>item.uid}
        />
        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>navigation.navigate('Account')}
          style={styles.touchableOpacityStyle}>
          <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://image.flaticon.com/icons/png/512/64/64572.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
        
      </>
    )
}

const styles = StyleSheet.create({
    image:{
        width:50, 
        height:50,
        borderRadius:30,
        backgroundColor:"#393c40"
    },

    text:{
        fontSize:22,
        marginLeft:15,
       
    },
    mycard:{
        flexDirection:"row",
        margin:3,
        padding:4,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:"lightblue"
    } ,touchableOpacityStyle: {
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
        width: 80,
        height: 80,
        //backgroundColor:'black',
        //borderRadius:40
      },

   });
