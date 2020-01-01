
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  AsyncStorage,
  TextInput,FlatList
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {Button,Text,Header,Icon,Input} from 'react-native-elements';
import {
 
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firebase from 'react-native-firebase'


class Login extends React.Component{
 constructor(props){
   super(props);
   this.state={
    firebaseUID:'',
     email:'',
     password:'',
    }
 }


  getData =  () => {
  AsyncStorage.getItem('uid').then((val)=>console.log(val))
  }
  onLogin=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((data)=>{
        AsyncStorage.setItem('uid',data.user.uid)
   
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage)
  // ...
});
}

  render(){
    return(
      <View style={styles.Container}>
             <Header 
  leftContainerStyle={{marginBottom:15,marginRight:10}}
  centerComponent={<Text  style={{color:'white',marginBottom:20,fontSize:20}}>List For Quick Contact</Text>}
  containerStyle={{backgroundColor:'#65779F',
  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
  ></Header>
   <Input 
inputContainerStyle={{borderWidth:2,borderColor:'lightgray',height:50,marginTop:10,backgroundColor:'lightgray',borderRadius:25}}
placeholder='Search'
  leftIcon={
    <Icon  containerStyle={{marginRight:10}}
    name="ios-search"
    type="ionicon"
    color="black"
    size={25}
    />
  }

/>
<FlatList 
                  data={['efwew','ewfw','ewfewfwe','efwew','ewfw','ewfewfwe','efwew','ewfw','ewfewfwe','efwew','ewfw','ewfewfwe','efwew','ewfw','ewfewfwe']}
                
                  renderItem={({ title })=> {
  return (
    <View style={{alignItems:'center',marginTop:5,borderRadius:12}}>
    <View style={{width:wp('98%'),height:hp('15%'),backgroundColor:'#65779F',flexDirection:'row'}}>
<Image
source={{
uri:
  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
}}
style={{width:wp('17%'),height:hp('10%'),alignSelf:'center',marginLeft:5,borderRadius:100}}
/>
<Text style={{fontSize:18,alignSelf:'center',marginLeft:5,color:'white'}}>Fast Heal Dr.Yash</Text>
<View style={{alignSelf:'center',marginLeft:5}}>
<Button title='View All Contact Info' buttonStyle={{backgroundColor:'blue'}} />
</View>
      </View>
      </View>
  );
}

                  }
                  />
            </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
});

export default Login;