import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import './table.css';

function Table(props) {
  const { arrayOfData } = props;

  const [ text, setText ] = useState('');
  const [ newData, setNewData ] = useState([...arrayOfData]);
  const [ sortedParams, setSorted ] = useState({});
  const [ selectedSort, setSelectedSort ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ numberPerPage, setNumberPerPage ] = useState(10);

  const handleChangeText = (e) => {
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

  const renderTable = () => {
    return (
      <div>
        <input type="text" onChange={handleChangeText} placeholder="Поиск" />
        <table>
          {arrayOfData?.length > 0 &&
            <TableHead
              arrayOfData={arrayOfData}
              onSort={handleSort}
            />
          }
          {arrayOfData?.length >= 0 &&
            <TableBody
              newData={newData}
              currentPage={currentPage}
              numberPerPage={numberPerPage}
            />
          }
        </table>
        {arrayOfData?.length > numberPerPage && newData?.length > 1 &&
          <Pagination
            newData={newData}
            currentPage={currentPage}
            numberPerPage={numberPerPage}
            setCurrentPage={setCurrentPage}
            setNumberPerPage={setNumberPerPage}
          />
        }
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
    return <span>Загрузка данных</span>
  }

  return arrayOfData?.length > 0 ? renderTable() : <span>Ошибка загрузки данных</span>;
}

export default Table;
