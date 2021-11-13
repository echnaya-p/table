import React, { useState, useEffect } from "react";
import generateUniqueId from "./utils/utils";
import Pagination from "./Pagination";

function Table(props) {
  const { arrayOfData } = props;

  const [ text, setText ] = useState('');
  const [ newData, setNewData ] = useState([...arrayOfData]);
  const [ sortedParams, setSorted ] = useState({});
  const [ selectedSort, setSelectedSort ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);

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

      return  values.some(value => {
        return value.toString().toLowerCase().includes(text.toString().toLowerCase());
      });
    });

    if (selectedSort) {
      if ((typeof filteredData?.[0]?.[selectedSort] === 'string')) {
        filteredData.sort((a, b) => sortedParams[selectedSort] ?
          a[selectedSort].localeCompare(b[selectedSort]) : b[selectedSort].localeCompare(a[selectedSort]));
      } else {
        filteredData.sort((a, b) => sortedParams[selectedSort] ?
          a[selectedSort] - b[selectedSort] : b[selectedSort] - a[selectedSort]);
      }
    }

    setNewData(filteredData);
  };

  const renderHeader = () => {
    const keys = Object.keys(arrayOfData[0]);
    return keys.map((key) => <th key={generateUniqueId()} onClick={handleSort(key)}>{key}</th>);
  };

  const renderRow = (data) => {
    const keys = Object.keys(data);
    return keys.map((key) => <td key={generateUniqueId()}>{data[key].toString()}</td>);
  };

  const renderRows = (array) => {
    return array.map((data) =><tr key={generateUniqueId()}>{renderRow(data)}</tr>);
  };

  const renderTable = () => {
    return (
      <div>
        <input type="text" onChange={handleChangeText()} />
        <table>
          <thead><tr>{renderHeader()}</tr></thead>
          <Pagination
            newData={newData}
            renderRows={renderRows}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </table>
      </div>
    );
  };

  useEffect(() => {
    filter();
  }, [text, selectedSort, sortedParams]);

  useEffect(() => {
    setNewData([...arrayOfData]);
  }, [arrayOfData]);

  if (arrayOfData?.length === 0) {
    return <span>Нет данных</span>
  }

  return arrayOfData?.length > 0 ? renderTable() : <span>Загрузка данных</span>;
}

export default Table;
