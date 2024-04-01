/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function VeicleState(props:any) {
    return (
        <TouchableOpacity style={[styles.container, { borderWidth: props.BORDER }]} onPress={props.PRESSING}>
            <View style={[styles.status, { backgroundColor: props.COLOR }]}></View>
            <Text style={styles.t}>{props.PREFIXO}</Text>
            <View style={[styles.separator, { display: props.DISPLAY }]}></View>
            <Text style={styles.t}>{props.METROPLAN}</Text>
            <View style={[styles.separator, { display: props.DISPLAY }]}></View>
            <Text style={styles.t}>{props.TACOGRAFO}</Text>
            <View style={[styles.separator, { display: props.DISPLAY }]}></View>
            <Text style={styles.t}>{props.DAER}</Text>
            <View style={[styles.separator, { display: props.DISPLAY }]}></View>
            <Text style={styles.t}>{props.PREFEITURA}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,  
        justifyContent:"space-around",  
        alignItems:'center',
        borderColor:'#000',
        display:'flex',
        flexDirection:'row',
    },
    status:{
        width:30,
        height:30,
        borderRadius:100,
        backgroundColor:'green',
    },
    separator:{
        width:1,
        height:20,
        backgroundColor:'#000'
    },
    t:{
        width:75,
    }
})