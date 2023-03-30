import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import logo from './logo-2.png';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <App />
    <button className="btn--sound">
      <span className="material-symbols-rounded">music_note</span>
    </button>
    <footer></footer>
  </React.StrictMode>,
);
