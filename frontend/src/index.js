import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';

const Routing = (
    <BrowserRouter>
        <CookiesProvider>
            <Routes>
                <Route path="/" element={<Login/>} exact/>
                <Route path="/movies" element={<App/>} exact/>

            </Routes>

        </CookiesProvider>

    </BrowserRouter>
)

ReactDOM.render(
    Routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
