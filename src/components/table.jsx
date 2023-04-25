import React from "react";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";
const Table = ({ onSort, sortColumn, columns, data }) => {
  return (
    <table className="table table">
      <TableHeaders sortColumn={sortColumn} onSort={onSort} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
