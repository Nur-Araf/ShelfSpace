import useAxiosScure from "@/hooks/AxiosScure";
import { useEffect, useState } from "react";
import Loading from "../animations/Loading";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RecommendedBooks = () => {
    // const axiosScure = useAxiosScure();
    // const [books, setBooks] = useState([]);

    // useEffect(() => {
    //   try {
    //     axiosScure
    //       .get("https://assingment11-backend.vercel.app/all-books")
    //       .then((res) => {
    //         setBooks(res.data);
    //       });
    //   } catch (error) {
    //     console.log("Books not Found", error);
    //   }
    // }, [axiosScure]);


  return (
    <section className="bg-gray-900 bg-opacity-70">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4 sm:mb-6">
            Recommended Books
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Here are some of our recommended books for you to read.
          </p>
        </div>

        {books.length > 0 ? (
          <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(4, 10).map((book, index) => (
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
            <div className="h-[22rem] w-[22rem] md:h-auto md:w-auto flex items-center justify-center">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedBooks;
