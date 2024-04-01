/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Entypo, Feather  } from '@expo/vector-icons';
import { useState } from 'react';

export default function Menu(props:any) {
    const ICONMENU = (<Entypo name="menu" size={30} color="black" />)
    const [open, setOpen] = useState<any>(false);
    const [icon, setIcon] = useState(ICONMENU)
    const buttomMenu = () => {
        setOpen(true)
        if (open === false) {
            setIcon(<Feather name="x" size={30} color="black" />)
            setOpen(
                <View style={styles.MenuOppened}>  
                    <Text>Menu Aberto</Text>
                </View>
            )
        } else {
            setIcon(ICONMENU)
            setOpen(false)
        }
    }

    return (
        <View>
        <TouchableOpacity onPress={() => buttomMenu()}>
            {icon}
        </TouchableOpacity>
            {open}
        </View>
    )
}

const styles = StyleSheet.create({

    MenuOppened:{
        zIndex:10,
        backgroundColor:'#b8b4b4',
        position:'absolute',
        marginTop:20,
        marginLeft:30,
        width:'70%',
        padding:10,
        paddingLeft:20,
        gap:10,
        borderRadius:10,
    },
})