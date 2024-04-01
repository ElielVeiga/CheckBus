/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import ScreenDefaut from '~/components/screenDefaut';

import { useState } from 'react';

export default function Home() {
 
    return (
      <ScreenDefaut 
        ELEMENT={
            <View style={styles.container}>
              <Text>Home</Text>
            </View>
        }
      />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
    Data:{
        backgroundColor:'#000'
    }
})