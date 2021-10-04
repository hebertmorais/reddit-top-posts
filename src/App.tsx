import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import HomePage from "./pages/home";
import store from "./redux/store";

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  </Provider>
);
