# Chef Now (Expo)

Este projeto é um app de culinária feito em React Native com Expo.

## 📦 Pré-requisitos

- Node.js instalado
- Expo CLI: instale com `npm install -g expo-cli`
- Editor de código (como VSCode)
- Celular com Expo Go **ou** emulador Android

## ▶️ Como rodar

1. **Instale as dependências:**

```bash
npm install
```

2. **Inicie o projeto:**

```bash
expo start
```

3. **Visualize no celular:**

- Instale o app **Expo Go**
- Escaneie o QR Code exibido no terminal ou navegador

## 📁 Estrutura

- `App.tsx` — ponto de entrada que chama o navegador de rotas
- `AppNavigator.tsx` — navegação stack entre todas as telas
- Várias telas: `HomeScreen.tsx`, `ChefsScreen.tsx`, `ItalianaScreen.tsx`, etc.

## ✅ Observações

- Não utilize `npx react-native start`, pois este é um projeto **Expo**.
- Use apenas `@expo/vector-icons`.

---