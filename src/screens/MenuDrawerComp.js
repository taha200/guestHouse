import React from 'react'
import {StyleSheet,Platform,Dimensions,View,Text,TouchableOpacity,FlatList,AsyncStorage} from'react-native'
import {Avatar,Button,Icon,Header} from 'react-native-elements'
const Width=Dimensions.get('window').width
const Height=Dimensions.get('window').height
import { heightPercentageToDP } from 'react-native-responsive-screen'
import firebase from 'react-native-firebase'

export default class MenuDrawer extends React.Component{
    state={
        data:[{text:"category 1",iconname:'artist-outline'},{text:"category 1",iconname:'artist-outline'},{text:"category 1",iconname:'artist-outline'},{text:"category 1",iconname:'artist-outline'},{text:"category 1",iconname:'artist-outline'},{text:"category 1",iconname:'artist-outline'}],
        ismodalVisible:false,
        isRTL:false
    }
    Openmodal=()=>{
        this.setState({
            ismodalVisible:true
        })
    }
    Closemodal=()=>{
        this.setState({
            ismodalVisible:false
        })
    }
    navLink(nav,text){
     return(
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate(nav)}}>
             <Text style={{fontSize:15,fontWeight:'bold',marginLeft:20,marginTop:20}}>{text}</Text>
         </TouchableOpacity>
     )
    }
    componentDidMount=()=>{
     AsyncStorage.getItem('uid').then(value=>{
         this.setState({
             firebaseUID:value
         })
     })
 this.FindUser();
    }
    FindUser=()=>{
   const data={
     firebaseUID:this.state.firebaseUID
   }
  fetch("http://192.168.0.105:8000/singleUser",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
      }).then(res => res.json()).then(datam => {
       this.setState({
           isRTL:datam.userType
       })
    
      }).catch(err => {alert('You are not registered Check Internet Connection')})
 }
render(){
    return(  
    <View style={{height:'50%'}}>
     <View style={{backgroundColor:'black',height:160,width:'100%',flexDirection:'row'}}>
     <Avatar containerStyle={{marginLeft:30,marginTop:40}} onPress={()=>{this.props.navigation.navigate('Profile')}}
       size="large"
       rounded
       source={{
         uri:
           'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
       }}
     />  
     <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginLeft:10,marginTop:60}}>Hamza Ali</Text>
     </View>
     {this.state.isRTL?
      <View style={{marginTop:20,marginRight:8,alignItems:'flex-end'}}>
      {this.navLink('Portfolio','Portfolio')}

      </View>
      :
      <View style={{marginTop:20,marginLeft:5}}>
           {this.navLink('Home','Home')}

     
      </View>
     }
    
     <View style={{alignItems:'center',justifyContent:'flex-end'}}>
          <View style={{position: 'absolute',
      width:180,
      height:40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#d66933',
      borderRadius:10,
      marginTop:50,
      top:'50%',
      bottom:'10%',
      marginBottom:15
      }}>
          {this.state.isRTL?
                      <Button title="ایپ سے سائن آؤٹ کریں۔"  buttonStyle={{backgroundColor:'#d66933',height:40}}/>
 :
                    <Button title="Sign Out"  buttonStyle={{backgroundColor:'#d66933',height:40}}/>

        }
          </View>
          </View>
         

    </View>
    )
}
}
