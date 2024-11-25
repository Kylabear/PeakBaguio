import React from "react";
import HighlightsAdmin from "../components/HighlightsAdmin";
import PopularSpotsAdmin from "../components/PopularSpotsAdmin";
import FeaturedActivitiesAdmin from "../components/FeaturedActivitiesAdmin";
import CategoriesAdmin from "../components/CategoriesAdmin";
import HotelsAdmin from "../components/HotelsAdmin"; 
import RestaurantsAdmin from "../components/RestaurantsAdmin"; 

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-8">
        <HighlightsAdmin />
      </section>

      <section className="mb-8">
        <PopularSpotsAdmin />
      </section>

      <section className="mb-8">
        <FeaturedActivitiesAdmin />
      </section>

      <section className="mb-8">
        <CategoriesAdmin />
      </section>

      <section className="mb-8">
        <HotelsAdmin />  
      </section>

      <section className="mb-8">
        <RestaurantsAdmin /> 
      </section>
    </div>
  );
};

export default AdminDashboard;
