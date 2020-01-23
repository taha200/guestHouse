import React,{Component} from 'react';
import {Button,Card,Divider,Text,Icon,Rating,Header} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';
const width = Dimensions.get('window').width;


class Home extends Component{

    state={
      cardData:[]
    }
    componentDidMount=()=>{
      const data={
        page:2
      }
      fetch("http://192.168.0.105:8000/hotelList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
          }).then(res => res.json()).then(datam => {
            console.log(datam)
      this.setState({
        cardData:datam.data
      })
          }).catch(err => alert('Check Internet Connection'))
    }
    render(){

        return (
            <View style={styles.Container}>
                  <Header 
  leftContainerStyle={{marginBottom:15,marginRight:10}}
  leftComponent={<Icon type="material" name="menu" size={35} color="white" onPress={()=>this.props.navigation.toggleDrawer()}
  />}
  centerComponent={<Text h4 style={{color:'white',marginBottom:20}}>Hotels</Text>}
  containerStyle={{backgroundColor:'#F246AD',
  height: Platform.OS === 'ios' ? 70 :  70 - 10}}
  />

              <ScrollView showsVerticalScrollIndicator={false}>

                    <FlatList 
                        data={this.state.cardData}

                        renderItem={({item})=>(
                      
                        <Card style={{width:'90%'}} containerStyle={{padding:0}}>
                          <Image source={{uri:item.imageLinks[0]}} style={{height:190,width:width*0.91}} />
                          <View style={{display:"flex",flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
                            <Text h4 style={{color:'gray'}}>{item.name}</Text>
                          </View>
                          <Divider />
                          <Text style={{margin:10,marginBottom:5}} numberOfLines={2}>{item.description}</Text>
                            <Icon 
                              type="materialicons" 
                              name="keyboard-arrow-right" 
                              iconStyle={{fontSize:40,color:'white'}} 
                              containerStyle={{alignSelf:'flex-end',backgroundColor:'#F246AD',borderRadius:50,marginTop:5,marginRight:5,marginBottom:5}}  
                            />
                          
                          
                        </Card>
                      
                        )}
                    
                    />


              </ScrollView>
                
            </View>
          );
    }
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
});

export default Home;
