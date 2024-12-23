import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsBook = () => {
  const { name } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/category/${name}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchBookData();
  }, [name]);

  return <div>DetailsBook</div>;
};

export default DetailsBook;
