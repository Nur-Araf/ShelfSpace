import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
          <div className="mb-4 md:mb-0 text-center lg:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <div className="h-28 w-36 md:h-36 md:w-44 lg:h-44 lg:w-52">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-blue-500">ShelfSpace</h2>
            </div>
            <div>
              <p className="mt-2 text-blue-500 text-xl font-semibold">
                A Library Management System
              </p>
            </div>
            <p className="mt-2 text-sm">Enhancing your reading experience.</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <div className="flex justify-center space-x-4 mb-2">
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                Privacy Policy
              </a>
            </div>
            <p className="mb-2">
              &copy; 2024 Library Management System. All rights reserved.
            </p>
            <div className="mt-8 text-center">
              <p>Visit our library and explore a world of knowledge.</p>
              <p className="mt-2">123 Library Street, Booktown, BK 56789</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">Follow us:</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
