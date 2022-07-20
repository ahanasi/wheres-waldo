const Box = ({ x, y, imgSett, color }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        className="absolute translate -translate-x-1/2 -translate-y-1/2"
        style={{
          left: (x * imgSett.width) / 100 + imgSett.left,
          top: (y * imgSett.height) / 100 + imgSett.top,
        }}
      >
        <rect x={10} y={10} width={30} height={30} style={{ fill: "transparent", stroke: color, strokeWidth: 3 }} />
      </svg>
    </div>
  );
};

export default Box;
