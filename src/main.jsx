import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

} from "@apollo/client";

// Add this to your main.jsx temporarily
const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || ""
  }
});

// Test query
client.query({
  query: gql`
    query TestConnection {
      __typename
    }
  `
})
.then(result => console.log("Apollo Connection Test:", result))
.catch(error => console.error("Apollo Connection Error:", error));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

} from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || "/graphql", // Use the VITE_API_URL variable, fallback to '/graphql' in development

  cache: new InMemoryCache(),
  headers:{
    authorization:localStorage.getItem("token") || " "
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
