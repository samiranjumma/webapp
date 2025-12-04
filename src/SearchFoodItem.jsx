import axios from "axios";
import { useState } from "react";

const SearchMealPage = () => {
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
      );
      setMeals(res.data.meals || []); 
    } catch (error) {
      console.error("সার্চ করতে সমস্যা হয়েছে:", error);
    }
  };

  return (
    <div>
      <h2>Search Meal</h2>

      <input
        type="text"
        placeholder="Search meal..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button onClick={searchMeals}>Search</button>

      {meals.map((item) => (
        <div key={item.idMeal}>
          <h3>{item.strMeal}</h3>
          <img src={item.strMealThumb} alt={item.strMeal} width="200" />
        </div>
      ))}
    </div>
  );
};

export default SearchMealPage;
