import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/shared/Navigation/Navigation";
import setupStore from "./redux";
import "normalize.css";
import "./assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import BaseRouter from "./components/routes/AppRouter/AppRouter";

function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Navigation />
        <BaseRouter />
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
