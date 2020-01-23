import React,{Component} from 'react';
import {Button,Text,Icon,Divider,Rating, Card,Header} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
;
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import DrawerNavigation from './navigation/Drawer'
import { FlatList } from 'react-native';

class Description extends Component{
  state={
    addToFav:false,
    images:[
      'https://q-xx.bstatic.com/images/hotel/max500/130/130684189.jpg',
       'https://q-xx.bstatic.com/images/hotel/max500/130/130684189.jpg',
        'https://q-xx.bstatic.com/images/hotel/max500/130/130684189.jpg'
      ]
  }

  handleColor = () =>{
    this.setState({addToFav:!this.state.addToFav})
  }
    render(){
        return (
  <DrawerNavigation/> 
  
          
            );
    }
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
});

export default Description;
