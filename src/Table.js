import React, {useState} from "react";
import "./Table.css";

function Table(props) {
  const {tableData} = props;

  const [ text, setText ] = useState('');

  const sort = () => {

  };

  const handleChangeText = () => (e) => {
    setText(e.target.value);
  };

  const filter = () => {
    return tableData.filter(data => {
      const values = Object.values(data);
      const isIncluded = values.some(value => {
        return value.toLowerCase().includes(text.toLowerCase());
      });

      return isIncluded;
    });
  };

  const filteredData = filter();

  const renderHeader = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td onClick={sort}>{key}</td>);
  };

  const renderRow = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td>{data[key]}</td>);
  };

  const renderRows = () =>{
    return filteredData.map((data) =><tr>{renderRow(data)}</tr>);
  };

  return (
    <div>
      <input type="text" onChange={handleChangeText()} />
      <table>
        <thead>{renderHeader(tableData[0])}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default Table;
