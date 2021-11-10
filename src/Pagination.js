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
    switch (page) {
      case 'previous':
        setCurrentPage(currentPage - 1);
        break;

      case 'next':
        setCurrentPage(currentPage + 1);
        break;

      default:
        setCurrentPage(page);
    }

  };

  const renderPagesButton = (numberOfPage) => {
    const pages = [];

    for (let i = 1; i <= numberOfPage; i++) {
      pages.push(i);
    }

    const renderPages = (pages) => pages.map((page) => {
      return <button onClick={handleChangePage(page)} key={page}>{page}</button>;
    });

    if (numberOfPage === 1) {
      return null;
    }

    if (numberOfPage <= 6) {
      return renderPages(pages);
    }

    if (currentPage < 5) {
      return <>{renderPages(pages.slice(0,5))}<span>...</span>{renderPages(pages.slice(-1))}</>;
    }

    if ((currentPage >= 5) && (currentPage <= (numberOfPage - 5))) {
      return (
        <>
          {renderPages(pages.slice(0,1))}
          <span>...</span>
          {renderPages(pages.slice(currentPage - 2,currentPage + 2))}
          <span>...</span>
          {renderPages(pages.slice(-1))}
        </>
      );
    }

    if (currentPage > numberOfPage - 5) {
      return <>{renderPages(pages.slice(0,1))}<span>...</span>{renderPages(pages.slice(-5))}</>;
    }

  };


  useEffect(() => {
    buildPage(currentPage);
  }, [currentPage]);

  return  (
    <>
      <tbody>{renderRows(buildPage(currentPage))}</tbody>
      <div>
        {(currentPage > 1) && <button onClick={handleChangePage('previous')}>{'<'}</button>}
        {renderPagesButton(numberOfPage)}
        {(currentPage !== numberOfPage) && <button onClick={handleChangePage('next')}>{'>'}</button>}
      </div>
    </>
  );
}

export default Pagination;
