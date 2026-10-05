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
      <div
        style={{
          width: 120,
          height: 120,
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderTopColor: "white",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <div
        style={{
          color: "#fff",
          fontFamily: "sans-serif",
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
        @keyframes spin {
          to { transform: rotate(360deg); }
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
