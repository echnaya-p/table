import React, {useEffect} from "react";
import generateUniqueId from "./utils/utils";

function TableBody(props) {
  const { newData, currentPage, numberPerPage } = props;

  const renderRow = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td key={generateUniqueId()}>{data[key].toString()}</td>);
  };

  const renderRows = (array) => {
    return array.map((data) =><tr key={generateUniqueId()}>{renderRow(data)}</tr>);
  };

  const buildPage = (currentPage) => {
    const indexOfStart = (currentPage - 1) * numberPerPage;
    const indexOfEnd = indexOfStart + numberPerPage;

    return newData.slice(indexOfStart, indexOfEnd);
  };

  useEffect(() => {
    buildPage(currentPage);
  }, [currentPage]);

  return <tbody>{newData.length === 0 ? <tr><td>Нет данных</td></tr> :renderRows(buildPage(currentPage))}</tbody>;
}

export default TableBody;
