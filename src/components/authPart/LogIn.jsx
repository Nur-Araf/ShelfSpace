import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Working from "../animations/Working";
import { AuthContext } from "@/providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const LogIn = () => {
  const { singInUser, setUser, singInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    try {
      singInUser(data.email, data.password)
        .then(
          (res) => setUser(res.user),
          reset(),
          navigate("/"),
          toast.success("SingIn successful!")
        )
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error("Please try again!");
      console.log(error);
    }
  };

  const handleGmailSignIn = async() => {
    try {
      const res = await singInWithGoogle();
      toast.success("SingIn successful!");
      setUser(res.user);
      navigate("/");
    } catch (err) {
      toast.error("Please try again!");
      console.log("Error during Gmail sign-in:", err);
    }
  };

  return (
    <div className="flex gap-6 font-montserrat justify-center items-center min-h-screen bg-gray-900 px-4 py-8">
      <Helmet>
        <title>Log In - ShelfSpace</title>
      </Helmet>
      <div className="bg-black lg:ml-32 p-8 rounded-lg shadow-lg w-full sm:max-w-md lg:max-w-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 bg-gray-700"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 bg-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGmailSignIn}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-md text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"} className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 ml-20 hidden lg:flex">
        <Working />
      </div>
    </div>
  );
};

export default LogIn;
