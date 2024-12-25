import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reading from "../animations/Reading";

const images = [
  "https://i.ibb.co/ZB7SbtB/pexels-gesel-757855.jpg",
  "https://i.ibb.co/nmBd209/pexels-donghuangmingde-2177482.jpg",
  "https://i.ibb.co/QKvkhjr/pexels-element5-1370298.jpg",
  "https://i.ibb.co.com/J7TN1R8/pexels-abby-chung-371167-1106468.jpg",
  "https://i.ibb.co.com/J7TN1R8/pexels-abby-chung-371167-1106468.jpg",
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="relative w-full h-[90vh] md:h-[90vh] lg:h-[95vh] overflow-hidden">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 1 }}
        >
          {images.map((src, index) => (
            <div key={index} className="relative min-w-full h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center mt-10 md:mt-16 lg:mt-36 text-white px-4">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2 text-blue-600"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Welcome to ShelfSpace
          </motion.h2>
          <motion.p
            className="text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Discover Your Next Great Adventure
          </motion.p>
        </div>

        <div className="absolute bottom-16 lg:bottom-28 bg-black bg-opacity-10 rounded-3xl left-1/2 transform -translate-x-1/2 h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 p-4">
          <Reading />
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
