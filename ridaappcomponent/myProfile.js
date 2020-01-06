/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, TouchableHighlight,FlatList,Image} from 'react-native'
 
// Import { RTLView, RTLText } from react-native-rtl-layout
import {Header,Icon,Button,Avatar,Rating} from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
class MyPProfile extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      locale: 'ar',
      isRTL:false
    }
  }
 
  toggleLocale = () => {
    this.setState({
      locale: (this.state.locale == 'ar' ? 'en' : 'ar')
    })
  }
 
  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'white'}}>
         <Header  placement="left"
               
                  centerComponent={
                  <Text style={{fontSize:30,color:'white',alignSelf:'center',marginBottom:10}}>Contact Details</Text>
                
                  
                  }
                  containerStyle={{backgroundColor:'#65779F',
                  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
                  />
                  <View style={{backgroundColor:'white',height:hp('3%'),width:wp('100%')}}>
                    
                  </View>
                  <View style={{alignItems:'center'}}>
                  <Avatar
                  size='xlarge'
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>

<View style={{alignItems:'center',marginTop:15}}>
  <View style={{width:wp('90%'),alignItems:'center'}}>
<Text>Name:{}</Text>
<Text>InstaLink:{}</Text>
<Text>FbLink:{}</Text>
<Text>WhatsAppNo.:{}</Text>
  </View>
</View>
<Button title='Edit Profile' buttonStyle={{marginTop:20}} />




                  </View>
              

                
              

       </View>
    )
  }
}
 
export default MyPProfile;
