import { useEffect } from "react";
import { gsap } from "gsap";
import BirdFlying from "../BirdFlying"; // assuming the BirdFlying component is correctly imported

const AnimatedBird = () => {
  useEffect(() => {
    const animateBird = () => {
      // Generate random movement directions
      const randomX = Math.random() * (window.innerWidth - 100);
      const randomY = Math.random() * (window.innerHeight - 100);

      // Determine if the bird is moving right or left for flipping
      const isMovingRight = randomX > window.innerWidth / 2;

      // Apply animation to bird container
      gsap.to(".bird-container", {
        duration: 10,
        x: randomX,
        y: randomY,
        ease: "power1.inOut", 
        scaleX: isMovingRight ? 1 : -1, 
        repeat: 0, 
        onComplete: animateBird,
      });
    };

    // Ensure the bird starts in a valid position
    gsap.set(".bird-container", {
      x: `random(0, ${window.innerWidth - 100})`,
      y: `random(0, ${window.innerHeight - 100})`,
    });

    animateBird(); // Start the animation
  }, []);

  return (
    <div className="bird-container absolute h-44 w-44 z-10">
      <BirdFlying />
    </div>
  );
};

export default AnimatedBird;
