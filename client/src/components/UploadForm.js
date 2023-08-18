import React, { useState } from "react";
import Tags from "./Tags";
import axios from "axios";
import './UploadForm.css'; 

function UploadForm() {
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    keywords: "",
    imageFile: null,
  });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUploadData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    setUploadData((prevData) => ({
      ...prevData,
      imageFile: event.target.files[0],
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("keywords", uploadData.keywords);
      formData.append("image", uploadData.imageFile); 

    
      selectedTags.forEach((tag) => {
        formData.append("tags", tag);
      });

      console.log(uploadData);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully");
      console.log("Image uploaded successfully:", response.data);
      setUploadData({
        title: "",
        description: "",
        keywords: "",
        imageFile: null,
      });
      setSelectedTags([]);

    } catch (error) {
      alert("Error uploading image:");
      console.error("Error uploading image:", error);
    }
  };

  return (
<>
<h2 style={{textAlign:"center"}}>Upload Image</h2>


    <form onSubmit={handleUpload} className="upload-form">
      <input
        type="text"
        name="title"
        value={uploadData.title}
        onChange={handleChange}
        placeholder="Title"
        className="upload-input"
        required
      />
      <textarea
        name="description"
        value={uploadData.description}
        onChange={handleChange}
        placeholder="Description"
        className="upload-textarea"
        required
      />
      <input
        type="text"
        name="keywords"
        value={uploadData.keywords}
        onChange={handleChange}
        placeholder="Keywords"
        className="upload-input"
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="upload-file-input"
        required
      />
      <Tags
        availableTags={["Nature", "Animals", "Food", "Technology", "Art", "Others"]}
        selectedTags={selectedTags}
        handleTagChange={handleTagChange}
        className="tags"
      />
      <button type="submit"  className="upload-btn">Upload</button>
    </form>
    </>
  );
}

export default UploadForm;
