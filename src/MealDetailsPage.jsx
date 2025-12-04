import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MealDetailsPage = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
      );
      setCategories(res.data.meals);
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  return (
    <div>
      <h2>Meal Details</h2>
      {categories.map((item) => (
        <div key={item.idMeal}>
          <h3>{item.strMeal}</h3>
          <img src={item.strMealThumb} alt={item.strMeal} />
          <p>Category: {item.strCategory}</p>
          <p>Area: {item.strArea}</p>
        </div>
      ))}
    </div>
  );
};

export default MealDetailsPage;
