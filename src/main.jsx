import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Reducers/store.js";
// import { store } from "./Redux/store.js";
// import Counter from "./Components/Counter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    {/* <Counter /> */}
  </Provider>
);
