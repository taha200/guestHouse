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
  ActivityIndicator,
  KeyboardAvoidingView,ProgressBarAndroid
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker'



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class BookingForm extends Component{
  constructor(props){
    super(props);
    this.state={
      singleRoom:0,
      doubleRoom:0,
      rate:0,
      sum:0,
      roomData:[],
        roomids:[],
         laundry:false,
         viewInfo:false,
         minDateStart:'',
         minDateEnd:'',
         startingDate:'',
         endingDate:'',
         index:0,
         isOpenModal:false,
         load:false,
         term:''
    }
    this.closeModal=this.closeModal.bind(this)
  }
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

    var months = ['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC']
    var date = new Date()
    var currentMonth = months[date.getMonth()]
    var year = date.getFullYear()
     var term = currentMonth +" - " + year
     this.setState({
       load:true,
       term:term
     })
     const data={
       hotelID:"5def82040ce6b003c06e58e0"
     }
    fetch("http://192.168.0.106:8000/getHotelData",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json()).then(datam => {
   
         this.setState({
           roomData:datam.docs.rooms,
           load:false
         })
        }).catch(err => console.log(err))
    var date = new Date()
     var abc=date.getDate()+1
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12']
    var currentMonth = months[date.getMonth()]

       var dat=date.toString()
        var dut=dat.split(" ")
        this.setState({
          minDateStart:`${dut[2]}-${currentMonth}-${dut[1]}`,
                })
}   
onBook=(id,books,rat)=>{
  this.setState({
    load:true
  })
  const data={
    booked:true,
    roomID:id,
}
  fetch("http://192.168.0.106:8000/findHotelOneRoomandUpdate",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json()).then(datam => {
          console.log(datam)
          const arr=this.state.roomids
          arr.push(id)
          this.setState({
            roomData:datam.rooms,
            sum:this.state.sum+rat,
            roomids:arr,
            load:false
          })
        // const arr=this.state.roomData.map(rooms=>{
        //       if(rooms._id===id){
        //         rooms.booked=true
        //         return rooms
        //       }
        //       else{
        //         return rooms
        //       }
        //  })
        //  console.log(arr)
        //  this.setState({
        //    rooms:arr
        //  })
        }).catch(err => alert('Check Internet Connection'))
}
onUnBook=(id,rat,index)=>{
  this.setState({
    load:true
  })
  const data={
    booked:false,
    roomID:id,
}
  fetch("http://192.168.0.106:8000/findHotelOneRoomandUpdate",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json()).then(datam => {
          const arr=this.state.roomids
          arr.splice(index,1)
          this.setState({
            roomData:datam.rooms,
            sum:this.state.sum-rat,
            roomids:arr,
            load:false
          })
        }).catch(err => alert('Check Internet Connection'))
}
laundryavailable=()=>{
  this.setState({
    laundry:!this.state.laundry
  })
}
onConfirm=()=>{
  const data={
    hotelID:"5e25716ed36a212298789e02",
    guestfirebaseUID: "rOrYw8I2ERcd4jEIJCfBEIDVWuH2",
    startingDate:this.state.startingDate,
    endingDate:this.state.endingDate,
    rooms:this.state.roomids,
     laundry:this.state.laundry,
      booked:true,
       amount:this.state.sum,
       term:this.state.term
  }
  var firstDate = new Date(this.state.startingDate).getTime();
  var secondDate = new Date(this.state.endingDate).getTime();
     var dist = secondDate-firstDate
     
     var days = Math.floor(dist / (1000 * 60 * 60 * 24));  
  
   if(days<1){
     alert('Stay Less than One Day Not Allowed')
   }
   else{
    fetch("http://192.168.0.106:8000/api/createBooking",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json()).then(datam => {
        alert('Booking Done')
        }).catch(err => alert('Check Internet Connection'))
   }

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
        format="YYYY-MM-DD"
        minDate={this.state.minDateStart}
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
        format="YYYY-MM-DD"
        minDate={this.state.startingDate}
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

      <Text style={{marginTop:20}}>Book Room & Cancel Room Booking</Text>
{this.state.load ?
         <ActivityIndicator size="large" color="#F246AD" />
:
<FlatList 
                    
data={this.state.roomData}

renderItem={({item,index})=>(
 <View>
   {(item.booked)?
          <View style={{width:wp('90%'),height:hp('10%'),backgroundColor:'#FFB4B1',marginTop:10,borderRadius:8,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Room No. {item.roomNumber}</Text>
          <Button title='View Details'  onPress={()=>this.modalData(item.singleBedNumbers,item.doubleBedNumbers,item.rate)}/>
          <Button title='Cancel'  onPress={()=>this.onUnBook(item._id,item.rate,index)}/>

                </View>
                :
                <View style={{width:wp('90%'),height:hp('10%'),backgroundColor:'#C8F8C8',marginTop:10,borderRadius:8,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Room No. {item.roomNumber}</Text>
    
              <Button title='View Details'  onPress={()=>this.modalData(item.singleBedNumbers,item.doubleBedNumbers,item.rate)}/>
              <Button title='Book'  onPress={()=>this.onBook(item._id,item.booked,item.rate)}/>

            

                   </View>
}

  

    </View>

)}

/>
}

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
<View style={{flexDirection:'row',justifyContent:'space-around'}}>
  <Text style={{fontSize:20}}>Your Total Amount</Text>
<Text style={{fontSize:20}}>Rs. {this.state.sum}</Text>
</View>
   <Button title="Confirm" buttonStyle={{marginTop:35,width:200,alignSelf:'center',backgroundColor:'#F246AD'}} onPress={this.onConfirm}/> 
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

export default BookingForm;