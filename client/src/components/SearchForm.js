import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [searchParams, setSearchParams] = useState({
    title: "",
    keywords: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="title"
        value={searchParams.title}
        onChange={handleChange}
        placeholder="Title"
        className="form-input"
      />
      <input
        type="text"
        name="keywords"
        value={searchParams.keywords}
        onChange={handleChange}
        placeholder="Keywords"
        className="form-input"
      />
      <input
        type="date"
        name="fromDate"
        value={searchParams.fromDate}
        onChange={handleChange}
        placeholder="fromDate"
        className="date-input"
      />
      <input
        type="date"
        name="toDate"
        value={searchParams.toDate}
        onChange={handleChange}
        placeholder="toDate"
        className="date-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default SearchForm;
