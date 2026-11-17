import { FlatList, StyleSheet, Text, View } from "react-native";

import type { Produto } from "../interfaces/Produto";

interface ListaProdutosProps {
  produtos: Produto[];
  codigoDestacado: string | null;
}

export default function ListaProdutos({
  produtos,
  codigoDestacado,
}: ListaProdutosProps) {
  return (
    <FlatList
      style={styles.lista}
      data={produtos}
      extraData={codigoDestacado}
      keyExtractor={(item) => item.codigo}
      ListHeaderComponent={
        <Text style={styles.tituloLista}>Produtos cadastrados</Text>
      }
      renderItem={({ item }) => {
        const destacado = item.codigo === codigoDestacado;

        return (
          <View
            style={[
              styles.item,
              destacado && styles.itemDestacado,
            ]}
          >
            <Text style={styles.nomeProduto}>{item.nome}</Text>
            <Text style={styles.codigo}>{item.codigo}</Text>
          </View>
        );
      }}
      contentContainerStyle={styles.conteudo}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    marginTop: 12,
  },
  conteudo: {
    paddingBottom: 12,
  },
  tituloLista: {
    color: "#1F2937",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  itemDestacado: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
    borderWidth: 2,
  },
  nomeProduto: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "600",
  },
  codigo: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
});
