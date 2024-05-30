import React from "react";
import ComputersCanvas from "./canvas/Computers";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <ComputersCanvas />
    </section>
  );
};

export default Hero;
