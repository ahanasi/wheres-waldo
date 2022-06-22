const Box = ({ x, y }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <rect x={10} y={10} width={30} height={30} style={{ fill: "transparent", stroke: "black", strokeWidth: 3 }} />
      </svg>
    </div>
  );
};

export default Box;
