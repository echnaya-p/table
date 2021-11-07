import React from "react";

function Table(props) {
  const {tableData} = props;

  const sort = () => {
    console.log();
  };

  const handleChange = () => () => {
    console.log();
  };

  const renderHeader = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td onClick={sort}>{key}</td>);
  };
  const renderRow = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td>{data[key]}</td>);
  };
  const renderRows = () =>{
    return tableData.map((data) =><tr>{renderRow(data)}</tr>);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <table>
        <thead>{renderHeader(tableData[0])}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default Table;
