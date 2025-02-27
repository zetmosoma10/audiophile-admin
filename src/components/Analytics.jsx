const Analytics = ({ name, total }) => {
  let color = "";
  if (name === "Total Orders") {
    color = "from-green-400 to-teal-500";
  } else if (name === "Total Products") {
    color = "from-orange-400 to-red-500";
  } else if (name === "Total Users") {
    color = "from-blue-400 to-indigo-500";
  } else if (name === "Revenue") {
    color = "from-yellow-400 to-amber-500";
  }

  return (
    <div className="p-4 bg-white border border-r rounded-lg shadow">
      <p className="text-gray-600">{name}</p>
      <h2
        className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
      >
        {name === "Revenue" && "R"}
        {Math.round(total)}
      </h2>
    </div>
  );
};

export default Analytics;
