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
  KeyboardAvoidingView
} from 'react-native';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class AddItem extends Component{

    state={
      isOpenModal:false,
      imagePath:[],
      imageIndex:'',
      isFullScreenModal:false
    }

    chooseImage=()=>{

      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: [],
          path: 'images',
        },
      };

      ImagePicker.launchImageLibrary(options, (response) => {
        const source = {path:response.path.toString(),uri: response.uri };
        this.setState({
          imagePath:this.state.imagePath.concat(source)
        });
        
      });
      
    }

    handleModal=(index)=>{
      this.setState({isOpenModal:true,imageIndex:index})
    }

    deleteImage = () =>{
      this.state.imagePath.splice(this.state.imageIndex,1);
      this.setState({ 
          isOpenModal:false
      })
    }

    handleAddMore=()=>{

      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: [],
          path: 'images',
        },
      };

      ImagePicker.launchImageLibrary(options, (response) => {
        const source = { uri: response.uri };
        this.setState({
          imagePath:this.state.imagePath.concat(source)
        });
        
      });

    }

    handleFullScreenImage = () =>{
      this.setState({isFullScreenModal:true})
    }

    render(){
      const arrLength = this.state.imagePath.length;
        return (
          <View style={{flex:1}}>
              <Header 
  leftContainerStyle={{marginBottom:15,marginRight:10}}
  leftComponent={<Icon type="material" name="arrow-back" size={35} color="white"  />}
  containerStyle={{backgroundColor:'#65779F',
  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
 />

          <WebView source={{ uri: 'https://www.facebook.com/smiu.edu.pk/' }} style={{width:wp('100%'),height:hp('50%')}} />
          </View>
          );
    }
};



export default AddItem;