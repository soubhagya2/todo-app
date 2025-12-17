import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { IndexPage } from "./todoCompo/IndexPage/Index.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <IndexPage />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </StrictMode>
);
