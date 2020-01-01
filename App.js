import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox} from 'react-native-elements';
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
            <View style={styles.Container}>
            
              <KeyboardAwareScrollView>
                <View style={{width:'100%',marginTop:20,paddingLeft:'5%',paddingRight:'5%'}}>
                      
                      <Text h3 style={{color:'gray',alignSelf:'center'}}>Add Guest House</Text>

                      <KeyboardAvoidingView>
  <TextField
        label='Hotel Name'
        value={this.state.title}
        onChangeText={ (title) => this.setState({ title }) }
        tintColor="darkred"
        containerStyle={{marginLeft:15,marginRight:15}}
      />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
        <TextField
        label='Description (Optional)'
        value={this.state.description}
        onChangeText={ (description) => this.setState({ description }) }
        tintColor="darkred"
        containerStyle={{marginLeft:15,marginRight:15}}
   characterRestriction={600}
      />
      </KeyboardAvoidingView>
   
      <KeyboardAvoidingView>
  <TextField
        label='Halls (in number form)'
        value={this.state.title}
        onChangeText={ (title) => this.setState({ title }) }
        tintColor="darkred"
        containerStyle={{marginLeft:15,marginRight:15}}
      />
      </KeyboardAvoidingView>

      <CheckBox
  title='Laundry'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={this.state.tradeYes}
  onPress={this.doTrade}
  checkedColor='darkred'
  containerStyle={{marginLeft:25,backgroundColor:'white',borderWidth:0}}
/>

                        {
                          
                            (this.state.imagePath.length >0 )? null :<Button title="Choose Image" buttonStyle={{marginTop:10,marginLeft:'3%',width:150,height:30,backgroundColor:'skyblue'}} onPress={this.chooseImage} /> 
                          
                        } 
                            <FlatList 
                            
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={this.state.imagePath}
                            

                            renderItem={({item,index})=>
                              (
                              <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:20}}>
                                <TouchableOpacity onPress={()=>this.handleModal(index)} style={{marginRight:5}}>
                                  <Image source={{uri:item.uri}} style={{width:100,height:100}} />
                                </TouchableOpacity>
                                  {(this.state.imagePath.length-1===index)&&<TouchableOpacity style={{display:'flex',justifyContent:'center',alignItems:'center',height:100,width:100,borderWidth:2,borderColor:'lightgray'}} onPress={this.handleAddMore}>
                                      <Icon type="material" name="add" size={30} />
                                      <Text>Add More</Text>
                                  </TouchableOpacity>
                                    }
                              </View>
                                
                            ) 
                            }
                        
                            /> 



                               
                      <Button title="Add Item" buttonStyle={{marginTop:35,width:200,alignSelf:'center',backgroundColor:'#0b7253'}} />
                </View> 
              </KeyboardAwareScrollView> 
              <Overlay 
                  containerStyle={{backgroundColor:'black',opacity:0.8}} 
                  overlayStyle={{display:'flex',justifyContent:"center",alignItems:'center'}} 
                  height={200} isVisible={this.state.isOpenModal}
                  onBackdropPress={()=>{this.setState({isOpenModal:false})}}
              >
                  <Button title="View Image" buttonStyle={{backgroundColor:'skyblue',color:'white',width:200,marginBottom:10}} onPress={this.handleFullScreenImage} />
                  <Button title="Delete" buttonStyle={{backgroundColor:'red',color:'white',width:200}} onPress={this.deleteImage} />
              </Overlay> 

              <Overlay isVisible={this.state.isFullScreenModal} fullScreen overlayStyle={{padding:0}}>
                {
                  console.log(this.state.imageIndex)
                }
                      <TouchableOpacity style={{backgroundColor:'#0b7253',height:50}}>
                          <Icon type="antdesign" name="arrowleft" size={35} iconStyle={{alignSelf:'flex-start'}} color="white"  onPress={()=>this.setState({isFullScreenModal:false})} />
                          <Image source={this.state.imagePath[this.state.imageIndex]} style={{width:width*1,height:height*1}} />
                      </TouchableOpacity>
              </Overlay> 
              
            </View>
          );
    }
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
});

export default AddItem;