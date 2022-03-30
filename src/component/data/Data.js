import React, { useState, useEffect } from "react";
import "./style.css";
const Data = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxpageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinpageNumberLimit] = useState(0);
  const pages = [];
  for (let i = 1; i < Math.ceil(data.length / itemPerPage); i++) {
    pages.push(i);
  }
  const handleClick = (event) => {
    console.log(Number(event.target.value));
    setCurrentPage(Number(event.target.value));
  };
  const renderPageNum = pages.map((number) => {
    if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          value={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const nextClickHandler = (event) => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxpageNumberLimit) {
      setMaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setMinpageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };
  const prevClickHandler = (event) => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setMinpageNumberLimit(minpageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncreament = null;
  if (pages.length > maxpageNumberLimit) {
    pageIncreament = <li onClick={nextClickHandler}>&hellip;</li>;
  }
  let pageDecrement = null;
  if (pages.length > maxpageNumberLimit) {
    pageDecrement = <li onClick={prevClickHandler}>&hellip;</li>;
  }
  const loadMore = () => {
    setItemPerPage(itemPerPage + 5);
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);

  // comment 3
  let vn = 6;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = data.slice(indexofFirstItem, indexOfLastItem);

  return (
    <div>
      <ul>
        {currentItem.map((x) => (
          <li key={x.id}>{x.title}</li>
        ))}
      </ul>
      <ul className="bottomBoxes">
        <li>
          <button
            onClick={prevClickHandler}
            disabled={currentPage == pages[0] ? true : false}
          >
            prev
          </button>
        </li>
        {pageDecrement}
        {renderPageNum}
        {pageIncreament}
        <li>
          <button
            onClick={nextClickHandler}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            next
          </button>
        </li>
      </ul>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default Data;
