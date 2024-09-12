import { read, utils } from "xlsx";
import { firestore } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export const uploadExcelToFirestore = async (file) => {
  try {
    // Leer el archivo de Excel
    const data = await file.arrayBuffer();
    const workbook = read(data);

    // Convertir a JSON
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    // Subir cada registro a Firestore
    const collectionRef = collection(firestore, "bdRepetidores");
    jsonData.forEach(async (record) => {
      await addDoc(collectionRef, record);
    });
    console.log(jsonData)
    console.log("Datos subidos correctamente a Firestore");
  } catch (error) {
    console.error("Error subiendo datos a Firestore:", error);
  }
};
