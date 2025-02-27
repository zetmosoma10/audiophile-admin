const TableCell = ({ children, className }) => {
  return <td className={`p-2 border ${className} `}>{children}</td>;
};

export default TableCell;
