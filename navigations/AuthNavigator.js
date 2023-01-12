import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import Login from '../screens/auth/LoginScreen';
import {ROUTES} from '../constants/Routes'

const Stack = createStackNavigator()

export default function AuthNavigator() {
    return (
    <Stack.Navigator>
        <Stack.Screen name={"Login"} component={Login}/>
    </Stack.Navigator>  
);
}
