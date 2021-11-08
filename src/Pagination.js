import React, { useEffect } from "react";

function Pagination(props) {
  const { newData, currentPage, setCurrentPage, renderRows } = props;

  const numberOfItems = newData.length;
  const numberPerPage = 50;
  const numberOfPage = Math.ceil(numberOfItems/numberPerPage);

  const buildPage = (currentPage) => {
    const indexOfStart = (currentPage - 1) * numberPerPage;
    const indexOfEnd = indexOfStart + numberPerPage;

    return newData.slice(indexOfStart, indexOfEnd);
  };

  const handleChangePage = (page) => () => {
    setCurrentPage(page);
  };

  const renderPageButton = (numberOfPage) => {
    const pages = [];
    for (let i = 1; i <= numberOfPage; i++) {
      pages.push(i);
    }
    return pages.map((page) => <button onClick={handleChangePage(page)} key={page}>{page}</button>)
  };

  useEffect(() => {
    buildPage(currentPage);
  }, [currentPage]);

  return  (
    <>
      <tbody>{renderRows(buildPage(currentPage))}</tbody>
      <div>{renderPageButton(numberOfPage)}</div>
    </>
  );
}

export default Pagination;
