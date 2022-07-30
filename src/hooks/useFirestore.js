import {useState, useEffect} from 'react'
import { projectFirestore } from '../firebase/config'
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const useFirestore = (myCollection) => {
  const [docs, setDocs] = useState([])

  useEffect( () => {
    const q = query(collection(projectFirestore, myCollection), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({...doc.data(), id:doc.id});
        });
        setDocs(documents);
    });

    return unsubscribe; // to unsubscribe when ImageGrid component unmounts

  }, [myCollection])

  return { docs };
}

export default useFirestore