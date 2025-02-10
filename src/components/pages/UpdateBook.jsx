import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosScure from "@/hooks/AxiosScure";
import { Helmet } from "react-helmet";

const UpdateBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const [oneBook, setOneBook] = useState({});
  const [loading, setLoading] = useState(false);
  const axiosScure = useAxiosScure();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosScure.get(
          `https://assingment11-backend.vercel.app/book/${id}`
        );
        setOneBook(response.data);
        reset(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookData();
  }, [axiosScure, id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    let imageUrl = oneBook.image;

    if (isImageSelected) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgdb}`,
          formData
        );
        imageUrl = response.data.data.url;
      } catch (error) {
        console.error(
          "Image upload failed:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
        return;
      }
    }

    const categoryValue =
      data.category.value === undefined
        ? oneBook.category
        : data.category.value;

    const bookData = {
      ...data,
      image: imageUrl,
      authorName: data.authorName || oneBook.authorName,
      category: categoryValue,
    };

    try {
      await axiosScure.put(
        `https://assingment11-backend.vercel.app/update-book/${id}`,
        bookData
      );
      reset();
      toast.success("Book updated successfully!");
      navigate("/all-books");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the book.");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "Novel", label: "Novel" },
    { value: "Thriller", label: "Thriller" },
    { value: "History", label: "History" },
    { value: "Drama", label: "Drama" },
    { value: "Sci-Fi", label: "Sci-Fi" },
  ];

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

  const handleCategoryChange = (selectedOption) => {
    setValue("category", selectedOption ? selectedOption.value : "");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-70 py-8 md:py-20">
      <Helmet>
        <title>Update Books - ShelfSpace</title>
      </Helmet>
      <div className="max-w-[25rem] md:max-w-2xl mx-auto bg-gradient-to-tl from-black via-blue-950 to-blue-900 p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Update Book Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              {...register("image")}
              onChange={handleImageChange}
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
              defaultValue={oneBook.name}
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
              defaultValue={oneBook.quantity}
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
              defaultValue={oneBook.authorName}
              {...register("authorName", {
                required: "Author name is required",
              })}
            />
            {errors.authorName && (
              <span className="text-red-500 text-sm">
                {errors.authorName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Category:</label>
            <Controller
              name="category"
              control={control}
              defaultValue={oneBook.category}
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
            <label className="block text-white mb-2">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              step={0.1}
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              placeholder="Rating"
              defaultValue={oneBook.rating}
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
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-500 focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Update Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
