import React,{useState} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity,TextInput,Button,KeyboardAvoidingView,ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function SignUpScreen({navigation}) {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState(null)
    const [shownext,setshowNext] = useState(false)
    const [loading,setLoading] = useState(false)

    if(loading){
        return <ActivityIndicator size="large" color="#000000" />
    }

    const userSignUp= async ()=>{
        setLoading(true)
        if(!email || !password || !image || !name){
            alert("Please add all the field")
            return
        }
        try{
            const result = await auth().createUserWithEmailAndPassword(email,password)
            firestore().collection('users').doc(result.user.uid).set({
            name:name,
            email:result.user.email,
            uid:result.user.uid,
            pic:image,
            status:"online"

        })
        setLoading(false)
        }catch(err){
            alert("something went wrong")
        }
       
    }

    const uploadImage = async () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
         // console.log(image);
          
          const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(image.path)
          setLoading(true)
          uploadTask.on('state_changed', 
          (snapshot) => {
           
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               if(progress==100){alert("uploaded")}
               
          }, 
          (error) => {
             alert("something went wrong")
          }, 
          () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                 
                  setImage(downloadURL)
                  setLoading(false)
              });
          }
          );
  
        })
      }


    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Let's start your chatting</Text>
                <Image style={styles.image} source={require('../assets/chatting.png')} />
            </View>

            <View style={styles.box2}>
                {!shownext &&
                <>
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
         </>
     }
      {shownext ?
            <>
                <TextInput style={{borderColor:"black",borderWidth:2,borderRadius:5,padding:10 }}
                placeholder="Enter Name"
                value={name}
                onChangeText = {(text)=>setName(text)}
                />

                <Button 
                title="Select Profile Image"
                onPress={()=>uploadImage()}
                color="black"
                />

                <Button 
                title="SignUp"
                disabled={image?false:true}
                onPress={()=>userSignUp()}
                color="black"
                />

                 </>
                :
                <Button 
                title="Next"
                onPress={()=>setshowNext(true)}
                color="black"
                
                />
               
                }
                <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:"center"}}>Already have an account!</Text></TouchableOpacity> 
           
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
   