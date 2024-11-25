const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
  res.status(200).send({ message: 'Hello, Node.js!' });
});

module.exports = app;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// User Components
import Navbar from "./components/NavBar"; // User-facing Navbar
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Components
import AdminNav from "./components/AdminNav"; // Admin Sidebar Navigation
import HighlightsAdmin from "./components/HighlightsAdmin";
import PopularSpotsAdmin from "./components/PopularSpotsAdmin";
import FeaturedActivitiesAdmin from "./components/FeaturedActivitiesAdmin";
import CategoriesAdmin from "./components/CategoriesAdmin";
import GenerateItineraryAdmin from "./components/GenerateItineraryAdmin"; // New Component
import AddAdmin from "./components/AddAdmin"; // AddAdmin Component
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/admin-login"
          element={
            <>
              <Navbar />
              <AdminLogin />
            </>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <div className="flex">
              {/* Admin Navigation Sidebar */}
              <AdminNav />

              {/* Admin Content Area */}
              <div className="flex-1 p-8">
                <Routes>
                  <Route path="highlights" element={<HighlightsAdmin />} />
                  <Route path="popular-spots" element={<PopularSpotsAdmin />} />
                  <Route path="featured-activities" element={<FeaturedActivitiesAdmin />} />
                  <Route path="categories" element={<CategoriesAdmin />} />
                  <Route path="generate-itinerary" element={<GenerateItineraryAdmin />} />
                  <Route path="add-admin" element={<AddAdmin />} /> {/* New Route */}
                  {/* Redirect /admin-dashboard to /admin-dashboard/highlights */}
                  <Route path="" element={<Navigate to="/admin-dashboard/highlights" />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
