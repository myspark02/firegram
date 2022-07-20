import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
// import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);
  console.log(progress, url)

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url]);

  return (
    <div className='progress-bar' style={{width: progress + '%'}}></div>
  )

//   return (
//     <motion.div className="progress-bar"
//       initial={{ width: 0 }}
//       animate={{ width: progress + '%' }}
//     ></motion.div>
//   );
} 

export default ProgressBar;