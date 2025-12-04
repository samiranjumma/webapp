import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  return (
    <div>
      {categories.map((item, index) => (
        <div key={index}>
          <h1>{item.strCategory}</h1>
          <img src={item.strCategoryThumb} alt={item.strCategory} />
          <p>{item.strCategoryDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
