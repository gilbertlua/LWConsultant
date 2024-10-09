import React, { useState } from 'react';
import axios from 'axios';
const ControlPanel = () => {
  const [formData, setFormData] = useState({
    description: '',
    pasal: '',
    urlPDF:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {     
      const file =  e.target.files[0];
      const fileData = new FormData();
      fileData.append('file',file);
      axios.post('http://localhost:5000/Item/AddPdfFile', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': '*/*',
      }
      })
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          urlPDF: response.data.fileName  }));
        console.log("File path: " + response.data.fileName);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/Item/CreateItem', null, {
      params: {
        description: formData.description,   
        pasal: formData.pasal,
        urlpdf: formData.urlPDF
      },
      headers: {
        'accept': '*/*',      
      }
    })
    .then((response) => {
      console.log('Item created:', response.data);
    })
    .catch((error) => {
      console.error('Error creating item:', error);
    });
    
  };




  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-5">
        {/* File Input */}
        <div className="form-group mb-3">
          <label htmlFor="file">File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />
        </div>

        {/* Pasal Input */}
        <div className="form-group mb-3">
          <label htmlFor="pasal">Pasal</label>
          <input
            type="text"
            className="form-control"
            id="pasal"
            name="pasal"
            value={formData.pasal}
            onChange={handleInputChange}
            placeholder="Enter pasal"
            required
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>


      {/* list data */}
      
    </div>
  );
};

export default ControlPanel;
