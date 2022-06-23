const Box = ({ x, y, color }) => {
  return (
    <div
      style={{
        zIndex: 9999,
      }}
      className="fixed inset-0 pointer-events-none"
    >
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        className="absolute translate -translate-y-1/2 -translate-x-1/2"
        style={{
          left: x,
          top: y,
        }}
      >
        <rect x={10} y={10} width={30} height={30} style={{ fill: "transparent", stroke: color, strokeWidth: 3 }} />
      </svg>
    </div>
  );
};

export default Box;
