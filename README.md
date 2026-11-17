# Tem na lista?

Aplicativo mobile desenvolvido com Expo, React Native e TypeScript para ler códigos de barras EAN-13 e verificar se o produto está cadastrado em uma lista local.

## Requisitos

- Node.js 22.13 ou superior na linha 22, 24.3 ou superior na linha 24, ou 26 ou superior.
- Expo Go compatível com o SDK 58 no celular.
- Um celular Android ou iOS com câmera.
- GitHub Codespaces ou ambiente local com Node.js.

## Preparar o projeto

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Executar

```bash
npx expo start --tunnel
```

Escaneie o QR Code com o Expo Go. Caso o Expo CLI solicite autenticação para iniciar o túnel, entre na sua conta Expo com `npx expo login`.

## Verificar os tipos TypeScript

```bash
npm run typecheck
```

## Verificações sugeridas

- Leia um dos dez códigos cadastrados para conferir nome, preço e destaque na lista.
- Leia o código `7899876000114` para conferir o resultado de produto não encontrado.
- Depois de uma leitura, aponte para outro código sem tocar em "Escanear novamente": o resultado anterior deve permanecer.
- Toque em "Escanear novamente" para liberar a próxima leitura.
- Teste a permissão de câmera negada e concedida.

## Organização

- `interfaces/Produto.ts`: tipo dos produtos.
- `dados/produtos.ts`: cadastro local dos dez produtos.
- `componentes/CartaoResultado.tsx`: cartão com o resultado da leitura.
- `componentes/ListaProdutos.tsx`: lista de produtos com destaque.
- `App.tsx`: permissões, câmera e controle de leitura.
