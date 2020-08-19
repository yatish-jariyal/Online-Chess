import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/reducers/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
