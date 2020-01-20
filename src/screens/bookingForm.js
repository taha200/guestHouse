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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker'



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class AddItem extends Component{
  constructor(props){
    super(props);
    this.state={
      singleRoom:0,
      doubleRoom:0,
      rate:0,
      roomData:[
        {
            roomNumber: 623,
                  singleBedNumbers: 0,
                  doubleBedNumbers: 0,
                  booked: false,
                  rate: 20
         },
           {
            roomNumber: 643,
                  singleBedNumbers: 0,
                  doubleBedNumbers: 0,
                  booked: false,
                  rate: 20
         },
           {
            roomNumber: 613,
                  singleBedNumbers: 2,
                  doubleBedNumbers: 4,
                  booked: false,
                  rate: 20
         }
         ],
        
         laundry:false,
         viewInfo:false,
         minDate:'',
         startingDate:'',
         endingDate:'',
         index:0,
         isOpenModal:false
    }
    this.closeModal=this.closeModal.bind(this)
  }jccccccc
  modalData(singRoom,doubRoom,rateFor){
    this.setState({
      singleRoom:singRoom,
      doubleRoom:doubRoom,
      rate:rateFor,
      isOpenModal:true
    })
  }
  closeModal(){
    this.setState({
      isOpenModal:false
    })
  }
   componentDidMount(){
    var date = new Date()

    var months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    var currentMonth = months[date.getMonth()]

       var dat=date.toString()
        var dut=dat.split(" ")
        this.setState({
          minDate:`${dut[2]}-${currentMonth}-${dut[1]}`
        })
}   
laundryavailable=()=>{
  this.setState({
    laundry:!this.state.laundry
  })
}


    render(){
        return (
            <View style={styles.Container}>
             <Header 
  leftContainerStyle={{marginBottom:25,marginRight:10}}
  leftComponent={<Icon type="material" name="arrow-back" size={35} color="white"  />}
  centerComponent={<Text h4 style={{color:'white',marginBottom:20}}>Booking Form</Text>}
  containerStyle={{backgroundColor:'#F246AD',
  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
  >

  </Header>
              <KeyboardAwareScrollView>
                <View style={{width:'100%',marginTop:20,paddingLeft:'5%',paddingRight:'5%'}}>
                      
                 
                <DatePicker
        style={{width: 325}}
        date={this.state.startingDate}
        mode="date"
        placeholder="Starting Date of Your Stay"
        format="DD-MM-YYYY"
        minDate={this.state.minDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({startingDate: date})}}
      />
            <DatePicker
        style={{width: 325,marginTop:20}}
        date={this.state.endingDate}
        mode="date"
        placeholder="Ending Date of Your Stay"
        format="DD-MM-YYYY"
        minDate={this.state.minDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({endingDate: date})}}
      />

<Text style={{marginTop:20}}>Select Rooms</Text>
<FlatList 
                    
                    data={this.state.roomData}

                    renderItem={({item,index})=>(
                     <View>
                      <View style={{width:wp('90%'),height:hp('10%'),backgroundColor:'#C8F8C8',marginTop:10,borderRadius:8,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Room No. {item.roomNumber}</Text>
        
                  <Button title='View Details'  onPress={()=>this.modalData(item.singleBedNumbers,item.doubleBedNumbers,item.rate)}/>

                

                       </View>
                      
                      <View style={{width:wp('90%'),height:hp('10%'),backgroundColor:'#FFB4B1',marginTop:10,borderRadius:8,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>Room No. {item.roomNumber}</Text>
                      <Button title="Cancel" />

                        </View>
                        </View>

                    )}

                  />
<Text style={{marginTop:20}}>Check if You need laundry</Text>
      <CheckBox
  title='Laundry'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={this.state.laundry}
  onPress={this.laundryavailable}
  checkedColor='#F246AD'
  containerStyle={{marginLeft:25,backgroundColor:'white',borderWidth:0}}
/>
   <Button title="Add" buttonStyle={{marginTop:35,width:200,alignSelf:'center',backgroundColor:'#F246AD'}} onPress={this.AddHotel}/> 
                </View> 
              </KeyboardAwareScrollView> 
             
              <Overlay 
                  containerStyle={{backgroundColor:'black',opacity:0.8}} 
                  overlayStyle={{display:'flex',justifyContent:"center",alignItems:'center'}} 
                  height={200} isVisible={this.state.isOpenModal}
              >
    <Text style={{fontSize:18,fontWeight:'bold'}}>Single Bed: {this.state.singleRoom}</Text>
    <Text  style={{fontSize:18,fontWeight:'bold'}}>Double Bed: {this.state.doubleRoom}</Text>
    <Text  style={{fontSize:18,fontWeight:'bold'}}>Rs.{this.state.rate} for 24 hours</Text>
                  <Button title="Close" buttonStyle={{backgroundColor:'red',color:'white',width:200,marginTop:10}} onPress={this.closeModal} />
              </Overlay> 
            
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

export default AddItem;