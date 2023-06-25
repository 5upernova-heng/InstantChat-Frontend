import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ToastContainer theme="dark"/>
        <App/>
    </React.StrictMode>,
)
