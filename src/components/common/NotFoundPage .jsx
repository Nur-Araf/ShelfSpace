import { Link } from "react-router-dom";
import PageNotFound from "../animations/PageNotFound";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center bg-black text-white overflow-hidden">
      <Helmet>
        <title>404 - ShelfSpace</title>
      </Helmet>
      <PageNotFound />

      <Link
        to="/"
        className="mb-20 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
