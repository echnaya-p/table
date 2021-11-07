import './App.css';
import React from "react";
import Table from "./Table";

const exampleBody = [
  {
    name: 'book 1',
    author: 'author 1',
    release: '2001',
  },
  {
    name: 'book 2',
    author: 'author 2',
    release: '2002',
  },
  {
    name: 'book 3',
    author: 'author 3',
    release: '2003',
  },
];

function App() {
  return (
    <div className="App">
      <Table tableData={exampleBody} />
    </div>
  );
}

export default App;
