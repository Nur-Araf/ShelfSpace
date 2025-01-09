import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-8 text-blue-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-base md:text-xl text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to our book library! We offer a wide range of books for
          readers of all ages and interests. Our mission is to foster a love for
          reading and provide a community space for knowledge sharing.
        </motion.p>

        <div className="flex justify-center items-center gap-12">
          <motion.div
            className="w-48 h-48 bg-blue-600 rounded-full hidden md:flex justify-center items-center text-white shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              x: ["0%", "200%", "0%"], // Move back and forth across the X-axis
            }}
            transition={{
              duration: 4, // Duration for one complete cycle
              repeat: Infinity, // Keep repeating the animation
              repeatType: "loop", // Loop the animation indefinitely
              ease: "easeInOut", // Smooth ease
            }}
          >
            <span className="text-4xl">📚</span>
          </motion.div>

          <motion.div
            className="w-48 h-48 bg-gray-700 rounded-full hidden md:flex justify-center items-center text-white shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              x: ["0%", "-200%", "0%"], // Move back and forth in the opposite direction
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <span className="text-4xl">🤝</span>
          </motion.div>
        </div>

        <motion.p
          className="text-xl text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Our library is not just about books, it&apos;s about building a
          community where people can connect, learn, and grow together. Join us
          and be a part of our journey!
        </motion.p>
      </div>
    </section>
  );
};

export default AboutUs;
