'use client'
import React, { useEffect, useState } from "react";
import { uploadExcelToFirestore } from "./uploadExcel";
import { firestore } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ExcelUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const count = () => {
    const query = collection(firestore, "bdRepetidores");
    
    // Use onSnapshot directly on the collection reference
    onSnapshot(query, (snapshot) => {
      console.log('Total de documentos:', snapshot.size);
    });
  }

  useEffect(() => {
    count();
  }, []);

  const handleUpload = () => {
    if (file) {
      uploadExcelToFirestore(file);
    } else {
      alert("Por favor, selecciona un archivo Excel primero.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <button onClick={handleUpload}>Subir a Firestore</button>
    </div>
  );
};

export default ExcelUploader;
