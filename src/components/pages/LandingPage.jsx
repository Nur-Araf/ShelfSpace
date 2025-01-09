import { Helmet } from "react-helmet";
import AboutUs from "../landingPage/AboutUs";
import BannerSlider from "../landingPage/BannerSlider";
import BookCatagories from "../landingPage/BookCatagories";
import FeedBack from "../landingPage/FeedBack";
import RecommendedBooks from "../landingPage/RecommendedBooks";
import JoinCommunity from "../landingPage/JoinCommunity";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>ShelfSpace</title>
      </Helmet>
      <BannerSlider />
      <BookCatagories />
      <RecommendedBooks />

      <FeedBack />
      <JoinCommunity />
      <AboutUs />
    </>
  );
};

export default LandingPage;
