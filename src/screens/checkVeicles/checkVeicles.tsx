/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import ScreenDefaut from "~/components/screenDefaut";
import VeicleState from "~/components/veicleState";
import { AntDesign } from "@expo/vector-icons";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import firebase from "utils/firebase";

export default function CheckVeicles({ navigation }: any) {
  const [dados, setDados] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase, "veicles"));
        const newData: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const convertedData = {
            id: doc.id,
            prefixo: String(data.prefixo),
            vencimentoMetroplan: data.vencimentoMetroplan
              ? formatarData(data.vencimentoMetroplan)
              : null,
            vencimentoTacografo: data.vencimentoTacografo
              ? formatarData(data.vencimentoTacografo)
              : null,
            vencimentoDaer: data.vencimentoDaer ? formatarData(data.vencimentoDaer) : null,
            vencimentoPrefeitura: data.vencimentoPrefeitura
              ? formatarData(data.vencimentoPrefeitura)
              : null,
            // Adicionar campo de status
            status: data.status ? parseInt(data.status) : null,
          };
          newData.push(convertedData);
        });
        setDados(newData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData().catch(console.error);
  }, []);

  // Função para formatar a data para o formato "dd/mm/aaaa"
  const formatarDataView = (data: Date) => {
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarData = (data: any) => {
    return new Date(data.seconds * 1000);
  };

  // Função para calcular a diferença em dias entre duas datas
  const diffDias = (data1: Date, data2: Date) => {
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const diffTempo = Math.abs(data2.getTime() - data1.getTime());
    return Math.ceil(diffTempo / umDiaEmMilissegundos);
  };

  const verificarDatas = async () => {
    const agoraEmMilissegundos = Date.now();
    const hoje = new Date(agoraEmMilissegundos);
    hoje.setUTCHours(hoje.getUTCHours() - 3);

    const atualizarStatus = async (id: string, status: number) => {
      const veiculoRef = doc(collection(firebase, "veicles"), id);
      await updateDoc(veiculoRef, { status: status });
    };

    dados.forEach(async (veiculo) => {
      if (veiculo) {
        const datas = {
          Metroplan: veiculo.vencimentoMetroplan,
          Tacografo: veiculo.vencimentoTacografo,
          DAER: veiculo.vencimentoDaer,
          Prefeitura: veiculo.vencimentoPrefeitura,
        };

        for (const [orgao, data] of Object.entries(datas)) {
          if (data.getTime() === new Date(1899, 10, 30).getTime()) {
            continue; // Se a data for igual a 30/11/1899, continue para o próximo veículo
          }
          if (data) {
            const diff = diffDias(hoje, data);
            if (diff <= 20) {
              await atualizarStatus(veiculo.id, 2); // Atualiza o status para 2 (amarelo)
            }
            if (data <= hoje) {
              await atualizarStatus(veiculo.id, 3); // Atualiza o status para 3 (vermelho)
            }
            if (diff >= 1000) {
              await atualizarStatus(veiculo.id, 3); // Atualiza o status para 3 (vermelho)
            } else if (diff > 1000) {
              // Não faz nada se a diferença for maior que -1000 dias e menor que 1000 dias
            }
          }
        }
      }
    });
  };

  // Função para determinar a cor com base no status
  const getColorFromStatus = (status: number | null): string => {
    switch (status) {
      case 1:
        return "green";
      case 2:
        return "yellow";
      case 3:
        return "red";
      default:
        return "green"; // Retorna uma string vazia para cor padrão ou nenhum estilo definido
    }
  };

  const reload = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase, "veicles"));
      const newData: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const convertedData = {
          id: doc.id,
          prefixo: String(data.prefixo),
          vencimentoMetroplan: data.vencimentoMetroplan
            ? formatarData(data.vencimentoMetroplan)
            : null,
          vencimentoTacografo: data.vencimentoTacografo
            ? formatarData(data.vencimentoTacografo)
            : null,
          vencimentoDaer: data.vencimentoDaer ? formatarData(data.vencimentoDaer) : null,
          vencimentoPrefeitura: data.vencimentoPrefeitura
            ? formatarData(data.vencimentoPrefeitura)
            : null,
          // Adicionar campo de status
          status: data.status ? parseInt(data.status) : null,
        };
        newData.push(convertedData);
      });
      setDados(newData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenDefaut
      ELEMENT={
        <View style={styles.container}>
          <VeicleState
            BORDER={0}
            DISPLAY={"none"}
            PREFIXO={"Prefixo"}
            METROPLAN={"Metroplan"}
            TACOGRAFO={"Tacografo"}
            DAER={"Daer"}
            PREFEITURA={"Prefeitura"}
            COLOR={""}
          />
          <ScrollView style={styles.AreaVeicles}>
            {dados.map((veiculo, index) => (
              <VeicleState
                BORDER={1}
                PREFIXO={veiculo.prefixo}
                METROPLAN={
                  veiculo.vencimentoMetroplan &&
                  veiculo.vencimentoMetroplan.getTime() === new Date(1899, 10, 30).getTime()
                    ? ""
                    : veiculo.vencimentoMetroplan
                      ? formatarDataView(new Date(veiculo.vencimentoMetroplan))
                      : ""
                }
                TACOGRAFO={
                  veiculo.vencimentoTacografo &&
                  veiculo.vencimentoTacografo.getTime() === new Date(1899, 10, 30).getTime()
                    ? ""
                    : veiculo.vencimentoTacografo
                      ? formatarDataView(new Date(veiculo.vencimentoTacografo))
                      : ""
                }
                DAER={
                  veiculo.vencimentoDaer &&
                  veiculo.vencimentoDaer.getTime() === new Date(1899, 10, 30).getTime()
                    ? ""
                    : veiculo.vencimentoDaer
                      ? formatarDataView(new Date(veiculo.vencimentoDaer))
                      : ""
                }
                PREFEITURA={
                  veiculo.vencimentoPrefeitura &&
                  veiculo.vencimentoPrefeitura.getTime() === new Date(1899, 10, 30).getTime()
                    ? ""
                    : veiculo.vencimentoPrefeitura
                      ? formatarDataView(new Date(veiculo.vencimentoPrefeitura))
                      : ""
                }
                COLOR={getColorFromStatus(veiculo.status)}
                PRESSING={() => navigation.navigate("UpdateVeicle", { veiculos: dados, index })}
              />
            ))}
            <View style={styles.AreaScroll}></View>
          </ScrollView>
          <View style={styles.Abslote}>
            <TouchableOpacity style={styles.RelaodButton} onPress={reload}>
              <AntDesign name="reload1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.VerificButtom} onPress={verificarDatas}>
              <Text>Verificar</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  AreaScroll: {
    paddingBottom: 80,
  },
  AreaVeicles: {
    width: "100%",
    overflow: "scroll",
  },
  prefixo: {
    marginLeft: "5%",
  },
  Metroplan: {
    marginLeft: "3%",
  },
  Tacografo: {
    marginLeft: "2%",
  },
  Daer: {
    marginLeft: 40,
  },
  Prefeitura: {
    marginLeft: 40,
  },
  Abslote: {
    display: "flex",
    flexDirection: "row",
    zIndex: 1,
    width: "100%",
    height: 60,
    position: "absolute",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  VerificButtom: {
    width: "40%",
    height: 40,
    backgroundColor: "blue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  RelaodButton: {
    width: "20%",
    height: 40,
    backgroundColor: "green",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
