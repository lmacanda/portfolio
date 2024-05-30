import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";

import React, { useState, useEffect, Suspense } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import CanvasLoader from "../Loader.jsx";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./low_poly_80s_hacker_room/scene.gltf");
  const chair = computer.nodes.Chair_10;

  useFrame(({ clock }) => {
    chair.rotation.y = Math.sin(clock.getElapsedTime()) * 10;
  });

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight position={[0, 5, 10]} penumbra={1} />
      <pointLight intensity={5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.9}
        position={isMobile ? [0, -2, -2.2] : [0, -3.25, -1.5]}
      />
      {chair && (
        <Html position={chair.position}>
          <div className="tooltip">This is a chair</div>
        </Html>
      )}
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
