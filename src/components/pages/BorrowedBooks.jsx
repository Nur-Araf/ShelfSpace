import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Loading from "../animations/Loading";
import { motion } from "framer-motion";
import { GiReturnArrow } from "react-icons/gi";
import Swal from "sweetalert2";
import useAxiosScure from "@/hooks/AxiosScure";
import { Helmet } from "react-helmet";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const axiosScure = useAxiosScure();
  const [borrowBooksData, setBorrowBooksData] = useState([]);
  const [borrowBookId, setBorrowBookId] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedData = async () => {
      try {
        const response = await axiosScure.get(
          `https://assingment11-backend.vercel.app/borrowed-books/${user?.email}`
        );
        setBorrowBooksData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBorrowedData();
  }, [user?.email, axiosScure]);

  useEffect(() => {
    const ids = borrowBooksData.map((book) => book.bookId);
    setBorrowBookId(ids);
  }, [borrowBooksData]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDetailsPromises = borrowBookId.map((id) =>
          axiosScure.get(`https://assingment11-backend.vercel.app/book/${id}`)
        );
        const bookDetailsResponses = await Promise.all(bookDetailsPromises);
        const bookDetails = bookDetailsResponses.map(
          (response) => response.data
        );
        setBorrowedBooks(bookDetails);
      } catch (error) {
        console.log(error);
      }
    };

    if (borrowBookId.length > 0) {
      fetchBookDetails();
    }
  }, [axiosScure, borrowBookId]);

  const getBorrowedData = (bookId) => {
    const matchedBook = borrowBooksData.find((book) => book.bookId === bookId);
    return matchedBook
      ? { takenDate: matchedBook.takenDate, returnDate: matchedBook.returnDate }
      : {};
  };

  const handleReturn = async (bookId) => {
    try {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we return your book.",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axiosScure
        .delete(`https://assingment11-backend.vercel.app/borrow/${bookId}`)
        .then((res) => {
          console.log(res.data);
        });

      Swal.fire({
        title: "Success!",
        text: "Your book has been returned.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue returning the book. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Borrowed Books - ShelfSpace</title>
      </Helmet>
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-blue-500 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Borrowed Books
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Here are the books you have borrowed. Please return them on time.
        </motion.p>
      </div>

      {borrowedBooks.length > 0 ? (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pt-6 lg:pt-12">
          {borrowedBooks.map((book, index) => {
            const { takenDate, returnDate } = getBorrowedData(book._id); // Fetch matching data
            return (
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
                <p className="text-gray-400 mb-2">Borrowed Date: {takenDate}</p>
                <p className="text-gray-400 mb-2">Return Date: {returnDate}</p>
                <button
                  onClick={() => handleReturn(book._id)}
                  className="bg-blue-500 mt-2 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-300"
                >
                  <GiReturnArrow className="mr-2" /> Return
                </button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-[25rem] md:max-w-2xl lg:max-w-5xl mx-auto">
          <h1 className="text-lg text-center font-semibold text-blue-500 md:mb-4">
            No Books Borrowed
          </h1>
          <div className="h-[22rem] w-[22rem] md:h-[32rem] md:w-[32rem] flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
