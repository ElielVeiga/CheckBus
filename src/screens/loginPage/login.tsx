/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Input from '~/components/Input';
import { 
    MaterialIcons,
    AntDesign ,
} from '@expo/vector-icons';

export default function Login({ navigation }:any) {



    return (
        <View style={styles.container}>
            <Input
                PLACEHOLDER='E-mail'
                PASSWORD={false}
                ICON={<MaterialIcons name="email" size={24} color="black" />}
            />
            <Input
                PLACEHOLDER='Senha'
                PASSWORD={true}
                ICON={<AntDesign name="lock" size={24} color="black" />}
            />
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate('Home')}>
                <Text>
                    Entrar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#223dd6'
    },
    buttom:{
        borderWidth:1,
        borderColor:'#000',
        borderRadius:50,
        width:350,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    }
})