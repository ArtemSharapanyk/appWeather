import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "antd";
import setupStore from "./redux";
import "normalize.css";
import "./assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./components/routes/AppRouter/AppRouter";
import { AppHeader } from "./components/shared/AppHeader/AppHeader";

function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Layout>
          <Layout className="site-layout">
            <AppHeader />
            <AppRouter />
          </Layout>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
