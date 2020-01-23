import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid
} from 'react-native';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'react-native-firebase';
import ProgressCircle from 'react-native-progress-circle'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class AddRooms extends Component{
constructor(props){
  super(props);
this.state={
  rate:0,
  singleBedNumber:0,
  doubleBedNumber:0,
  booked:false,
 roomNumber:0,
 rooms:[]
}
}
  
   onAddmore=()=>{
     const obj={
       roomNumber:this.state.roomNumber,
       singleBedNumber:this.state.singleBedNumber,
       doubleBedNumber:this.state.doubleBedNumber,
       booked:this.state.booked,
       rate:this.state.rate
     }
     if(this.state.roomNumber<1||this.state.rate<1000||this.state.singleBedNumber<0||this.state.doubleBedNumber<0){
       alert("Input Corrected Values")
     }
     else{
       var arr=this.state.rooms
       arr.push(obj)
       this.setState({
         rooms:arr,
         rate:'',
         singleBedNumber:'',
         doubleBedNumber:'',
         roomNumber:''
       })
     }
   }

    render(){
        return (
            <View style={styles.Container}>
             <Header 
  leftContainerStyle={{marginBottom:15,marginRight:10}}
  leftComponent={<Icon type="material" name="menu" size={35} color="white"  />}
  centerComponent={<Text h4 style={{color:'white',marginBottom:20}}>Add Guest House</Text>}
  containerStyle={{backgroundColor:'#F246AD',
  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
  >

  </Header>
              <KeyboardAwareScrollView>
                <View style={{width:'100%',marginTop:20,paddingLeft:'5%',paddingRight:'5%'}}>
                      

                      <KeyboardAvoidingView>
  <TextField
        label='Room Number'
        onChangeText={ (roomNumber) => this.setState({ roomNumber }) }
        tintColor="#F246AD"
        containerStyle={{marginLeft:15,marginRight:15}}
      />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
        <TextField
        label='Single Bed Number'
        onChangeText={ (singleBedNumber) => this.setState({ singleBedNumber }) }
        tintColor="#F246AD"
        containerStyle={{marginLeft:15,marginRight:15}}
        
      />
      </KeyboardAvoidingView>
   
      <KeyboardAvoidingView>
  <TextField
        label='Double Bed Number'
        onChangeText={ (doubleBedNumber) => this.setState({ doubleBedNumber }) }
        tintColor="#F246AD"
        containerStyle={{marginLeft:15,marginRight:15}}
      />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
  <TextField
        label='Rate For 24 Hours'
        onChangeText={ (rate) => this.setState({ rate }) }
        tintColor="#F246AD"
        containerStyle={{marginLeft:15,marginRight:15}}
      />
      </KeyboardAvoidingView>
     <Button title="Add More Rooms" buttonStyle={{marginTop:35,width:200,alignSelf:'center',backgroundColor:'#F246AD'}} onPress={this.onAddmore}/>
     <Button title="Done" buttonStyle={{marginTop:20,width:200,alignSelf:'center',backgroundColor:'#F246AD'}} onPress={this.AddHotel}/>

                </View> 
              </KeyboardAwareScrollView> 
            
              
             
            </View>
          );
    }
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor:'white'
  },
});

export default AddRooms;