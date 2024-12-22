import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import PageNotAnimation from "./json/PageNotFound.json";

const PageNotFound = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: PageNotAnimation,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return <div ref={animationContainer} className="w-96 h-96 md:w-[40rem] md:h-[40rem]"></div>;
};

export default PageNotFound;
