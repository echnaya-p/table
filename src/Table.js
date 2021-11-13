import React, {useState, useEffect} from "react";
import generateUniqueId from "./utils/utils";

function Table(props) {
  const {arrayOfData} = props;

  const [ text, setText ] = useState('');
  const [ newData, setNewData ] = useState([...arrayOfData]);
  const [ sortedParams, setSorted ] = useState({});
  const [ selectedSort, setSelectedSort ] = useState('');

  const handleChangeText = () => (e) => {
    setText(e.target.value);
  };

  const handleSort = (key) => () => {
    const isTrue = !sortedParams?.[key];
    setSelectedSort(key);
    setSorted({...sortedParams, [key]: isTrue});
  };

  const filter = () => {
    const filteredData = arrayOfData.filter(data => {
      const values = Object.values(data);
      const isIncluded = values.some(value => {
        return value.toLowerCase().includes(text.toLowerCase());
      });

      return isIncluded;
    });

    if (selectedSort) {
      filteredData.sort((a, b) => sortedParams[selectedSort] ?
        a[selectedSort].localeCompare(b[selectedSort]) : b[selectedSort].localeCompare(a[selectedSort]));
    }

    setNewData(filteredData);
  };

  const renderHeader = () => {
    const keys = Object.keys(arrayOfData[0]);
    return keys.map((key) => <th key={generateUniqueId()} onClick={handleSort(key)}>{key}</th>);
  };

  const renderRow = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td key={generateUniqueId()}>{data[key]}</td>);
  };

  const renderRows = () =>{
    return newData.map((data) =><tr key={generateUniqueId()}>{renderRow(data)}</tr>);
  };

  useEffect(() => {
    filter();
  }, [text, selectedSort, sortedParams]);

  return (
    <div>
      <input type="text" onChange={handleChangeText()} />
      <table>
        <thead><tr>{renderHeader()}</tr></thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default Table;
