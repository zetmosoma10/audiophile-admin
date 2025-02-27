const TableBody = ({ data, renderRow }) => {
  return (
    <tbody>
      {data.length > 0 ? (
        data.map((row, index) => renderRow(row, index))
      ) : (
        <tr>
          <td colSpan="100%" className="py-4 text-center">
            No Data Available
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
