/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import ScreenDefaut from "~/components/screenDefaut";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import firebase from "utils/firebase";

export default function CadastreVeicles(props: any) {
  const [values, setValues] = useState<any>({});

  const handleChargeValues = (id: string, value: string) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const convertToTimestamp = (dateString: string) => {
    const [dia, mes, ano] = dateString.split('/').map(Number);
    const date = new Date(ano, mes - 1, dia);
    const timestamp = Timestamp.fromDate(date);
    // Convertendo para UTC-3
    timestamp.toDate(); // Isso vai ajustar para o fuso horário local (UTC-3)
    return timestamp;
  };

  const ButtonCadastrar = async () => {
    try {
      await addDoc(collection(firebase, "veicles"), {
        prefixo: values.prefixo,
        vencimentoMetroplan: convertToTimestamp(values.vencimentoMetroplan),
        vencimentoTacografo: convertToTimestamp(values.vencimentoTacografo),
        vencimentoDaer: convertToTimestamp(values.vencimentoDaer),
        vencimentoPrefeitura: convertToTimestamp(values.vencimentoPrefeitura),
        status:Number(1)
      });
    } catch (erro: any) {
      console.log("erro", erro);
    }
  };


  return (
    <ScreenDefaut
      ELEMENT={
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Prefixo:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => handleChargeValues("prefixo", text)}
          />
          <Text>Vencimento Metroplan:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => handleChargeValues("vencimentoMetroplan", text)}
          />
          <Text>Vencimento Tacógrafo:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => handleChargeValues("vencimentoTacografo", text)}
          />
          <Text>Vencimento DAER:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => handleChargeValues("vencimentoDaer", text)}
          />
          <Text>Vencimento Prefeitura:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => handleChargeValues("vencimentoPrefeitura", text)}
          />
          <Text>Se não existir algum orgão para o veiculo inserir 00/00/0000</Text>
          <Button title="Cadastrar" onPress={ButtonCadastrar} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
