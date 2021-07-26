import React,{useState} from 'react'
import { View, Text,Image,StyleSheet,ActivityIndicator,TextInput,Button,KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
export default function LoginScreen ({navigation}) {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
if(loading){
     return <ActivityIndicator size="large" color="#000000" />
}
const userLogin= async ()=>{
    setLoading(true)
        if(!email || !password ){
            alert("Please add all the field")
            return
        }
        try{
            const result = await auth().signInWithEmailAndPassword(email,password)
           
        setLoading(false)
        
        }catch(err){
            alert("something went wrong")
        }
       
    }

   
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Let's start your chatting</Text>
                <Image style={styles.image} source={require('../assets/chatting.png')} />
            </View>

            <View style={styles.box2}>
                <TextInput style={{borderColor:"black",borderWidth:2,borderRadius:5,padding:10 }}
                placeholder="Enter Email"
                value={email}
                onChangeText = {(text)=>setEmail(text)}
                
            />

            <TextInput  style={{borderColor:"black",borderWidth:2,borderRadius:5,padding:10 }}
                placeholder="Enter Password"
                value={password}
                onChangeText = {(text)=>setPassword(text)}
                secureTextEntry
                
            />

                <Button 
                title="Login"
                onPress={()=>userLogin()}
                color="black"
                 />

                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text style={{textAlign:"center"}}>Don't have an account!</Text></TouchableOpacity> 
              
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color:"black",
        marginTop:15,
       
    },
    image:{
        width:120,
        height:120,
        margin:15
        
    },
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:20,
        
        justifyContent:"space-evenly",
        height:"55%",
       
    }
   });
   