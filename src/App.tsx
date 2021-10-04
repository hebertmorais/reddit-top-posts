import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./pages/home";
import store, { persistor } from "./redux/store";

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <HomePage />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
