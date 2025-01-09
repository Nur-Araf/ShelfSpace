import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loading from "../animations/Loading";
import useAxiosScure from "@/hooks/AxiosScure";
import { Helmet } from "react-helmet";

const AllBooks = () => {
  const axiosScure = useAxiosScure();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [view, setView] = useState("card");
  const [filterAvailable, setFilterAvailable] = useState(false);

  useEffect(() => {
    try {
      axiosScure
        .get("https://assingment11-backend.vercel.app/all-books")
        .then((res) => {
          setBooks(res.data);
          setFilteredBooks(res.data);
        });
    } catch (error) {
      console.log("Books not Found", error);
    }
  }, [axiosScure]);

  const handleFilterAvailable = () => {
    setFilterAvailable((prev) => !prev);
    if (!filterAvailable) {
      setFilteredBooks(books.filter((book) => book.quantity > 0));
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-70 min-h-screen p-4 py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>All Books - ShelfSpace</title>
      </Helmet>
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

      <div className="flex justify-center mb-8">
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="text-blue-500 font-semibold">
              {view === "card" ? "Table" : "Card"}
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={view === "table"}
              onChange={() => setView(view === "card" ? "table" : "card")}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleFilterAvailable}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {filterAvailable ? "Show All Books" : "Show Available Books"}
        </button>
      </div>

      {filteredBooks.length > 0 ? (
        view === "card" ? (
          <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pt-6 lg:pt-12">
            {filteredBooks.map((book, index) => (
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
                <p className="text-gray-400 mb-2">Available: {book.quantity}</p>
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
            <div className="overflow-x-auto">
              <div className="shadow-lg rounded-md bg-gray-800 text-white p-6">
                <div className="text-lg font-semibold text-center mb-6">
                  All Books Table
                </div>
                <div className="space-y-4">
                  {filteredBooks.map((book, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center justify-between bg-gray-700 p-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      <div className="flex items-center w-full md:w-1/4 mb-4 md:mb-0">
                        <img
                          src={book.image}
                          alt={book.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h2 className="font-bold text-sm md:text-base">
                            {book.name}
                          </h2>
                          <p className="text-gray-400 text-xs md:text-sm">
                            {book.authorName}
                          </p>
                          <p className="text-gray-400 text-xs md:text-sm">
                            {book.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 text-center mb-4 md:mb-0">
                        <p className="text-xs md:text-base">{book.category}</p>
                      </div>
                      <div className="w-full md:w-1/4 text-center mb-4 md:mb-0">
                        <ReactStars
                          count={5}
                          value={book.rating}
                          size={20}
                          activeColor="#ffd700"
                          isHalf={true}
                          edit={false}
                        />
                      </div>
                      <div className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full md:w-auto text-center">
                        <Link
                          to={`/update-book/${book._id}`}
                          className="flex items-center justify-center"
                        >
                          <FaEdit className="mr-2" /> Update
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto">
          <h1 className="text-lg text-center font-semibold text-blue-500 md:mb-4">
            Loading... Please Wait
          </h1>
          <div className="h-[22rem] w-[22rem] md:h-[32rem] md:w-[32rem] flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
