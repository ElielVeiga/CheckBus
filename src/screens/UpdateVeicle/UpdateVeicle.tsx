/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import ScreenDefaut from "~/components/screenDefaut";
import { collection, doc, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import firebase from "utils/firebase";

export default function UpdateVeicle({route}:any) {
  const { veiculos, index } = route.params;
const veiculo = veiculos[index];

  const [values, setValues] = useState<any>({});

  const handleChargeValues = (id: string, value: string) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [id]: value.trim() === '' ? prevValues[id] : value,
    }));
  };  

  const formatarDataView = (data: Date) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const convertToTimestamp = (dateString: string) => {
    if (!dateString || dateString.trim() === '') {
      return undefined; // Retorna undefined se a string for vazia ou indefinida
    }
      
    const [dia, mes, ano] = dateString.split('/').map(Number);
    const date = new Date(ano, mes - 1, dia);
    const timestamp = Timestamp.fromDate(date);
    // Convertendo para UTC-3
    timestamp.toDate(); // Isso vai ajustar para o fuso horário local (UTC-3)
    return timestamp;
  };
  

  const AtualizarVeiculo = async () => {
    const valuesUTC3 = {
      vencimentoMetroplan: convertToTimestamp(values.vencimentoMetroplan || formatarDataView(new Date(veiculo.vencimentoMetroplan))),
      vencimentoTacografo: convertToTimestamp(values.vencimentoTacografo || formatarDataView(new Date(veiculo.vencimentoTacografo))),
      vencimentoDaer: convertToTimestamp(values.vencimentoDaer || formatarDataView(new Date(veiculo.vencimentoDaer))),
      vencimentoPrefeitura: convertToTimestamp(values.vencimentoPrefeitura || formatarDataView(new Date(veiculo.vencimentoPrefeitura))),
      status: 1
    };

    const veiculoRef = doc(collection(firebase, "veicles"), veiculo.id);
    try {
      await updateDoc(veiculoRef, valuesUTC3);
      Alert.alert("Veículo atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro ao atualizar veículo:");
    }
  };


  return (
    <ScreenDefaut
      ELEMENT={
 <View style={styles.container}>
          <View style={styles.atual}>
            <View style={styles.row}>
            <Text>Prefixo: {veiculo.prefixo}</Text>
            <Text>Atual Metroplan: {veiculo.vencimentoMetroplan ? formatarDataView(new Date(veiculo.vencimentoMetroplan)) : ''}</Text>
            <Text>Atual Tacógrafo: {veiculo.vencimentoTacografo ? formatarDataView(new Date(veiculo.vencimentoTacografo)) : ''}</Text>
            <Text>Atual DAER: {veiculo.vencimentoDaer ? formatarDataView(new Date(veiculo.vencimentoDaer)) : ''}</Text>
            <Text>Atual Prefeitura: {veiculo.vencimentoPrefeitura ? formatarDataView(new Date(veiculo.vencimentoPrefeitura)) : ''}</Text>
          </View>
          <View style={styles.upload}>
            <TextInput
              style={styles.Input}
              onChangeText={(text) => handleChargeValues("vencimentoMetroplan", text)}
              placeholder="Novo Vencimento Metroplan"
            />
            <TextInput
              style={styles.Input}
              onChangeText={(text) => handleChargeValues("vencimentoTacografo", text)}
              placeholder="Novo Vencimento Tacógrafo"
            />
            <TextInput
              style={styles.Input}
              onChangeText={(text) => handleChargeValues("vencimentoDaer", text)}
              placeholder="Novo Vencimento DAER"
            />
            <TextInput
              style={styles.Input}
              onChangeText={(text) => handleChargeValues("vencimentoPrefeitura", text)}
              placeholder="Novo Vencimento Prefeitura"
            />
          </View>
          </View>
          <TouchableOpacity onPress={AtualizarVeiculo}  style={styles.Buttomupl}>
              <Text>Atualizar</Text>
            </TouchableOpacity>
        </View>
      }
    />
  );
}


const styles = StyleSheet.create({
  container:{
    paddingTop: 10,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row: {
    flex:1,
    display:'flex',
    flexDirection:"column",
    justifyContent:"center",
    alignItems:'center', 
  },
  atual:{
    width:'100%',
    flex:1,
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:'center',
    gap:5
  },
  upload:{
    flex:1,
    display:'flex',
    flexDirection:"column",
    justifyContent:"center",
    alignItems:'center', 
  },
  Input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  Buttomupl:{
    zIndex: 1,
    width: "40%",
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  txt:{
    marginBottom:60,
    flexWrap:"wrap",
    fontWeight:'600',
    fontSize:30,
    color:'red'
  }
});
