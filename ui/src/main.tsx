import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { client } from "./api";
import { App } from "./App";
import { AppStore } from "./AppStore";
import "./index.css";
import { Visualization } from "./Visualization";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppStore />,
  },
  {
    path: "app/:appUrl",
    element: <App />,
    children: [
      {
        path: "visualization/:visualizationId",
        element: <Visualization />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
