import React from "react";
import "./App.css";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import Project from "./views/Project";
import Header from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <div>
                <Header />
                <Dashboard />
              </div>
            }
          />
          <Route
            exact
            path="/projects"
            element={
              <div>
                <Header />
                <Project />
              </div>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <div>
                <Header />
                <About />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
