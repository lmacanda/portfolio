import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="canvas-loader"></span>
      <p
        style={{
          color: "white",
          fontSize: 14,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;
