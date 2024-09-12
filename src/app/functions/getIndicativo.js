import { collection, query, where, getDocs } from 'firebase/firestore';
import {firestore} from '../lib/firebase';

const getIndicativoData = async (indicativo) => {
  try {

    const indicativosCollection = collection(firestore, 'bdRadioAF');
    const q = query(indicativosCollection, where('Señal Distintiva', '==', indicativo));


    const querySnapshot = await getDocs(q);


    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error al buscar el indicativo:', error);
    return null;
  }
};

export default getIndicativoData;
