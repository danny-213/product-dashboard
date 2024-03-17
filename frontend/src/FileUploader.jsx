import React, { useState } from "react";
import UploadForm from "./UploadForm";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a valid CSV or XLSX file.");
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      fetch("http://127.0.0.1:5000/upload_file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      })
        .then((response) => {
          // Handle response from the server
          console.log(response);
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleUpload}>Upload File</button>
      <UploadForm />
    </div>
  );
};

export default FileUploader;
