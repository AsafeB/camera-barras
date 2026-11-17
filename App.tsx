import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import CartaoResultado from "./componentes/CartaoResultado";
import ListaProdutos from "./componentes/ListaProdutos";
import { PRODUTOS } from "./dados/produtos";

function ConteudoApp() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [codigoLido, setCodigoLido] = useState<string | null>(null);
  const travaLeitura = useRef(false);

  const produtoEncontrado = codigoLido
    ? PRODUTOS.find((produto) => produto.codigo === codigoLido)
    : undefined;

  function tratarLeitura(resultado: BarcodeScanningResult) {
    if (travaLeitura.current) {
      return;
    }

    travaLeitura.current = true;
    setCodigoLido(resultado.data);
  }

  function escanearNovamente() {
    travaLeitura.current = false;
    setCodigoLido(null);
  }

  async function lidarComPermissao() {
    try {
      if (permissao && !permissao.canAskAgain) {
        await Linking.openSettings();
        return;
      }

      await pedirPermissao();
    } catch (erro) {
      console.error("Não foi possível abrir ou solicitar a permissão:", erro);
    }
  }

  if (!permissao) {
    return (
      <SafeAreaView style={styles.telaPermissao}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoPermissao}>
          Consultando permissão da câmera...
        </Text>
      </SafeAreaView>
    );
  }

  if (!permissao.granted) {
    const precisaAbrirConfiguracoes = !permissao.canAskAgain;

    return (
      <SafeAreaView style={styles.telaPermissao}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.tituloPermissao}>Acesso à câmera</Text>
        <Text style={styles.textoPermissao}>
          O aplicativo precisa da câmera do celular para ler os códigos de
          barras dos produtos.
        </Text>

        <Pressable
          style={styles.botaoPermissao}
          onPress={lidarComPermissao}
        >
          <Text style={styles.textoBotao}>
            {precisaAbrirConfiguracoes
              ? "Abrir configurações"
              : "Permitir câmera"}
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.titulo}>Tem na lista?</Text>

        <View style={styles.areaCamera}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["ean13"],
            }}
            onBarcodeScanned={
              codigoLido === null ? tratarLeitura : undefined
            }
          />

          <View pointerEvents="none" style={styles.sobreposicao}>
            <View style={styles.moldura} />
          </View>
        </View>

        <CartaoResultado
          codigoLido={codigoLido}
          produtoEncontrado={produtoEncontrado}
        />

        {codigoLido !== null && (
          <Pressable
            style={styles.botaoNovamente}
            onPress={escanearNovamente}
          >
            <Text style={styles.textoBotao}>Escanear novamente</Text>
          </Pressable>
        )}

        <ListaProdutos
          produtos={PRODUTOS}
          codigoDestacado={produtoEncontrado?.codigo ?? null}
        />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ConteudoApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  titulo: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  areaCamera: {
    height: 210,
    backgroundColor: "#111827",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  sobreposicao: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  moldura: {
    width: "82%",
    height: 76,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 8,
  },
  botaoNovamente: {
    height: 44,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  lista: {
    flex: 1,
  },
  telaPermissao: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  tituloPermissao: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  textoPermissao: {
    color: "#4B5563",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
  },
  botaoPermissao: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 13,
    marginTop: 22,
  },
});
