import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loading from "../animations/Loading";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/all-books").then((res) => {
        setBooks(res.data);
      });
    } catch (error) {
      console.log("Books not Found", error);
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-4 py-8 md:py-12 lg:py-16">
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-blue-500 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Your Next Great Adventure
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Dive into our curated selection of books and find your next favorite
          read
        </motion.p>
      </div>

      {books.length > 0 ? (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pt-6 lg:pt-12">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              className="bg-black p-4 rounded-lg shadow-md text-white transform transition-transform duration-300 hover:scale-105 cursor-pointer shadow-blue-600/20 hover:shadow-blue-500/60"
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
                to={`/update-book/${book._id}`}
                className="bg-blue-500 mt-2 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-300"
              >
                <FaEdit className="mr-2" /> Update
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto">
          <h1 className="text-lg text-center font-semibold text-blue-500 md:mb-4">Loading... Please Wait</h1>
          <div className="h-[22rem] w-[22rem] md:h-[32rem] md:w-[32rem] flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
