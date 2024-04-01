/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

export default function Input(props:any) {
    return (
        <View style={styles.container}>
            <View style={styles.AreaIcon}>{props.ICON}</View>
           <TextInput maxLength={30} secureTextEntry={props.PASSWORD} style={styles.AreaText} placeholder={props.PLACEHOLDER} onChange={props.ONCHENGE}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        gap:10,
        position:'relative',
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        paddingStart:20,
        paddingEnd:10,
        width:350,
        height:45,
        borderRadius:50,
        borderWidth:2,
        borderColor:"#000",
    },
    AreaIcon:{
        height:30,
        width:30,
        color:"#fff"
    },
    AreaText:{
        width:'100%',
        height:40,
    }
})