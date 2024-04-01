/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import Menu from "./menu";
import { Entypo, Fontisto, Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ScreenDefaut( props: any) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <StatusBar></StatusBar>
      {/* <View  style={styles.top}>
                <Menu />
            </View> */}
      <View style={styles.Primary}>{props.ELEMENT}</View>
      <View style={styles.Two}>
        {/* <TouchableOpacity style={styles.ButtomMenu} onPress={() => navigation.navigate('Home')}>
                    <Entypo name="home" size={24} color="black" />
                </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.ButtomMenu}
          onPress={() => navigation.navigate("CheckVeicles")}
        >
          <Fontisto name="bus-ticket" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtomAddAll}
          onPress={() => navigation.navigate("CadastreVeicles")}
        >
          <FontAwesome6 name="add" size={24} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.ButtomMenu} >
                    <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtomMenu}>
                    <FontAwesome name="user" size={24} color="black" />
                </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    marginTop: 40,
    paddingLeft: 20,
    width: "100%",
  },
  Primary: {
    flex: 1,
    width: "100%",
  },
  Two: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#b8b4b4",
  },
  ButtomMenu: {
    padding: 5,
  },
  ButtomAddAll: {
   padding:5
  },
});
