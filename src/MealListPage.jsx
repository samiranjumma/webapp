import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MealListPage = () => {
  // 🟢 এখানে API থেকে আসা সব meals লিস্ট হিসেবে রাখা হবে
  const [categories, setCategories] = useState([]);

  // 🟢 কম্পোনেন্ট লোড হওয়ার সাথে সাথে fetchCategories() একবার রান করবে
  useEffect(() => {
    fetchCategories();
  }, []);

  // 🟢 এই ফাংশনটা API থেকে ডেটা এনে স্টেটে সেট করে
  const fetchCategories = async () => {
    try {
      // ⚡ এখানে API এ রিকোয়েস্ট পাঠানো হচ্ছে (Seafood category)
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      );

      // ⚡ API থেকে পাওয়া meals ডেটা categories স্টেটে রাখা হচ্ছে
      setCategories(res.data.meals);
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  return (
    <div>
      <h2>Seafood Meals</h2>

      {/* 🟢 এখানে map ব্যবহার করে লিস্ট থেকে UI তৈরি করা হচ্ছে */}
      {categories.map((item) => (
        <div key={item.idMeal}>
          {/* 🔗 প্রতিটি meal এ ক্লিক করলে বিস্তারিত পেজে যাবে */}
          <Link to={`/meals/${item.idMeal}`}>
            <h3>{item.strMeal}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MealListPage;
