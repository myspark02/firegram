import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';
import { projectFirestore} from '../firebase/config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);
  console.log(progress, url)

  useEffect(() => {
    if (url) {
      console.log('upload completed set file to null')
      const createdAt = serverTimestamp();
      try {          
            addDoc(collection(projectFirestore, "images"), {url, createdAt});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      setFile(null);
    }
  }, [url]);

  // return (
  //   <div className='progress-bar' style={{width: progress + '%'}}></div>
  // )

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;