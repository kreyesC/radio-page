"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { excelSerialToJSDate } from '../functions/exceltoDate'; 

const RepContext = createContext();
const LicContext = createContext();
const UserContext = createContext();

export const DataProvider = ({ children }) => {
  const [rep, setRep] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'bdRepetidores'));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();

          const formattedData = {
            id: doc.id,
            ...docData,
            'Otorga': docData['Otorga']
              ? excelSerialToJSDate(docData['Otorga']).toLocaleDateString()
              : '',
            'Vence': docData['Vence']
              ? excelSerialToJSDate(docData['Vence']).toLocaleDateString()
              : '',

          };

          return formattedData;
        });

        setRep(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <RepContext.Provider value={{ rep, setRep }}>
      {children}
    </RepContext.Provider>
  );
};

export const LicenciaProvider = ({ children }) => {
  const [lic, setLic] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, '/bdLicencias'));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();

          const formattedData = {
            id: doc.id,
            ...docData,
            'Vencimiento': docData['Vencimiento']
              ? excelSerialToJSDate(docData['Vencimiento']).toLocaleDateString()
              : '',

          };

          return formattedData;
        });

        setLic(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <LicContext.Provider value={{ lic }}>
      {children}
    </LicContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, '/users'));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();

          const formattedData = {
            id: doc.id,
            ...docData,
          };

          return formattedData;
        });

        setUserData(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useRep = () => useContext(RepContext);

export const useLic = () => useContext(LicContext);

export const useData = () => useContext(UserContext);

export const useCombinedContext = () => {
  const { rep } = useRep();
  const { lic } = useLic();
  const { userData } = useData();

  return { rep, lic, userData };
};