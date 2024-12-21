import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import ButterFly from "./json/ButterFly.json";

const LottieAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: ButterFly,
    });

    return () => {
      animation.destroy(); 
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      style={{ width: "100%", height: "auto" }}
    ></div>
  );
};

export default LottieAnimation;
