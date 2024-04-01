/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UpdateVeicle from '~/screens/UpdateVeicle/UpdateVeicle';
import CheckVeicles from '~/screens/checkVeicles/checkVeicles';
import CadastreVeicles from '~/screens/cadastreVeicles/cadastreVeicles';
import ScreenDefaut from '~/components/screenDefaut';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false, animationEnabled:false}}>
        <Stack.Screen name="CheckVeicles" component={CheckVeicles} />
        <Stack.Screen name="CadastreVeicles" component={CadastreVeicles} />
        <Stack.Screen name="UpdateVeicle" component={UpdateVeicle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// const styles = StyleSheet.create({
//   backButton: {
//     flexDirection: 'row',
//     paddingLeft: 20,
//   },
//   backButtonText: {
//     color: '#007AFF',
//     marginLeft: 4,
//   },
// });

// <Stack.Screen
// name="Details"
// component={Details}
// options={({ navigation }) => ({
//   headerLeft: () => (
//     <View style={styles.backButton}>
//       <Feather name="chevron-left" size={16} color="#007AFF" />
//       <Text style={styles.backButtonText} onPress={navigation.goBack}>
//         Back
//       </Text>
//     </View>
//   ),
// })}
// />

// const HomeNavegador = createStackNavigator({
//   Home: {
//     navigationOptions: {
//        header: null,
//        title: 'Home'
//     },
//     screen: Home
//   },
//   Map: {
//     navigationOptions: {
//        header: null,
//        title: 'Map'
//      },
//     screen: MapScreen
//    }
// }, { initialRouteName: Home});
