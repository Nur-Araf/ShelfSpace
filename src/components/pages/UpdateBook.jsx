import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const [oneBook, setOneBook] = useState({});
  console.log(oneBook);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        setOneBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookData();
  }, [id]);
  return <div>UpdateBook</div>;
};

export default UpdateBook;
