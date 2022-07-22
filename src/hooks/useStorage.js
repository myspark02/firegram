import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';
import { projectStorage} from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    console.log('useStorage > useEffect')
    // references
    // const storageRef = projectStorage.ref(file.name);
    const storageRef = ref(projectStorage, file.name)
    

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('byteTransferred:', snapshot.bytesTransferred);
                    console.log('totalBytes:', snapshot.totalBytes);
                    setProgress(percentage);
                    
                    console.log('Upload is ^ ' + percentage + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default :
                    }
                }, 
                (error) => {
                    setError(error);
                }, 
                () => {
                    console.log('completion handler called')
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);                        
                        setUrl(downloadURL)
                    });
                }
    );
  }, [file]);
  
  return { progress, url, error };
}

export default useStorage;