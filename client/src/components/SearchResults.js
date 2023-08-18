// SearchResults.js
import React, { useState } from "react";
import ImagePopup from "./ImagePopup";
import "./SearchResults.css";

function SearchResults({ results, handlePageChange, handleSort, totalImages, currentPage, }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const displayedImagesCount = Math.min(currentPage * 12, totalImages);

  return (
    <div  className="results-container">
     {selectedImage ? (
        <ImagePopup image={selectedImage} onClose={closePopup} />
      ):(
        <div>
      <div className="controls-container">
  
        <div className="pagination-info">
          Showing Images: {displayedImagesCount}/{totalImages} | Page: {currentPage}
        </div>
        <button className="pagination-button" onClick={() => handlePageChange("prev")}>Previous</button>
        <button className="pagination-button" onClick={() => handlePageChange("next")}>Next</button>

        <label>Sort by: 
        <select className="sort-select" onChange={(event) => handleSort(event.target.value)}>
          <option value="title">Title</option>
          <option value="createdAt">Date</option>

        </select>
        </label>
      </div>

      <div className="image-list">
        {results.map((image) => (
          <div key={image.id} className="img-container">
            <img
            className="result-image"
            onClick={()=>openPopup(image)}
            //   width={100}
              src={"http://localhost:5000/uploads/" + image.name}
              alt={image.title}
            />
            <h4 className="result-title">{image.title}</h4>
            <p>{new Date(image.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      </div>
      )}
    </div>
  );
}

export default SearchResults;
