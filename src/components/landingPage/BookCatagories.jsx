import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedBird from "../animations/FinalAnimations/AnimatedBird";
import { useEffect, useState } from "react";

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
  const [largeScreen, setLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(window.innerWidth >= 1440);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = (title) => {
    navigate(`/category/${title}`);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {largeScreen && <AnimatedBird />}
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4 sm:mb-6">
            Book Categories
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Discover a variety of book categories to quench your reading thirst.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(category.title)}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">
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
