const TableHead = ({ columns }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="p-2 border">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
