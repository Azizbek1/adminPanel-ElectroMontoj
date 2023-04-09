import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import GlobalStyle from "./styles/GlobalStyle";
import { queryClient } from "./settings/ReactQuery/ReactQuerySettings";
import { QueryClientProvider } from "react-query";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
