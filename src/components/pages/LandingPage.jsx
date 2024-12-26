import { Helmet } from "react-helmet";
import AboutUs from "../landingPage/AboutUs";
import BannerSlider from "../landingPage/BannerSlider";
import BookCatagories from "../landingPage/BookCatagories";
import FeedBack from "../landingPage/FeedBack";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>ShelfSpace</title>
      </Helmet>
      <BannerSlider />
      <BookCatagories />
      <FeedBack />
      <AboutUs />
    </>
  );
};

export default LandingPage;
