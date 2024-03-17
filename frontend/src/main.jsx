import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {/* Your navigation menu or links can go here */}
      {/* The Switch component ensures that only one Route component is rendered at a time */}
      <Routes>
        {/* Define routes using the Route component */}
        <Route exact path="/" element={<App />} />
        {/* <Route path="/upload" element={<FileUploader />} /> */}
        {/* This route will render when no other route matches */}
        <Route component={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
