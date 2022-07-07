import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
    <React.StrictMode>
      <MoralisProvider serverUrl="https://hlfkcc6tn1jq.usemoralis.com:2053/server" appId="3OXf17wq3rxjMGH3Qp9aQgmzQAEew74ro8tNM7Ks">
        <App />
      </MoralisProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
