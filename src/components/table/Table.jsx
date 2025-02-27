import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-left text-gray-900 bg-white border border-collapse border-gray-200">
        <TableHead columns={columns} />
        <TableBody data={data} renderRow={renderRow} />
      </table>
    </div>
  );
};

export default Table;
