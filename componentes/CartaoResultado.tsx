import { StyleSheet, Text, View } from "react-native";

import type { Produto } from "../interfaces/Produto";

interface CartaoResultadoProps {
  codigoLido: string | null;
  produtoEncontrado: Produto | undefined;
}

export default function CartaoResultado({
  codigoLido,
  produtoEncontrado,
}: CartaoResultadoProps) {
  if (codigoLido === null) {
    return (
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Aguardando leitura</Text>
        <Text style={styles.texto}>Aponte para um código de barras.</Text>
      </View>
    );
  }

  if (produtoEncontrado) {
    return (
      <View style={[styles.cartao, styles.cartaoEncontrado]}>
        <Text style={styles.tituloEncontrado}>✅ Produto encontrado</Text>
        <Text style={styles.nomeProduto}>{produtoEncontrado.nome}</Text>
        <Text style={styles.preco}>
          {produtoEncontrado.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.cartao, styles.cartaoNaoEncontrado]}>
      <Text style={styles.tituloNaoEncontrado}>❌ Produto não encontrado</Text>
      <Text style={styles.texto}>Código lido: {codigoLido}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    minHeight: 88,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cartaoEncontrado: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },
  cartaoNaoEncontrado: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  titulo: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "bold",
  },
  texto: {
    color: "#4B5563",
    fontSize: 14,
    marginTop: 5,
  },
  tituloEncontrado: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "bold",
  },
  tituloNaoEncontrado: {
    color: "#B91C1C",
    fontSize: 16,
    fontWeight: "bold",
  },
  nomeProduto: {
    color: "#1F2937",
    fontSize: 15,
    marginTop: 5,
  },
  preco: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },
});
