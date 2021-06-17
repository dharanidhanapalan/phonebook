import React from "react";

const Filter = ({ filterValue, handleChangeFilter }) => {
  return (
    <>
      <label>Filter By:</label>{" "}
      <input value={filterValue} onChange={(e) => handleChangeFilter(e)} />
    </>
  );
};

export default Filter;
