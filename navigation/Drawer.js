import React from 'react'
import {StyleSheet,Platform,Dimensions,View,Text,TouchableOpacity,FlatList,AsyncStorage} from'react-native'

import {createAppContainer,createStackNavigator,createSwitchNavigator,createDrawerNavigator} from 'react-navigation'

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

import AddHotel from '../src/screens/addhotel'
import AddRoom from '../src/screens/addRooms'
import BookingForm from '../src/screens/bookingForm'
import Description from '../src/screens/description'
import Home from '../src/screens/homeScreen'
import Login from '../src/screens/Login'
import Portfolio from '../src/screens/portfolio'
import Register from '../src/screens/Register'
import MenuDrawer from '../src/screens/MenuDrawerComp'

const homeStack =createStackNavigator({
    Home:{
        screen:Home,
      },
     Description:{
      screen:Description,
    },
    BookingForm:{
      screen:BookingForm
    },

},{initialRouteName:'Home',headerMode:'none'})
const AddPortfolio=createStackNavigator({
  Portfolio:{
    screen:Portfolio
  },
  DescriptionHotel:{
    screen:Description
  },
  AddHotel:{
    screen:AddHotel
  },
  AddRooms:{
    screen:AddRoom
  }
},{initialRouteName:'Portfolio',headerMode:'none'})
const drawerConfig={
  drawerWidth:Width*0.73,
  drawerHeight:'50%',
  drawerPosition:'left',
  contentComponent:({navigation})=>{
      return <MenuDrawer navigation={navigation} /> 
  }
}

const drawerNavigator = createDrawerNavigator({
  Home:homeStack,
  Portfolio:AddPortfolio,
},drawerConfig)
 const LoginStack=createStackNavigator({
   Register:{
     screen:Register
   },
   Login:{
     screen:Login
   }
 },{initialRouteName:'Login',headerMode:'none'})
 const rootSwitch = createSwitchNavigator({
  Login:LoginStack,
  DrawerNavigator:drawerNavigator,
  
})
export default createAppContainer(rootSwitch)

// import React from 'react'
// import {createAppContainer,createStackNavigator,createSwitchNavigator,createDrawerNavigator} from 'react-navigation'
// import Appoint from '../components/Appointment'
// import Profile from '../components/Profile'
// import book1 from '../components/booking1'
// import book2 from '../components/book2'
// import book3 from '../components/book3'
// import busList1 from '../components/booking1'
// import busList2 from '../components/book2'
// import busList3 from '../components/buslist3'
// import Home from '../components/dashboard'
// import Listinglist from '../components/listing'
// import ListingDetails from '../components/listingDetails'
// import Registration from '../components/registration'
// import Login from '../components/Login'
// import EditProf from '../components/editprof'
// const Width = Dimensions.get('window').width
// const Height = Dimensions.get('window').height

// const profileStack = createStackNavigator({
//   Profile:Profile,
//   EditProfile:{
//     screen:EditProf,
//   }
// },{initialRouteName:'Profile',headerMode:'none'})
// const businessList =createStackNavigator({
//   BusinessList:busList1,
//   busList2:{
//     screen:busList2,
//   },
//   busList3:{
//     screen:busList3,
//   }
// },{initialRouteName:'BusinessList',headerMode:'none'})
// const booking =createStackNavigator({
//     book1:book1,
//     book2:{
//       screen:book2,
//     },
//     book3:{
//       screen:book3,
//     }
//   },{initialRouteName:'Boooking',headerMode:'none'})
// const homeStack =createStackNavigator({
//       Home:Home,
//       Book:{
//         screen:booking,
//       },
//       ListingDetails:{
//         screen:ListingDetails,
//       },
//       ListingList:{
//         screen:Listinglist,
//       }

  
// },{initialRouteName:'Home',headerMode:'none'})
// const drawerConfig={
//   drawerWidth:Width*0.73,
//   drawerHeight:'50%',
//   drawerPosition:'right',
//   contentComponent:({navigation})=>{
//       return <MenuDrawer navigation={navigation} /> 
//   }
// }

// const drawerNavigator = createDrawerNavigator({
//   Home:homeStack,
//  MyProfile:profileStack,
//  BuasinessList:businessList
// },drawerConfig)
// const LoginStack=createStackNavigator({
//   Login:Login,
//   SignUP:{
//     screen:Registration,
//   },



// },{initialRouteName:'Login',headerMode:'none'
// })
// const rootSwitch = createSwitchNavigator({
//   Login:LoginStack,
//   DrawerNavigator:drawerNavigator,
  
// })
// export default createAppContainer(rootSwitch)
