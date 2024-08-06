import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import AppRouter from "./app/AppRouter";
import Loading from "./app/Components/common/Loading";
import Content from "./app/Page/Content";
import Footer from "./app/Page/Footer";
import Header from "./app/Page/Header";
import store from "./store/store";
//import logo from "./logo.svg";
import "./App.css";

export const App = ({ children }) => (
    <div className="App">
        <header id="id_appHeader" className="App-header">
            {/* <img src={logo} className="logo" alt="logo" /> */}
            {/* <div className="logo">HGSV</div> */}
            <Header />
        </header>
        <div id="id_appContent" className="App-content">
            <Suspense fallback={<Loading />}>
                <Content>{children || <Outlet />}</Content>
            </Suspense>
        </div>
        <footer id="id_appFooter" className="App-footer">
            <Footer />
        </footer>
    </div>
);

const render = () => {
    //const rootContainer = document.getElementById("id_workspace");

    //ReactDOM.render(
    const root = ReactDOM.createRoot(document.getElementById("id_workspace"));
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <AppRouter>
                    <App />
                </AppRouter>
            </Provider>
        </React.StrictMode>
    );
};

export default render;
