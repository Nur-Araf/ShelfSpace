
import { motion } from "framer-motion";

const feedbacks = [
  {
    name: "John Doe",
    photo: "https://i.ibb.co.com/2P7LQkd/download-15.jpg",
    rating: 5,
    text: "This library has an amazing collection of books. I found everything I was looking for!",
    bookTitle: "The Great Gatsby",
  },
  {
    name: "Jane Smith",
    photo: "https://i.ibb.co.com/dWYX3qQ/download-19.jpg",
    rating: 4,
    text: "A wonderful place for book lovers. The variety is fantastic.",
    bookTitle: "1984",
  },
  {
    name: "Alice Johnson",
    photo: "https://i.ibb.co.com/6RMSVdZ/download-16.jpg",
    rating: 5,
    text: "I love the quiet and peaceful environment. It's the perfect place to read and relax.",
    bookTitle: "Pride and Prejudice",
  },
  {
    name: "Michael Brown",
    photo: "https://i.ibb.co.com/nnJjxf9/download-17.jpg",
    rating: 4,
    text: "Great selection of both classic and modern books. Highly recommended!",
    bookTitle: "To Kill a Mockingbird",
  },
  {
    name: "Emily Davis",
    photo: "https://i.ibb.co.com/fMXjJZm/download-18.jpg",
    rating: 5,
    text: "The staff is very friendly and helpful. They always know what to recommend.",
    bookTitle: "The Catcher in the Rye",
  },
  {
    name: "David Wilson",
    photo: "https://i.ibb.co.com/MZGGHbz/images.jpg",
    rating: 4,
    text: "A wonderful collection of books and a cozy reading environment. Love it!",
    bookTitle: "Moby Dick",
  },
];


const FeedBack = () => {
  return (
    <section className="bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4 sm:mb-6">
            What Our Readers Say
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Hear from our readers about their favorite books and experiences.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={feedback.photo}
                  alt={feedback.name}
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feedback.name}
                  </h3>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: feedback.rating }, (_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927C9.337 2.199 10.663 2.199 10.951 2.927l1.286 3.374 3.608.34c.88.083 1.234 1.14.588 1.686l-2.773 2.354.853 3.433c.247.996-.856 1.757-1.708 1.175L10 13.347l-3.155 1.638c-.852.582-1.955-.179-1.708-1.175l.853-3.433-2.773-2.354c-.646-.546-.293-1.603.588-1.686l3.608-.34 1.286-3.374z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">&quot;{feedback.text}&quot;</p>
              <p className="text-gray-500 text-sm">- {feedback.bookTitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedBack;
