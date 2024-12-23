import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Novel",
    description: "Explore an extensive collection of timeless novels.",
  },
  {
    title: "Thriller",
    description: "Get your adrenaline pumping with our thrillers.",
  },
  {
    title: "History",
    description: "Dive into the past with captivating historical books.",
  },
  {
    title: "Drama",
    description: "Experience emotional storytelling with drama books.",
  },
  {
    title: "Sci-fi",
    description: "Travel to distant worlds with our sci-fi collection.",
  },
];

const BookCategories = () => {
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    navigate(`/category/${title}`);
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">
          Book Categories
        </h1>
        <p className="text-lg mb-8">
          Discover a variety of book categories to quench your reading thirst.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(category.title)}
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {category.title}
              </h2>
              <p className="text-gray-300">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategories;
