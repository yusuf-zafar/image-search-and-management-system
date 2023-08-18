import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import axios from "axios";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [sortField, setSortField] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const handleSearch = async (searchParams) => {
    const updateSortAndSearch = (newSortField) => {
      setSortField(newSortField);
    };

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: {
          ...searchParams,
          sortField,
          sortOrder: "asc",
          page: currentPage,
          pageSize: 12,
        },
      });

    setTotalImages(response.data.totalCount); 
    setSearchResults(response.data.images);

    } catch (error) {
      console.error("Error searching images:", error);
    }

    return updateSortAndSearch;
  };

  const handleSort = (newSortField) => {
    setSortField(newSortField);
  };

  const handlePageChange = async (pageDirection, searchParams) => {
    let newPage = currentPage;

    if (pageDirection === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else if (pageDirection === "next" && currentPage < (totalImages/12)) {
      newPage = currentPage + 1;
    } else {
      return;
    }

    setCurrentPage(newPage);

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: {
          ...searchParams,
          sortField,
          sortOrder: "asc",
          page: newPage,
          pageSize: 12,
        },
      });
      setSearchResults(response.data.images);
    } catch (error) {
      console.error("Error searching images:", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "-200px" }}>
        Search Images
      </h2>
      <SearchForm handleSearch={handleSearch} />
      <SearchResults
        results={searchResults}
        handleSort={handleSort}
        handlePageChange={handlePageChange}
        totalImages={totalImages}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Search;
