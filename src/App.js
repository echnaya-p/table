import React, { useState, useEffect } from "react";
import Table from "./Table";
import request from "./request";
import "./app.css"



function App() {
  const [dataForTable, setDataForTable] = useState([]);
  const url = 'https://jsonplaceholder.typicode.com/todos/';

  useEffect(() => {
    (async function getDataByAPI() {
      const response = await request(url);
      setDataForTable(response);
    })();
  }, []);

  return (
    <div className="App">
      <Table arrayOfData={dataForTable} />
    </div>
  );
}

export default App;
