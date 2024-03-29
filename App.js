
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './tabNavigator';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import EmptyScreen from './screens/EmptyScreen';

import plus from './assets/plus.png';

import {FontAwesome5} from '@expo/vector-icons'

import AuthNavigator from './navigations/AuthNavigator';

const Tab = createBottomTabNavigator();




export default function App() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (

    <NavigationContainer>
      
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,

        tabBarStyle: {
          backgroundColor: 'white',
          position:'absolute',
          bottom:0,
          
        

          //Shadows

          shadowColor:'#000',
          shadowOpacity: 0.06,
          shadowOffset:{
            width:10,
            height:10
          }
        }
      }}
      >
        {
          //Tab Screens and Tab Icons
        }
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) =>(
            <View>
                <FontAwesome5 
                name="home"
                size={20}
                color={focused ? 'red' : 'gray'}
                >
                </FontAwesome5>
            </View>
          ),
          headerShown:false,
        }} listeners={({navigation,route}) => ({
            // OnPress Update...
            tabPress: e =>{
                Animated.spring(tabOffsetValue,{
                    toValue: getWidth() - 110,
                    useNativeDriver: true
                }).start();
            }
        })}
        />
        <Tab.Screen name="Search" component={SearchScreen} 
        options={{
          tabBarIcon: ({focused}) =>(
            <View>
                <FontAwesome5 
                name="search"
                size={20}
                color={focused ? 'red' : 'gray'}
                >
                </FontAwesome5>
            </View>
          ),
          headerShown:false,
        }} listeners={({navigation,route}) => ({
            // OnPress Update...
            tabPress: e =>{
                Animated.spring(tabOffsetValue,{
                    toValue: getWidth() - 40,
                    useNativeDriver: true
                }).start();
            }
        })}
        />

        {
            //Extra Tab Screen for action button  
        }   

        <Tab.Screen name={"ActionButton"} component={EmptyScreen}
        options={{
            tabBarIcon: ({focused}) =>(
                <TouchableOpacity>
                    <View style={{
                        width:55,
                        height:55,
                        backgroundColor:'red',
                        borderRadius:'50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom:40
                    }}>
                        <Image source={plus} style={{
                            width: 22,
                            height:22,
                            tintColor:'white'
                        }}/>
                    </View>
                </TouchableOpacity>
            )
        }}
        >
            </Tab.Screen> 

        <Tab.Screen name="Notification" component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) =>(
            <View>
                <FontAwesome5 
                name="bell"
                size={20}
                color={focused ? 'red' : 'gray'}
                >
                </FontAwesome5>
            </View>
          )
        }} listeners={({navigation,route}) => ({
            // OnPress Update...
            tabPress: e =>{
                Animated.spring(tabOffsetValue,{
                    toValue: getWidth() + 115,
                    useNativeDriver: true
                }).start();
            }
        })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
          tabBarIcon: ({focused}) =>(
            <View>
                <FontAwesome5 
                name="user-alt"
                size={20}
                color={focused ? 'red' : 'gray'}
                >
                </FontAwesome5>
            </View>
          ),
          headerShown:false,
        }} listeners={({navigation,route}) => ({
            // OnPress Update...
            tabPress: e =>{
                Animated.spring(tabOffsetValue,{
                    toValue: getWidth() * 4.2,
                    useNativeDriver: true
                }).start();
            }
        })}
        />
      </Tab.Navigator>
      <Animated.View style={{
        width:getWidth() - 20,
        height:2,
        backgroundColor:'red',
        position: 'absolute',
        bottom:48,

        //Horizontal Padding
        left:70,
        borderRadius:'50%',
        transform:[
          {translateX:tabOffsetValue}
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
  
  );
}

function getWidth(){
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 80

  //Total Five Tabs
  return width / 5
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
