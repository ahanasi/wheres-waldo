import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc5ReqwYD11gd8Y-0S06KLd_K5_OEM0Fk",
  authDomain: "wheres-waldo-c76a2.firebaseapp.com",
  projectId: "wheres-waldo-c76a2",
  storageBucket: "wheres-waldo-c76a2.appspot.com",
  messagingSenderId: "887519118543",
  appId: "1:887519118543:web:642a99ed1f641d1b3be3ba",
  measurementId: "G-6DE7CK21JN",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}
const storage = getStorage(app);

export { storage, firestore };
