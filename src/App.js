import './App.css';
import React from "react";
import Table from "./Table";

const example = [];

for (let i = 1; i <= 150; i++) {
  example.push({
    name: 'book ' + i,
    author: 'author ' + (151 - i),
    pages: (i * 10).toString(),
  });
}

function App() {
  return (
    <div className="App">
      <Table arrayOfData={example} />
    </div>
  );
}

export default App;
