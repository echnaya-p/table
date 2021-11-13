import React from "react";
import generateUniqueId from "./utils/utils";

function TableHead(props) {
  const { arrayOfData, onSort } = props;

  const renderHeader = () => {
    const keys = Object.keys(arrayOfData[0]);
    return keys.map((key) => <th key={generateUniqueId()} onClick={onSort(key)}>{key}</th>);
  };

  return <thead><tr>{renderHeader()}</tr></thead>
}

export default TableHead;
