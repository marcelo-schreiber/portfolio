import { Canvas } from "@react-three/fiber";
import { OrbitControls, TorusKnot } from "@react-three/drei";

function SpinningTorus() {
  return (
    <TorusKnot args={[0.9, 0.25, 64, 8, 2, 3]}>
      <meshBasicMaterial color="white" wireframe />
    </TorusKnot>
  );
}

export default function LoadingScreen() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ width: 180, height: 180 }}>
        <Canvas
          camera={{ position: [0, 0, 3.2] }}
          style={{ background: "transparent" }}
        >
          <SpinningTorus />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={18}
          />
        </Canvas>
      </div>
      <div
        style={{
          color: "#fff",
          fontFamily: "IndustryBlack, sans-serif",
          fontSize: "1.2rem",
          marginTop: 8,
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          height: 32,
        }}
      >
        Loading
        <span id="dotone">.</span>
        <span id="dottwo">.</span>
        <span id="dotthree">.</span>
      </div>
      <style>{`
        @font-face {
          font-family: 'IndustryBlack';
          src: url('/IndustryBold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        #dotone {
          animation: blink 1s infinite;
        }
        #dottwo {
          animation: blink 1s infinite;
          animation-delay: 0.25s;
        }
        #dotthree {
          animation: blink 1s infinite;
          animation-delay: 0.5s;
        }
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}