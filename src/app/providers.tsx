"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../Redux/store/store";
import { CustomThemeProvider } from "../components/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomThemeProvider>
          {children}
          <ToastContainer position="top-center" autoClose={2000} />
        </CustomThemeProvider>
      </PersistGate>
    </Provider>
  );
}
