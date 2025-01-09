import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import Loading from "@/components/animations/Loading";
import useAxiosScure from "@/hooks/AxiosScure";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const axiosScure = useAxiosScure();
  const [categories, setCategories] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axiosScure.get(
          `https://assingment11-backend.vercel.app/category/${title}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [axiosScure, title]);

  return (
    <div className="bg-gray-900 bg-opacity-70 min-h-screen p-4 py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>{title} - ShelfSpace</title>
      </Helmet>
      {/* Hero Section with Animation */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-blue-500 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover The Best {title}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          The best books for {title} category. Read and enjoy!
        </motion.p>
      </div>

      {/* Book Cards with Scroll Animations */}
      {categories.length > 0 ? (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pt-6 lg:pt-12">
          {categories.map((book, index) => (
            <motion.div
              key={book._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md text-white transform transition-transform duration-300 hover:scale-105 cursor-pointer shadow-blue-600/20 hover:shadow-blue-500/60"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{book.name}</h2>
              <p className="text-gray-400 mb-2">Author: {book.authorName}</p>
              <p className="text-gray-400 mb-2">Category: {book.category}</p>
              <p className="text-gray-400 mb-2">Quantity: {book.quantity}</p>
              <p className="text-gray-400">Rating</p>
              <ReactStars
                count={5}
                value={book.rating}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
              />
              <Link
                to={`/detail-book/${book._id}`}
                className="bg-blue-500 mt-2 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-300"
              >
                <AiOutlineInfoCircle className="mr-2" /> Details
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto">
          <h1 className="text-lg text-center font-semibold text-blue-500">
            No books found in this category {title}
          </h1>
          <div className="h-[22rem] w-[22rem] md:h-auto md:w-auto flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
