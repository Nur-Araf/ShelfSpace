import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import { useState } from "react";
import useAxiosScure from "@/hooks/AxiosScure";
import { Helmet } from "react-helmet";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const axiosScure = useAxiosScure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.image[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgdb}`,
        formData
      );
      const imageUrl = response.data.data.url;
      const bookData = {
        ...data,
        category: data.category.value,
        image: imageUrl,
      };

      axiosScure
        .post("https://assingment11-backend.vercel.app/add-book", bookData)
        .then((response) => {
          console.log(response.data);
          toast.success("Book details submitted successfully!");
          setLoading(false);
          reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to submit book details. Please try again.");
          setLoading(false);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      setLoading(false);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#2d3748",
      borderColor: "#2d3748",
      color: "white",
      padding: "0.40rem",
      borderRadius: "0.375rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1D4ED8"
        : state.isFocused
        ? "#2d3748"
        : "#2d3748",
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#A1A1AA",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2d3748",
      marginTop: 5,
      marginBottom: 5,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
    }),
  };

  const categoryOptions = [
    { value: "Novel", label: "Novel" },
    { value: "Thriller", label: "Thriller" },
    { value: "History", label: "History" },
    { value: "Drama", label: "Drama" },
    { value: "Sci-Fi", label: "Sci-Fi" },
  ];

  const handleCategoryChange = (selectedOption) => {
    setValue("category", selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="bg-gray-900 bg-opacity-70 py-8 md:py-20">
      <Helmet>
        <title>Add Book - ShelfSpace</title>
      </Helmet>
      <div className="max-w-[25rem] md:max-w-2xl mx-auto bg-gray-900 p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Submit Book Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Name:</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Book Title"
              {...register("name", { required: "Book title is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Quantity:</label>
            <input
              type="number"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Quantity"
              {...register("quantity", {
                required: "Quantity is required",
                min: 1,
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Author Name:</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Author's Name"
              {...register("author", { required: "Author name is required" })}
            />
            {errors.author && (
              <span className="text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Category:</label>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              onChange={handleCategoryChange}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  className="w-full"
                  classNamePrefix="react-select"
                  placeholder="Select Category"
                  isClearable
                  styles={customStyles}
                />
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Short Description:</label>
            <textarea
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Brief description of the book"
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Rating"
              {...register("rating", {
                required: "Rating is required",
                min: 1,
                max: 5,
              })}
            />
            {errors.rating && (
              <span className="text-red-500 text-sm">
                {errors.rating.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Book Content:</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Enter more information about the book"
              {...register("bookContent", {
                required: "Book content is required",
              })}
            />
            {errors.bookContent && (
              <span className="text-red-500 text-sm">
                {errors.bookContent.message}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-500 focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
