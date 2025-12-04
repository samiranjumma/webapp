import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import MealDetailsPage from "./MealDetailsPage.jsx";
import MealListPage from "./MealListPage.jsx";
import WeatherPage from "./WeatherPage.jsx";
import Navbar from "./Navbar.jsx";
import SearchMealPage from "./SearchFoodItem.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/meals" element={<MealListPage />} />
      <Route path="/meals/:id" element={<MealDetailsPage />} />
      {<Route path="/search" element={<SearchMealPage />} />}
      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  </BrowserRouter>
);
