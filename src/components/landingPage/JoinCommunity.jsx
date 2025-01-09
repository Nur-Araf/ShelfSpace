/* eslint-disable no-unused-vars */
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

const JoinCommunity = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setMessage("");
    toast.success(`Subscribe Successfull with ${email}`);
    setEmail("");

    // try {
    //   const response = await fetch("https://assingment11-backend.vercel.app/subscribe", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (response.ok) {
    //     toast.success("Subscribed successfully!");
    //     setEmail("");
    //   } else {
    //     toast.error("Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   console.log("Error during subscription:",error);
    // }

    // setLoading(false);
  };

  return (
    <section className="bg-gray-900 bg-opacity-70">
      <div className="max-w-6xl mx-auto flex flex-col py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-500 mb-4">
            Join Our Community
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Connect with fellow book lovers, share your favorite reads, and
            discover new stories.
          </p>
        </div>

        {/* Benefits and Features Section */}
        <div className=" text-gray-300">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-400">
            Why Join Us?
          </h2>
          <ul className="space-y-4 text-gray-400 text-lg sm:text-xl">
            <li>
              📚{" "}
              <span className="font-medium">
                Exclusive Book Recommendations:
              </span>{" "}
              Get curated reading lists tailored to your interests.
            </li>
            <li>
              🌟{" "}
              <span className="font-medium">
                Engage with a Vibrant Community:
              </span>{" "}
              Share thoughts, reviews, and connect with like-minded readers.
            </li>
            <li>
              🎉{" "}
              <span className="font-medium">
                Access to Events and Giveaways:
              </span>{" "}
              Participate in book club meetings, contests, and more.
            </li>
            <li>
              🛠 <span className="font-medium">Personalized Reading Tools:</span>{" "}
              Track your reading habits and set goals effortlessly.
            </li>
          </ul>
        </div>

        {/* Newsletter Form */}
        <div className="mt-12 w-full max-w-md">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:flex-1 bg-gray-800 text-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-sm text-gray-400 mt-4">{message}</p>}
        </div>

        {/* Social Media Links */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            Follow Us on Social Media
          </h2>
          <div className="flex gap-8">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-5xl transition duration-300"
            >
              <FaFacebookF />
              <p className="text-gray-300 text-base mt-2">Facebook</p>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nur-araf-shishir-4798a4308/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-5xl transition duration-300"
            >
              <FaLinkedinIn />
              <p className="text-gray-300 text-base mt-2">LinkedIn</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
