import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import WorkingAnimation from "./json/Working.json";

const Working = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: WorkingAnimation,
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

export default Working;
