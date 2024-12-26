
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useAxiosScure from "@/hooks/AxiosScure";

const DetailsBookPage = () => {
  const { user } = useContext(AuthContext);
  const axiosScure = useAxiosScure();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const takenDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosScure.get(
          `http://localhost:5000/book/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookData();
  }, [axiosScure, id]);

  const giveUpdateQuantity = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosScure.put(
        `http://localhost:5000/update-quantity/${id}`,
        {
          quantity: book.quantity - 1,
        }
      );
      setBook((prevBook) => ({
        ...prevBook,
        quantity: prevBook.quantity - 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBorrow = async () => {
    if (!returnDate || book.quantity === 0) return;

    try {
      const borrowCheckResponse = await axiosScure.get(
        `http://localhost:5000/borrow/check`,
        {
          params: { bookId: id, userEmail: user.email },
        }
      );

      if (borrowCheckResponse.data.hasBorrowed) {
        toast.error("You have already borrowed this book!");
        return;
      }

      const response = await axiosScure.post(`http://localhost:5000/borrow`, {
        bookId: id,
        userEmail: user.email,
        returnDate,
        takenDate,
      });

      if (response.status === 201) {
        giveUpdateQuantity();
        setIsModalOpen(false);
        toast.success("Book borrowed successfully!");
      } else {
        console.error("Failed to borrow the book:", response.data);
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };
 
  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    setReturnDate(formattedDate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-3 md:p-5 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black bg-opacity-50 p-4 md:p-8 rounded-lg shadow-lg max-w-4xl w-full"
      >
        <div className="mb-6 h-80 flex justify-center">
          <img
            src={book?.image}
            alt="Book Cover"
            className="max-w-xs w-full rounded-md shadow-md"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{book?.name}</h1>
          <div className="space-y-2">
            <p className="text-lg"> {book?.authorName}</p>
            <p className="text-lg">{book?.category}</p>
            <p className="text-lg"> {book?.shortDescription}</p>
            <p className="text-lg">{book?.bookContent}</p>
            <p className="text-lg">
              <strong>Quantity:</strong> {book?.quantity}
            </p>
            <p className="text-lg">
              <strong>Rating:</strong> {book?.rating}
            </p>
          </div>
          <button
            className={`mt-4 w-full px-4 py-2 rounded ${
              book?.quantity === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => setIsModalOpen(true)}
            disabled={book?.quantity === 0}
          >
            Borrow
          </button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-10 justify-center">
          <div className="modal-box bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h3 className="font-bold text-lg mb-4">Borrow Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBorrow();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={user?.displayName}
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Return Date</label>
                <DatePicker
                  selected={returnDate ? new Date(returnDate) : null}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Borrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBookPage;
