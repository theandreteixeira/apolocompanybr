import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store/store';
import { theme } from './theme';
import axios from 'axios';
import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './aws-exports';

const isLocalhost = Boolean(window.location.hostname === "localhost");
console.log("islocalhost" + isLocalhost)
const [
  productionRedirectSignIn,
  localRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");
const [
  productionRedirectSignOut,
  localRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");
const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);


axios.defaults.baseURL = "https://nu2j0olma7.execute-api.us-east-1.amazonaws.com/default/";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);